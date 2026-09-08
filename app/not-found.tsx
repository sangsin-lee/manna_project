import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#fffdf9] px-6 py-20">
      <div className="max-w-xl text-center">
        <p className="text-xs font-black tracking-[0.28em] text-[#b9480c]">
          404 · TABLE NOT FOUND
        </p>
        <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
          찾는 식탁이 없습니다.
        </h1>
        <p className="mt-5 break-keep leading-8 text-neutral-600">
          주소가 바뀌었거나 아직 준비되지 않은 콘텐츠입니다. 나라별
          식탁이나 메인 화면에서 다시 둘러보세요.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-neutral-950 px-6 py-3.5 text-sm font-black !text-white"
          >
            메인으로
          </Link>
          <Link
            href="/countries"
            className="rounded-full border border-stone-300 bg-white px-6 py-3.5 text-sm font-black !text-neutral-950"
          >
            나라별 식탁
          </Link>
        </div>
      </div>
    </main>
  );
}
