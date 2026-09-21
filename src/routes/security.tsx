import { createFileRoute } from "@tanstack/react-router";
import { PageHead, Panel } from "@/components/shell";
import {
  ADVISORIES,
  INSURANCE_CALL,
  KN_POINTS,
  KN_VERDICT,
  PHONES,
  RANKED_RISKS,
  SECURITY_AS_OF,
  SECURITY_JOBS,
  SECURITY_LINKS,
} from "@/data/security";
import { TRIP_FULL } from "@/data/trip";

export const Route = createFileRoute("/security")({
  head: () => ({
    meta: [{ title: `Security · ${TRIP_FULL}` }],
  }),
  component: SecurityPage,
});

function SecurityPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHead
        kicker="Read this once"
        title="What can actually go wrong"
        lede={`Five men, a city of sixteen million, a night train, a gorge. The scary word on this page is kidnap. The honest word is: not on this itinerary. Advisories as of ${SECURITY_AS_OF}. Check them again the month we fly.`}
      />

      <Panel className="border-accent/40">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
          Kidnap and ransom · {KN_VERDICT.level}
        </p>
        <h2 className="mt-2 font-display text-3xl">{KN_VERDICT.title}</h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">{KN_VERDICT.body}</p>
      </Panel>

      <section>
        <h2 className="font-display text-2xl">The K&R assessment</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted">
          If you only came here because someone said “but what about kidnapping,” this is the whole answer.
        </p>
        <ul className="mt-5 grid gap-3">
          {KN_POINTS.map((p) => (
            <li key={p.lead} className="rounded-lg border border-border bg-surface p-5">
              <p className="font-display text-xl">{p.lead}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-display text-2xl">What the State Department actually says</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {ADVISORIES.map((a) => (
            <Panel key={a.id}>
              <p className="text-xs uppercase tracking-[0.14em] text-muted">{a.where}</p>
              <h3 className="mt-1 font-display text-2xl">{a.place}</h3>
              <p className="mt-3 font-display text-xl text-parchment">{a.level}</p>
              <p className="mt-1 text-sm text-fg">{a.label}</p>
              <p className="mt-3 text-sm text-muted">{a.why}</p>
              <a
                href={a.url}
                className="mt-4 inline-block text-sm underline-offset-4 hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                Open the advisory
              </a>
            </Panel>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl">Ranked, for this week</h2>
        <p className="mt-2 max-w-3xl text-sm text-muted">
          Not the internet’s ranked list. This trip’s. Spend worry in this order.
        </p>
        <ol className="mt-5 flex flex-col gap-3">
          {RANKED_RISKS.map((r) => (
            <li key={r.rank} className="grid gap-3 rounded-lg border border-border bg-surface p-5 md:grid-cols-[3rem_1fr] md:items-start">
              <span className="font-mono text-sm text-accent">{r.rank}</span>
              <div>
                <h3 className="font-display text-xl">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{r.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="font-display text-2xl">Your job</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {SECURITY_JOBS.map((j) => (
            <Panel key={j.title}>
              <h3 className="font-display text-xl">{j.title}</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {j.duties.map((d) => (
                  <li key={d} className="border-l-2 border-pine pl-4 text-sm text-muted">
                    {d}
                  </li>
                ))}
              </ul>
            </Panel>
          ))}
        </div>
      </section>

      <Panel>
        <h2 className="font-display text-2xl">Insurance</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">{INSURANCE_CALL}</p>
        <p className="mt-3 text-sm text-muted">
          That policy is already on the booking list, about $100 a head. Medical and a medevac flight are the expensive failures. K&R is not.
        </p>
      </Panel>

      <section>
        <h2 className="font-display text-2xl">Numbers in your phone</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {PHONES.map((p) => (
            <li key={p.n} className="rounded-lg border border-border bg-surface p-5">
              <p className="text-xs uppercase tracking-[0.14em] text-muted">{p.where}</p>
              <p className="mt-1 text-sm text-fg">{p.what}</p>
              <p className="mt-2 font-display text-2xl tabular-nums">{p.n}</p>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <a href={SECURITY_LINKS.step} className="underline-offset-4 hover:underline" target="_blank" rel="noreferrer">
            Enroll in STEP
          </a>
          <a
            href={SECURITY_LINKS.istanbulConsulate}
            className="underline-offset-4 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Consulate, Istanbul
          </a>
          <a
            href={SECURITY_LINKS.bucharestEmbassy}
            className="underline-offset-4 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            Embassy, Bucharest
          </a>
        </div>
      </section>
    </div>
  );
}
