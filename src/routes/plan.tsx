import { createFileRoute } from "@tanstack/react-router";
import { PageHead } from "@/components/shell";
import { buildItinerary } from "@/data/itinerary";
import { ROUTING, TRIP_FULL, WINDOWS } from "@/data/trip";
import { useTripStore } from "@/lib/store";
import { formatLongDate } from "@/lib/utils";

export const Route = createFileRoute("/plan")({ component: PlanPage });

function PlanPage() {
  const windowId = useTripStore((s) => s.windowId);
  const routing = useTripStore((s) => s.routing);
  const days = buildItinerary(windowId, routing);
  const win = WINDOWS[windowId];
  const route = ROUTING[routing];

  return (
    <div>
      <PageHead
        kicker={TRIP_FULL}
        title="Day by day"
        lede={`${win.label}. ${route.label}. Each day has two lines at the top: what you are doing, and whose job it is. If you only read those, you will still make the train.`}
      />
      <p className="mb-8 max-w-2xl text-sm text-muted">{route.drops}</p>

      <nav className="mb-10 flex gap-2 overflow-x-auto pb-2">
        {days.map((day, i) => (
          <a
            key={day.iso}
            href={`#day-${day.iso}`}
            className="flex h-11 shrink-0 items-center rounded-sm border border-border bg-surface px-3 text-xs text-muted transition-colors duration-150 hover:border-border-strong hover:text-fg"
          >
            <span className="tabular-nums text-subtle">{String(i + 1).padStart(2, "0")}</span>
            <span className="ml-2">{day.city.split(/[→/]/)[0].trim()}</span>
          </a>
        ))}
      </nav>

      <ol className="flex flex-col gap-12">
        {days.map((day, i) => (
          <li key={day.iso} id={`day-${day.iso}`}>
            <article className="overflow-hidden rounded-xl border border-border bg-surface">
              {day.image ? (
                <div className="relative">
                  <img
                    src={day.image}
                    alt={day.title}
                    className="h-56 w-full object-cover md:h-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/25 to-transparent" />
                  <p className="absolute bottom-4 left-5 text-xs font-medium uppercase tracking-[0.18em] text-fg/85 md:left-8">
                    {day.chapter}
                  </p>
                </div>
              ) : (
                <p className="px-5 pt-6 text-xs font-medium uppercase tracking-[0.18em] text-muted md:px-8 md:pt-8">
                  {day.chapter}
                </p>
              )}

              <div className="px-5 py-6 md:px-8 md:py-10">
                <p className="text-xs uppercase tracking-[0.16em] text-muted">
                  Day {String(i + 1).padStart(2, "0")} · {formatLongDate(day.iso)} · {day.city}
                </p>
                <h2 className="mt-2 font-display text-3xl tracking-tight md:text-4xl">{day.title}</h2>
                <p className="mt-1 text-sm text-subtle">Sleep: {day.lodging}</p>

                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  <div className="rounded-lg border border-border bg-bg p-5 md:p-6">
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
                      Today
                    </p>
                    <p className="mt-3 text-base leading-relaxed text-fg">{day.today}</p>
                  </div>
                  <div className="rounded-lg border border-border bg-bg p-5 md:p-6">
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
                      Your job
                    </p>
                    <p className="mt-3 text-base leading-relaxed text-fg">{day.job}</p>
                  </div>
                </div>

                <div className="mt-6 max-w-3xl">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
                    Why this day is on the trip
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-muted">{day.pitch}</p>
                </div>

                <ol className="mt-8 grid gap-8">
                  {day.blocks.map((b) => (
                    <li key={b.title} className="border-t border-border pt-6">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="text-xs tabular-nums uppercase tracking-[0.14em] text-muted">
                          {b.time}
                        </span>
                        <h3 className="font-display text-2xl md:text-3xl">{b.title}</h3>
                      </div>
                      <div className="mt-4 grid gap-5 md:grid-cols-2">
                        <div>
                          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
                            Why
                          </p>
                          <p className="mt-2 text-sm leading-relaxed text-fg">{b.why}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
                            Do this
                          </p>
                          <p className="mt-2 text-sm leading-relaxed text-muted">{b.how}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}
