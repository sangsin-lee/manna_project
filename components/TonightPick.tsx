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
            <p className="tracking-[0.2em] text-[#943706]">DINNER PICK</p>
            <time dateTime="2026-09-17" className="text-neutral-600">
              2026년 9월 17일의 저녁 식사 추천
            </time>
          </div>
          <h2
            id="tonight-pick-title"
            className="mt-4 break-keep text-3xl font-black leading-tight tracking-tight sm:text-4xl"
          >
            오늘 저녁은 소고기 숙주덮밥
          </h2>
          <p className="mt-4 max-w-xl break-keep leading-7 text-neutral-600">
            저녁을 아직 못 먹었다면, 따뜻한 밥 위에 소고기와 숙주를
            듬뿍 올려 든든한 한 끼를 준비해 보세요. 이마트에서 장을 본 뒤
            빠르게 만들 수 있는 메뉴로 골랐어요. 김치를 곁들이면 한 상 완성!
          </p>
          <ul className="mt-5 flex flex-wrap gap-2 text-sm font-bold text-[#71350f]">
            {["든든한 1인분", "조리 약 15분", "이마트 장보기"].map((label) => (
              <li key={label} className="rounded-full bg-[#eddfcc] px-3 py-1.5">
                {label}
              </li>
            ))}
          </ul>
          <Link
            href="/recipes/japanese-beef-bean-sprout-stir-fry"
            className="mt-7 inline-flex rounded-full bg-neutral-950 px-6 py-3.5 text-sm font-black !text-white no-underline transition hover:bg-[#943706] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#943706]"
          >
            직접 양념하는 소고기 숙주볶음 레시피 →
          </Link>
          <p className="mt-3 text-xs leading-6 text-neutral-600">
            아래는 시판 양념을 쓰는 1인분 덮밥입니다. 상세 레시피의 볶음에
            밥을 곁들여도 좋아요.
          </p>
        </div>
        <div className="rounded-[1.5rem] border border-[#e5d5c3] bg-[#fffdf9] p-6 sm:p-8">
          <h3 className="text-lg font-black">이마트 장보기 목록 · 1인분</h3>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-7 text-neutral-600">
            <li>정육 코너: 냉장 불고기용 소고기 150~200g</li>
            <li>채소 코너: 숙주 200g, 대파 조금(선택)</li>
            <li>즉석식품 코너: 즉석밥 1개(약 210g)</li>
            <li>양념 코너: 소불고기 양념 작은 병 1개</li>
            <li>곁들임: 김치 작은 팩(집에 있으면 생략)</li>
          </ul>
          <h4 className="mt-5 font-black">집에 와서 약 15분이면</h4>
          <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-7 text-neutral-700 marker:font-black marker:text-[#943706]">
            <li>숙주를 씻어 물기를 빼고, 즉석밥은 포장 안내대로 데워요.</li>
            <li>팬에 식용유를 조금 두르고 소고기를 볶다가 숙주와 대파를 넣어요.</li>
            <li>시판 양념을 제품의 고기 중량별 권장량에 맞춰 넣고, 고기와 숙주가 충분히 익을 때까지 볶아 밥에 올려요.</li>
          </ol>
          <p className="mt-5 border-t border-stone-200 pt-4 text-sm leading-7 text-neutral-600">
            바로 먹고 싶다면: 반찬·델리 코너에서 완조리 소불고기와
            즉석밥을 골라 제품 안내대로 데워 드세요. 양념 생고기인지
            완조리 제품인지 포장을 확인해 주세요.
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
            매장별 재고와 가격은 다를 수 있어요. 식용유는 집에 있는지 확인하세요.
          </p>
        </div>
      </div>
    </section>
  );
}
