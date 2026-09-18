import type { PresentationFrame } from "./presentation";
import type { SourceLink } from "./content";

export type DraftScene = {
  id: string;
  section: string;
  title: string;
  text: string;
  kind: PresentationFrame["kind"];
  sources?: SourceLink[];
};
export type VideoScene = DraftScene & { narration: string };
export type Caption = { text: string; start: number; end: number };
export type Alignment = {
  characters: string[];
  character_start_times_seconds: number[];
  character_end_times_seconds: number[];
};
export type VoiceClip = {
  buffer: AudioBuffer;
  captions: Caption[];
  estimated: boolean;
};
export type TimedScene = VideoScene & {
  start: number;
  duration: number;
  captions: Caption[];
  clip?: VoiceClip;
};
export type VideoFormat = "landscape" | "portrait";
export const VIDEO_QUALITIES = {
  "1080p": { label: "1080p Full HD", width: 1920, height: 1080, bitrate: 8_000_000 },
  "1440p": { label: "1440p QHD", width: 2560, height: 1440, bitrate: 16_000_000 },
  "4k": { label: "4K UHD", width: 3840, height: 2160, bitrate: 40_000_000 },
} as const;
export type VideoResolution = keyof typeof VIDEO_QUALITIES;
export const VOICE_LEAD = 0.5;
export const MAX_DURATION = 600;

export function draftFromFrames(frames: PresentationFrame[], storyOnly: boolean): DraftScene[] {
  return frames.filter((frame) => !storyOnly || ["cover", "culture", "sources"].includes(frame.kind)).map((frame, i) => ({
    id: `recipe-${i}`, section: frame.section, title: frame.title, kind: frame.kind,
    text: frame.body ?? frame.items?.join("\n") ?? "", sources: frame.sources,
  }));
}

// Split without rewriting temperatures, names, or long words without spaces.
export function splitSceneText(text: string, limit = 145): string[] {
  const result: string[] = [];
  let rest = text.trim();
  while (rest.length > limit) {
    const boundary = rest.slice(0, limit + 1).search(/\s+\S*$/);
    let cut = boundary > limit / 2 ? boundary : limit;
    if (/[\uD800-\uDBFF]/.test(rest[cut - 1])) cut--;
    result.push(rest.slice(0, cut).trim());
    rest = rest.slice(cut).trim();
  }
  if (rest) result.push(rest);
  return result;
}

export function buildScenes(drafts: DraftScene[]): VideoScene[] {
  return drafts.flatMap((draft) => {
    const parts = splitSceneText(draft.text);
    return (parts.length ? parts : [""]).map((text, i) => ({
      ...draft, id: `${draft.id}-${i}`, text,
      narration: draft.kind === "sources" ? "" : draft.kind === "cover" ? `${draft.title}. ${text}`.trim() : text || draft.title,
    }));
  });
}

export function captionsFor(text: string, duration: number, alignment?: Alignment | null): { captions: Caption[]; estimated: boolean } {
  const chars = Array.from(text);
  const starts = alignment?.character_start_times_seconds;
  const ends = alignment?.character_end_times_seconds;
  const valid = Array.isArray(alignment?.characters) && alignment.characters.join("") === text && Array.isArray(starts) && Array.isArray(ends) && starts.length === chars.length && ends.length === chars.length &&
    starts.every((start, i) => Number.isFinite(start) && Number.isFinite(ends[i]) && start >= 0 && start <= ends[i] && ends[i] <= duration + 0.25 &&
      (i === 0 || (start >= starts[i - 1] && ends[i] >= ends[i - 1])));
  const captions: Caption[] = [];
  let begin = 0;
  for (let i = 0; i < chars.length; i++) {
    const count = i - begin + 1;
    if (i === chars.length - 1 || count >= 32 || (count >= 18 && /\s|[!?。]/.test(chars[i]))) {
      const value = chars.slice(begin, i + 1).join("").trim();
      const start = valid ? starts[begin] : duration * begin / chars.length;
      const end = valid ? Math.min(duration, ends[i]) : duration * (i + 1) / chars.length;
      if (value && end > start) captions.push({ text: value, start, end });
      begin = i + 1;
    }
  }
  return { captions, estimated: !valid };
}

export function buildTimeline(scenes: VideoScene[], voices: ReadonlyMap<string, VoiceClip> = new Map()): TimedScene[] {
  let start = 0;
  return scenes.map((scene) => {
    const clip = voices.get(scene.narration);
    const spoken = clip?.buffer.duration ?? Math.max(3, Array.from(scene.narration).length / 5.2);
    const duration = scene.kind === "sources" ? 7 : spoken + VOICE_LEAD + 0.5;
    const captions = scene.narration ? (clip?.captions ?? captionsFor(scene.narration, spoken).captions).map((caption) => ({
      ...caption, start: caption.start + start + VOICE_LEAD, end: caption.end + start + VOICE_LEAD,
    })) : [];
    const timed = { ...scene, start, duration, captions, clip };
    start += duration;
    return timed;
  });
}

export function timelineDuration(timeline: TimedScene[]): number {
  const last = timeline.at(-1);
  return last ? last.start + last.duration : 0;
}

export function srtFor(timeline: TimedScene[]): string {
  const stamp = (seconds: number) => {
    const ms = Math.round(seconds * 1000);
    return `${String(Math.floor(ms / 3600000)).padStart(2, "0")}:${String(Math.floor(ms / 60000) % 60).padStart(2, "0")}:${String(Math.floor(ms / 1000) % 60).padStart(2, "0")},${String(ms % 1000).padStart(3, "0")}`;
  };
  return timeline.flatMap((scene) => scene.captions).map((caption, i) => `${i + 1}\n${stamp(caption.start)} --> ${stamp(caption.end)}\n${caption.text}\n`).join("\n");
}

export function scriptFor(drafts: DraftScene[]): string {
  return drafts.map((scene) => `${scene.section} / ${scene.title}\n${scene.text}${scene.sources?.length ? "\n" + scene.sources.map((source) => `${source.label}\n${source.url}`).join("\n") : ""}`).join("\n\n");
}

export function dimensions(format: VideoFormat, resolution: VideoResolution = "1080p"): { width: number; height: number } {
  const { width, height } = VIDEO_QUALITIES[resolution];
  return format === "portrait" ? { width: height, height: width } : { width, height };
}
