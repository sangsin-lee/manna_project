import type { TimedScene } from "./video-project";

const fontFamily = '"Malgun Gothic", "Apple SD Gothic Neo", sans-serif';

export function wrapCanvasText(ctx: CanvasRenderingContext2D, text: string, width: number): string[] {
  const lines: string[] = [];
  for (const paragraph of text.split("\n")) {
    let line = "";
    for (const word of paragraph.split(/(\s+)/)) {
      if (line && ctx.measureText(line + word).width > width) {
        lines.push(line.trimEnd());
        line = "";
      }
      for (const char of Array.from(word)) {
        if (!line && /\s/.test(char)) continue;
        if (line && ctx.measureText(line + char).width > width) { lines.push(line.trimEnd()); line = ""; }
        line += char;
      }
    }
    if (line) lines.push(line.trimEnd());
  }
  return lines;
}

function textBlock(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, width: number, height: number, size: number, weight = 400, lineHeight = 1.5) {
  let lines: string[] = [];
  do {
    ctx.font = `${weight} ${size}px ${fontFamily}`;
    lines = wrapCanvasText(ctx, text, width);
    if (lines.length * size * lineHeight <= height) break;
    size -= 2;
  } while (size > 14);
  lines.forEach((line, i) => ctx.fillText(line, x, y + i * size * lineHeight));
}

function drawScene(ctx: CanvasRenderingContext2D, scene: TimedScene, width: number, height: number, offset = 0, opacity = 1) {
  const portrait = height > width;
  const dark = scene.kind === "cover" || scene.kind === "culture";
  const pad = portrait ? 94 : 130;
  const contentWidth = width - pad * 2;
  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.translate(offset, 0);
  ctx.fillStyle = dark ? "#243d2d" : "#f5f2e9";
  ctx.fillRect(-Math.abs(offset), 0, width + Math.abs(offset) * 2, height);
  ctx.strokeStyle = dark ? "#6e7f65" : "#c1c9b7";
  ctx.lineWidth = 2;
  ctx.globalAlpha = opacity * 0.25;
  for (const radius of [230, 270, 310]) {
    ctx.beginPath(); ctx.arc(width - 50, height * 0.46, radius, 0, Math.PI * 2); ctx.stroke();
  }
  ctx.globalAlpha = opacity;
  ctx.fillStyle = dark ? "#b7c9a2" : "#677c55";
  ctx.font = `600 24px ${fontFamily}`;
  ctx.fillText("MANNA TABLE  /  만나의 식탁", pad, portrait ? 110 : 90);
  ctx.fillStyle = dark ? "#e3bb79" : "#a15330";
  ctx.font = `600 ${portrait ? 30 : 26}px ${fontFamily}`;
  ctx.fillText(scene.section, pad, portrait ? 265 : 210);
  ctx.fillStyle = dark ? "#fcf8eb" : "#253b2f";
  textBlock(ctx, scene.title, pad, portrait ? 355 : 290, contentWidth, portrait ? 310 : 200, portrait ? 88 : 84, 700, 1.25);
  ctx.fillStyle = dark ? "#e0e5d6" : "#485744";
  if (scene.kind === "sources" && scene.sources?.length) {
    scene.sources.forEach((source, i) => {
      const y = (portrait ? 730 : 535) + i * (portrait ? 235 : 125);
      textBlock(ctx, `${String(i + 1).padStart(2, "0")}  ${source.label}`, pad, y, contentWidth, portrait ? 160 : 75, portrait ? 44 : 32, 500, 1.4);
      ctx.font = `400 ${portrait ? 28 : 24}px ${fontFamily}`;
      let host = source.url;
      try { host = new URL(source.url).hostname; } catch { /* Preserve readable reference if the URL is malformed. */ }
      ctx.fillText(host, pad, y + (portrait ? 160 : 78));
    });
  } else {
    textBlock(ctx, scene.text, pad, portrait ? 760 : 545, contentWidth, portrait ? 670 : 290, portrait ? 57 : 45, 400, 1.6);
  }
  ctx.restore();
}

export function drawVideoFrame(canvas: HTMLCanvasElement, timeline: TimedScene[], time: number, animate = true) {
  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx || !timeline.length) return;
  const { width, height } = canvas;
  const portrait = height > width;
  const index = Math.max(0, timeline.findIndex((scene) => time < scene.start + scene.duration));
  const scene = timeline[index];
  ctx.textBaseline = "top";
  const elapsed = Math.max(0, time - scene.start);
  const progress = animate ? Math.min(1, elapsed / 0.38) : 1;
  const eased = 1 - Math.pow(1 - progress, 3);
  if (index > 0 && progress < 1) {
    drawScene(ctx, timeline[index - 1], width, height);
    drawScene(ctx, scene, width, height, 36 * (1 - eased), eased);
  } else drawScene(ctx, scene, width, height);

  const caption = scene.captions.find((item) => item.start <= time && item.end > time);
  if (caption) {
    const x = portrait ? 74 : 220;
    const y = height - (portrait ? 300 : 210);
    const captionWidth = width - x * 2;
    ctx.fillStyle = "rgba(15, 25, 19, 0.92)";
    ctx.beginPath(); ctx.roundRect(x, y, captionWidth, portrait ? 170 : 115, 18); ctx.fill();
    ctx.fillStyle = "#fffdf3";
    textBlock(ctx, caption.text, x + 32, y + 24, captionWidth - 64, portrait ? 130 : 82, portrait ? 47 : 36, 500, 1.4);
  }
  ctx.fillStyle = scene.kind === "cover" || scene.kind === "culture" ? "#b7c9a2" : "#677c55";
  ctx.font = `500 ${portrait ? 24 : 22}px ${fontFamily}`;
  ctx.fillText("음식으로 읽는 세계", portrait ? 94 : 130, height - 72);
  ctx.textAlign = "right";
  ctx.fillText(`${String(index + 1).padStart(2, "0")} / ${String(timeline.length).padStart(2, "0")}`, width - (portrait ? 94 : 130), height - 72);
  ctx.textAlign = "left";
}
