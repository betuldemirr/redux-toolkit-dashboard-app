interface LoadingStateProps {
  type?: "product" | "user";
  count?: number;
}

export default function LoadingState({
  type = "product",
  count = 9,
}: LoadingStateProps) {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <div className="h-6 w-56 animate-pulse rounded bg-zinc-800" />
        <div className="mt-3 h-4 w-72 animate-pulse rounded bg-zinc-900" />
      </div>

      <ul
        className={`grid gap-4 ${
          type === "user"
            ? "grid-cols-1 sm:grid-cols-2"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {Array.from({ length: count }).map((_, i) => (
          <li
            key={i}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4"
          >
            <div className="flex gap-4">
              <div
                className={`animate-pulse rounded-xl bg-zinc-900 ${
                  type === "user" ? "h-12 w-12" : "h-20 w-20"
                }`}
              />

              <div className="flex-1 space-y-3">
                <div className="h-4 w-5/6 animate-pulse rounded bg-zinc-800" />
                <div className="h-3 w-full animate-pulse rounded bg-zinc-900" />
                <div className="h-3 w-4/5 animate-pulse rounded bg-zinc-900" />

                {type === "product" && (
                  <div className="mt-2 flex items-center justify-between">
                    <div className="h-4 w-16 animate-pulse rounded bg-zinc-800" />
                    <div className="h-5 w-20 animate-pulse rounded-full bg-zinc-800" />
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}