export function seoulDate(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}
export function dateError(value: string, today = seoulDate()) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return "희망 날짜를 선택해 주세요.";
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value)
    return "올바른 날짜를 선택해 주세요.";
  if (value <= today) return "내일 이후 날짜로 신청해 주세요.";
  if (date.getUTCDay() === 0)
    return "일요일은 운영하지 않습니다. 다른 날짜를 선택해 주세요.";
  return null;
}
export const timeOptions = ["오전", "오후", "저녁", "시간 협의"] as const;
export const statusLabels = {
  pending: "확인 대기",
  confirmed: "예약 확정",
  declined: "진행 불가",
  cancelled: "취소 완료",
} as const;
export type ReservationStatus = keyof typeof statusLabels;
export type BookingMeta = {
  kind: "manna-reservation-v1";
  status: ReservationStatus;
  theme: string;
  time: string;
  note: string;
  trackingHash: string;
  location?: string;
  finalTime?: string;
  price?: string;
  reply?: string;
};
export function decodeBooking(message: unknown): BookingMeta | null {
  if (typeof message !== "string") return null;
  try {
    const value = JSON.parse(message);
    return value.kind === "manna-reservation-v1" && value.status in statusLabels
      ? value
      : null;
  } catch {
    return null;
  }
}
