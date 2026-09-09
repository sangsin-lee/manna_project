import Link from "next/link";
import ContentVisual from "@/components/ContentVisual";
import { visitStatusLabels, type Country } from "@/lib/content";

export default function CountryCard({ country }: { country: Country }) {
  const visitLabel = country.visit
    ? visitStatusLabels[country.visit.status]
    : null;
  const isHomeBase = country.visit?.status === "home-base";

  return (
    <article className="group h-full overflow-hidden rounded-[2rem] border border-[#dfd5c9] bg-white shadow-[0_18px_55px_rgba(70,50,25,0.055)] transition duration-300 hover:-translate-y-1 hover:border-[#cf9c7e] hover:shadow-[0_24px_70px_rgba(70,50,25,0.1)]">
      <Link
        href={`/countries/${country.slug}`}
        className="block h-full no-underline"
        aria-label={`${country.nameKo} 식문화 자세히 보기`}
      >
        <ContentVisual
          eyebrow={country.eyebrow}
          label={country.nameEn}
          caption={country.representativeFoods.slice(0, 3).join(" · ")}
          palette={country.palette}
        />

        <div className="flex min-h-[455px] flex-col p-7 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-black tracking-[0.2em] text-[#b9480c]">
              {country.placeType === "region" ? "REGION TABLE" : "COUNTRY TABLE"}
            </p>
            <div className="flex flex-wrap items-center justify-end gap-2">
              {visitLabel && (
                <span
                  className={`rounded-full border px-3 py-1.5 text-[11px] font-black ${
                    isHomeBase
                      ? "border-neutral-950 bg-neutral-950 text-white"
                      : "border-[#e5b596] bg-[#fff3ea] text-[#943706]"
                  }`}
                >
                  {visitLabel}
                </span>
              )}
              <span className="rounded-full bg-[#f7f3ed] px-3 py-1.5 text-[11px] font-bold text-neutral-500">
                검토 {country.updatedAt.replaceAll("-", ".")}
              </span>
            </div>
          </div>

          <h2 className="mt-3 text-2xl font-black tracking-tight">
            {country.nameKo}
          </h2>
          <p className="mt-3 break-keep text-lg font-bold leading-7 text-neutral-800">
            {country.headline}
          </p>
          <p className="mt-4 line-clamp-3 break-keep text-sm leading-7 text-neutral-600">
            {country.summary}
          </p>

          {country.visit && (
            <div className="mt-5 rounded-2xl border border-[#e6d9cc] bg-[#fffaf5] px-4 py-4">
              <p className="text-[10px] font-black tracking-[0.18em] text-[#b9480c]">
                {country.visit.status === "home-base"
                  ? "HOME TABLE"
                  : "VISITED PLACE"}
              </p>
              <p className="mt-2 break-keep text-sm font-black text-neutral-800">
                {country.visit.places.join(" · ")}
              </p>
            </div>
          )}

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

          <dl className="mt-7 grid grid-cols-3 gap-2">
            <div className="rounded-xl border border-stone-200 bg-[#fffdf9] p-3">
              <dt className="text-[10px] text-neutral-500">지역·공간</dt>
              <dd className="mt-1 text-sm font-black">
                {country.regionalNotes.length}
              </dd>
            </div>
            <div className="rounded-xl border border-stone-200 bg-[#fffdf9] p-3">
              <dt className="text-[10px] text-neutral-500">문화 이야기</dt>
              <dd className="mt-1 text-sm font-black">
                {country.storySlugs.length}
              </dd>
            </div>
            <div className="rounded-xl border border-stone-200 bg-[#fffdf9] p-3">
              <dt className="text-[10px] text-neutral-500">레시피</dt>
              <dd className="mt-1 text-sm font-black">
                {country.recipeSlugs.length}
              </dd>
            </div>
          </dl>

          <div className="mt-auto flex items-center justify-between border-t border-stone-200 pt-6">
            <span className="text-xs font-semibold text-neutral-500">
              개요 · 지역 · 문화 · 조리
            </span>
            <span className="text-sm font-black text-neutral-950 transition group-hover:translate-x-0.5 group-hover:text-[#b9480c]">
              상세 식탁 보기 →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
