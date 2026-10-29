import { createHash, timingSafeEqual } from "node:crypto";
import { createOpenAINarration, NarrationError } from "../../../../lib/openai-narration";

export const runtime = "nodejs";
export const maxDuration = 60;

function configuration() {
  const openaiKey = process.env.OPENAI_API_KEY?.trim();
  const provider = openaiKey ? "OpenAI" : "ElevenLabs";
  const key = openaiKey || process.env.ELEVENLABS_API_KEY?.trim();
  const voice = process.env.ELEVENLABS_VOICE_ID?.trim();
  const password = process.env.VIDEO_STUDIO_PASSWORD;
  const keyReady = Boolean(key && (provider !== "OpenAI" || /^sk-[A-Za-z0-9_-]{20,}$/.test(key)));
  const voiceReady = provider === "OpenAI" || Boolean(voice && /^[a-zA-Z0-9_-]{1,80}$/.test(voice));
  const passwordReady = Boolean(password && password.length >= 16 && password.length <= 256);
  const issue = !keyReady ? "api-key" : !voiceReady ? "voice" : !passwordReady ? "studio-password" : null;
  return { key, voice, password, provider, issue, ready: issue === null };
}
function reply(data: unknown, status = 200) {
  return Response.json(data, { status, headers: { "Cache-Control": "no-store" } });
}
export async function GET() {
  const { ready, provider, issue } = configuration();
  return reply({ ready, provider: issue === "api-key" ? null : provider, issue });
}

export async function POST(request: Request) {
  const config = configuration();
  if (!config.ready) return reply({ error: "AI 음성 연결을 준비 중입니다. 지금은 무음 영상을 만들 수 있어요." }, 503);
  if (request.headers.get("origin") !== new URL(request.url).origin) return reply({ error: "사이트의 영상 제작실에서 다시 시도해 주세요." }, 403);
  const supplied = request.headers.get("x-studio-password") ?? "";
  const hash = (value: string) => createHash("sha256").update(value).digest();
  if (supplied.length > 256 || !timingSafeEqual(hash(supplied), hash(config.password!))) return reply({ error: "제작실 비밀번호를 확인해 주세요." }, 401);
  if (!request.headers.get("content-type")?.includes("application/json")) return reply({ error: "잘못된 요청입니다." }, 400);
  // Bound the stream itself; Content-Length is not always present or trustworthy.
  const reader = request.body?.getReader();
  if (!reader) return reply({ error: "읽을 대본이 없습니다." }, 400);
  let size = 0;
  const chunks: Uint8Array[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 8192) { await reader.cancel(); return reply({ error: "한 번에 보낼 대본이 너무 깁니다." }, 413); }
    chunks.push(value);
  }
  let text: unknown;
  try { text = JSON.parse(Buffer.concat(chunks).toString("utf8")).text; }
  catch { return reply({ error: "대본을 확인해 주세요." }, 400); }
  if (typeof text !== "string" || !text.trim() || text.length > 700) return reply({ error: "대본은 1~700자로 입력해 주세요." }, 400);
  try {
    if (config.provider === "OpenAI") {
      const audio = await createOpenAINarration(text.trim(), config.key!, request.signal);
      return reply({ audio_base64: audio.toString("base64"), alignment: null });
    }
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${config.voice}/with-timestamps?output_format=mp3_44100_128`, {
      method: "POST", cache: "no-store", signal: AbortSignal.any([request.signal, AbortSignal.timeout(45000)]),
      headers: { "Content-Type": "application/json", "xi-api-key": config.key! },
      body: JSON.stringify({ text, model_id: "eleven_multilingual_v2", voice_settings: { stability: 0.5, similarity_boost: 0.75 } }),
    });
    if (!response.ok) return reply({ error: response.status === 429 ? "음성 서비스의 사용 한도에 도달했습니다. 계정 한도를 확인한 뒤 다시 시도해 주세요." : "음성을 만들지 못했습니다. 음성 서비스 설정과 잔액을 확인해 주세요." }, 502);
    const data = await response.json();
    if (typeof data.audio_base64 !== "string" || data.audio_base64.length > 3500000) throw new Error("Invalid audio");
    return reply({ audio_base64: data.audio_base64, alignment: data.alignment ?? null });
  } catch (cause) {
    if (cause instanceof NarrationError) {
      if (cause.kind === "credentials") return reply({ error: "OpenAI API 키가 유효하지 않습니다. 서버에 저장한 비밀키를 확인해 주세요. Tracking ID로는 음성을 만들 수 없습니다." }, 502);
      if (cause.kind === "quota") return reply({ error: "OpenAI API 잔액이나 사용 한도를 확인해 주세요. 자동으로 다시 요청하지 않았습니다." }, 502);
      if (cause.kind === "access") return reply({ error: "이 OpenAI 프로젝트에서 음성 모델을 사용할 수 없습니다. 키의 권한과 모델 사용 권한을 확인해 주세요." }, 502);
      if (cause.kind === "invalid") return reply({ error: "완전한 음성을 받지 못했습니다. 대본을 짧게 나누어 다시 시도해 주세요." }, 502);
    }
    return reply({ error: "음성 생성이 중단되었습니다. 완성된 장면은 남아 있으니 이어서 만들 수 있어요." }, 502);
  }
}
