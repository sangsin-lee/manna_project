import { createHmac, timingSafeEqual } from "node:crypto";
import { Resend } from "resend";

const validitySeconds = 30 * 60;
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
const mac = /^[A-Za-z0-9_-]{43}$/;

function key() {
  const secret = process.env.RESERVATION_ADMIN_TOKEN;
  if (!secret) throw new Error("이메일 확인 설정을 찾을 수 없습니다.");
  return createHmac("sha256", secret).update("stay-soban/email-proof/v1").digest();
}

function normalizedEmail(email: string) {
  const address = email.trim().toLowerCase();
  if (address.length > 254 || !/^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/.test(address)) {
    throw new Error("이메일 주소를 확인해 주세요.");
  }
  return address;
}

function sign(secret: Buffer, purpose: string, fields: string[]) {
  return createHmac("sha256", secret).update(JSON.stringify([purpose,...fields])).digest("base64url");
}

function equal(a: string, b: string) {
  return a.length === b.length && timingSafeEqual(Buffer.from(a, "ascii"), Buffer.from(b, "ascii"));
}

export function createEmailProof(id: string, email: string): string {
  if (!uuid.test(id)) throw new Error("접수 번호를 확인해 주세요.");
  const secret = key();
  const expires = String(Math.floor(Date.now() / 1000) + validitySeconds);
  const contact = sign(secret, "address", [id, expires, normalizedEmail(email)]);
  const fields = [id, expires, contact];
  return ["v1", ...fields, sign(secret, "envelope", fields)].join(".");
}

function readEnvelope(token: string) {
  if (typeof token !== "string" || token.length > 150) return null;
  const [version, id, expires, contact, signature, ...extra] = token.split(".");
  if (version !== "v1" || extra.length || !uuid.test(id || "") || !/^\d{10}$/.test(expires || "") ||
      !mac.test(contact || "") || !mac.test(signature || "")) return null;
  const now = Math.floor(Date.now() / 1000);
  if (+expires <= now || +expires > now + validitySeconds) return null;
  const secret = key();
  if (!equal(signature, sign(secret, "envelope", [id, expires, contact]))) return null;
  return {id, expires, contact, secret};
}

export function readProofId(token: string): string | null {
  return readEnvelope(token)?.id ?? null;
}

export function verifyEmailProof(token: string, email: string): string | null {
  const envelope = readEnvelope(token);
  if (!envelope) return null;
  let canonical: string;
  try { canonical = normalizedEmail(email); } catch { return null; }
  const {id, expires, contact, secret} = envelope;
  return equal(contact,sign(secret, "address", [id, expires, canonical])) ? id : null;
}

export async function sendEmailProof(email: string, token: string, origin: string): Promise<void> {
  const address = normalizedEmail(email);
  if (!verifyEmailProof(token,address)) throw new Error("이메일 확인 링크가 유효하지 않습니다.");
  const base = new URL(origin);
  if (base.protocol !== "https:" || base.username || base.password || base.origin !== origin) {
    throw new Error("이메일 확인 주소를 구성할 수 없습니다.");
  }
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) throw new Error("이메일 발송 설정을 확인해 주세요.");
  const link = new URL("/stay-soban", base);
  link.hash = "verify=" + encodeURIComponent(token);
  const {error} = await new Resend(apiKey).emails.send({
    from: process.env.RESEND_FROM_EMAIL?.trim() || "Manna Table <onboarding@resend.dev>",
    to: address,
    subject: "[스테이소반] 연결에 사용할 이메일을 확인해 주세요",
    text: [
      "스테이소반에 등록한 연락처의 확인을 요청하셨습니다.",
      "아래 링크를 열어 이메일 주소를 확인해 주세요. 링크는 발급 후 30분 동안 유효합니다.",
      link.href,
      "직접 요청하신 경우에만 확인해 주세요.",
    ].join("\n\n"),
  });
  if (error) throw new Error("확인 메일을 보내지 못했습니다. 잠시 후 다시 시도해 주세요.");
}
