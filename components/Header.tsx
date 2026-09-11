"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { label: "홈", href: "/" },
  { label: "나라별 식탁", href: "/countries" },
  { label: "문화 이야기", href: "/stories" },
  { label: "레시피", href: "/recipes" },
  { label: "여행 기록", href: "/journeys/europe" },
  { label: "영상", href: "/videos" },
  { label: "클래스", href: "/classes" },
  { label: "소개", href: "/about" },
] as const;

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-200 bg-[#fffdf9]/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="flex min-h-20 items-center justify-between gap-4">
          <Link
            href="/"
            className="shrink-0 no-underline"
            aria-label="만나의 식탁 메인으로 이동"
          >
            <p className="text-lg font-black tracking-tight text-neutral-950 sm:text-xl">
              만나의 식탁
            </p>
            <p className="mt-0.5 hidden text-[11px] tracking-wide text-neutral-500 sm:block">
              한 끼로 만나는 세계 문화
            </p>
          </Link>

          <nav
            className="hidden items-center gap-4 xl:flex"
            aria-label="주요 메뉴"
          >
            {navigation.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative whitespace-nowrap py-2 text-[13px] font-semibold no-underline transition-colors ${
                    active
                      ? "!text-[#b9480c]"
                      : "!text-neutral-600 hover:!text-neutral-950"
                  }`}
                >
                  {item.label}
                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-[#b9480c]"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <Link
            href={isHomePage ? "/countries" : "/"}
            aria-label={
              isHomePage
                ? "나라별 콘텐츠 둘러보기"
                : "메인 화면으로 이동"
            }
            className={`group inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-5 py-3 text-sm font-bold no-underline shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b9480c] focus-visible:ring-offset-2 ${
              isHomePage
                ? "border-[#b9480c] bg-[#b9480c] !text-white hover:border-[#943706] hover:bg-[#943706]"
                : "border-neutral-300 bg-white !text-neutral-950 hover:border-[#b9480c] hover:bg-[#fff5ed] hover:!text-[#943706]"
            }`}
          >
            {!isHomePage && (
              <span
                aria-hidden="true"
                className="transition-transform group-hover:-translate-x-0.5"
              >
                ←
              </span>
            )}
            {isHomePage ? "콘텐츠 둘러보기" : "메인으로"}
          </Link>
        </div>

        <nav
          aria-label="모바일 주요 메뉴"
          className="-mx-5 flex gap-5 overflow-x-auto px-5 pb-4 xl:hidden sm:-mx-6 sm:px-6"
        >
          {navigation.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`shrink-0 whitespace-nowrap text-sm font-semibold no-underline transition-colors ${
                  active
                    ? "!text-[#b9480c]"
                    : "!text-neutral-600 hover:!text-neutral-950"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
