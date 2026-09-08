export default function Loading() {
  return (
    <main
      className="mx-auto min-h-[65vh] max-w-6xl px-6 py-20"
      aria-busy="true"
      aria-label="콘텐츠 불러오는 중"
    >
      <div className="h-3 w-40 animate-pulse rounded-full bg-stone-200" />
      <div className="mt-6 h-12 max-w-xl animate-pulse rounded-2xl bg-stone-200" />
      <div className="mt-5 h-5 max-w-2xl animate-pulse rounded-full bg-stone-100" />
      <div className="mt-3 h-5 max-w-xl animate-pulse rounded-full bg-stone-100" />

      <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((item) => (
          <div
            key={item}
            className="overflow-hidden rounded-[1.75rem] border border-stone-200 bg-white"
          >
            <div className="h-56 animate-pulse bg-stone-200" />
            <div className="p-7">
              <div className="h-5 w-2/3 animate-pulse rounded-full bg-stone-200" />
              <div className="mt-5 h-4 animate-pulse rounded-full bg-stone-100" />
              <div className="mt-3 h-4 w-4/5 animate-pulse rounded-full bg-stone-100" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
