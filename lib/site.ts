const configuredUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  "https://manna-project-ashen.vercel.app";

const defaultInstagramUrl = "https://www.instagram.com/manna._.project/";

export const siteConfig = {
  name: "만나의 식탁",
  englishName: "Manna Table",
  title: "만나의 식탁 | 한 끼로 만나는 세계 문화",
  description:
    "직접 다녀온 지역의 한 끼에서 시작해 세계 각지의 역사와 생활방식, 식문화를 기록하는 음식·문화 아카이브입니다.",
  url: configuredUrl.replace(/\/+$/, ""),
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "",
  instagramHandle: "@manna._.project",
  instagramUrl:
    process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim() || defaultInstagramUrl,
  youtubeUrl: process.env.NEXT_PUBLIC_YOUTUBE_URL?.trim() || "",
} as const;
