import type { Metadata } from "next";
import ReservationStatus from "@/components/ReservationStatus";
export const metadata: Metadata = {
  title: "예약 상태 확인",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};
export default function Page() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-20">
      <p className="text-sm font-bold text-[#a7432b]">MANNA TABLE</p>
      <h1 className="mt-4 text-4xl font-black">예약 상태 확인</h1>
      <ReservationStatus />
    </main>
  );
}
