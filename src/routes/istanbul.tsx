import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHead, Panel } from "@/components/shell";
import {
  ISTANBUL_DAYS,
  ISTANBUL_EVENTS,
  ISTANBUL_HOTELS,
  ISTANBUL_STAY,
} from "@/data/trip";
import { useTripStore } from "@/lib/store";
import { asset, formatUsd } from "@/lib/utils";

export const Route = createFileRoute("/istanbul")({ component: IstanbulPage });

function IstanbulPage() {
  const stay = useTripStore((s) => s.istanbulStay);
  const setStay = useTripStore((s) => s.setIstanbulStay);

  return (
    <div className="flex flex-col gap-8">
      <PageHead
        kicker="The first city"
        title="Three nights in Karaköy"
        lede="Wednesday land, Thursday old city, Friday boat and bath. Saturday is the train. Stay on the nightlife side of the water, not in the museum neighborhood."
      />

      <div className="grid gap-4 md:grid-cols-2">
        <img
          src={asset("/images/galata.jpg")}
          alt="Galata Tower at dusk"
          className="h-72 w-full rounded-xl object-cover"
        />
        <Panel>
          <h2 className="font-display text-2xl">Why not Sultanahmet</h2>
          <p className="mt-3 text-sm text-muted">{ISTANBUL_STAY.why}</p>
        </Panel>
      </div>

      <section>
        <h2 className="font-display text-2xl">The three days</h2>
        <div className="mt-4 grid gap-4">
          {ISTANBUL_DAYS.map((d, i) => (
            <Panel key={d.title} className="overflow-hidden p-0">
              <div className="grid md:grid-cols-[14rem_1fr]">
                <img src={d.image} alt="" className="h-44 w-full object-cover md:h-full" />
                <div className="p-5 md:p-6">
                  <p className="text-xs uppercase tracking-[0.16em] text-muted">Day {i + 1}</p>
                  <h3 className="mt-1 font-display text-2xl">{d.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg">{d.pitch}</p>
                  <ul className="mt-5 grid gap-4">
                    {d.beats.map((b) => (
                      <li key={b.title} className="border-t border-border pt-4">
                        <h4 className="font-display text-xl">{b.title}</h4>
                        <p className="mt-3 text-xs font-medium uppercase tracking-[0.16em] text-muted">
                          Why
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-fg">{b.why}</p>
                        <p className="mt-3 text-xs font-medium uppercase tracking-[0.16em] text-muted">
                          Do this
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-muted">{b.how}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Panel>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl">Beds</h2>
        <p className="mt-2 text-sm text-muted">
          Pick one. The apartment is the default. Prices are what it cost in 2026 — check again before you book.
        </p>
        <div className="mt-4 grid gap-3">
          {ISTANBUL_HOTELS.map((h) => {
            const on = stay === h.id;
            return (
              <Panel key={h.id} className={on ? "border-fg/40" : ""}>
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-muted">{h.fit} · {h.area}</p>
                    <h3 className="mt-1 font-display text-2xl">{h.name}</h3>
                    <p className="mt-2 text-sm text-muted">{h.why}</p>
                    <p className="mt-2 text-sm tabular-nums text-fg">
                      ~{formatUsd(h.nightly)} / night for the crew · {h.rooms}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Button size="sm" variant={on ? "primary" : "secondary"} onClick={() => setStay(h.id)}>
                      {on ? "Selected" : "Select"}
                    </Button>
                    <Button size="sm" variant="ghost" asChild>
                      <a href={h.url} target="_blank" rel="noreferrer">
                        Open
                      </a>
                    </Button>
                  </div>
                </div>
              </Panel>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl">What is actually on in town</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {ISTANBUL_EVENTS.map((e) => (
            <Panel key={e.name}>
              <p className="text-xs text-muted">{e.when}</p>
              <h3 className="mt-2 font-display text-xl">{e.name}</h3>
              <p className="mt-2 text-sm text-muted">{e.why}</p>
              <a href={e.url} className="mt-3 inline-block text-sm text-fg underline-offset-4 hover:underline" target="_blank" rel="noreferrer">
                Source
              </a>
            </Panel>
          ))}
        </div>
      </section>
    </div>
  );
}
