import assert from "node:assert/strict";
import fs from "node:fs";
import ts from "typescript";
import { createRequire } from "node:module";
import { EventEmitter } from "node:events";
const load = createRequire(import.meta.url);
load.extensions[".ts"] = (module, filename) => {
  const { outputText } = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  });
  module._compile(outputText, filename);
};
const { recipes } = load("../lib/content.ts");
const { recipeFrames } = load("../lib/presentation.ts");
const { buildScenes, buildTimeline, captionsFor, dimensions, draftFromFrames, scriptFor, splitSceneText, srtFor, timelineDuration, VIDEO_QUALITIES, VOICE_LEAD } = load("../lib/video-project.ts");
const { drawVideoFrame } = load("../lib/video-canvas.ts");
const { getRecipeDesign } = load("../lib/recipe-design.ts");
const luminance = (hex) => {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4);
  return c[0] * .2126 + c[1] * .7152 + c[2] * .0722;
};
const contrast = (a, b) => (Math.max(luminance(a), luminance(b)) + .05) / (Math.min(luminance(a), luminance(b)) + .05);
const compact = (text) => text.replace(/\s/g, "");
for (const recipe of recipes) {
  const frames = recipeFrames(recipe);
  const drafts = draftFromFrames(frames, false);
  const scenes = buildScenes(drafts);
  const design = getRecipeDesign(recipe);
  assert.ok(frames.every((frame) => JSON.stringify(frame.design) === JSON.stringify(design)), `${recipe.slug}: capture theme`);
  assert.ok(scenes.every((scene) => JSON.stringify(scene.design) === JSON.stringify(design)), `${recipe.slug}: draft theme survived splitting`);
  for (const background of [design.paper, design.soft]) {
    for (const color of [design.ink, design.muted, design.accent]) assert.ok(contrast(color, background) >= 4.5, `${recipe.slug}: readable text contrast`);
  }
  assert.equal(compact(scenes.map((scene) => scene.text).join("")), compact(drafts.map((scene) => scene.text).join("")), `${recipe.slug}: text preserved`);
  assert.ok(scenes.every((scene) => scene.text.length <= 145));
  assert.ok(scenes.filter((scene) => scene.kind === "sources").every((scene) => !scene.narration));
  for (const source of frames.flatMap((frame) => frame.sources ?? [])) assert.ok(scriptFor(drafts).includes(source.url));
  const story = draftFromFrames(frames, true);
  assert.ok(story.every((scene) => ["cover", "culture", "sources"].includes(scene.kind)));
  const timed = buildTimeline(scenes);
  for (let i = 1; i < timed.length; i++) assert.equal(timed[i].start, timed[i - 1].start + timed[i - 1].duration);
}
for (const text of ["중심 온도 63°C 이상, 3분 휴지. 71.1°C는 다른 기준입니다. ".repeat(20), "한".repeat(500), "🥘".repeat(150)]) {
  const parts = splitSceneText(text);
  assert.equal(compact(parts.join("")), compact(text));
  assert.ok(parts.every((part) => part.length <= 145));
  assert.ok(parts.every((part) => !/[\uD800-\uDBFF]$/.test(part)));
}
const spoken = "돼지고기는 중심 온도 63°C 이상에 도달한 뒤, 최소 3분간 휴지합니다.";
const characters = Array.from(spoken);
const alignment = { characters, character_start_times_seconds: characters.map((_, i) => i * 0.1), character_end_times_seconds: characters.map((_, i) => (i + 1) * 0.1) };
const duration = characters.length * 0.1;
const aligned = captionsFor(spoken, duration, alignment);
assert.equal(aligned.estimated, false);
assert.equal(compact(aligned.captions.map((caption) => caption.text).join("")), compact(spoken));
assert.ok(aligned.captions.every((caption, i) => caption.start >= 0 && caption.end <= duration && (i === 0 || caption.start >= aligned.captions[i - 1].end)));
for (const bad of [null, {}, { characters: [] }, { ...alignment, character_end_times_seconds: [] }, { ...alignment, character_start_times_seconds: characters.map(() => -1) }]) assert.equal(captionsFor(spoken, duration, bad).estimated, true);
const scenes = buildScenes([{ id: "test", title: "안전하게 굽기", section: "조리법", text: spoken, kind: "step" }, { id: "source", title: "출처", section: "참고 자료", text: "", kind: "sources" }]);
const timeline = buildTimeline(scenes, new Map([[spoken, { buffer: { duration }, ...aligned }]]));
assert.equal(timeline[0].captions[0].start, VOICE_LEAD);
assert.equal(timeline[0].duration, duration + 1);
assert.equal(timelineDuration(timeline), duration + 8);
assert.ok(srtFor(timeline).startsWith("1\n00:00:00,500 -->"));
assert.ok(srtFor(timeline).includes("63°C"));
// A changed script must not accidentally reuse audio from the previous text.
assert.equal(buildTimeline([{ ...scenes[0], narration: "수정한 내용" }], new Map([[spoken, { buffer: { duration }, ...aligned }]]))[0].clip, undefined);

// Compare actual drawing commands: captions disappear without dropping recipe text,
// timing, or SRT; high resolution redraws use the same composition and no bitmap scaling.
const captionText = timeline[0].captions[0].text;
function drawCalls(width, height, showCaptions, sceneTimeline = timeline) {
  const calls = [];
  const ctx = {
    font: "", fillText: (...args) => calls.push(["text", ...args]),
    scale: (...args) => calls.push(["scale", ...args]),
    roundRect: (...args) => calls.push(["caption-background", ...args]),
    measureText: (text) => ({ width: text.length * 12 }),
    fillRect: (...args) => calls.push(["background", ctx.fillStyle, ...args]),
    save() {}, restore() {}, translate() {}, beginPath() {}, arc() {}, stroke() {}, fill() {}, moveTo() {}, lineTo() {}, closePath() {},
  };
  drawVideoFrame({ width, height, getContext: () => ctx }, sceneTimeline, VOICE_LEAD + 0.1, { animate: false, showCaptions });
  return calls;
}
for (const [resolution, width, height] of [["1080p", 1920, 1080], ["1440p", 2560, 1440], ["4k", 3840, 2160]]) {
  assert.deepEqual(dimensions("landscape", resolution), { width, height });
  assert.deepEqual(dimensions("portrait", resolution), { width: height, height: width });
  for (const portrait of [false, true]) {
    const w = portrait ? height : width;
    const h = portrait ? width : height;
    const withCaptions = drawCalls(w, h, true);
    const withoutCaptions = drawCalls(w, h, false);
    assert.equal(withCaptions.filter((call) => call[0] === "caption-background").length, 1);
    assert.equal(withoutCaptions.filter((call) => call[0] === "caption-background").length, 0);
    assert.ok(withCaptions.some((call) => call[0] === "text" && call[1] === captionText));
    assert.ok(!withoutCaptions.some((call) => call[0] === "text" && call[1] === captionText));
    assert.ok(withoutCaptions.some((call) => call[0] === "text" && call[1] === spoken));
    assert.deepEqual(withoutCaptions[0], ["scale", height / 1080, height / 1080]);
    const baseline = drawCalls(portrait ? 1080 : 1920, portrait ? 1920 : 1080, false);
    assert.deepEqual(withoutCaptions.slice(1), baseline.slice(1), "Resolution must preserve layout and line breaks");
  }
}
assert.ok(VIDEO_QUALITIES["4k"].bitrate > VIDEO_QUALITIES["1440p"].bitrate && VIDEO_QUALITIES["1440p"].bitrate > VIDEO_QUALITIES["1080p"].bitrate);
assert.ok(srtFor(timeline).includes("63°C"), "Separate captions remain available");
for (const recipe of recipes) {
  const themedTimeline = buildTimeline(buildScenes(draftFromFrames(recipeFrames(recipe), false)));
  for (const [width, height] of [[3840, 2160], [2160, 3840]]) {
    const calls = drawCalls(width, height, false, themedTimeline);
    assert.equal(calls.find((call) => call[0] === "background")[1], getRecipeDesign(recipe).soft, `${recipe.slug}: native 4K uses this recipe's palette`);
  }
}
assert.ok(new Set(recipes.map((recipe) => getRecipeDesign(recipe).soft)).size >= 12, "Keep distinct food palettes");

const route = load("../app/api/video/narration/route.ts");
const originalFetch = globalThis.fetch;
const names = ["OPENAI_API_KEY", "ELEVENLABS_API_KEY", "ELEVENLABS_VOICE_ID", "VIDEO_STUDIO_PASSWORD"];
const originalEnv = Object.fromEntries(names.map((name) => [name, process.env[name]]));
let requests = 0;
const password = "only-a-local-test-password";
const request = (body, headers = {}) => new Request("https://example.test/api/video/narration", { method: "POST", headers: { origin: "https://example.test", "content-type": "application/json", "x-studio-password": password, ...headers }, body: typeof body === "string" ? body : JSON.stringify(body) });
try {
  for (const name of names) delete process.env[name];
  assert.equal((await (await route.GET()).json()).ready, false);
  assert.equal((await route.POST(request({ text: spoken }))).status, 503);
  process.env.ELEVENLABS_API_KEY = "local-test-key";
  process.env.ELEVENLABS_VOICE_ID = "local-test-voice";
  process.env.VIDEO_STUDIO_PASSWORD = password;
  assert.equal((await (await route.GET()).json()).ready, true);
  globalThis.fetch = async (url, options) => {
    requests++;
    assert.equal(url, "https://api.elevenlabs.io/v1/text-to-speech/local-test-voice/with-timestamps?output_format=mp3_44100_128");
    assert.equal(options.headers["xi-api-key"], "local-test-key");
    assert.equal(JSON.parse(options.body).model_id, "eleven_multilingual_v2");
    assert.equal(JSON.parse(options.body).text, spoken);
    return Response.json({ audio_base64: "YXVkaW8=", alignment });
  };
  assert.equal((await route.POST(request({ text: spoken }, { "x-studio-password": "bad" }))).status, 401);
  assert.equal((await route.POST(request({ text: spoken }, { origin: "https://elsewhere.test" }))).status, 403);
  assert.equal((await route.POST(request({ text: "a".repeat(701) }))).status, 400);
  assert.equal((await route.POST(request("not json"))).status, 400);
  assert.equal((await route.POST(request("x".repeat(8193)))).status, 413);
  assert.equal(requests, 0, "Rejected requests must never consume paid voice calls");
  const response = await route.POST(request({ text: spoken }));
  assert.equal(response.status, 200);
  const data = await response.json();
  assert.equal(data.audio_base64, "YXVkaW8=");
  assert.equal(JSON.stringify(data).includes("local-test-key"), false);
  assert.equal(requests, 1);
  globalThis.fetch = async () => { requests++; return new Response("provider-secret-error", { status: 429 }); };
  const failure = await route.POST(request({ text: spoken }));
  assert.equal(failure.status, 502);
  assert.equal((await failure.text()).includes("provider-secret-error"), false);
  assert.equal(requests, 2, "No automatic retries of billable requests");
} finally {
  globalThis.fetch = originalFetch;
  for (const name of names) {
    if (originalEnv[name] === undefined) delete process.env[name];
    else process.env[name] = originalEnv[name];
  }
}

// Exercise the actual OpenAI adapter and route with a scripted WebSocket peer.
// No real credentials or network calls are used, including error/abort cases.
const ws = load("ws");
const OriginalWebSocket = ws.WebSocket;
const { createOpenAINarration } = load("../lib/openai-narration.ts");
const testKey = "sk-local-test-key-that-is-not-a-real-key";
const pcm = Buffer.from([0, 0, 16, 0, 240, 255]);
let peerMode = "success";
const sockets = [];
class FakeWebSocket extends EventEmitter {
  constructor(url, options) {
    super();
    assert.equal(url, "wss://api.openai.com/v1/realtime?model=gpt-realtime-2.1-mini");
    assert.equal(options.headers.Authorization, `Bearer ${testKey}`);
    this.sent = [];
    this.terminated = false;
    sockets.push(this);
    queueMicrotask(() => {
      if (peerMode === "unauthorized") this.emit("unexpected-response", {}, { statusCode: 401, resume() {} });
      else if (peerMode === "close") this.emit("close");
      else if (peerMode === "malformed") this.emit("message", Buffer.from("not json"));
      else this.event({ type: "session.created" });
    });
  }
  event(value) { this.emit("message", Buffer.from(JSON.stringify(value))); }
  send(value) {
    const message = JSON.parse(value);
    this.sent.push(message);
    queueMicrotask(() => {
      if (message.type === "session.update") {
        this.event({ type: "session.updated" });
        this.event({ type: "session.updated" }); // Never bill twice on repeated acknowledgments.
      } else if (peerMode === "quota") this.event({ type: "error", error: { code: "insufficient_quota", message: "private-provider-error" } });
      else if (peerMode === "access") this.event({ type: "error", error: { code: "model_not_found" } });
      else if (peerMode !== "wait") {
        if (peerMode === "oversize") {
          for (let i = 0; i < 5; i++) this.event({ type: "response.output_audio.delta", delta: Buffer.alloc(600000).toString("base64") });
        } else if (peerMode !== "empty") {
          this.event({ type: "response.output_audio.delta", delta: pcm.subarray(0, 2).toString("base64") });
          this.event({ type: "response.output_audio.delta", delta: (peerMode === "odd" ? Buffer.from([1]) : pcm.subarray(2)).toString("base64") });
        }
        this.event({ type: "response.done", response: { status: peerMode === "incomplete" ? "incomplete" : "completed" } });
      }
    });
  }
  terminate() { this.terminated = true; }
}
try {
  ws.WebSocket = FakeWebSocket;
  for (const name of names) delete process.env[name];
  process.env.OPENAI_API_KEY = "key_tracking-id-is-not-a-secret";
  process.env.VIDEO_STUDIO_PASSWORD = password;
  assert.deepEqual(await (await route.GET()).json(), { ready: false, provider: null, issue: "api-key" });
  assert.equal((await route.POST(request({ text: spoken }))).status, 503);
  process.env.OPENAI_API_KEY = testKey;
  delete process.env.VIDEO_STUDIO_PASSWORD;
  assert.deepEqual(await (await route.GET()).json(), { ready: false, provider: "OpenAI", issue: "studio-password" });
  process.env.VIDEO_STUDIO_PASSWORD = password;
  process.env.ELEVENLABS_API_KEY = "legacy-key";
  process.env.ELEVENLABS_VOICE_ID = "legacy-voice";
  const config = await route.GET();
  assert.equal(config.headers.get("cache-control"), "no-store");
  assert.deepEqual(await config.json(), { ready: true, provider: "OpenAI", issue: null });
  assert.equal((await route.POST(request({ text: spoken }, { "x-studio-password": "bad" }))).status, 401);
  assert.equal((await route.POST(request({ text: spoken }, { origin: "https://elsewhere.test" }))).status, 403);
  assert.equal((await route.POST(request({ text: "a".repeat(701) }))).status, 400);
  assert.equal((await route.POST(request("x".repeat(8193)))).status, 413);
  assert.equal(sockets.length, 0, "Reject invalid inputs before any billable session");
  const response = await route.POST(request({ text: spoken }));
  assert.equal(response.status, 200);
  const data = await response.json();
  assert.equal(data.alignment, null, "Realtime has no character timestamps; captions use the marked estimate");
  assert.equal(JSON.stringify(data).includes(testKey), false);
  const audio = Buffer.from(data.audio_base64, "base64");
  assert.equal(audio.toString("ascii", 0, 4), "RIFF");
  assert.equal(audio.readUInt32LE(4), audio.length - 8);
  assert.equal(audio.toString("ascii", 8, 16), "WAVEfmt ");
  assert.equal(audio.readUInt16LE(20), 1);
  assert.equal(audio.readUInt16LE(22), 1);
  assert.equal(audio.readUInt32LE(24), 24000);
  assert.equal(audio.readUInt16LE(34), 16);
  assert.equal(audio.readUInt32LE(40), pcm.length);
  assert.deepEqual(audio.subarray(44), pcm, "Stream chunks must stay in order and intact");
  assert.equal(sockets[0].sent.length, 2);
  assert.deepEqual(sockets[0].sent[0].session.audio.output, { format: { type: "audio/pcm", rate: 24000 }, voice: "marin" });
  assert.match(sockets[0].sent[0].session.instructions, /한국어/);
  assert.equal(sockets[0].sent[1].response.conversation, "none");
  assert.ok(sockets[0].sent[1].response.input[0].content[0].text.endsWith(spoken), "Keep temperature, timing and safety wording in the input");
  for (const mode of ["unauthorized", "quota", "access", "incomplete", "empty", "odd", "oversize", "close", "malformed"]) {
    peerMode = mode;
    const before = sockets.length;
    const failed = await route.POST(request({ text: spoken }));
    assert.equal(failed.status, 502, mode);
    const body = await failed.text();
    assert.ok(!body.includes(testKey) && !body.includes("private-provider-error"));
    assert.equal(sockets.length, before + 1, "Do not retry or fall back to another paid provider");
  }
  peerMode = "wait";
  const controller = new AbortController();
  const pending = createOpenAINarration(spoken, testKey, controller.signal);
  controller.abort();
  await assert.rejects(pending, (error) => error.kind === "interrupted");
  const before = sockets.length;
  await assert.rejects(createOpenAINarration(spoken, testKey, controller.signal), (error) => error.kind === "interrupted");
  assert.equal(sockets.length, before, "Already-aborted requests must not connect");
  assert.ok(sockets.every((socket) => socket.terminated), "Always close billable sessions after success or failure");
} finally {
  ws.WebSocket = OriginalWebSocket;
  for (const name of names) {
    if (originalEnv[name] === undefined) delete process.env[name];
    else process.env[name] = originalEnv[name];
  }
}
console.log(`PASS: ${recipes.length} recipe scripts, intact safety text, captions on/off, 1080p/1440p/4K layouts, timeline/SRT, OpenAI PCM/WAV narration, provider failures/abort, API authentication and bounded requests.`);
