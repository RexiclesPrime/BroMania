import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHead, Panel } from "@/components/shell";
import { FLIGHT_LINKS, FLIGHTS, QUESTIONS, WINDOWS } from "@/data/trip";
import { useTripStore } from "@/lib/store";

export const Route = createFileRoute("/flights")({ component: FlightsPage });

function FlightsPage() {
  const windowId = useTripStore((s) => s.windowId);
  const brief = useTripStore((s) => s.brief);
  const setBrief = useTripStore((s) => s.setBrief);
  const fareLink = windowId === "sep" ? FLIGHT_LINKS.googleSep : FLIGHT_LINKS.googleOct;

  return (
    <div className="flex flex-col gap-8">
      <PageHead
        kicker="Flights"
        title="One booking, five names"
        lede="Turkish is the only nonstop Dulles to Istanbul. Buy one ticket that flies you to Istanbul and home from Bucharest. Choose ExtraFly so you get a suitcase. Do not choose EcoFly. Do not buy five separate tickets."
      />

      <div className="grid gap-3">
        {FLIGHTS.map((f) => (
          <Panel key={f.id} className={f.recommended ? "border-fg/40" : ""}>
            <p className="text-xs uppercase tracking-[0.16em] text-muted">
              {f.direction === "out" ? "Outbound" : "Home"} · {f.airline}
              {f.recommended ? " · pick this" : ""}
            </p>
            <h2 className="mt-1 font-display text-2xl">
              {f.code} · {f.from} → {f.to}
            </h2>
            <p className="mt-2 text-sm tabular-nums text-fg">
              {f.dep} → {f.arr} · {f.duration} · {f.aircraft}
            </p>
            <p className="mt-2 text-sm text-muted">{f.note}</p>
          </Panel>
        ))}
      </div>

      <Panel>
        <p className="text-xs uppercase tracking-[0.16em] text-muted">The fare</p>
        <h2 className="mt-1 font-display text-2xl">ExtraFly</h2>
        <p className="mt-3 text-sm text-muted">
          ExtraFly includes one 23 kg suitcase, one 8 kg cabin bag, and one 4 kg personal bag. Q is
          just the cheap price, not a different plane. EcoFly often has no suitcase. The packing
          list lives on the booking page.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/admin">Open the desk</Link>
          </Button>
          <Button variant="secondary" asChild>
            <a href={fareLink} target="_blank" rel="noreferrer">Google Flights, this window</a>
          </Button>
          <Button variant="ghost" asChild>
            <a href={FLIGHT_LINKS.turkish} target="_blank" rel="noreferrer">Turkish Airlines</a>
          </Button>
        </div>
      </Panel>

      <Panel>
        <h2 className="font-display text-2xl">Open questions for the crew</h2>
        <p className="mt-2 text-sm text-muted">Answers live in this browser. Fill them so the swarm has a brief.</p>
        <div className="mt-5 grid gap-5">
          {QUESTIONS.map((q) => (
            <label key={q.id} className="grid gap-2">
              <span className="text-sm text-fg">{q.label}</span>
              <span className="text-xs text-subtle">{q.hint}</span>
              <textarea
                value={brief[q.id] ?? ""}
                onChange={(e) => setBrief(q.id, e.target.value)}
                rows={2}
                className="rounded-md border border-border bg-bg px-3 py-2 text-sm text-fg outline-none focus:border-border-strong"
              />
            </label>
          ))}
        </div>
      </Panel>

      <p className="text-xs text-subtle">
        Window locked to {WINDOWS[windowId].label}. US passports are visa-free in both countries for this length of stay.
      </p>
    </div>
  );
}
