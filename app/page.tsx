import ReservationForm from "@/components/ReservationForm";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

const programs = [
  {
    title: "홍콩 딤섬 클래스",
    description: "딤섬의 맛 구조와 소스 조합을 배우고 직접 만들어보는 클래스",
  },
  {
    title: "이탈리아 식탁 모임",
    description: "파스타와 식문화 이야기를 함께 나누는 감성 홈다이닝 모임",
  },
  {
    title: "세계 디저트 체험",
    description: "각국의 디저트를 직접 만들며 문화와 스토리를 경험하는 시간",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fcfaf7] text-neutral-900">
      {/* <Header /> */}
      <Hero />

      <section id="about" className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">
            About
          </p>
          <h2 className="text-3xl font-extrabold md:text-4xl">브랜드 소개</h2>
          <p className="mt-8 text-lg leading-9 text-neutral-600">
            식탁 위의 세계는 음식 한 접시를 넘어, 그 나라의 문화와 분위기까지
            함께 경험하는 브랜드를 지향합니다. 단순한 요리 수업이 아니라 여행의
            감각, 식사의 즐거움, 사람 간의 연결을 담은 시간을 만듭니다.
          </p>
        </div>
      </section>

      <section id="programs" className="bg-[#f5f1ea] py-24">
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">
            Programs
          </p>
          <h2 className="text-3xl font-extrabold md:text-4xl">프로그램</h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {programs.map((program) => (
              <div
                key={program.title}
                className="rounded-[28px] border border-[#e7ded2] bg-white p-7 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition hover:-translate-y-1"
              >
                <div className="mb-5 inline-block rounded-full bg-amber-50 px-4 py-1 text-xs font-semibold tracking-[0.18em] text-amber-700">
                  CLASS
                </div>
                <h3 className="text-2xl font-bold tracking-tight">
                  {program.title}
                </h3>
                <p className="mt-4 leading-7 text-neutral-600">
                  {program.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="reservation" className="mx-auto max-w-6xl px-6 py-24">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">
          Reservation
        </p>
        <h2 className="text-3xl font-extrabold md:text-4xl">예약 문의</h2>
        <p className="mt-4 max-w-2xl leading-7 text-neutral-600">
          원하는 날짜와 인원, 문의 내용을 남겨주시면 클래스 운영 일정에 맞춰
          연락드릴 예정입니다.
        </p>

        <div className="mt-12 rounded-[32px] border border-[#e7ded2] bg-white p-8 shadow-[0_10px_40px_rgba(0,0,0,0.03)] md:p-10">
          <ReservationForm />
        </div>
      </section>

      <section id="contact" className="border-t border-[#ece4d8] bg-[#f3ede4]">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">
              Contact
            </p>
            <h2 className="text-3xl font-extrabold">함께 식탁을 만들어요</h2>
            <p className="mt-5 max-w-lg leading-8 text-neutral-600">
              클래스 제안, 협업 문의, 공간 대관, 브랜드 제휴 등 다양한 문의를
              받을 예정입니다. 아래 채널은 추후 실제 링크로 연결하면 됩니다.
            </p>
          </div>

          <div className="grid gap-4">
            <div className="rounded-3xl bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <p className="text-sm font-semibold text-neutral-500">
                Instagram
              </p>
              <p className="mt-2 text-lg font-bold">manna._.project</p>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <p className="text-sm font-semibold text-neutral-500">Email</p>
              <p className="mt-2 text-lg font-bold">
                manna.project.contact@gmail.com
              </p>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <p className="text-sm font-semibold text-neutral-500">
                Kakao Channel
              </p>
              <p className="mt-2 text-lg font-bold">추후 오픈 예정</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
