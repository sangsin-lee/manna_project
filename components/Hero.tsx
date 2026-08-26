export default function Hero() {
  return (
    <section className="bg-[linear-gradient(to_bottom,#faf7f2,#ffffff)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2 md:items-center">
        <div>
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-amber-700">
            Food · Culture · Community
          </p>

          <h2 className="text-4xl font-bold leading-tight text-neutral-900 md:text-5xl">
            식탁 위에서
            <br />
            세계를 만나는 시간
          </h2>

          <p className="mt-6 max-w-xl text-base leading-7 text-neutral-600 md:text-lg">
            다양한 나라의 음식과 문화를 직접 만들고, 먹고, 나누는 소규모 클래스
            브랜드입니다. 한 끼의 경험이 여행의 기억이 되고, 사람과 사람을
            연결하는 시간이 됩니다.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#reservation"
              className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-800 transition hover:bg-neutral-100"
            >
              클래스 신청하기
            </a>
            <a
              href="#programs"
              className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-800 transition hover:bg-neutral-100"
            >
              프로그램 보기
            </a>
          </div>
        </div>

        <div className="rounded-[2rem] bg-[#eadfce] p-8 shadow-sm">
          <div className="rounded-[1.5rem] bg-white p-6 shadow-sm">
            <div className="mb-4 h-56 rounded-[1.25rem] bg-[url('https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center" />
            <h3 className="text-xl font-semibold text-neutral-900">
              이번 달 추천 클래스
            </h3>
            <p className="mt-2 text-sm leading-6 text-neutral-600">
              홍콩 딤섬, 이탈리아 식탁, 세계 디저트 체험 등 음식과 문화를 함께
              경험하는 감성 클래스
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
