import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bot,
  CalendarDays,
  Castle,
  ClipboardList,
  Compass,
  Landmark,
  Map,
  Menu,
  Plane,
  TrainFront,
  Wallet,
  X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "HQ", icon: Compass },
  { to: "/map", label: "Map", icon: Map },
  { to: "/plan", label: "Itinerary", icon: CalendarDays },
  { to: "/istanbul", label: "Istanbul", icon: Landmark },
  { to: "/train", label: "Crossing", icon: TrainFront },
  { to: "/romania", label: "Romania", icon: Castle },
  { to: "/flights", label: "Flights", icon: Plane },
  { to: "/admin", label: "Admin", icon: ClipboardList },
  { to: "/budget", label: "Budget", icon: Wallet },
  { to: "/agents", label: "Swarm", icon: Bot },
] as const;

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="sticky top-0 z-40 border-b border-border bg-bg/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded-sm bg-accent text-accent-fg">
              <TrainFront className="size-4" strokeWidth={1.75} />
            </span>
            <span className="font-display text-lg leading-none tracking-tight">
              <span className="hidden text-[0.65rem] uppercase tracking-[0.16em] text-muted sm:inline">
                Project{" "}
              </span>
              Bromania
              <span className="ml-1.5 text-[0.65rem] tracking-[0.16em] text-muted">MMXXVII</span>
            </span>
          </Link>
          <nav className="hidden items-center xl:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "rounded-sm px-2 py-1.5 text-sm text-muted transition-colors duration-150 hover:text-fg",
                  pathname === item.to && "bg-elevated text-fg",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-sm border border-border xl:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        {open ? (
          <nav className="grid gap-1 border-t border-border px-4 py-3 xl:hidden">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex h-11 items-center gap-3 rounded-md px-3 text-sm text-muted",
                  pathname === item.to && "bg-elevated text-fg",
                )}
              >
                <item.icon className="size-4" strokeWidth={1.75} />
                {item.label}
              </Link>
            ))}
          </nav>
        ) : null}
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 py-8 pb-16">{children}</main>
    </div>
  );
}

export function PageHead({
  kicker,
  title,
  lede,
}: {
  kicker: string;
  title: string;
  lede: string;
}) {
  return (
    <header className="mb-8 max-w-3xl">
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-muted">{kicker}</p>
      <h1 className="font-display text-4xl tracking-tight md:text-5xl">{title}</h1>
      <p className="mt-4 text-base text-muted md:text-lg">{lede}</p>
    </header>
  );
}

export function Panel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-xl border border-border bg-surface p-5 md:p-6",
        className,
      )}
    >
      {children}
    </section>
  );
}
