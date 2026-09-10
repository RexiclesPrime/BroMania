import { createFileRoute } from "@tanstack/react-router";
import { JonesMap } from "@/components/jones-map";
import { PageHead } from "@/components/shell";
import { TRIP_FULL } from "@/data/trip";
import { useTripStore } from "@/lib/store";

export const Route = createFileRoute("/map")({ component: MapPage });

function MapPage() {
  const routing = useTripStore((s) => s.routing);

  return (
    <div className="flex flex-col gap-8">
      <PageHead
        kicker={TRIP_FULL}
        title="The line we take"
        lede="Dulles to Istanbul, then the night train toward Romania. Change the crossing on HQ if you fly instead, and the line will move."
      />
      <JonesMap routing={routing} variant="page" />
      <p className="max-w-2xl text-sm text-muted">
        Ten hours over the Atlantic. Then a night train to Sofia, a van into Romania, Brașov as
        home base. Bran for the photo. Poenari for the climb.
      </p>
    </div>
  );
}
