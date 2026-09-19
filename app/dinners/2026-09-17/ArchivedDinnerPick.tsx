export default function ArchivedDinnerPick() {
  return (
    <section
      id="tonight-pick"
      aria-labelledby="tonight-pick-title"
      className="scroll-mt-32 border-b border-[#e5d5c3] bg-[#f6f2ec]"
    >
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-10 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:py-14">
        <div>
          <div className="flex flex-wrap items-center gap-3 text-xs font-black">
            <p className="tracking-[0.2em] text-[#943706]">DINNER PICK</p>
            <time dateTime="2026-09-17" className="text-neutral-600">
              2026년 9월 17일의 저녁 식사 추천
            </time>
          </div>
          <h2
            id="tonight-pick-title"
            className="mt-4 break-keep text-3xl font-black leading-tight tracking-tight sm:text-4xl"
          >
            불고기 치즈 떡피자
          </h2>
          <p className="mt-4 max-w-xl break-keep leading-7 text-neutral-600">
            쫀득한 떡국떡에 달콤짭짤한 불고기와 쭉 늘어나는 치즈를 올려요.
            이마트에서 장을 보고 프라이팬으로 만드는 든든한 저녁입니다.
            최근 화제인 피자설기를 떡국떡으로 응용한 창작 메뉴예요.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2 text-sm font-bold text-[#71350f]">
            {["든든한 1인분", "조리 약 20~25분", "뚜껑 있는 프라이팬"].map((label) => (
              <li key={label} className="rounded-full bg-[#eddfcc] px-3 py-1.5">
                {label}
              </li>
            ))}
          </ul>
          <a
            href="#dinner-recipe"
            className="mt-7 inline-flex rounded-full bg-neutral-950 px-6 py-3.5 text-sm font-black !text-white no-underline transition hover:bg-[#943706] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#943706]"
          >
            장보기 목록과 조리법 보기 →
          </a>
          <p className="mt-3 text-xs leading-6 text-neutral-600">
            오븐 없이 만들 수 있어요. 냉동 떡과 고기는 해동 시간이 별도로 필요합니다.
          </p>
          <div className="mt-6 rounded-2xl border border-[#e5d5c3] p-5">
            <h3 className="text-sm font-black">영상으로 남긴다면</h3>
            <p className="mt-2 break-keep text-sm leading-7 text-neutral-600">
              치즈를 들어 올리는 완성 장면으로 시작해 장본 재료, 불고기 굽는 소리,
              한입 평가를 이어 보세요. 제목 아이디어: “피자설기 보고 만든 불고기 떡피자”.
            </p>
            <a
              href="https://magazine.hankyung.com/job-joy/amp/202609093975d"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-xs font-bold !text-[#943706] underline underline-offset-4"
            >
              피자설기 트렌드 참고 · 한국경제, 2026.09.09 ↗
            </a>
          </div>
        </div>
        <div id="dinner-recipe" className="scroll-mt-32 rounded-[1.5rem] border border-[#e5d5c3] bg-[#fffdf9] p-6 sm:p-8">
          <h3 className="text-lg font-black">이마트 장보기 목록 · 1인분</h3>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-7 text-neutral-600">
            <li>떡국떡 1봉 — 150g 사용</li>
            <li>냉장 양념 소불고기 1팩 — 150g 사용</li>
            <li>슈레드 모차렐라 1봉 — 60g 사용</li>
            <li>피자소스 또는 토마토 파스타소스 1개 — 2큰술 사용</li>
            <li>양파 1개 — 1/4개 사용</li>
            <li>집에서 준비: 식용유 1작은술, 물 2~3큰술</li>
          </ul>
          <p className="mt-3 text-xs leading-6 text-neutral-500">
            구매는 포장 단위로, 조리는 위 사용량만큼 해주세요.
            남은 재료는 제품의 보관 안내에 따라 보관하세요.
          </p>
          <h4 className="mt-5 font-black">프라이팬으로 만드는 저녁</h4>
          <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-7 text-neutral-700 marker:font-black marker:text-[#943706]">
            <li>양파를 얇게 썰어요. 떡이 단단하면 제품 안내에 따라 불리거나 해동해 준비해요.</li>
            <li>팬에 양념 소불고기와 양파를 넣고 고기가 완전히 익을 때까지 볶아요. 국물은 자작하게 졸인 뒤 깨끗한 접시에 덜어둬요.</li>
            <li>팬의 탄 양념을 닦고 식용유를 둘러 떡을 펼쳐요. 물 2~3큰술을 넣고 뚜껑을 덮어 중약불에서 떡 속까지 말랑해지도록 익혀요. 물이 부족하면 조금씩 보충해요.</li>
            <li>남은 물기를 날린 뒤 약불로 줄여요. 떡 위에 소스, 익힌 불고기와 양파, 치즈를 올려요.</li>
            <li>뚜껑을 덮고 약불에서 3~5분 정도 치즈를 녹여요. 바닥이 타지 않는지 확인하고, 치즈가 녹으면 팬째 받침에 올려 숟가락으로 떠먹어요.</li>
          </ol>
          <p className="mt-5 border-t border-stone-200 pt-4 text-sm leading-7 text-neutral-600">
            장보기 대체 팁: 양념 소불고기가 없으면 불고기용 소고기와
            소불고기 양념을 사서 제품 권장 비율로 양념해 주세요.
            곁들임은 집에 있는 김치나 피클이면 충분해요.
          </p>
          <a
            href="https://emart.ssg.com/disp/category.ssg?ctgId=6000215227"
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block text-xs font-bold !text-[#943706] underline underline-offset-4"
          >
            이마트몰 불고기용 소고기 둘러보기 ↗
          </a>
          <p className="mt-2 text-xs leading-6 text-neutral-500">
            매장별 재고와 가격은 다를 수 있어요. 양념 소불고기는 가열이 필요한 제품인지 확인해 주세요.
          </p>
        </div>
      </div>
    </section>
  );
}
