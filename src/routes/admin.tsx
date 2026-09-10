import { createFileRoute } from "@tanstack/react-router";
import { Check, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHead, Panel } from "@/components/shell";
import {
  BOOKINGS,
  DOOR_MODES,
  DOORS,
  EXTRAFY_Q,
  PACK_BAGS,
  PACKING,
  PICNIC,
  PICNIC_ITEMS,
  PICNIC_KINDS,
  bookingsCrewTotal,
  doorsByMode,
  requiredBookings,
  type Door,
} from "@/data/admin";
import { CREW_SIZE, ROLES } from "@/data/trip";
import { useTripStore } from "@/lib/store";
import { cn, formatUsd } from "@/lib/utils";

export const Route = createFileRoute("/admin")({ component: AdminPage });

const TOC = [
  { href: "#jobs", label: "Who does what" },
  { href: "#prices", label: "Prices" },
  { href: "#book", label: "Buy these" },
  { href: "#doors", label: "Tickets" },
  { href: "#picnic", label: "Train food" },
  { href: "#bags", label: "Bags" },
] as const;

function AdminPage() {
  const booked = useTripStore((s) => s.booked);
  const toggleBooked = useTripStore((s) => s.toggleBooked);
  const packing = useTripStore((s) => s.packing);
  const togglePacked = useTripStore((s) => s.togglePacked);
  const doors = useTripStore((s) => s.doors);
  const toggleDoor = useTripStore((s) => s.toggleDoor);
  const picnic = useTripStore((s) => s.picnic);
  const togglePicnic = useTripStore((s) => s.togglePicnic);

  const bookedCount = BOOKINGS.filter((b) => booked.includes(b.id)).length;
  const packCount = PACKING.filter((p) => p.bag !== "leave" && packing.includes(p.id)).length;
  const packTotal = PACKING.filter((p) => p.bag !== "leave").length;
  const must = requiredBookings();
  const cardTypical = bookingsCrewTotal(must);
  const cardPp = Math.round(cardTypical / CREW_SIZE);
  const stillOpen = bookingsCrewTotal(must.filter((b) => !booked.includes(b.id)));
  const optional = BOOKINGS.filter((b) => b.optional);
  const optionalCrew = bookingsCrewTotal(optional);
  const doorDone = DOORS.filter((d) => d.mode !== "optional" && doors.includes(d.id)).length;
  const doorNeed = DOORS.filter((d) => d.mode !== "optional").length;
  const picnicDone = PICNIC_ITEMS.filter((p) => picnic.includes(p.id)).length;

  const phases = ["Air", "Beds", "Crossing", "Ground", "Paper"] as const;

  return (
    <div className="flex flex-col gap-8">
      <PageHead
        kicker="Booking list"
        title="One person buys. Everyone else shows up."
        lede="This page is for the guy with the credit card. Buy the flights, beds, train, vans, and tickets in the order below. Prices are what things cost in 2026, so we can guess 2027. Not a quote. Dinners are separate — Splitwise, not this list."
      />

      <nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
        {TOC.map((item) => (
          <a key={item.href} href={item.href} className="text-muted hover:text-fg">
            {item.label}
          </a>
        ))}
      </nav>

      <section id="jobs">
        <Panel>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">Read this first</p>
          <h2 className="mt-2 font-display text-2xl">Who does what</h2>
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
      </section>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Panel className="p-4 md:p-5">
          <p className="text-xs uppercase tracking-[0.14em] text-muted">Booked</p>
          <p className="mt-2 font-display text-3xl tabular-nums">
            {bookedCount}
            <span className="ml-1 text-lg text-muted">/ {BOOKINGS.length}</span>
          </p>
        </Panel>
        <Panel className="p-4 md:p-5">
          <p className="text-xs uppercase tracking-[0.14em] text-muted">Tickets</p>
          <p className="mt-2 font-display text-3xl tabular-nums">
            {doorDone}
            <span className="ml-1 text-lg text-muted">/ {doorNeed}</span>
          </p>
        </Panel>
        <Panel className="p-4 md:p-5">
          <p className="text-xs uppercase tracking-[0.14em] text-muted">Rough total</p>
          <p className="mt-2 font-display text-3xl tabular-nums">{formatUsd(cardTypical)}</p>
          <p className="mt-1 text-xs text-muted">{formatUsd(cardPp)} a head</p>
        </Panel>
        <Panel className="p-4 md:p-5">
          <p className="text-xs uppercase tracking-[0.14em] text-muted">Still to buy</p>
          <p className="mt-2 font-display text-3xl tabular-nums">{formatUsd(stillOpen)}</p>
          <p className="mt-1 text-xs text-muted">
            Picnic {picnicDone}/{PICNIC_ITEMS.length} · bags {packCount}/{packTotal}
          </p>
        </Panel>
      </div>

      <section id="prices">
        <Panel className="p-0">
          <div className="px-5 pt-5 md:px-6 md:pt-6">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
              Rough 2026 prices · one card · five men
            </p>
            <h2 className="mt-2 font-display text-2xl">What it costs, roughly</h2>
            <p className="mt-2 max-w-2xl text-sm text-muted">
              What one card actually pays. Not a quote. Flights are the big number. The Bucharest
              hotel is optional and sits under the line. Dinners are not on this list. Train food
              is a small Saturday shop — see Train food below.
            </p>
          </div>
          <ol className="mt-5 border-t border-border">
            {BOOKINGS.map((b) => {
              const on = booked.includes(b.id);
              return (
                <li
                  key={b.id}
                  className={cn(
                    "flex flex-col gap-1 border-b border-border/80 px-5 py-3 md:flex-row md:items-baseline md:justify-between md:gap-8 md:px-6",
                    (on || b.optional) && "text-muted",
                  )}
                >
                  <div className="min-w-0">
                    <p>
                      <span className="text-xs tabular-nums text-muted">
                        {String(b.step).padStart(2, "0")}
                      </span>
                      <span className={cn("ml-3", on ? "line-through" : "text-fg")}>{b.title}</span>
                      {b.optional ? (
                        <span className="ml-2 text-xs uppercase tracking-[0.12em] text-muted">
                          optional
                        </span>
                      ) : null}
                    </p>
                    <p className="mt-1 pl-8 text-sm text-muted">{b.range}</p>
                  </div>
                  <p className="pl-8 font-display text-xl tabular-nums tracking-tight md:pl-0 md:text-right">
                    {formatUsd(b.crew)}
                    <span className="ml-2 text-sm text-muted">{formatUsd(b.pp)} / man</span>
                  </p>
                </li>
              );
            })}
            <li className="flex flex-col gap-1 border-b border-border/80 px-5 py-3 md:flex-row md:items-baseline md:justify-between md:gap-8 md:px-6">
              <div>
                <p className="font-medium">Typical total, the nine things you must buy</p>
                <p className="mt-1 text-sm text-muted">Bucharest hotel not included</p>
              </div>
              <p className="font-display text-xl tabular-nums tracking-tight md:text-right">
                {formatUsd(cardTypical)}
                <span className="ml-2 text-sm text-muted">{formatUsd(cardPp)} / man</span>
              </p>
            </li>
            <li className="flex flex-col gap-1 px-5 py-3 text-muted md:flex-row md:items-baseline md:justify-between md:gap-8 md:px-6">
              <div>
                <p>If you take the extra Bucharest night</p>
                <p className="mt-1 text-sm">Adds {formatUsd(optionalCrew)} for the crew</p>
              </div>
              <p className="font-display text-xl tabular-nums tracking-tight md:text-right">
                {formatUsd(cardTypical + optionalCrew)}
                <span className="ml-2 text-sm">
                  {formatUsd(Math.round((cardTypical + optionalCrew) / CREW_SIZE))} / man
                </span>
              </p>
            </li>
          </ol>
        </Panel>
      </section>

      <Panel>
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">How this works</p>
        <h2 className="mt-2 font-display text-2xl">You buy. The bots only watch.</h2>
        <ol className="mt-4 grid gap-2 text-sm text-muted">
          <li>1. Buy in this order. Flights first — it is 2026 and the trip is 2027.</li>
          <li>2. One card. One booking for the five of you. One apartment per city. One van. Do not split into five confirmations.</li>
          <li>3. Book apartments that you can cancel. Lock them after the flights are paid.</li>
          <li>4. The research bots can watch prices. They do not get the card.</li>
          <li>5. Tick a line when the confirmation is in the group chat.</li>
        </ol>
      </Panel>

      <section id="book" className="flex flex-col gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">Buy in this order</p>
          <h2 className="mt-1 font-display text-2xl">The big bookings</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            Same numbers as the list above. The Bucharest hotel is optional and is not in the{" "}
            {formatUsd(cardTypical)} total.
          </p>
        </div>
        {phases.map((phase) => (
          <div key={phase} className="flex flex-col gap-3">
            <h3 className="text-xs font-medium uppercase tracking-[0.16em] text-muted">{phase}</h3>
            {BOOKINGS.filter((b) => b.phase === phase).map((b) => {
              const on = booked.includes(b.id);
              return (
                <Panel key={b.id} className={on ? "border-fg/40" : ""}>
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-[0.14em] text-muted">
                        Step {String(b.step).padStart(2, "0")} · {b.when}
                        {b.optional ? " · optional" : ""}
                      </p>
                      <div className="mt-1 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <h3 className="font-display text-2xl">{b.title}</h3>
                        <p className="font-display text-2xl tabular-nums tracking-tight">
                          {formatUsd(b.crew)}
                          <span className="ml-2 text-base text-muted">{formatUsd(b.pp)} / man</span>
                        </p>
                      </div>
                      <p className="mt-2 text-sm text-muted">
                        {b.range}. {b.basis}
                      </p>
                      <p className="mt-3 text-sm text-fg">
                        <span className="text-muted">Where. </span>
                        {b.where}
                      </p>
                      <p className="mt-2 text-sm text-fg">
                        <span className="text-muted">How. </span>
                        {b.how}
                      </p>
                      <p className="mt-2 text-sm text-muted">{b.swarm}</p>
                    </div>
                    <div className="flex shrink-0 flex-col gap-2 md:w-48">
                      <button
                        type="button"
                        onClick={() => toggleBooked(b.id)}
                        className={cn(
                          "flex h-11 items-center justify-center gap-2 rounded-md border text-sm",
                          on
                            ? "border-fg bg-fg text-bg"
                            : "border-border bg-elevated text-fg hover:border-border-strong",
                        )}
                      >
                        {on ? (
                          <Check className="size-4" strokeWidth={1.75} />
                        ) : (
                          <ClipboardList className="size-4" strokeWidth={1.75} />
                        )}
                        {on ? "Booked" : "Mark booked"}
                      </button>
                      <Button variant="secondary" asChild>
                        <a href={b.url} target="_blank" rel="noreferrer">
                          {b.urlLabel}
                        </a>
                      </Button>
                      {b.altUrl ? (
                        <Button variant="ghost" asChild>
                          <a href={b.altUrl} target="_blank" rel="noreferrer">
                            {b.altLabel}
                          </a>
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </Panel>
              );
            })}
          </div>
        ))}
      </section>

      <section id="doors" className="flex flex-col gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
            Tickets · {doorDone}/{doorNeed} required ticked
          </p>
          <h2 className="mt-1 font-display text-2xl">What to buy for the days</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            Five things you buy online before you go. Four things you pay at the door the day you
            visit. Official websites only. The Turkish bath is the expensive one — about $110 each,
            $550 for five. That is why this list is a lot of money. Poenari and the salt mine are
            cash on the day and small.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {DOOR_MODES.map((meta) => {
            const list = doorsByMode(meta.id);
            const ticked = list.filter((d) => doors.includes(d.id)).length;
            return (
              <Panel key={meta.id} className="p-4 md:p-5">
                <p className="text-xs uppercase tracking-[0.14em] text-muted">
                  {ticked}/{list.length}
                </p>
                <h3 className="mt-2 font-display text-xl">{meta.title}</h3>
                <p className="mt-2 text-sm text-muted">{meta.blurb}</p>
              </Panel>
            );
          })}
        </div>

        {DOOR_MODES.map((meta) => (
          <div key={meta.id} className="flex flex-col gap-3">
            <h3 className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
              {meta.title}
            </h3>
            {doorsByMode(meta.id).map((d) => (
              <DoorCard
                key={d.id}
                door={d}
                on={doors.includes(d.id)}
                onToggle={() => toggleDoor(d.id)}
              />
            ))}
          </div>
        ))}
      </section>

      <section id="picnic" className="flex flex-col gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
            Saturday 18 Sep · leave the apartment {PICNIC.leaveBy}
          </p>
          <h2 className="mt-1 font-display text-2xl">Food for the night train</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            There is no restaurant on the Istanbul–Sofia train. The station you leave from (Halkalı)
            is not a grocery store. Buy food Saturday morning in Karaköy or the Spice Bazaar. Leave
            the apartment at 4pm. About {formatUsd(PICNIC.analogCrew)} for five, {formatUsd(PICNIC.analogPp)} each.
            This is not dinner for the whole trip — just that one night.
          </p>
        </div>

        <Panel>
          <p className="text-xs uppercase tracking-[0.14em] text-muted">How you eat that night</p>
          <dl className="mt-4 grid gap-4 text-sm md:grid-cols-2">
            <div>
              <dt className="text-muted">Restaurant car</dt>
              <dd className="mt-1">None. Bring food.</dd>
            </div>
            <div>
              <dt className="text-muted">Complimentary</dt>
              <dd className="mt-1">{PICNIC.complimentary}</dd>
            </div>
            <div>
              <dt className="text-muted">Fridge</dt>
              <dd className="mt-1">{PICNIC.fridge}</dd>
            </div>
            <div>
              <dt className="text-muted">The clock</dt>
              <dd className="mt-1">
                Bags out {PICNIC.leaveBy}. {PICNIC.transfer} to {PICNIC.train}. Do not cut it fine.
              </dd>
            </div>
          </dl>
        </Panel>

        {PICNIC_KINDS.map((meta) => {
          const items = PICNIC_ITEMS.filter((p) => p.kind === meta.id);
          return (
            <div key={meta.id}>
              <div className="mb-3">
                <h3 className="font-display text-xl">{meta.title}</h3>
              </div>
              <ul className="grid gap-2">
                {items.map((item) => {
                  const on = picnic.includes(item.id);
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => togglePicnic(item.id)}
                        className="flex min-h-11 w-full items-start gap-3 rounded-md border border-border bg-surface px-3 py-3 text-left"
                      >
                        <span
                          className={cn(
                            "mt-0.5 grid size-4 shrink-0 place-items-center rounded-sm border",
                            on ? "border-fg bg-fg" : "border-border-strong",
                          )}
                        />
                        <span>
                          <span className={cn("block text-sm", on ? "text-muted line-through" : "text-fg")}>
                            {item.label}
                          </span>
                          <span className="mt-1 block text-sm text-muted">{item.why}</span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </section>

      <section id="bags" className="flex flex-col gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
            Turkish ExtraFly
          </p>
          <h2 className="mt-1 font-display text-2xl">The suitcase is the fare</h2>
          <p className="mt-3 max-w-2xl text-sm text-muted">
            Buy ExtraFly so you get a checked suitcase. Do not buy EcoFly — that one often has no
            suitcase. Q is just the cheap price, not a different plane. You get one 23 kg suitcase,
            one 8 kg cabin bag, one 4 kg personal bag. Pack that. Weigh it at home. Check the ticket
            after you buy.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {[EXTRAFY_Q.personal, EXTRAFY_Q.cabin, EXTRAFY_Q.hold].map((bag) => (
            <Panel key={bag.label}>
              <p className="text-xs uppercase tracking-[0.14em] text-muted">{bag.label}</p>
              <p className="mt-2 font-display text-3xl tabular-nums">
                {bag.pieces} × {bag.kg} kg
              </p>
              <p className="mt-1 text-sm text-muted">{bag.size}</p>
              <p className="mt-3 text-sm text-fg">{bag.note}</p>
            </Panel>
          ))}
        </div>

        <Panel>
          <h3 className="font-display text-xl">Rules that bite</h3>
          <ul className="mt-4 grid gap-2">
            {EXTRAFY_Q.rules.map((rule) => (
              <li key={rule} className="flex gap-2 text-sm text-muted">
                <Check className="mt-0.5 size-4 shrink-0 text-fg" strokeWidth={1.75} />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button asChild>
              <a href={EXTRAFY_Q.links.book} target="_blank" rel="noreferrer">
                Book on Turkish
              </a>
            </Button>
            <Button variant="secondary" asChild>
              <a href={EXTRAFY_Q.links.fareRules} target="_blank" rel="noreferrer">
                Fare rules
              </a>
            </Button>
            <Button variant="ghost" asChild>
              <a href={EXTRAFY_Q.links.calculator} target="_blank" rel="noreferrer">
                Baggage calculator
              </a>
            </Button>
          </div>
        </Panel>

        {PACK_BAGS.map((meta) => {
          const items = PACKING.filter((p) => p.bag === meta.id);
          return (
            <div key={meta.id} id={meta.id}>
              <div className="mb-3">
                <h3 className="font-display text-xl">{meta.title}</h3>
                <p className="text-sm text-muted">{meta.limit}</p>
              </div>
              <ul className="grid gap-2">
                {items.map((item) => {
                  const on = packing.includes(item.id);
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => togglePacked(item.id)}
                        className="flex min-h-11 w-full items-start gap-3 rounded-md border border-border bg-surface px-3 py-3 text-left"
                      >
                        <span
                          className={cn(
                            "mt-0.5 grid size-4 shrink-0 place-items-center rounded-sm border",
                            on ? "border-fg bg-fg" : "border-border-strong",
                          )}
                        />
                        <span>
                          <span className={cn("block text-sm", on ? "text-muted line-through" : "text-fg")}>
                            {item.label}
                          </span>
                          <span className="mt-1 block text-sm text-muted">{item.why}</span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </section>
    </div>
  );
}

function DoorCard({
  door,
  on,
  onToggle,
}: {
  door: Door;
  on: boolean;
  onToggle: () => void;
}) {
  return (
    <Panel className={on ? "border-fg/40" : ""}>
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.14em] text-muted">
            {door.day} · {door.city}
          </p>
          <div className="mt-1 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="font-display text-2xl">{door.title}</h3>
            <p className="font-display text-2xl tabular-nums tracking-tight">
              {formatUsd(door.crew)}
              <span className="ml-2 text-base text-muted">{formatUsd(door.pp)} / man</span>
            </p>
          </div>
          <p className="mt-2 text-sm text-muted">{door.analog}</p>
          <p className="mt-3 text-sm text-fg">
            <span className="text-muted">When. </span>
            {door.when}
          </p>
          <p className="mt-2 text-sm text-fg">
            <span className="text-muted">Where. </span>
            {door.where}
          </p>
          <p className="mt-2 text-sm text-fg">
            <span className="text-muted">How. </span>
            {door.how}
          </p>
          <p className="mt-2 text-sm text-warn">{door.watch}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 md:w-48">
          <button
            type="button"
            onClick={onToggle}
            className={cn(
              "flex h-11 items-center justify-center gap-2 rounded-md border text-sm",
              on
                ? "border-fg bg-fg text-bg"
                : "border-border bg-elevated text-fg hover:border-border-strong",
            )}
          >
            {on ? (
              <Check className="size-4" strokeWidth={1.75} />
            ) : (
              <ClipboardList className="size-4" strokeWidth={1.75} />
            )}
            {on ? "Done" : "Mark done"}
          </button>
          <Button variant="secondary" asChild>
            <a href={door.url} target="_blank" rel="noreferrer">
              {door.urlLabel}
            </a>
          </Button>
          {door.altUrl ? (
            <Button variant="ghost" asChild>
              <a href={door.altUrl} target="_blank" rel="noreferrer">
                {door.altLabel}
              </a>
            </Button>
          ) : null}
        </div>
      </div>
    </Panel>
  );
}
