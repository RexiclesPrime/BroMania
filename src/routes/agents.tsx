import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHead, Panel } from "@/components/shell";
import { APPS_SCRIPT, SWARM } from "@/data/agents";

export const Route = createFileRoute("/agents")({ component: AgentsPage });

function AgentsPage() {
  const [copied, setCopied] = useState<string | null>(null);

  async function copy(id: string, text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      window.setTimeout(() => setCopied(null), 1600);
    } catch {
      setCopied("fail");
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <PageHead
        kicker="Research"
        title="Eight Google bots"
        lede="They watch prices and draft notes. They do not pay. When it is time to buy, use the booking list. One person still holds the card."
      />

      <Panel>
        <h2 className="font-display text-2xl">How it is wired</h2>
        <ol className="mt-4 grid gap-2 text-sm text-muted">
          <li>1. Create a Google Sheet named Project Bromania MMXXVII — Ledger with tabs Fares, Beds, Rail, Bookings, Ledger, Vans.</li>
          <li>2. Create Gmail label Bromania-MMXXVII and a filter for airline, hotel, and CFR mail.</li>
          <li>3. Create Calendar Bromania 2027 and share it with the five.</li>
          <li>4. Paste the Apps Script below into the Sheet. Set the Sunday 18:00 ET trigger.</li>
          <li>5. Each week, run the agent prompts (or a Gemini Gem per agent) against that Sheet.</li>
          <li>6. When it is time to pay, use the Admin desk. The swarm does not get the card.</li>
        </ol>
        <Button className="mt-5" asChild>
          <Link to="/admin">Open the booking list</Link>
        </Button>
      </Panel>

      <div className="grid gap-3">
        {SWARM.map((agent) => (
          <Panel key={agent.id} className={"status" in agent && agent.status === "killed" ? "opacity-70" : ""}>
            <p className="text-xs uppercase tracking-[0.16em] text-muted">
              {"status" in agent && agent.status === "killed" ? "Stand down" : agent.cadence}
            </p>
            <h2 className="mt-1 font-display text-2xl">{agent.name}</h2>
            <p className="mt-2 text-sm text-fg">{agent.job}</p>
            <p className="mt-2 text-sm text-muted">{agent.tools}</p>
            <pre className="mt-4 overflow-x-auto rounded-md bg-bg p-4 text-xs leading-relaxed text-muted">
              {agent.prompt}
            </pre>
            <Button
              className="mt-3"
              size="sm"
              variant="secondary"
              onClick={() => copy(agent.id, agent.prompt)}
            >
              {copied === agent.id ? "Copied" : "Copy prompt"}
            </Button>
          </Panel>
        ))}
      </div>

      <Panel>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-2xl">Apps Script starter</h2>
          <Button size="sm" variant="secondary" onClick={() => copy("script", APPS_SCRIPT)}>
            {copied === "script" ? "Copied" : "Copy script"}
          </Button>
        </div>
        <pre className="mt-4 overflow-x-auto rounded-md bg-bg p-4 text-xs leading-relaxed text-muted">
          {APPS_SCRIPT}
        </pre>
      </Panel>
    </div>
  );
}
