import Link from "next/link";
import ContentVisual from "@/components/ContentVisual";
import {
  getCountry,
  storyCategoryLabels,
  type Story,
} from "@/lib/content";

export default function StoryCard({ story }: { story: Story }) {
  const country = getCountry(story.country);

  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-[#ded4c8] bg-white shadow-[0_16px_50px_rgba(70,50,25,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(70,50,25,0.09)]">
      <Link
        href={`/stories/${story.slug}`}
        className="block h-full no-underline"
        aria-label={`${story.title} 읽기`}
      >
        <ContentVisual
          eyebrow={country?.nameEn ?? "WORLD TABLE"}
          label={story.visualLabel}
          caption={story.visualCaption}
          palette={story.palette}
        />

        <div className="flex min-h-[340px] flex-col p-7">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-black tracking-[0.16em] text-[#b9480c]">
              {country?.nameKo ?? "세계"}
            </span>
            <span className="rounded-full bg-[#f5f1ea] px-3 py-1.5 text-[11px] font-bold text-neutral-600">
              {storyCategoryLabels[story.category]}
            </span>
          </div>

          <h2 className="mt-5 break-keep text-xl font-black leading-8 tracking-tight">
            {story.title}
          </h2>
          <p className="mt-4 line-clamp-4 break-keep text-sm leading-7 text-neutral-600">
            {story.summary}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {story.keywords.slice(0, 3).map((keyword) => (
              <span key={keyword} className="text-xs font-medium text-neutral-500">
                #{keyword}
              </span>
            ))}
          </div>

          <div className="mt-auto flex items-center justify-between border-t border-stone-200 pt-6">
            <span className="text-xs text-neutral-500">
              읽는 시간 약 {story.readTime}분
            </span>
            <span className="text-sm font-black text-neutral-950 transition group-hover:text-[#b9480c]">
              읽기 →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
