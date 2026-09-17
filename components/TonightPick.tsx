import Link from "next/link";

export default function TonightPick() {
  return (
    <section
      id="tonight-pick"
      aria-labelledby="tonight-pick-title"
      className="scroll-mt-32 border-b border-[#e5d5c3] bg-[#f6f2ec]"
    >
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:py-14">
        <div>
          <div className="flex flex-wrap items-center gap-3 text-xs font-black">
            <p className="tracking-[0.2em] text-[#943706]">TONIGHT’S PICK</p>
            <time dateTime="2026-09-17" className="text-neutral-600">
              2026년 9월 17일의 야식 추천
            </time>
          </div>
          <h2
            id="tonight-pick-title"
            className="mt-4 break-keep text-3xl font-black leading-tight tracking-tight sm:text-4xl"
          >
            오늘 밤, 바삭한 크로크무슈
          </h2>
          <p className="mt-4 max-w-xl break-keep leading-7 text-neutral-600">
            노릇한 식빵 사이로 녹아든 치즈와 짭조름한 햄.
            파리의 카페 메뉴를 집에서 즐겨 보세요. 오늘은 베샤멜 없이
            팬 하나로 만드는 간편 버전을 추천합니다.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2 text-sm font-bold text-[#71350f]">
            {["1인분", "약 10~15분", "프라이팬 하나"].map((label) => (
              <li key={label} className="rounded-full bg-[#eddfcc] px-3 py-1.5">
                {label}
              </li>
            ))}
          </ul>
          <Link
            href="/recipes/french-croque-monsieur"
            className="mt-7 inline-flex rounded-full bg-neutral-950 px-6 py-3.5 text-sm font-black !text-white no-underline transition hover:bg-[#943706] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#943706]"
          >
            베샤멜을 곁들인 정식 레시피 보기 →
          </Link>
          <p className="mt-3 text-xs leading-6 text-neutral-600">
            상세 레시피는 2인분 · 약 35분 기준입니다.
          </p>
        </div>
        <div className="rounded-[1.5rem] border border-[#e5d5c3] bg-[#fffdf9] p-6 sm:p-8">
          <h3 className="text-lg font-black">오늘 밤의 간편 조리법</h3>
          <p className="mt-3 break-keep text-sm leading-7 text-neutral-600">
            식빵 2장 · 바로 먹을 수 있는 슬라이스 햄 2장 · 치즈 2장 ·
            버터 약간 · 머스터드 선택
          </p>
          <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-7 text-neutral-700 marker:font-black marker:text-[#943706]">
            <li>빵 안쪽에 머스터드를 얇게 바르고 햄과 치즈를 넣어 덮어요.</li>
            <li>겉면에 버터를 바른 뒤 중약불 팬에서 양면을 2~3분씩 구워요.</li>
            <li>약불로 줄이고 뚜껑을 잠깐 덮어 치즈가 녹으면 꺼내 반으로 잘라요.</li>
          </ol>
          <p className="mt-5 border-t border-stone-200 pt-4 text-sm leading-7 text-neutral-600">
            곁들이기: 피클이나 방울토마토를 함께 준비하면 좋아요.
          </p>
          <a
            href="https://www.bbcgoodfoodme.com/recipes/quick-croquemonsieur/"
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block text-xs font-bold !text-[#943706] underline underline-offset-4"
          >
            참고: Good Food의 간편 크로크무슈 ↗
          </a>
        </div>
      </div>
    </section>
  );
}
