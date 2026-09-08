"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Page rendering error:", error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#fffdf9] px-6 py-20">
      <div className="max-w-xl text-center">
        <p className="text-xs font-black tracking-[0.28em] text-[#b9480c]">
          SOMETHING WENT WRONG
        </p>
        <h1 className="mt-5 text-4xl font-black tracking-tight">
          페이지를 불러오지 못했습니다.
        </h1>
        <p className="mt-5 break-keep leading-8 text-neutral-600">
          일시적인 오류일 수 있습니다. 다시 시도해도 문제가 계속되면
          메인 화면으로 이동해 주세요.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-neutral-950 px-6 py-3.5 text-sm font-black text-white transition hover:bg-[#943706]"
          >
            다시 시도
          </button>
          <a
            href="/"
            className="rounded-full border border-stone-300 bg-white px-6 py-3.5 text-sm font-black !text-neutral-950"
          >
            메인으로
          </a>
        </div>
      </div>
    </main>
  );
}
