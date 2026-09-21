import { createFileRoute, Link } from "@tanstack/react-router";
import { JonesMap } from "@/components/jones-map";
import { AlertTriangle, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/shell";
import { buildItinerary } from "@/data/itinerary";
import {
  BUDGET_PP,
  CALLS,
  CREW_SIZE,
  ISTANBUL_STAY,
  RAIL_ALERT,
  ROLES,
  ROUTING,
  TRIP_FULL,
  TRIP_TAGLINE,
  WINDOWS,
  budgetTotal,
  type RoutingId,
  type WindowId,
} from "@/data/trip";
import { useTripStore } from "@/lib/store";
import { daysUntil, formatLongDate, formatUsd } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const windowId = useTripStore((s) => s.windowId);
  const routing = useTripStore((s) => s.routing);
  const setWindow = useTripStore((s) => s.setWindow);
  const setRouting = useTripStore((s) => s.setRouting);
  const win = WINDOWS[windowId];
  const total = budgetTotal(windowId, routing);
  const days = daysUntil(win.flyOut);
  const week = buildItinerary(windowId, routing);

  return (
    <div className="flex flex-col gap-8">
      <section className="relative overflow-hidden rounded-xl border border-border">
        <img
          src="/images/istanbul-hagia.jpg"
          alt="Hagia Sophia from the water at golden hour"
          className="h-[420px] w-full object-cover md:h-[520px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/55 to-bg/10" />
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-fg/80">
            Crew of {CREW_SIZE} · {formatUsd(BUDGET_PP)} each · Autumn 2027
          </p>
          <h1 className="max-w-xl font-display text-5xl tracking-tight md:text-7xl">
            {TRIP_FULL}
          </h1>
          <p className="mt-4 max-w-lg text-base text-fg/80 md:text-lg">{TRIP_TAGLINE}</p>
          <p className="mt-6 font-display text-3xl tabular-nums tracking-tight">
            {days} days
            <span className="ml-3 text-lg text-muted">until wheels up</span>
          </p>
        </div>
      </section>

      <div className="-mt-4 flex flex-wrap gap-3">
        <Button asChild>
          <Link to="/plan">Day by day</Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link to="/brief">Crew briefing</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link to="/train">How we cross</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link to="/map">The map</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link to="/admin">Booking list</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link to="/security">Security</Link>
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">The map</p>
          <h2 className="mt-1 font-display text-2xl">Istanbul to Transylvania</h2>
        </div>
        <JonesMap routing={routing} />
      </div>

      <Panel className="border-warn/40 bg-elevated">
        <div className="flex gap-3">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-warn" strokeWidth={1.75} />
          <div>
            <h2 className="font-display text-xl">{RAIL_ALERT.title}</h2>
            <p className="mt-2 text-sm text-muted">{RAIL_ALERT.body}</p>
            <p className="mt-3 text-sm text-fg">{RAIL_ALERT.action}</p>
          </div>
        </div>
      </Panel>

      <div className="grid gap-4 md:grid-cols-2">
        <Panel>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">Window</p>
          <h2 className="mt-2 font-display text-2xl">When we go</h2>
          <div className="mt-5 grid gap-3">
            {(Object.keys(WINDOWS) as WindowId[]).map((id) => {
              const w = WINDOWS[id];
              const on = windowId === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setWindow(id)}
                  className={`rounded-lg border p-4 text-left transition-colors duration-150 ${
                    on ? "border-fg/40 bg-elevated" : "border-border bg-bg hover:border-border-strong"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-display text-xl">{w.label}</span>
                    {w.recommended ? (
                      <span className="rounded-sm bg-fg px-2 py-0.5 text-xs font-medium text-bg">
                        Agent pick
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-2 text-sm text-muted">{w.why}</p>
                  <p className="mt-2 text-xs text-subtle">{w.weather}</p>
                </button>
              );
            })}
          </div>
        </Panel>

        <Panel>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">Crossing</p>
          <h2 className="mt-2 font-display text-2xl">Istanbul to Romania</h2>
          <div className="mt-5 grid gap-3">
            {(Object.keys(ROUTING) as RoutingId[]).map((id) => {
              const r = ROUTING[id];
              const on = routing === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setRouting(id)}
                  className={`rounded-lg border p-4 text-left transition-colors duration-150 ${
                    on ? "border-fg/40 bg-elevated" : "border-border bg-bg hover:border-border-strong"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-display text-xl">{r.label}</span>
                    <span className="text-xs text-muted">{r.short}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted">{r.summary}</p>
                </button>
              );
            })}
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          ["On the ground", win.label],
          ["Istanbul nights", `${ISTANBUL_STAY.nights} in ${ISTANBUL_STAY.neighborhood.split(" / ")[0]}`],
          ["Romania days", `${ROUTING[routing].romaniaDays}`],
          ["Spend / head", formatUsd(total)],
        ].map(([k, v]) => (
          <Panel key={k} className="p-4 md:p-5">
            <p className="text-xs uppercase tracking-[0.14em] text-muted">{k}</p>
            <p className="mt-2 font-display text-2xl tabular-nums tracking-tight">{v}</p>
          </Panel>
        ))}
      </div>

      {total > BUDGET_PP ? (
        <p className="text-sm text-warn">
          Projected {formatUsd(total)} is over the {formatUsd(BUDGET_PP)} cap. Flights and dinners
          are what blow the budget.
        </p>
      ) : (
        <p className="text-sm text-muted">
          Projected {formatUsd(total)} is inside {formatUsd(BUDGET_PP)} if we are careful. Buy the
          flights first.
        </p>
      )}

      <section>
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">The week</p>
            <h2 className="mt-1 font-display text-2xl">What we do each day</h2>
          </div>
          <Button variant="ghost" asChild>
            <Link to="/plan">
              Open the week <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <ol className="grid gap-2">
          {week.map((d, i) => (
            <li key={d.iso}>
              <Link
                to="/plan"
                hash={`day-${d.iso}`}
                className="grid gap-1 rounded-lg border border-border bg-surface p-4 transition-colors duration-150 hover:border-border-strong md:grid-cols-[4.5rem_8rem_1fr] md:items-baseline md:gap-4"
              >
                <span className="text-xs tabular-nums uppercase tracking-[0.14em] text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-subtle">{formatLongDate(d.iso)}</span>
                <span>
                  <span className="font-display text-xl text-fg">{d.title}</span>
                  <span className="mt-1 block text-sm text-muted">{d.today}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <Panel>
        <h2 className="font-display text-2xl">Two jobs</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {ROLES.map((role) => (
            <div key={role.id} className="rounded-lg border border-border bg-bg p-4">
              <p className="font-display text-xl">{role.title}</p>
              <ul className="mt-3 grid gap-2 text-sm text-muted">
                {role.duties.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Panel>

      <Panel>
        <h2 className="font-display text-2xl">Locked in</h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {CALLS.map((c) => (
            <li key={c.id} className="rounded-lg border border-border bg-bg p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-muted">{c.label}</p>
              <p className="mt-1 font-display text-xl">{c.value}</p>
              <p className="mt-1 text-sm text-muted">{c.note}</p>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel>
        <h2 className="font-display text-2xl">The plan, in four lines</h2>
        <ul className="mt-4 grid gap-3 text-sm text-muted">
          <li className="flex gap-2">
            <Check className="mt-0.5 size-4 shrink-0 text-fg" />
            <span>
              We go <span className="text-fg">15–25 Sep 2027</span>. Fly out of Dulles the night of the 14th.
            </span>
          </li>
          <li className="flex gap-2">
            <Check className="mt-0.5 size-4 shrink-0 text-fg" />
            <span>
              Three nights in Karaköy. Then the night train to Sofia on Saturday 18 Sep, then a van into Romania.
            </span>
          </li>
          <li className="flex gap-2">
            <Check className="mt-0.5 size-4 shrink-0 text-fg" />
            <span>
              Bran for the photo. Poenari (1,480 steps) the next day. Salt mine, then a palace, then home from Bucharest on the 25th.
            </span>
          </li>
          <li className="flex gap-2">
            <Check className="mt-0.5 size-4 shrink-0 text-fg" />
            <span>
              One admin buys the flights, beds, train, vans, and timed tickets. Everyone else: passport, one bag, show up.
            </span>
          </li>
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/plan">
              Day by day <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link to="/admin">Booking list</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/agents">Research bots</Link>
          </Button>
        </div>
      </Panel>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { src: "/images/galata.jpg", cap: "Karaköy, not Sultanahmet" },
          { src: "/images/poenari.jpg", cap: "Poenari. 1,480 steps. The real citadel." },
          { src: "/images/bran-castle.jpg", cap: "Bran for the photo, Poenari for Vlad" },
        ].map((p) => (
          <figure key={p.src} className="overflow-hidden rounded-lg border border-border">
            <img src={p.src} alt={p.cap} className="h-48 w-full object-cover" />
            <figcaption className="px-3 py-2 text-xs text-muted">{p.cap}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
