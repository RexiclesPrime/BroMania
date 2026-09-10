import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHead, Panel } from "@/components/shell";
import { LINKS, RAIL_ALERT, ROUTING, type RoutingId } from "@/data/trip";
import { useTripStore } from "@/lib/store";
import { formatUsd } from "@/lib/utils";

export const Route = createFileRoute("/train")({ component: TrainPage });

function TrainPage() {
  const routing = useTripStore((s) => s.routing);
  const setRouting = useTripStore((s) => s.setRouting);

  return (
    <div className="flex flex-col gap-8">
      <PageHead
        kicker="How we get to Romania"
        title="The night train to Bucharest is closed"
        lede="You wanted a countryside sleeper. The usual train to Bucharest cannot run in 2027 because the bridge is shut. The real plan: night train Istanbul to Sofia (that one still runs), then a van into Romania."
      />

      <img
        src="/images/sleeper.jpg"
        alt="European sleeper compartment"
        className="h-72 w-full rounded-xl object-cover"
      />

      <Panel className="border-warn/40">
        <h2 className="font-display text-2xl">{RAIL_ALERT.title}</h2>
        <p className="mt-3 text-sm text-muted">{RAIL_ALERT.body}</p>
        <p className="mt-3 text-sm">{RAIL_ALERT.action}</p>
      </Panel>

      <section className="grid gap-4">
        <h2 className="font-display text-2xl">How the train used to work</h2>
        <Panel>
          <dl className="grid gap-4 text-sm md:grid-cols-2">
            <div>
              <dt className="text-muted">2026 summer pattern</dt>
              <dd className="mt-1">Halkalı 20:00 → București Nord 16:56 next day. Train 460 / Bosfor. Turkish 4-berth couchette from ~€58.</dd>
            </div>
            <div>
              <dt className="text-muted">Season</dt>
              <dd className="mt-1">Direct couchette mid-June to ~10–12 October. Year-round you change via the Sofia sleeper.</dd>
            </div>
            <div>
              <dt className="text-muted">Stations</dt>
              <dd className="mt-1">Not Sirkeci. Halkalı, reached by Marmaray. In Romania, Gara de Nord — then CFR to Brașov (2.5–3h), taxi to Bran.</dd>
            </div>
            <div>
              <dt className="text-muted">Book</dt>
              <dd className="mt-1">CFR international site, 90 days out, or TCDD. Five berths = two compartments. Do not wait for 2027 PDFs that do not exist yet.</dd>
            </div>
          </dl>
        </Panel>
      </section>

      <section>
        <h2 className="font-display text-2xl">Three ways across in 2027</h2>
        <div className="mt-4 grid gap-3">
          {(Object.keys(ROUTING) as RoutingId[]).map((id) => {
            const r = ROUTING[id];
            const on = routing === id;
            return (
              <Panel key={id} className={on ? "border-fg/40" : ""}>
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-muted">
                      {r.recommended ? "Agent pick" : r.honor ? "Honors the brief" : "Fallback"} · ~{formatUsd(r.costPp)} pp · {r.romaniaDays} Romania days
                    </p>
                    <h3 className="mt-1 font-display text-2xl">{r.label}</h3>
                    <p className="mt-2 text-sm text-muted">{r.summary}</p>
                    <p className="mt-2 text-sm text-subtle">{r.drops}</p>
                  </div>
                  <Button size="sm" variant={on ? "primary" : "secondary"} onClick={() => setRouting(id)}>
                    {on ? "Selected" : "Use this"}
                  </Button>
                </div>
              </Panel>
            );
          })}
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <Button variant="secondary" asChild>
          <a href={LINKS.cfr} target="_blank" rel="noreferrer">CFR international tickets</a>
        </Button>
        <Button variant="secondary" asChild>
          <a href={LINKS.tcdd} target="_blank" rel="noreferrer">TCDD e-bilet</a>
        </Button>
        <Button variant="ghost" asChild>
          <a href={LINKS.seat61} target="_blank" rel="noreferrer">Seat61 Turkey</a>
        </Button>
      </div>
    </div>
  );
}
