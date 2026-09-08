import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "만나의 식탁",
    short_name: "만나의 식탁",
    description: "한 끼로 만나는 세계 문화",
    start_url: "/",
    display: "standalone",
    background_color: "#fffdf9",
    theme_color: "#fffdf9",
    lang: "ko",
  };
}
