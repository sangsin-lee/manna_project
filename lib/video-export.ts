import { drawVideoFrame } from "./video-canvas";
import { dimensions, MAX_DURATION, timelineDuration, VOICE_LEAD, type TimedScene, type VideoFormat } from "./video-project";

export async function renderVideo(timeline: TimedScene[], format: VideoFormat, withVoice: boolean, signal: AbortSignal, onProgress: (value: number, format: string) => void) {
  const duration = timelineDuration(timeline);
  if (!duration || duration > MAX_DURATION) throw new Error("영상 길이는 10분 이내로 구성해 주세요.");
  if (withVoice && timeline.some((scene) => scene.narration && !scene.clip)) throw new Error("모든 장면의 음성을 먼저 완성해 주세요.");
  if (!globalThis.VideoEncoder) throw new Error("이 브라우저는 영상 저장을 지원하지 않습니다. 최신 Chrome 또는 Edge에서 제작실을 열어 주세요.");
  const media = await import("mediabunny");
  const { width, height } = dimensions(format);
  const frameRate = 30;
  const quality = new media.Quality({ bitrate: 5_000_000 });
  const audioOptions = { numberOfChannels: 1, sampleRate: 44100 };
  const mp4 = await media.canEncodeVideo("avc", { width, height, frameRate, quality }) && (!withVoice || await media.canEncodeAudio("aac", audioOptions));
  if (!mp4 && !(await media.canEncodeVideo("vp9", { width, height, frameRate, quality }) && (!withVoice || await media.canEncodeAudio("opus", audioOptions)))) {
    throw new Error("영상 저장 형식이 지원되지 않습니다. 최신 Chrome 또는 Edge에서 다시 시도해 주세요.");
  }
  signal.throwIfAborted();
  const extension = mp4 ? "mp4" : "webm";
  const target = new media.BufferTarget();
  const output = new media.Output({ target, format: mp4 ? new media.Mp4OutputFormat({ fastStart: "in-memory" }) : new media.WebMOutputFormat() });
  const canvas = document.createElement("canvas");
  canvas.width = width; canvas.height = height;
  const video = new media.CanvasSource(canvas, { codec: mp4 ? "avc" : "vp9", quality });
  output.addVideoTrack(video, { frameRate });
  const audio = withVoice ? new media.AudioBufferSource({ codec: mp4 ? "aac" : "opus", quality: new media.Quality({ bitrate: 128000 }) }) : null;
  if (audio) output.addAudioTrack(audio);
  let audioTask: Promise<void> | undefined;
  try {
    onProgress(0, extension.toUpperCase());
    let mixed: AudioBuffer | undefined;
    if (audio) {
      const offline = new OfflineAudioContext(1, Math.ceil(duration * 44100), 44100);
      for (const scene of timeline) {
        if (!scene.clip) continue;
        const source = offline.createBufferSource();
        source.buffer = scene.clip.buffer;
        source.connect(offline.destination);
        source.start(scene.start + VOICE_LEAD);
      }
      mixed = await offline.startRendering();
    }
    signal.throwIfAborted();
    await output.start();
    // Feed tracks concurrently so the muxer can apply backpressure without deadlock.
    if (audio && mixed) { audioTask = audio.add(mixed).then(() => { audio.close(); }); audioTask.catch(() => {}); }
    const frameCount = Math.ceil(duration * frameRate);
    for (let frame = 0; frame < frameCount; frame++) {
      signal.throwIfAborted();
      drawVideoFrame(canvas, timeline, frame / frameRate);
      await video.add(frame / frameRate, Math.min(1 / frameRate, duration - frame / frameRate));
      if (frame % 15 === 0) {
        onProgress(Math.round(frame / frameCount * 98), extension.toUpperCase());
        await new Promise((resolve) => setTimeout(resolve, 0));
      }
    }
    video.close();
    await audioTask;
    signal.throwIfAborted();
    await output.finalize();
    signal.throwIfAborted();
    if (!target.buffer) throw new Error("영상 파일을 만들지 못했습니다.");
    onProgress(100, extension.toUpperCase());
    return { blob: new Blob([target.buffer], { type: mp4 ? "video/mp4" : "video/webm" }), extension };
  } catch (error) {
    if (output.state !== "finalized" && output.state !== "canceled") await output.cancel();
    await audioTask?.catch(() => {});
    throw error;
  } finally {
    canvas.width = 0; canvas.height = 0;
  }
}
