import type { CSSProperties } from "react";
import type { Palette } from "@/lib/content";

type ContentVisualProps = {
  eyebrow: string;
  label: string;
  caption: string;
  palette: Palette;
  size?: "card" | "feature" | "hero";
  className?: string;
};

const sizeClasses = {
  card: "min-h-56 p-7",
  feature: "min-h-[360px] p-8 sm:min-h-[440px] sm:p-10",
  hero: "min-h-[360px] p-8 sm:min-h-[500px] sm:p-12",
} as const;

const labelClasses = {
  card: "text-4xl sm:text-5xl",
  feature: "text-5xl sm:text-6xl",
  hero: "text-5xl sm:text-7xl lg:text-8xl",
} as const;

export default function ContentVisual({
  eyebrow,
  label,
  caption,
  palette,
  size = "card",
  className = "",
}: ContentVisualProps) {
  const style: CSSProperties = {
    background: `linear-gradient(135deg, ${palette.from} 0%, ${palette.mid} 52%, ${palette.to} 100%)`,
    color: palette.ink,
  };

  return (
    <div
      className={`relative isolate flex overflow-hidden ${sizeClasses[size]} ${className}`}
      style={style}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-80"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 12%, rgba(255,255,255,.9), transparent 28%), radial-gradient(circle at 86% 82%, rgba(255,255,255,.42), transparent 32%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -right-16 -top-20 -z-10 h-56 w-56 rounded-full border border-white/65 bg-white/15"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-20 -left-12 -z-10 h-48 w-48 rounded-full border border-white/50 bg-white/10"
      />

      <div className="flex w-full flex-col justify-between">
        <p className="text-xs font-black tracking-[0.24em] opacity-70">
          {eyebrow}
        </p>

        <div>
          <p
            className={`max-w-full break-keep font-black leading-[1.05] tracking-tight ${labelClasses[size]}`}
          >
            {label}
          </p>
          <p className="mt-4 text-[11px] font-bold tracking-[0.28em] opacity-70 sm:text-xs">
            {caption}
          </p>
        </div>
      </div>
    </div>
  );
}
