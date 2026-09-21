import { createFileRoute } from "@tanstack/react-router";
import { CrewDeck } from "@/components/crew-deck";
import { TRIP_FULL } from "@/data/trip";

export const Route = createFileRoute("/brief")({
  head: () => ({
    meta: [{ title: `Crew briefing · ${TRIP_FULL}` }],
  }),
  component: BriefPage,
});

function BriefPage() {
  return (
    <div className="fixed inset-0 z-50 bg-bg">
      <CrewDeck />
    </div>
  );
}
