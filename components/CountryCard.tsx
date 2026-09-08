import Link from "next/link";
import ContentVisual from "@/components/ContentVisual";
import type { Country } from "@/lib/content";

export default function CountryCard({ country }: { country: Country }) {
  return (
    <article className="group overflow-hidden rounded-[2rem] border border-[#dfd5c9] bg-white shadow-[0_18px_55px_rgba(70,50,25,0.055)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(70,50,25,0.1)]">
      <Link
        href={`/countries/${country.slug}`}
        className="block no-underline"
        aria-label={`${country.nameKo} 식문화 자세히 보기`}
      >
        <ContentVisual
          eyebrow={country.eyebrow}
          label={country.nameEn}
          caption={country.representativeFoods.slice(0, 3).join(" · ")}
          palette={country.palette}
        />

        <div className="p-7 sm:p-8">
          <p className="text-xs font-black tracking-[0.2em] text-[#b9480c]">
            COUNTRY TABLE
          </p>
          <h2 className="mt-3 text-2xl font-black tracking-tight">
            {country.nameKo}
          </h2>
          <p className="mt-3 break-keep text-lg font-bold leading-7 text-neutral-800">
            {country.headline}
          </p>
          <p className="mt-4 line-clamp-3 break-keep text-sm leading-7 text-neutral-600">
            {country.summary}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {country.foodCulture.slice(0, 3).map((item) => (
              <span
                key={item}
                className="rounded-full bg-[#f6f2ec] px-3 py-2 text-xs font-semibold text-neutral-600"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-7 flex items-center justify-between border-t border-stone-200 pt-5">
            <span className="text-xs text-neutral-500">
              이야기 {country.storySlugs.length} · 레시피{" "}
              {country.recipeSlugs.length}
            </span>
            <span className="text-sm font-black text-neutral-950 transition group-hover:text-[#b9480c]">
              자세히 보기 →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
