import Link from "next/link";

export default function RecipeNotFound() {
  return (
    <main className="min-h-[70vh] bg-[#fffdf9] px-6 py-24 text-neutral-950">
      <section className="mx-auto max-w-3xl rounded-[2rem] border border-stone-200 bg-white p-8 text-center shadow-[0_20px_60px_rgba(70,50,25,0.06)] sm:p-12">
        <p className="text-xs font-black tracking-[0.28em] text-[#b9480c]">
          RECIPE NOT FOUND
        </p>
        <h1 className="mt-4 break-keep text-3xl font-black tracking-tight sm:text-4xl">
          해당 레시피를 찾지 못했습니다.
        </h1>
        <p className="mx-auto mt-5 max-w-xl break-keep leading-8 text-neutral-600">
          주소가 변경됐거나 아직 공개되지 않은 레시피일 수 있습니다. 세계
          레시피 목록에서 현재 공개된 음식을 다시 확인해 주세요.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/recipes#recipe-archive"
            className="rounded-full bg-[#b9480c] px-6 py-3 text-sm font-black !text-white transition hover:bg-[#943706]"
          >
            세계 레시피 목록
          </Link>
          <Link
            href="/countries"
            className="rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-black !text-neutral-900 transition hover:border-[#b9480c] hover:bg-[#fff5ed] hover:!text-[#943706]"
          >
            나라별 식탁 보기
          </Link>
        </div>
      </section>
    </main>
  );
}
