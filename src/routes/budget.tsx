import { createFileRoute } from "@tanstack/react-router";
import { PageHead, Panel } from "@/components/shell";
import { BUDGET_LINES, BUDGET_PP, CREW_SIZE, ROUTING, budgetTotal } from "@/data/trip";
import { useTripStore } from "@/lib/store";
import { formatUsd } from "@/lib/utils";

export const Route = createFileRoute("/budget")({ component: BudgetPage });

function BudgetPage() {
  const windowId = useTripStore((s) => s.windowId);
  const routing = useTripStore((s) => s.routing);
  const key = windowId === "sep" ? "sep" : "oct";
  const total = budgetTotal(windowId, routing);
  const over = total - BUDGET_PP;
  const crew = total * CREW_SIZE;

  return (
    <div className="flex flex-col gap-8">
      <PageHead
        kicker="Money"
        title={`${formatUsd(BUDGET_PP)} each`}
        lede="These are 2026 prices, used to guess 2027. Not a quote. Flights and dinners are the two numbers that can blow it. Buy ExtraFly so you get a suitcase — EcoFly looks cheaper and often has no bag."
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Panel>
          <p className="text-xs uppercase tracking-[0.14em] text-muted">Per man</p>
          <p className="mt-2 font-display text-3xl tabular-nums">{formatUsd(total)}</p>
        </Panel>
        <Panel>
          <p className="text-xs uppercase tracking-[0.14em] text-muted">Cap</p>
          <p className="mt-2 font-display text-3xl tabular-nums">{formatUsd(BUDGET_PP)}</p>
        </Panel>
        <Panel>
          <p className="text-xs uppercase tracking-[0.14em] text-muted">Five of you</p>
          <p className="mt-2 font-display text-3xl tabular-nums">{formatUsd(crew)}</p>
        </Panel>
        <Panel>
          <p className="text-xs uppercase tracking-[0.14em] text-muted">Margin</p>
          <p className="mt-2 font-display text-3xl tabular-nums">
            {over > 0 ? `−${formatUsd(over)}` : formatUsd(-over)}
          </p>
        </Panel>
      </div>

      <Panel className="overflow-x-auto p-0">
        <table className="w-full min-w-[32rem] text-left text-sm">
          <thead className="border-b border-border text-xs uppercase tracking-[0.14em] text-muted">
            <tr>
              <th className="px-5 py-3 font-medium">Line</th>
              <th className="px-5 py-3 font-medium">This plan</th>
              <th className="px-5 py-3 font-medium">Note</th>
            </tr>
          </thead>
          <tbody>
            {BUDGET_LINES.map((line) => {
              const amount = line.id === "link" ? ROUTING[routing].costPp : line[key];
              return (
                <tr key={line.id} className="border-b border-border/80">
                  <td className="px-5 py-3 text-fg">{line.label}</td>
                  <td className="px-5 py-3 tabular-nums">{formatUsd(amount)}</td>
                  <td className="px-5 py-3 text-muted">{line.note}</td>
                </tr>
              );
            })}
            <tr>
              <td className="px-5 py-3 font-medium">Total per man</td>
              <td className="px-5 py-3 font-medium tabular-nums">{formatUsd(total)}</td>
              <td className="px-5 py-3 text-muted">
                {over > 0
                  ? "Over. Cut hotel rooms (go apartment) or the dinner budget before you cut Poenari."
                  : "Inside the cap if air stays near $1,200."}
              </td>
            </tr>
          </tbody>
        </table>
      </Panel>
    </div>
  );
}
