"use client";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { statusLabels, type ReservationStatus } from "@/lib/reservation-policy";
type Booking = {
  reservationId: string;
  status: ReservationStatus;
  date: string;
  guests: number;
  theme: string;
  time: string;
  location?: string;
  finalTime?: string;
  price?: string;
  reply?: string;
};
export default function ReservationStatus() {
  const [booking, setBooking] = useState<Booking | null>(null),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    [copied, setCopied] = useState(false);
  const refresh = useCallback(async () => {
    const p = new URLSearchParams(location.hash.slice(1));
    const id = p.get("id"),
      token = p.get("token");
    if (!id || !token) {
      setError("신청 완료 화면에서 받은 전용 확인 링크로 접속해 주세요.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const r = await fetch("/api/reservations?id=" + encodeURIComponent(id), {
        headers: { Authorization: "Bearer " + token },
        cache: "no-store",
      });
      const b = await r.json();
      if (!r.ok) throw Error(b.message);
      setBooking(b);
    } catch (e) {
      setError(e instanceof Error ? e.message : "상태를 확인하지 못했습니다.");
    } finally {
      setBusy(false);
    }
  }, []);
  useEffect(() => {
    void refresh();
  }, [refresh]);
  return (
    <div className="mt-8 rounded-3xl border border-stone-300 bg-white p-7">
      {error && (
        <p role="alert" className="text-red-800">
          {error}
        </p>
      )}
      {busy && <p role="status">확인 중…</p>}
      {booking && (
        <>
          <p className="text-xl font-black text-[#8b3c22]">
            {statusLabels[booking.status]}
          </p>
          <p className="mt-4 break-all text-xs">
            접수번호: {booking.reservationId}
          </p>
          <dl className="mt-5 space-y-4">
            <div>
              <dt className="font-bold">신청 내용</dt>
              <dd>
                {booking.theme} · {booking.date} · {booking.time} · 희망{" "}
                {booking.guests}명
              </dd>
            </div>
            {booking.status === "confirmed" ? (
              <>
                <div>
                  <dt className="font-bold">확정 장소·시간</dt>
                  <dd>
                    {booking.location}
                    <br />
                    {booking.finalTime}
                  </dd>
                </div>
                <div>
                  <dt className="font-bold">합의한 총비용·결제 안내</dt>
                  <dd>{booking.price}</dd>
                </div>
              </>
            ) : booking.status === "pending" ? (
              <p>
                아직 확정된 예약이 아닙니다. 운영자가 연락해
                장소·메뉴·인원·비용을 협의합니다.
              </p>
            ) : null}
            {booking.reply && (
              <div>
                <dt className="font-bold">운영자 안내 · 최종 메뉴·인원</dt>
                <dd className="whitespace-pre-wrap">{booking.reply}</dd>
              </div>
            )}
          </dl>
        </>
      )}
      {booking &&
        (booking.status === "pending" || booking.status === "confirmed") && (
          <button
            className="mt-6 rounded-full border border-red-300 px-5 py-3 text-red-800"
            disabled={busy}
            onClick={async () => {
              if (!confirm("이 예약 신청을 취소할까요?")) return;
              const p = new URLSearchParams(location.hash.slice(1));
              setBusy(true);
              try {
                const r = await fetch(
                  "/api/reservations?id=" +
                    encodeURIComponent(p.get("id") || ""),
                  {
                    method: "PATCH",
                    headers: { Authorization: "Bearer " + p.get("token") },
                  },
                );
                const b = await r.json();
                if (!r.ok) throw Error(b.message);
                await refresh();
              } catch (e) {
                setError(
                  e instanceof Error ? e.message : "취소하지 못했습니다.",
                );
              } finally {
                setBusy(false);
              }
            }}
          >
            예약 신청 취소
          </button>
        )}
      <div className="mt-7 flex flex-wrap gap-3">
        <button
          onClick={() => void refresh()}
          disabled={busy}
          className="rounded-full bg-neutral-950 px-5 py-3 text-white"
        >
          상태 새로고침
        </button>
        <button
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(location.href);
              setCopied(true);
            } catch {
              setError("주소창의 링크를 직접 복사해 주세요.");
            }
          }}
          className="rounded-full border border-stone-400 px-5 py-3"
        >
          {copied ? "링크 복사됨" : "확인 링크 복사"}
        </button>
      </div>
      <p className="mt-5 text-sm text-neutral-600">
        이 전용 링크를 보관해 주세요. 다른 사람에게 전달하지 마세요. 일정 변경은
        운영자와 개별 연락해 주세요. 취소 버튼은 저장된 예약 신청을 취소하며,
        별도로 송금한 비용이 있다면 정산은 운영자와 협의해 주세요.
      </p>
      <Link className="mt-5 inline-block underline" href="/classes">
        모임 안내로 돌아가기
      </Link>
    </div>
  );
}
