import Link from "next/link";
import { siteConfig } from "@/lib/site";

const footerLinks = [
  { label: "국내 미식 지도", href: "/korea" },
  { label: "나라별 식탁", href: "/countries" },
  { label: "유럽 여행 기록", href: "/journeys/europe" },
  { label: "문화 이야기", href: "/stories" },
  { label: "세계 레시피", href: "/recipes" },
  { label: "영상", href: "/videos" },
  { label: "클래스", href: "/classes" },
  { label: "브랜드 소개", href: "/about" },
  { label: "개인정보 처리 안내", href: "/privacy" },
] as const;

export default function Footer() {
  const socialLinks = [
    { label: `Instagram ${siteConfig.instagramHandle}`, href: siteConfig.instagramUrl },
    siteConfig.youtubeUrl
      ? { label: "YouTube", href: siteConfig.youtubeUrl }
      : null,
  ].filter(
    (item): item is { label: string; href: string } => item !== null,
  );

  return (
    <footer className="border-t border-stone-200 bg-neutral-950 text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-14 md:grid-cols-[1.2fr_0.8fr] md:py-16">
        <div>
          <p className="text-2xl font-black tracking-tight">만나의 식탁</p>
          <p className="mt-3 max-w-xl break-keep text-sm leading-7 text-neutral-300">
            직접 다녀온 곳의 한 끼에서 시작해 그 지역의 역사와 생활방식,
            사람들의 이야기를 기록합니다.
          </p>

          {siteConfig.contactEmail && (
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="mt-6 inline-flex !text-sm !font-semibold !text-white underline decoration-neutral-600 underline-offset-4 transition hover:decoration-white"
            >
              {siteConfig.contactEmail}
            </a>
          )}
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-[#ef9d6d]">
              EXPLORE
            </p>
            <nav className="mt-4 flex flex-col gap-3" aria-label="푸터 메뉴">
              {footerLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm !text-neutral-300 no-underline transition hover:!text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-[#ef9d6d]">
              CHANNEL
            </p>
            <div className="mt-4 flex flex-col gap-3">
              {socialLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm !text-neutral-300 no-underline transition hover:!text-white"
                >
                  {item.label} ↗
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-800">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-5 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Manna Table.</p>
          <p>여행 기록과 문화 설명은 출처와 경험 범위를 구분합니다.</p>
        </div>
      </div>
    </footer>
  );
}
