import type { Metadata } from "next";
import ReservationAdmin from "@/components/ReservationAdmin";
export const metadata: Metadata = {
  title: "운영자 예약 관리",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};
export default function Page() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-5 py-16">
      <p className="text-xs font-bold tracking-widest text-[#a7432b]">
        MANNA TABLE · PRIVATE ADMIN
      </p>
      <h1 className="mt-4 text-3xl font-black">모임 예약 관리</h1>
      <p className="mt-4 text-sm leading-7 text-neutral-600">
        운영자 전용입니다. 최근 신청 100건을 확인하고, 신청자에게 연락해
        장소·시간·메뉴·인원·총비용을 협의한 뒤 확정해 주세요.
      </p>
      <ReservationAdmin />
    </main>
  );
}
