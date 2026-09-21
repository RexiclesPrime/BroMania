import { Link } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Maximize,
  Minimize,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { BRIEF_FILE, SLIDES, type BriefSlide } from "@/data/brief";
import { cn } from "@/lib/utils";

export function CrewDeck() {
  const [i, setI] = useState(0);
  const [full, setFull] = useState(false);
  const touchX = useRef(0);
  const slide = SLIDES[i];
  const last = SLIDES.length - 1;

  const go = useCallback((n: number) => {
    setI(Math.max(0, Math.min(last, n)));
  }, [last]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        go(i + 1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        go(i - 1);
      } else if (e.key === "Home") go(0);
      else if (e.key === "End") go(last);
      else if (e.key === "f" || e.key === "F") void toggleFull();
      else if (e.key === "Escape" && full) document.exitFullscreen?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, i, last, full]);

  useEffect(() => {
    const onFs = () => setFull(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  return (
    <div
      className="flex h-dvh flex-col bg-bg text-fg"
      onTouchStart={(e) => {
        touchX.current = e.changedTouches[0]?.clientX ?? 0;
      }}
      onTouchEnd={(e) => {
        const x = e.changedTouches[0]?.clientX ?? touchX.current;
        const dx = x - touchX.current;
        if (dx > 56) go(i - 1);
        if (dx < -56) go(i + 1);
      }}
    >
      <header className="flex h-12 shrink-0 items-center justify-between gap-3 border-b border-border px-3 md:px-5">
        <Link
          to="/"
          className="grid size-11 place-items-center rounded-sm text-muted hover:text-fg"
          aria-label="Back to HQ"
        >
          <X className="size-5" strokeWidth={1.75} />
        </Link>
        <p className="min-w-0 truncate text-xs font-medium uppercase tracking-[0.16em] text-muted">
          Crew briefing
          <span className="ml-3 tabular-nums text-subtle">
            {String(i + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
          </span>
        </p>
        <div className="flex items-center">
          <a
            href={BRIEF_FILE}
            download
            className="grid size-11 place-items-center rounded-sm text-muted hover:text-fg"
            aria-label="Download PowerPoint for Google Slides"
          >
            <Download className="size-4" strokeWidth={1.75} />
          </a>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-sm text-muted hover:text-fg"
            aria-label={full ? "Exit fullscreen" : "Fullscreen"}
            onClick={() => void toggleFull()}
          >
            {full ? (
              <Minimize className="size-4" strokeWidth={1.75} />
            ) : (
              <Maximize className="size-4" strokeWidth={1.75} />
            )}
          </button>
        </div>
      </header>

      <div className="relative flex min-h-0 flex-1 items-center justify-center p-3 md:p-6">
        <article
          key={slide.id}
          className="flex h-full w-full max-w-6xl flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-soft md:aspect-video md:h-auto md:max-h-full"
        >
          <SlideBody slide={slide} />
        </article>
      </div>

      <footer className="flex h-16 shrink-0 items-center justify-between gap-3 px-3 md:px-5">
        <button
          type="button"
          className="inline-flex h-11 items-center gap-1 rounded-md px-3 text-sm text-muted hover:text-fg disabled:opacity-30"
          disabled={i === 0}
          onClick={() => go(i - 1)}
        >
          <ChevronLeft className="size-4" strokeWidth={1.75} />
          Back
        </button>
        <ol className="flex max-w-[50%] flex-wrap justify-center gap-1.5">
          {SLIDES.map((s, n) => (
            <li key={s.id}>
              <button
                type="button"
                aria-label={`Slide ${n + 1}`}
                className={cn(
                  "size-2 rounded-full",
                  n === i ? "bg-accent" : "bg-border-strong hover:bg-muted",
                )}
                onClick={() => go(n)}
              />
            </li>
          ))}
        </ol>
        <button
          type="button"
          className="inline-flex h-11 items-center gap-1 rounded-md bg-fg px-4 text-sm font-medium text-bg disabled:opacity-30"
          disabled={i === last}
          onClick={() => go(i + 1)}
        >
          Next
          <ChevronRight className="size-4" strokeWidth={1.75} />
        </button>
      </footer>
    </div>
  );
}

function toggleFull() {
  if (document.fullscreenElement) return document.exitFullscreen();
  return document.documentElement.requestFullscreen();
}

function SlideBody({ slide }: { slide: BriefSlide }) {
  if (slide.layout === "title") {
    return (
      <div className="relative flex min-h-0 flex-1 flex-col justify-end">
        <img src={slide.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-bg/20" />
        <div className="relative p-6 md:p-12">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-parchment">{slide.kicker}</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl tracking-tight md:text-6xl">{slide.title}</h1>
          <p className="mt-4 max-w-xl text-base text-fg/80 md:text-xl">{slide.subtitle}</p>
          <p className="mt-8 font-display text-2xl tabular-nums text-parchment md:text-3xl">{slide.footer}</p>
        </div>
      </div>
    );
  }

  if (slide.layout === "close") {
    return (
      <div className="relative flex min-h-0 flex-1 flex-col justify-end">
        <img src={slide.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/75 to-bg/30" />
        <div className="relative p-6 md:p-12">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-parchment">{slide.kicker}</p>
          <h2 className="mt-4 max-w-4xl font-display text-3xl tracking-tight md:text-5xl">{slide.title}</h2>
          <p className="mt-8 text-lg text-fg/80 md:text-xl">{slide.lines.join(" ")}</p>
        </div>
      </div>
    );
  }

  if (slide.layout === "photo") {
    return (
      <div className="grid min-h-0 flex-1 md:grid-cols-2">
        <div className="flex flex-col justify-center overflow-y-auto p-6 md:p-10">
          <Kicker>{slide.kicker}</Kicker>
          <h2 className="mt-2 font-display text-3xl tracking-tight md:text-4xl">{slide.title}</h2>
          <p className="mt-4 text-base text-muted md:text-lg">{slide.body}</p>
          <ul className="mt-6 flex flex-col gap-3">
            {slide.points.map((p) => (
              <li key={p} className="border-l-2 border-accent pl-4 text-sm text-fg md:text-base">
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative min-h-40 md:min-h-0">
          <img src={slide.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
        </div>
      </div>
    );
  }

  if (slide.layout === "points") {
    return (
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-6 md:p-10">
        <Kicker>{slide.kicker}</Kicker>
        <h2 className="mt-2 font-display text-3xl tracking-tight md:text-5xl">{slide.title}</h2>
        <ul className="mt-8 grid gap-5 md:grid-cols-2">
          {slide.points.map((p) => (
            <li key={p.lead} className="rounded-lg border border-border bg-elevated p-5">
              <p className="font-display text-xl">{p.lead}</p>
              <p className="mt-2 text-sm text-muted md:text-base">{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (slide.layout === "jobs") {
    return (
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-6 md:p-10">
        <Kicker>{slide.kicker}</Kicker>
        <h2 className="mt-2 font-display text-3xl tracking-tight md:text-5xl">{slide.title}</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {slide.roles.map((r) => (
            <section key={r.title} className="rounded-lg border border-border bg-elevated p-5 md:p-6">
              <h3 className="font-display text-2xl">{r.title}</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {r.duties.map((d) => (
                  <li key={d} className="border-l-2 border-pine pl-4 text-sm text-muted md:text-base">
                    {d}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    );
  }

  if (slide.layout === "week") {
    return (
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-6 md:p-10">
        <Kicker>{slide.kicker}</Kicker>
        <h2 className="mt-2 font-display text-3xl tracking-tight md:text-5xl">{slide.title}</h2>
        <ol className="mt-6 grid gap-2 sm:grid-cols-2">
          {slide.days.map((d) => (
            <li
              key={d.when}
              className="flex items-baseline gap-3 rounded-md border border-border bg-elevated px-4 py-3"
            >
              <span className="w-16 shrink-0 font-mono text-xs uppercase tracking-wide text-accent">{d.when}</span>
              <span className="text-sm md:text-base">{d.what}</span>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  if (slide.layout === "split") {
    return (
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-6 md:p-10">
        <Kicker>{slide.kicker}</Kicker>
        <h2 className="mt-2 font-display text-3xl tracking-tight md:text-5xl">{slide.title}</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {[slide.left, slide.right].map((col) => (
            <section key={col.title} className="rounded-lg border border-border bg-elevated p-5 md:p-6">
              <h3 className="font-display text-2xl">{col.title}</h3>
              <p className="mt-3 text-sm text-muted md:text-base">{col.body}</p>
              <ul className="mt-4 flex flex-col gap-2">
                {col.points.map((p) => (
                  <li key={p} className="text-sm md:text-base">
                    {p}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    );
  }

  if (slide.layout === "money") {
    return (
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-6 md:p-10">
        <Kicker>{slide.kicker}</Kicker>
        <h2 className="mt-2 font-display text-3xl tracking-tight md:text-5xl">{slide.title}</h2>
        <div className="mt-6 flex flex-wrap gap-8">
          <Stat label="On the card, five of you" value={slide.hero.crew} />
          <Stat label="A head, on the card" value={slide.hero.pp} />
          <Stat label="Plan to bring" value={slide.hero.cap} />
        </div>
        <ul className="mt-8 grid gap-2 sm:grid-cols-2">
          {slide.lines.map((l) => (
            <li
              key={l.label}
              className="flex items-baseline justify-between gap-4 rounded-md border border-border bg-elevated px-4 py-3"
            >
              <span className="min-w-0 text-sm text-muted">{l.label}</span>
              <span className="shrink-0 font-display text-xl tabular-nums">{l.value}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-3xl text-sm text-muted">{slide.note}</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-6 md:p-10">
      <Kicker>{slide.kicker}</Kicker>
      <h2 className="mt-2 font-display text-3xl tracking-tight md:text-5xl">{slide.title}</h2>
      <ol className="mt-8 flex flex-col gap-3">
        {slide.items.map((item, n) => (
          <li key={item} className="flex gap-4 rounded-md border border-border bg-elevated px-4 py-3">
            <span className="font-mono text-sm text-accent">{String(n + 1).padStart(2, "0")}</span>
            <span className="text-base md:text-lg">{item}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Kicker({ children }: { children: string }) {
  return <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted">{children}</p>;
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.16em] text-muted">{label}</p>
      <p className="mt-1 font-display text-4xl tabular-nums tracking-tight md:text-5xl">{value}</p>
    </div>
  );
}
