"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  {
    label: "홈",
    href: "/",
  },
  {
    label: "나라별 식탁",
    href: "/countries",
  },
  {
    label: "문화 이야기",
    href: "/stories",
  },
  {
    label: "레시피",
    href: "/recipes",
  },
  {
    label: "영상",
    href: "/videos",
  },
  {
    label: "클래스",
    href: "/classes",
  },
  {
    label: "소개",
    href: "/about",
  },
];

export default function Header() {
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  const isActivePath = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-200 bg-[#fffdf9]/95 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="flex min-h-20 items-center justify-between gap-5">
          {/* 로고 */}
          <Link
            href="/"
            className="shrink-0"
            aria-label="만나의 식탁 메인 화면으로 이동"
          >
            <h1 className="text-xl font-bold tracking-tight text-neutral-950">
              만나의 식탁
            </h1>

            <p className="mt-0.5 hidden text-xs tracking-wide text-neutral-500 sm:block">
              한 끼로 만나는 세계 문화
            </p>
          </Link>

          {/* PC 메뉴 */}
          <nav
            aria-label="주요 메뉴"
            className="hidden items-center gap-6 lg:flex"
          >
            {navigation.map((item) => {
              const isActive = isActivePath(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-[#bf4f10]"
                      : "text-neutral-600 hover:text-neutral-950"
                  }`}
                >
                  {item.label}

                  {isActive && (
                    <span className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-[#bf4f10]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* 우측 버튼 */}
          <Link
            href={isHomePage ? "/countries" : "/"}
            aria-label={
              isHomePage ? "나라별 콘텐츠 둘러보기" : "메인 화면으로 이동"
            }
            className={`group inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-5 py-3 text-sm font-bold shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#bf4f10] focus-visible:ring-offset-2 ${
              isHomePage
                ? "border-[#bf4f10] bg-[#bf4f10] !text-white hover:border-[#9f3f0b] hover:bg-[#9f3f0b]"
                : "border-neutral-300 bg-white !text-neutral-900 hover:border-neutral-900 hover:bg-neutral-100"
            }`}
          >
            {!isHomePage && <span aria-hidden="true">←</span>}

            {isHomePage ? "콘텐츠 둘러보기" : "메인으로"}
          </Link>
        </div>

        {/* 모바일 메뉴 */}
        <nav
          aria-label="모바일 주요 메뉴"
          className="-mx-5 flex gap-5 overflow-x-auto px-5 pb-4 lg:hidden sm:-mx-6 sm:px-6"
        >
          {navigation.map((item) => {
            const isActive = isActivePath(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`shrink-0 whitespace-nowrap text-sm font-semibold transition-colors ${
                  isActive
                    ? "text-[#bf4f10]"
                    : "text-neutral-600 hover:text-neutral-950"
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
