import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "영상",
  description:
    "요리 과정과 식문화 이야기를 영상으로 기록하는 만나의 식탁 채널을 소개합니다.",
  alternates: {
    canonical: "/videos",
  },
};

const videoFormats = [
  {
    label: "COOKING",
    title: "한 끼로 만나는 나라",
    description:
      "대표 음식 한 가지를 직접 만들며 재료와 조리법, 문화적 배경을 함께 설명합니다.",
  },
  {
    label: "STORY",
    title: "음식은 왜 이렇게 먹게 되었을까?",
    description:
      "차찬텡, 이자카야, 전통시장처럼 음식이 놓이는 공간과 생활방식을 짧게 정리합니다.",
  },
  {
    label: "FIELD NOTE",
    title: "현장에서 만난 식탁",
    description:
      "여행과 시장, 식당에서 발견한 음식과 사람들의 이야기를 기록합니다.",
  },
];

export default function VideosPage() {
  return (
    <main className="min-h-screen bg-[#fffdf9] text-neutral-950">
      <section className="border-b border-stone-200 bg-[#f4efe7]">
        <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
          <p className="text-xs font-black tracking-[0.28em] text-[#b9480c]">
            VIDEO ARCHIVE
          </p>
          <h1 className="mt-5 max-w-3xl break-keep text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            영상으로 만나는
            <br />
            세계의 식탁
          </h1>
          <p className="mt-7 max-w-2xl break-keep text-base leading-8 text-neutral-600 sm:text-lg">
            만드는 손과 먹는 장면, 현장의 소리까지 글로 담기 어려운
            식문화의 모습을 영상으로 기록합니다.
          </p>

          {siteConfig.youtubeUrl ? (
            <a
              href={siteConfig.youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-9 inline-flex rounded-full bg-neutral-950 px-6 py-3.5 text-sm font-black !text-white transition hover:bg-[#943706]"
            >
              유튜브 채널 열기 ↗
            </a>
          ) : (
            <p className="mt-8 inline-flex rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-bold text-neutral-600">
              채널 주소 연결 전 · NEXT_PUBLIC_YOUTUBE_URL 설정 필요
            </p>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <p className="text-xs font-black tracking-[0.28em] text-[#b9480c]">
          CONTENT FORMATS
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
          영상 콘텐츠 구성
        </h2>

        <div className="mt-10 grid gap-7 md:grid-cols-3">
          {videoFormats.map((format, index) => (
            <article
              key={format.title}
              className="overflow-hidden rounded-[1.75rem] border border-[#dfd5c9] bg-white shadow-[0_16px_50px_rgba(70,50,25,0.05)]"
            >
              <div className="flex aspect-video items-end bg-gradient-to-br from-[#f0dfcd] via-[#ddc8b2] to-[#bdcdbd] p-6">
                <div>
                  <p className="text-xs font-black tracking-[0.2em] text-neutral-600">
                    EP. {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-2 text-3xl font-black text-neutral-900">
                    {format.label}
                  </p>
                </div>
              </div>
              <div className="p-7">
                <h2 className="break-keep text-xl font-black leading-8">
                  {format.title}
                </h2>
                <p className="mt-3 break-keep text-sm leading-7 text-neutral-600">
                  {format.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-stone-200 bg-[#f6f2ec]">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-20 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-black tracking-[0.28em] text-[#b9480c]">
              START WITH STORIES
            </p>
            <h2 className="mt-3 break-keep text-3xl font-black tracking-tight">
              영상 공개 전에도 문화 이야기와 레시피를 먼저 만나보세요.
            </h2>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link
              href="/stories"
              className="rounded-full bg-neutral-950 px-6 py-3.5 text-sm font-black !text-white"
            >
              문화 이야기
            </Link>
            <Link
              href="/recipes"
              className="rounded-full border border-stone-300 bg-white px-6 py-3.5 text-sm font-black !text-neutral-950"
            >
              세계 레시피
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
