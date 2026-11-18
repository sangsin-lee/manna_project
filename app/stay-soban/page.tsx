import type { Metadata } from "next";
import StaySoban from "./StaySoban";

const title = "스테이소반 · 로컬 식탁 연결";
const description = "여행자가 원하는 식탁과 지역 파트너의 요리 수업·미식 여행을 일정과 예산에 맞춰 연결합니다.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/stay-soban" },
  openGraph: { title, description, url: "/stay-soban", images: ["/atlas/pasta-workshop.webp"] },
  twitter: { card: "summary_large_image", title, description, images: ["/atlas/pasta-workshop.webp"] },
  referrer: "strict-origin-when-cross-origin",
};

export default function StaySobanPage() {
  return <StaySoban />;
}
