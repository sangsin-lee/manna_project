import Link from "next/link";

const quickFacts = [
  ["인원", "15명"],
  ["수육", "돼지고기 3.2kg"],
  ["라면", "12봉 · 3회 조리"],
  ["예상 시간", "약 100분"],
] as const;

export default function EatClubBanner() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 lg:py-20">
      <div className="overflow-hidden rounded-[2rem] border border-[#dfd3c6] bg-neutral-950 text-white shadow-[0_22px_70px_rgba(45,35,20,0.12)]">
        <div className="grid gap-10 px-7 py-10 sm:px-10 sm:py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-12">
          <div>
            <p className="text-xs font-black tracking-[0.28em] text-[#efab7f]">
              EAT COOKING CLUB
            </p>
            <h2 className="mt-4 max-w-2xl break-keep text-3xl font-black leading-tight tracking-tight sm:text-4xl">
              15명이 함께 만드는
              <br className="hidden sm:block" />
              수육 한 상과 숙주 계란 라면
            </h2>
            <p className="mt-5 max-w-2xl break-keep text-sm leading-7 text-neutral-300 sm:text-base sm:leading-8">
              대량 조리에 맞춘 분량, 역할 분담, 시간표와 두 레시피를 한
              페이지에 모았습니다. 동아리 단체방에 링크를 공유해 준비팀이
              같은 기준으로 확인할 수 있습니다.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/clubs/eat"
                className="inline-flex rounded-full bg-white px-6 py-3.5 text-sm font-black !text-neutral-950 transition hover:bg-[#f0e8df]"
              >
                요리동아리 운영안 보기
              </Link>
              <Link
                href="/recipes/club-suyuk-platter"
                className="inline-flex rounded-full border border-neutral-600 px-6 py-3.5 text-sm font-black !text-white transition hover:border-white"
              >
                수육 레시피 바로가기
              </Link>
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-3">
            {quickFacts.map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl border border-neutral-700 bg-neutral-900 p-5"
              >
                <dt className="text-xs font-bold text-neutral-400">{label}</dt>
                <dd className="mt-2 break-keep text-sm font-black text-white sm:text-base">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
