export default function StoryDetailLoading() {
  return (
    <main className="min-h-screen animate-pulse bg-[#fffdf9] text-neutral-950">
      <section className="border-b border-stone-200 bg-[#f4efe7]">
        <div className="mx-auto max-w-6xl px-6 py-10 lg:py-14">
          <div className="h-4 w-60 rounded-full bg-stone-200" />
          <div className="mt-9 grid overflow-hidden rounded-[2.25rem] border border-stone-200 bg-white lg:grid-cols-[0.92fr_1.08fr]">
            <div className="min-h-[360px] bg-stone-200 sm:min-h-[500px]" />
            <div className="p-8 sm:p-11 lg:p-12">
              <div className="h-3 w-32 rounded-full bg-stone-200" />
              <div className="mt-6 h-10 w-full rounded-xl bg-stone-200" />
              <div className="mt-3 h-10 w-4/5 rounded-xl bg-stone-200" />
              <div className="mt-7 h-5 w-full rounded-full bg-stone-100" />
              <div className="mt-3 h-5 w-5/6 rounded-full bg-stone-100" />
              <div className="mt-8 grid grid-cols-3 gap-3">
                <div className="h-20 rounded-2xl bg-stone-100" />
                <div className="h-20 rounded-2xl bg-stone-100" />
                <div className="h-20 rounded-2xl bg-stone-100" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="h-8 w-2/3 rounded-xl bg-stone-200" />
        <div className="mt-8 space-y-4">
          <div className="h-5 w-full rounded-full bg-stone-100" />
          <div className="h-5 w-full rounded-full bg-stone-100" />
          <div className="h-5 w-4/5 rounded-full bg-stone-100" />
        </div>
      </section>
    </main>
  );
}
