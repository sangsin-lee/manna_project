"use client";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { statusLabels, type ReservationStatus } from "@/lib/reservation-policy";
type Booking = {
  id: string;
  name: string;
  phone: string;
  date: string;
  guests: number;
  status: ReservationStatus;
  theme: string;
  time: string;
  note: string;
  location?: string;
  finalTime?: string;
  price?: string;
  reply?: string;
};
const input =
  "mt-2 block w-full rounded-lg border border-stone-300 px-3 py-2 text-base";
export default function ReservationAdmin() {
  const [rows, setRows] = useState<Booking[]>([]),
    [busy, setBusy] = useState(false),
    [message, setMessage] = useState("");
  const reload = useCallback(async () => {
    const key = new URLSearchParams(location.hash.slice(1)).get("key");
    if (!key) {
      setMessage("전달받은 운영자 전용 링크를 열어 주세요.");
      return;
    }
    setBusy(true);
    try {
      const r = await fetch("/api/admin/reservations", {
          headers: { Authorization: "Bearer " + key },
          cache: "no-store",
        }),
        b = await r.json();
      if (!r.ok) throw Error(b.message);
      setRows(b.bookings);
      setMessage(b.bookings.length ? "" : "아직 접수된 예약이 없습니다.");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "불러오지 못했습니다.");
    } finally {
      setBusy(false);
    }
  }, []);
  useEffect(() => {
    void reload();
  }, [reload]);
  async function submit(e: FormEvent<HTMLFormElement>, id: string) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const submitter = (e.nativeEvent as SubmitEvent)
      .submitter as HTMLButtonElement;
    const action = submitter?.value;
    if (!action) return;
    const key = new URLSearchParams(location.hash.slice(1)).get("key");
    setBusy(true);
    try {
      const r = await fetch("/api/admin/reservations", {
          method: "POST",
          headers: {
            Authorization: "Bearer " + key,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            action,
            location: f.get("location"),
            finalTime: f.get("finalTime"),
            price: f.get("price"),
            reply: f.get("reply"),
            agreed: f.get("agreed") === "on",
          }),
        }),
        b = await r.json();
      if (!r.ok) throw Error(b.message);
      await reload();
      setMessage(b.message);
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "저장하지 못했습니다.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <button
        className="mt-7 rounded-full bg-neutral-950 px-6 py-3 text-white"
        onClick={() => void reload()}
        disabled={busy}
      >
        {busy ? "확인 중…" : "신청 목록 새로고침"}
      </button>
      {message && (
        <p role="status" className="my-5 rounded-xl bg-stone-100 p-4">
          {message}
        </p>
      )}
      <div className="mt-8 space-y-6">
        {rows.map((row) => (
          <article
            key={row.id}
            className="rounded-2xl border border-stone-300 bg-white p-6"
          >
            <p className="text-sm font-bold text-[#a7432b]">
              {statusLabels[row.status]} · {row.date} · {row.time}
            </p>
            <h2 className="mt-3 text-xl font-bold">{row.theme}</h2>
            <p className="mt-3">
              {row.name} ·{" "}
              <a className="underline" href={"tel:" + row.phone}>
                {row.phone}
              </a>{" "}
              · 희망 {row.guests}명
            </p>
            <p className="mt-3 whitespace-pre-wrap text-sm text-neutral-600">
              {row.note}
            </p>
            <p className="mt-3 break-all text-xs text-neutral-500">
              접수번호 {row.id}
            </p>
            {row.status === "pending" ? (
              <form
                onSubmit={(e) => void submit(e, row.id)}
                className="mt-6 grid gap-4 sm:grid-cols-2"
              >
                <label>
                  확정 장소·주소
                  <input name="location" maxLength={180} className={input} />
                </label>
                <label>
                  확정 시간
                  <input name="finalTime" maxLength={60} className={input} />
                </label>
                <label className="sm:col-span-2">
                  합의한 총비용·결제 안내
                  <input name="price" maxLength={120} className={input} />
                </label>
                <label className="sm:col-span-2">
                  최종 메뉴·인원·전달 사항
                  <textarea
                    name="reply"
                    rows={3}
                    maxLength={300}
                    className={input}
                  />
                </label>
                <label className="flex items-start gap-3 text-sm sm:col-span-2">
                  <input type="checkbox" name="agreed" className="mt-1" />
                  신청자에게 연락해 위 조건의 동의를 받았습니다.
                </label>
                <button
                  disabled={busy}
                  name="action"
                  value="confirmed"
                  className="rounded-full bg-[#753d26] px-5 py-3 text-white"
                >
                  조건 합의 후 예약 확정
                </button>
                <button
                  disabled={busy}
                  name="action"
                  value="declined"
                  className="rounded-full border border-stone-400 px-5 py-3"
                >
                  진행 불가로 처리
                </button>
              </form>
            ) : (
              <div className="mt-5 text-sm leading-7">
                <p>
                  {row.location} · {row.finalTime}
                </p>
                <p>{row.price}</p>
                <p className="whitespace-pre-wrap">{row.reply}</p>
              </div>
            )}
          </article>
        ))}
      </div>
      <p className="mt-8 text-xs text-neutral-500">
        이 링크는 예약자 연락처를 볼 수 있는 운영자 접근 권한입니다. 공개
        사이트에 게시하거나 다른 사람에게 전달하지 마세요. 이메일 알림은 별도
        설정된 경우에만 발송됩니다.
      </p>
    </>
  );
}
