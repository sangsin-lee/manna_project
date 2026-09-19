"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { PresentationFrame } from "@/lib/presentation";
import { buildScenes, buildTimeline, captionsFor, dimensions, draftFromFrames, MAX_DURATION, scriptFor, srtFor, timelineDuration, VIDEO_QUALITIES, VOICE_LEAD, type DraftScene, type VideoFormat, type VideoResolution, type VoiceClip } from "@/lib/video-project";
import { drawVideoFrame } from "@/lib/video-canvas";
import { defaultRecipeDesign, recipeDesignStyle } from "@/lib/recipe-design";

type RecipeOption = { slug: string; title: string; frames: PresentationFrame[] };
const clock = (seconds: number) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;

function downloadText(text: string, filename: string) {
  const url = URL.createObjectURL(new Blob(["\uFEFF", text], { type: "text/plain;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url; link.download = filename; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function VideoStudio({ recipes, initialRecipe }: { recipes: RecipeOption[]; initialRecipe: string }) {
  const initial = recipes.find((recipe) => recipe.slug === initialRecipe)!;
  const [recipeSlug, setRecipeSlug] = useState(initialRecipe);
  const [storyOnly, setStoryOnly] = useState(true);
  const [drafts, setDrafts] = useState(() => draftFromFrames(initial.frames, true));
  const [selected, setSelected] = useState(0);
  const [format, setFormat] = useState<VideoFormat>("landscape");
  const [resolution, setResolution] = useState<VideoResolution>("4k");
  const [showCaptions, setShowCaptions] = useState(true);
  const [voices, setVoices] = useState<ReadonlyMap<string, VoiceClip>>(new Map());
  const [ready, setReady] = useState<boolean | null>(null);
  const [connectionError, setConnectionError] = useState(false);
  const [password, setPassword] = useState("");
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [busy, setBusy] = useState<"voice" | "render" | null>(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{ url: string; extension: string; withVoice: boolean; resolution: VideoResolution; showCaptions: boolean } | null>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const abort = useRef<AbortController | null>(null);
  const stopPlayback = useRef<(() => void) | null>(null);
  const scenes = useMemo(() => buildScenes(drafts), [drafts]);
  const timeline = useMemo(() => buildTimeline(scenes, voices), [scenes, voices]);
  const duration = timelineDuration(timeline);
  const size = dimensions(format);
  const exportSize = dimensions(format, resolution);
  const narrations = [...new Set(scenes.map((scene) => scene.narration).filter(Boolean))];
  const voiced = narrations.filter((text) => voices.has(text)).length;
  const allVoiced = narrations.length > 0 && voiced === narrations.length;
  const hasEstimated = timeline.some((scene) => scene.narration && (!scene.clip || scene.clip.estimated));
  const draft = drafts[selected];
  const design = drafts[0]?.design ?? defaultRecipeDesign;
  const valid = drafts.length > 0 && drafts.every((item) => item.title.trim() && (item.text.trim() || item.kind === "cover" || item.kind === "sources")) && duration <= MAX_DURATION;

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/video/narration", { cache: "no-store", signal: controller.signal }).then((response) => {
      if (!response.ok) throw new Error("Connection check failed");
      return response.json();
    }).then((data) => setReady(data.ready === true)).catch(() => { if (!controller.signal.aborted) setConnectionError(true); });
    return () => controller.abort();
  }, []);
  useEffect(() => {
    if (canvas.current) drawVideoFrame(canvas.current, timeline, Math.min(time, Math.max(0, duration - 0.001)), { animate: playing, showCaptions });
  }, [timeline, time, duration, format, playing, showCaptions]);
  useEffect(() => () => { stopPlayback.current?.(); abort.current?.abort(); }, []);
  useEffect(() => () => { if (result) URL.revokeObjectURL(result.url); }, [result]);

  function pause() { stopPlayback.current?.(); stopPlayback.current = null; setPlaying(false); }
  function invalidate() { pause(); setResult(null); setError(""); setStatus(""); setTime(0); }
  function changeOutput() { pause(); setResult(null); setError(""); setStatus(""); }
  function loadRecipe() {
    const recipe = recipes.find((item) => item.slug === recipeSlug)!;
    invalidate(); setDrafts(draftFromFrames(recipe.frames, storyOnly)); setSelected(0); setVoices(new Map());
  }
  function updateDraft(update: Partial<DraftScene>) {
    const next = drafts.map((item, i) => i === selected ? { ...item, ...update } : item);
    invalidate(); setDrafts(next);
    setTime(buildTimeline(buildScenes(next), voices).find((item) => item.id.startsWith(`${draft.id}-`))?.start ?? 0);
  }
  function selectScene(index: number) {
    pause(); setSelected(index);
    setTime(timeline.find((item) => item.id.startsWith(`${drafts[index].id}-`))?.start ?? 0);
  }
  async function preview() {
    if (playing) { pause(); return; }
    setError("");
    const startAt = time >= duration - 0.05 ? 0 : time;
    let context: AudioContext | undefined;
    try {
      if (voiced) { context = new AudioContext(); await context.resume(); }
      const sounds: AudioBufferSourceNode[] = [];
      for (const scene of timeline) {
        if (!context || !scene.clip) continue;
        const audioStart = scene.start + VOICE_LEAD;
        const offset = Math.max(0, startAt - audioStart);
        if (offset >= scene.clip.buffer.duration) continue;
        const source = context.createBufferSource(); source.buffer = scene.clip.buffer; source.connect(context.destination);
        source.start(context.currentTime + Math.max(0, audioStart - startAt), offset);
        sounds.push(source);
      }
      let frame = 0;
      const origin = context?.currentTime ?? performance.now() / 1000;
      stopPlayback.current = () => {
        cancelAnimationFrame(frame);
        sounds.forEach((sound) => { try { sound.stop(); } catch { /* Already finished. */ } });
        if (context) void context.close();
      };
      const tick = () => {
        const next = startAt + (context?.currentTime ?? performance.now() / 1000) - origin;
        setTime(Math.min(next, duration - 0.001));
        if (next >= duration) { pause(); return; }
        frame = requestAnimationFrame(tick);
      };
      setPlaying(true); frame = requestAnimationFrame(tick);
    } catch { if (context) void context.close(); setError("미리 듣기를 시작하지 못했습니다. 다시 재생해 주세요."); }
  }

  async function generateVoice() {
    pause(); setError(""); setResult(null); setBusy("voice"); setProgress(0);
    const controller = new AbortController(); abort.current = controller;
    const cache = new Map(voices);
    let context: AudioContext | undefined;
    try {
      context = new AudioContext();
      const missing = narrations.filter((text) => !cache.has(text));
      for (let i = 0; i < missing.length; i++) {
        controller.signal.throwIfAborted();
        setStatus(`한국어 내레이션을 만드는 중 · ${i + 1} / ${missing.length}`);
        const response = await fetch("/api/video/narration", {
          method: "POST", headers: { "Content-Type": "application/json", "X-Studio-Password": password },
          body: JSON.stringify({ text: missing[i] }), signal: controller.signal,
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "음성을 만들지 못했습니다.");
        const bytes = Uint8Array.from(atob(data.audio_base64), (char) => char.charCodeAt(0));
        const buffer = await context.decodeAudioData(bytes.buffer);
        if (buffer.duration > 180) throw new Error("음성이 너무 깁니다. 대본을 짧게 나누어 주세요.");
        cache.set(missing[i], { buffer, ...captionsFor(missing[i], buffer.duration, data.alignment) });
        setVoices(new Map(cache)); setProgress(Math.round((i + 1) / missing.length * 100));
      }
      controller.signal.throwIfAborted();
      setTime(0); setStatus("내레이션이 완성됐어요. 재생해서 목소리와 자막을 확인해 주세요.");
    } catch (cause) {
      if (controller.signal.aborted) setStatus("음성 생성을 중단했어요. 완성된 장면은 보관합니다.");
      else { setStatus(""); setError(cause instanceof Error ? cause.message : "음성을 만들지 못했습니다."); }
    } finally { if (context) void context.close(); setBusy(null); abort.current = null; }
  }

  async function exportVideo(withVoice: boolean) {
    pause(); setError(""); setResult(null); setBusy("render"); setProgress(0);
    const controller = new AbortController(); abort.current = controller;
    try {
      const { renderVideo } = await import("@/lib/video-export");
      const exported = await renderVideo(timeline, { format, resolution, withVoice, showCaptions }, controller.signal, (percent, type) => {
        setProgress(percent); setStatus(`${VIDEO_QUALITIES[resolution].label} ${type} 영상 만드는 중 · ${percent}%`);
      });
      setResult({ url: URL.createObjectURL(exported.blob), extension: exported.extension, withVoice, resolution, showCaptions });
      setStatus(`${VIDEO_QUALITIES[resolution].label} ${withVoice ? "내레이션" : "무음"} 영상이 완성됐어요. ${showCaptions ? "하단 자막 포함" : "하단 자막 없음"}.${exported.extension === "webm" ? " 이 브라우저에서는 WebM으로 저장됩니다." : ""}`);
    } catch (cause) {
      setStatus(controller.signal.aborted ? "영상 만들기를 중단했어요. 대본은 그대로 남아 있습니다." : "");
      if (!controller.signal.aborted) setError(cause instanceof Error ? cause.message : "영상을 만들지 못했습니다.");
    } finally { setBusy(null); abort.current = null; }
  }

  return (
    <main className="video-studio" style={recipeDesignStyle(design)} data-pattern={design.pattern}>
      <header className="studio-heading">
        <Link href="/videos" className="studio-back">← 영상 이야기</Link>
        <div className="studio-title-row"><div><p className="studio-eyebrow">MANNA TABLE / FILM STUDIO</p><h1>한 편의 식탁 이야기.</h1><p>글을 다듬고, 목소리를 입히고, 영상으로 간직하세요.</p></div><span className="studio-badge">최대 4K · 자막 선택 · 부드러운 장면 전환</span></div>
      </header>
      <div className="studio-layout">
        <section className="studio-editor" aria-label="영상 대본 편집">
          <fieldset disabled={busy !== null}>
            <div className="studio-section-heading"><span>01</span><h2>이야기 준비하기</h2></div>
            <label htmlFor="studio-recipe">레시피 선택</label>
            <select id="studio-recipe" value={recipeSlug} onChange={(event) => setRecipeSlug(event.target.value)}>{recipes.map((recipe) => <option key={recipe.slug} value={recipe.slug}>{recipe.title}</option>)}</select>
            <label htmlFor="studio-preset">영상 구성</label>
            <select id="studio-preset" value={storyOnly ? "story" : "recipe"} onChange={(event) => setStoryOnly(event.target.value === "story")}><option value="story">식문화 이야기 · 유래, 문화, 맛</option><option value="recipe">전체 레시피 · 이야기부터 조리법까지</option></select>
            <button className="studio-outline studio-wide" onClick={loadRecipe}>선택한 구성으로 대본 불러오기</button>
            <p className="studio-help">불러오면 현재 대본을 교체합니다. 수정한 글은 먼저 아래에서 저장해 주세요.</p>
            <div className="studio-divider" />
            <div className="studio-section-heading"><span>02</span><h2>장면과 대본 다듬기</h2><small>{drafts.length}장</small></div>
            <div className="studio-scene-list" aria-label="편집할 장면 선택">{drafts.map((item, i) => <button key={item.id} className={selected === i ? "is-selected" : ""} aria-pressed={selected === i} onClick={() => selectScene(i)}><span>{String(i + 1).padStart(2, "0")}</span><span>{item.title}</span>{item.kind === "sources" && <small>출처</small>}</button>)}</div>
            {draft && <div className="studio-scene-editor">
              <label htmlFor="scene-title">장면 제목</label><input id="scene-title" maxLength={90} value={draft.title} onChange={(event) => updateDraft({ title: event.target.value })} />
              {draft.kind === "sources" ? <p className="studio-help">참고 자료는 마지막 화면에 표시됩니다. 원문 링크는 대본 파일에 함께 저장됩니다.</p> : <><label htmlFor="scene-text">화면에 보일 글 · 내레이션 대본</label><textarea id="scene-text" rows={7} maxLength={3000} value={draft.text} onChange={(event) => updateDraft({ text: event.target.value })} /><p className="studio-help">긴 글은 읽기 편한 여러 화면으로 자동 분할합니다. 표지는 제목도 함께 읽습니다.</p></>}
              <div className="studio-inline-actions"><button className="studio-text-button" onClick={() => { invalidate(); const next = { id: `custom-${Date.now()}`, section: "식탁 이야기", title: "새로운 이야기", text: "이곳에 들려주고 싶은 이야기를 적어 주세요.", kind: "culture" as const, design }; setDrafts([...drafts.slice(0, selected + 1), next, ...drafts.slice(selected + 1)]); setSelected(selected + 1); }} disabled={drafts.length >= 100}>+ 다음 장면 추가</button><button className="studio-text-button" disabled={drafts.length <= 1} onClick={() => { invalidate(); setDrafts(drafts.filter((_, i) => i !== selected)); setSelected(Math.max(0, selected - 1)); }}>이 장면 삭제</button></div>
            </div>}
            <button className="studio-outline studio-wide" onClick={() => downloadText(scriptFor(drafts), "manna-script.txt")}>대본과 출처 저장 .txt</button>
          </fieldset>
        </section>
        <div className="studio-workspace">
          <section className="studio-preview-panel" aria-label="영상 미리 보기">
            <div className="studio-preview-heading"><div><p className="studio-eyebrow">YOUR STORY, ON SCREEN</p><h2>이렇게 담깁니다.</h2></div><div className="studio-format" aria-label="화면 비율">{(["landscape", "portrait"] as const).map((value) => <button key={value} disabled={busy !== null} aria-pressed={format === value} onClick={() => { changeOutput(); setFormat(value); }}>{value === "landscape" ? "가로 16:9" : "세로 9:16"}</button>)}</div></div>
            <fieldset className="studio-output-settings" disabled={busy !== null}>
              <legend className="sr-only">영상 저장 설정</legend>
              <div><label htmlFor="studio-resolution">저장 화질</label><select id="studio-resolution" value={resolution} onChange={(event) => { changeOutput(); setResolution(event.target.value as VideoResolution); }}>{(Object.keys(VIDEO_QUALITIES) as VideoResolution[]).map((value) => <option key={value} value={value}>{VIDEO_QUALITIES[value].label}{value === "4k" ? " · 최고 화질" : ""}</option>)}</select><p className="studio-help">{exportSize.width} × {exportSize.height} · 30fps</p></div>
              <div><label htmlFor="studio-captions">하단 자막</label><select id="studio-captions" value={showCaptions ? "on" : "off"} onChange={(event) => { changeOutput(); setShowCaptions(event.target.value === "on"); }}><option value="on">자막 포함</option><option value="off">자막 없이</option></select><p className="studio-help">제목과 레시피 본문은 그대로 보여요.</p></div>
            </fieldset>
            <p className="studio-theme-note"><strong>{design.place}</strong><span>{design.caption}</span></p>
            <div className={`studio-canvas-wrap ${format}`}><canvas ref={canvas} width={size.width} height={size.height} aria-label="식문화 영상 미리 보기">대본을 영상으로 보여주는 미리 보기입니다.</canvas></div>
            <div className="studio-playback"><button className="studio-play" disabled={busy !== null || !valid} onClick={preview}>{playing ? "일시 정지" : "▶ 재생"}</button><input aria-label="영상 재생 위치" type="range" min={0} max={Math.max(0.001, duration - 0.001)} step={0.05} value={Math.min(time, Math.max(0.001, duration - 0.001))} disabled={busy !== null} onChange={(event) => { pause(); setTime(Number(event.target.value)); }} /><span>{clock(time)} / {clock(duration)}</span></div>
            <p className="studio-preview-note">{scenes.length}개 화면 · {voiced ? `내레이션 ${voiced}/${narrations.length} 완성` : "현재 무음 미리 보기"}{!allVoiced && voiced > 0 ? " · 미완성 장면은 무음" : ""} · {showCaptions ? hasEstimated ? "자막 시간 추정" : "음성에 맞춘 자막" : "하단 자막 없음"}</p>
          </section>
          <section className="studio-produce" aria-label="음성과 영상 만들기">
            <div className="studio-section-heading"><span>03</span><h2>목소리를 입혀 완성하기</h2><small className={ready ? "studio-connected" : ""}>{ready ? "AI 음성 연결됨" : connectionError ? "연결 확인 실패" : ready === null ? "연결 확인 중" : "AI 음성 연결 전"}</small></div>
            {ready ? <div className="studio-voice-row"><div><label htmlFor="studio-password">제작실 비밀번호</label><input type="password" id="studio-password" autoComplete="off" maxLength={256} placeholder="운영자에게 받은 비밀번호" value={password} disabled={busy !== null} onChange={(event) => setPassword(event.target.value)} /></div><button className="studio-outline" disabled={busy !== null || !password || allVoiced || !valid} onClick={generateVoice}>{allVoiced ? "내레이션 완성" : voiced ? "남은 내레이션 만들기" : "AI 내레이션 만들기"}</button></div> : <p className="studio-connection-note">{connectionError ? "음성 연결 상태를 확인하지 못했어요. 대본을 저장한 뒤 새로고침해 주세요. 무음 영상은 계속 만들 수 있습니다." : ready === null ? "음성 서비스 연결을 확인하고 있어요." : "AI 음성 서비스를 연결하면 한국어 내레이션을 만들 수 있어요. 지금도 대본 편집, 미리 보기, 자막과 무음 영상 저장은 가능합니다."}</p>}
            {ready && <p className="studio-help">음성 생성은 ElevenLabs 계정의 사용량을 소모합니다. 완성된 음성은 이 탭에서 재사용하며, 새로고침하면 사라집니다. 유튜브 수익화 등 상업적 사용은 음성 서비스의 이용 권한을 확인해 주세요.</p>}
            {!valid && <p className="studio-error" role="alert">제목과 대본을 채우고, 영상 길이를 10분 이내로 줄여 주세요.</p>}
            <div className="studio-export-actions"><button className="studio-primary" disabled={busy !== null || !allVoiced || !valid} onClick={() => exportVideo(true)}>음성 포함 영상 만들기 ↓</button><button className="studio-outline" disabled={busy !== null || !valid} onClick={() => exportVideo(false)}>무음 영상 만들기</button><button className="studio-text-button" disabled={busy !== null || !valid} onClick={() => downloadText(srtFor(timeline), "manna-captions.srt")}>자막 저장 .srt</button></div>
            <p className="studio-help">{VIDEO_QUALITIES[resolution].label} · {showCaptions ? "자막 포함" : "자막 없이"} 설정으로 저장합니다. 자막 파일은 별도로 저장할 수 있어요. MP4를 우선 사용하고, 지원하지 않는 브라우저는 WebM으로 저장합니다.{resolution !== "1080p" ? " 고화질은 제작 시간과 파일 크기가 늘어날 수 있어요." : ""} 영상이 완성될 때까지 이 탭을 열어 두세요.</p>
            {busy && <div className="studio-progress"><progress max={100} value={progress} aria-label="영상 제작 진행률" /><button className="studio-text-button" onClick={() => abort.current?.abort()}>중단</button></div>}
            <p className="studio-status" role="status" aria-live="polite">{status}</p>
            {error && <p className="studio-error" role="alert">{error}</p>}
            {result && <div className="studio-result"><div><strong>{VIDEO_QUALITIES[result.resolution].label} · {result.withVoice ? "내레이션" : "무음"} · {result.showCaptions ? "자막 포함" : "자막 없음"}</strong><a className="studio-primary" href={result.url} download={`manna-table-${result.resolution}${result.showCaptions ? "-captions" : "-no-captions"}.${result.extension}`}>{result.extension.toUpperCase()} 내려받기 ↓</a></div><video src={result.url} controls playsInline aria-label="완성된 영상 확인" /></div>}
          </section>
          <p className="studio-footnote">대본과 생성한 음성은 현재 탭에서 작업합니다. 창을 닫기 전에 대본·영상·자막 파일을 저장해 주세요.</p>
        </div>
      </div>
    </main>
  );
}
