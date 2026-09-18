import assert from "node:assert/strict";
import fs from "node:fs";
import ts from "typescript";
import { createRequire } from "node:module";
const load = createRequire(import.meta.url);
load.extensions[".ts"] = (module, filename) => {
  const { outputText } = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  });
  module._compile(outputText, filename);
};
const { recipes } = load("../lib/content.ts");
const { recipeFrames } = load("../lib/presentation.ts");
const { buildScenes, buildTimeline, captionsFor, draftFromFrames, scriptFor, splitSceneText, srtFor, timelineDuration, VOICE_LEAD } = load("../lib/video-project.ts");
const compact = (text) => text.replace(/\s/g, "");
for (const recipe of recipes) {
  const frames = recipeFrames(recipe);
  const drafts = draftFromFrames(frames, false);
  const scenes = buildScenes(drafts);
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

const route = load("../app/api/video/narration/route.ts");
const originalFetch = globalThis.fetch;
const names = ["ELEVENLABS_API_KEY", "ELEVENLABS_VOICE_ID", "VIDEO_STUDIO_PASSWORD"];
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
console.log(`PASS: ${recipes.length} recipe scripts, intact safety text, aligned/fallback captions, timeline offsets, SRT, API authentication and bounded requests.`);
