import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHead, Panel } from "@/components/shell";
import { LINKS, ROMANIA_HOTELS, ROMANIA_PILLARS, TRANSPORT_RO } from "@/data/trip";
import { useTripStore } from "@/lib/store";
import { formatUsd } from "@/lib/utils";

export const Route = createFileRoute("/romania")({ component: RomaniaPage });

function RomaniaPage() {
  const stay = useTripStore((s) => s.romaniaStay);
  const setStay = useTripStore((s) => s.setRomaniaStay);

  return (
    <div className="flex flex-col gap-8">
      <PageHead
        kicker="The second country"
        title="Brașov as base camp"
        lede="Stay in Brașov. Day one: Bran Castle (the photo) then Râșnov. Day two: Poenari — 1,480 steps, the fortress Vlad actually used. Day three: salt mine, then a palace on the way home."
      />

      <div className="grid gap-4">
        {ROMANIA_PILLARS.map((p) => (
          <Panel key={p.id} className="overflow-hidden p-0">
            <div className="grid md:grid-cols-[16rem_1fr]">
              <img src={p.image} alt={p.name} className="h-48 w-full object-cover md:h-full" />
              <div className="p-5 md:p-6">
                <p className="text-xs uppercase tracking-[0.16em] text-muted">
                  {p.status === "locked" ? "Locked" : p.time} · ~{formatUsd(p.cost)} pp
                </p>
                <h2 className="mt-1 font-display text-2xl">{p.name}</h2>
                <p className="mt-4 text-xs font-medium uppercase tracking-[0.16em] text-accent">
                  Why
                </p>
                <p className="mt-2 text-sm leading-relaxed text-fg">{p.why}</p>
                <p className="mt-4 text-xs font-medium uppercase tracking-[0.16em] text-muted">
                  Do this
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.how}</p>
                <a href={p.url} className="mt-3 inline-block text-sm underline-offset-4 hover:underline" target="_blank" rel="noreferrer">
                  Open
                </a>
              </div>
            </div>
          </Panel>
        ))}
      </div>

      <section>
        <h2 className="font-display text-2xl">Sleep</h2>
        <div className="mt-4 grid gap-3">
          {ROMANIA_HOTELS.map((h) => {
            const on = stay === h.id;
            return (
              <Panel key={h.id} className={on ? "border-fg/40" : ""}>
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-muted">{h.area} · {h.nights}</p>
                    <h3 className="mt-1 font-display text-2xl">{h.name}</h3>
                    <p className="mt-2 text-sm text-muted">{h.why}</p>
                    <p className="mt-2 text-sm tabular-nums">~{formatUsd(h.nightly)} / night for the crew</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant={on ? "primary" : "secondary"} onClick={() => setStay(h.id)}>
                      {on ? "Selected" : "Select"}
                    </Button>
                    <Button size="sm" variant="ghost" asChild>
                      <a href={h.url} target="_blank" rel="noreferrer">Open</a>
                    </Button>
                  </div>
                </div>
              </Panel>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl">How you move</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {TRANSPORT_RO.map((t) => (
            <Panel key={t.name}>
              <h3 className="font-display text-xl">{t.name}</h3>
              <p className="mt-2 text-sm tabular-nums text-fg">
                ~{formatUsd(t.cost)} {t.unit}
              </p>
              <p className="mt-2 text-sm text-muted">{t.why}</p>
            </Panel>
          ))}
        </div>
        <Button className="mt-5" variant="secondary" asChild>
          <a href={LINKS.poenari} target="_blank" rel="noreferrer">
            Open Poenari on the map
          </a>
        </Button>
      </section>
    </div>
  );
}
