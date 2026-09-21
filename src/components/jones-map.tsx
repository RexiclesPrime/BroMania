import { useEffect, useLayoutEffect, useMemo, useRef, useState, type RefObject } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { RoutingId } from "@/data/trip";
import { cn, asset } from "@/lib/utils";

type Scene = "atlantic" | "balkans";
type Mode = "air" | "rail" | "van";
type Dir = "ne" | "nw" | "se" | "sw" | "e" | "w";

type Stamp = {
  id: string;
  x: number;
  y: number;
  label: string;
  sub?: string;
  dir?: Dir;
  mark?: "dot" | "x";
};

type Leg = {
  id: string;
  d: string;
  ms: number;
  mode: Mode;
  caption: string;
  reveal: string[];
};

const ATLANTIC = { w: 2128, h: 912 };
const ATLANTIC_IAD = { x: 348, y: 418 };
const ATLANTIC_IST = { x: 1968, y: 348 };
const ATLANTIC_FLIGHT = `M ${ATLANTIC_IAD.x} ${ATLANTIC_IAD.y} Q 1080 48 ${ATLANTIC_IST.x} ${ATLANTIC_IST.y}`;

const BALKANS = { w: 1728, h: 1152 };
const BK = {
  ist: { x: 1148, y: 598 },
  sofia: { x: 742, y: 548 },
  bucharest: { x: 1018, y: 442 },
  brasov: { x: 928, y: 318 },
  bran: { x: 892, y: 348 },
  poenari: { x: 818, y: 378 },
};

function balkansPaths(routing: RoutingId): Leg[] {
  if (routing === "fly") {
    return [
      {
        id: "air",
        d: `M ${BK.ist.x} ${BK.ist.y} Q 1080 480 ${BK.bucharest.x} ${BK.bucharest.y}`,
        ms: 2200,
        mode: "air",
        caption: "Istanbul to Bucharest · ninety minutes",
        reveal: ["bucharest"],
      },
      {
        id: "north",
        d: `M ${BK.bucharest.x} ${BK.bucharest.y} Q 980 360 ${BK.brasov.x} ${BK.brasov.y}`,
        ms: 1600,
        mode: "van",
        caption: "North to Brașov · the Prahova corridor",
        reveal: ["brasov"],
      },
      {
        id: "local",
        d: `M ${BK.brasov.x} ${BK.brasov.y} L ${BK.bran.x} ${BK.bran.y} L ${BK.poenari.x} ${BK.poenari.y}`,
        ms: 1800,
        mode: "van",
        caption: "Bran for the postcard. Poenari for Vlad.",
        reveal: ["bran", "poenari"],
      },
    ];
  }
  if (routing === "bus") {
    return [
      {
        id: "coach",
        d: `M ${BK.ist.x} ${BK.ist.y} Q 980 640 ${BK.bucharest.x} ${BK.bucharest.y}`,
        ms: 2400,
        mode: "van",
        caption: "Overnight coach · the unromantic crossing",
        reveal: ["bucharest"],
      },
      {
        id: "north",
        d: `M ${BK.bucharest.x} ${BK.bucharest.y} Q 980 360 ${BK.brasov.x} ${BK.brasov.y}`,
        ms: 1600,
        mode: "van",
        caption: "North to Brașov",
        reveal: ["brasov"],
      },
      {
        id: "local",
        d: `M ${BK.brasov.x} ${BK.brasov.y} L ${BK.bran.x} ${BK.bran.y} L ${BK.poenari.x} ${BK.poenari.y}`,
        ms: 1800,
        mode: "van",
        caption: "Bran for the postcard. Poenari for Vlad.",
        reveal: ["bran", "poenari"],
      },
    ];
  }
  return [
    {
      id: "sleeper",
      d: `M ${BK.ist.x} ${BK.ist.y} Q 960 620 ${BK.sofia.x} ${BK.sofia.y}`,
      ms: 2800,
      mode: "rail",
      caption: "Istanbul–Sofia Express · the countryside sleeper",
      reveal: ["sofia"],
    },
    {
      id: "van",
      d: `M ${BK.sofia.x} ${BK.sofia.y} Q 860 520 ${BK.bucharest.x} ${BK.bucharest.y} Q 980 360 ${BK.brasov.x} ${BK.brasov.y}`,
      ms: 2600,
      mode: "van",
      caption: "Van through Wallachia · Brașov by night if you make it",
      reveal: ["bucharest", "brasov"],
    },
    {
      id: "local",
      d: `M ${BK.brasov.x} ${BK.brasov.y} L ${BK.bran.x} ${BK.bran.y} L ${BK.poenari.x} ${BK.poenari.y}`,
      ms: 1800,
      mode: "van",
      caption: "Bran for the postcard. Poenari for Vlad.",
      reveal: ["bran", "poenari"],
    },
  ];
}

const ATLANTIC_STAMPS: Stamp[] = [
  { id: "iad", x: ATLANTIC_IAD.x, y: ATLANTIC_IAD.y, label: "Dulles", sub: "Virginia", dir: "w" },
  { id: "ist", x: ATLANTIC_IST.x, y: ATLANTIC_IST.y, label: "Istanbul", sub: "Karaköy", dir: "sw" },
];

function balkansStamps(routing: RoutingId): Stamp[] {
  const istSub = routing === "fly" ? "Air to Otopeni" : routing === "bus" ? "Esenler coach" : "Halkalı 20:00";
  return [
    { id: "ist", x: BK.ist.x, y: BK.ist.y, label: "Istanbul", sub: istSub, dir: "sw" },
    { id: "sofia", x: BK.sofia.x, y: BK.sofia.y, label: "Sofia", dir: "w" },
    { id: "bucharest", x: BK.bucharest.x, y: BK.bucharest.y, label: "Bucharest", dir: "e" },
    { id: "brasov", x: BK.brasov.x, y: BK.brasov.y, label: "Brașov", sub: "Base camp", dir: "ne" },
    { id: "bran", x: BK.bran.x, y: BK.bran.y, label: "Bran", dir: "se" },
    { id: "poenari", x: BK.poenari.x, y: BK.poenari.y, label: "Poenari", sub: "The citadel", dir: "w", mark: "x" },
  ];
}

function prefersReduced() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function labelOffset(dir: Dir = "ne") {
  switch (dir) {
    case "e":
      return { x: 36, y: -10 };
    case "w":
      return { x: -36, y: -10, anchor: "end" as const };
    case "nw":
      return { x: -32, y: -28, anchor: "end" as const };
    case "sw":
      return { x: -32, y: 38, anchor: "end" as const };
    case "se":
      return { x: 32, y: 38 };
    default:
      return { x: 32, y: -28 };
  }
}

export function JonesMap({
  routing,
  variant = "embed",
}: {
  routing: RoutingId;
  variant?: "embed" | "page";
}) {
  const legs = useMemo(() => balkansPaths(routing), [routing]);
  const [scene, setScene] = useState<Scene>("atlantic");
  const [playing, setPlaying] = useState(false);
  const [legIndex, setLegIndex] = useState(-1);
  const [revealed, setRevealed] = useState<Set<string>>(() => new Set(["iad"]));
  const [caption, setCaption] = useState("Dulles, Virginia · TK8 after dark");
  const [done, setDone] = useState(false);
  const [wiping, setWiping] = useState(false);

  const started = useRef(false);
  const frame = useRef(0);
  const holdA = useRef(0);
  const holdB = useRef(0);
  const host = useRef<HTMLDivElement>(null);
  const liveRef = useRef<SVGPathElement>(null);
  const underRef = useRef<SVGPathElement>(null);
  const travelerRef = useRef<SVGGElement>(null);
  const playRef = useRef(playing);
  playRef.current = playing;
  const progressRef = useRef(0);
  const liveD = scene === "atlantic" ? ATLANTIC_FLIGHT : legs[Math.max(0, legIndex)]?.d ?? "";
  const liveMode: Mode = scene === "atlantic" ? "air" : (legs[Math.max(0, legIndex)]?.mode ?? "van");
  const chart = scene === "atlantic" ? "CHART I · THE ATLANTIC" : "CHART II · THE CROSSING";

  const clearHolds = () => {
    window.clearTimeout(holdA.current);
    window.clearTimeout(holdB.current);
  };

  const apply = (t: number) => {
    progressRef.current = t;
    const path = liveRef.current;
    if (!path) return;
    const offset = String(1000 * (1 - t));
    path.setAttribute("stroke-dashoffset", offset);
    underRef.current?.setAttribute("stroke-dashoffset", offset);
    const traveler = travelerRef.current;
    if (!traveler) return;
    try {
      const len = path.getTotalLength();
      if (!len || t <= 0.004) {
        traveler.setAttribute("opacity", "0");
        return;
      }
      const l = t * len;
      const p = path.getPointAtLength(l);
      const p2 = path.getPointAtLength(Math.min(len, l + 12));
      const a = (Math.atan2(p2.y - p.y, p2.x - p.x) * 180) / Math.PI;
      traveler.setAttribute("opacity", "1");
      traveler.setAttribute("transform", `translate(${p.x} ${p.y}) rotate(${a})`);
    } catch {
      traveler.setAttribute("opacity", "0");
    }
  };

  const reset = (autoplay: boolean) => {
    cancelAnimationFrame(frame.current);
    clearHolds();
    progressRef.current = 0;
    setScene("atlantic");
    setLegIndex(-1);
    setRevealed(new Set(["iad"]));
    setCaption("Dulles, Virginia · TK8 after dark");
    setDone(false);
    setWiping(false);
    setPlaying(autoplay);
  };

  useEffect(() => {
    reset((variant === "page" || started.current) && !prefersReduced());
    // eslint-disable-next-line react-hooks/exhaustive-deps -- replay when the crossing changes
  }, [routing, variant]);

  useEffect(() => {
    if (prefersReduced()) {
      setScene("balkans");
      setLegIndex(legs.length - 1);
      setRevealed(new Set(balkansStamps(routing).map((s) => s.id)));
      setCaption("Dulles → Istanbul → Transylvania");
      setDone(true);
      setPlaying(false);
      progressRef.current = 1;
      return;
    }
    if (variant === "page") {
      started.current = true;
      setPlaying(true);
      return;
    }
    const node = host.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          setPlaying(true);
        }
      },
      { threshold: 0.28 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [legs.length, routing, variant]);

  useLayoutEffect(() => {
    apply(progressRef.current);
  }, [scene, legIndex, liveD, done, wiping]);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(frame.current);
      clearHolds();
    };
  }, []);

  useEffect(() => {
    if (!playing || done || wiping) return;
    const duration = scene === "atlantic" ? 4200 : Math.max(1200, legs[Math.max(0, legIndex)]?.ms ?? 1800);
    let start: number | null = null;
    const tick = (now: number) => {
      if (!playRef.current) return;
      if (start == null) start = now - progressRef.current * duration;
      const t = Math.min(1, (now - start) / duration);
      apply(t);
      if (t < 1) {
        frame.current = requestAnimationFrame(tick);
        return;
      }
      if (scene === "atlantic") {
        setRevealed(new Set(["iad", "ist"]));
        setCaption("Istanbul. Three nights in Karaköy.");
        setWiping(true);
        holdA.current = window.setTimeout(() => {
          progressRef.current = 0;
          setScene("balkans");
          setLegIndex(0);
          setRevealed(new Set(["ist"]));
          setCaption(legs[0]?.caption ?? "");
        }, 340);
        holdB.current = window.setTimeout(() => {
          setWiping(false);
        }, 720);
        return;
      }
      const leg = legs[legIndex];
      if (leg) {
        setRevealed((prev) => {
          const next = new Set(prev);
          next.add("ist");
          for (const id of leg.reveal) next.add(id);
          return next;
        });
      }
      if (legIndex + 1 < legs.length) {
        const next = legs[legIndex + 1];
        holdA.current = window.setTimeout(() => {
          progressRef.current = 0;
          setLegIndex((i) => i + 1);
          if (next) setCaption(next.caption);
        }, 380);
      } else {
        setDone(true);
        setPlaying(false);
        setCaption("Project Bromania MMXXVII · the line is drawn");
      }
    };
    frame.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame.current);
    };
  }, [playing, scene, legIndex, legs, done, wiping]);

  return (
    <figure ref={host} className={cn("overflow-hidden rounded-xl border border-border")}>
      <div className="relative bg-parchment-deep text-parchment-ink">
        <div
          className={cn(
            "relative w-full overflow-hidden",
            scene === "atlantic" ? "aspect-video md:aspect-atlantic" : "aspect-sheet md:aspect-balkans",
          )}
        >
          {scene === "atlantic" ? (
            <AtlanticChart
              d={liveD}
              mode={liveMode}
              revealed={revealed}
              done={done}
              liveRef={liveRef}
              underRef={underRef}
              travelerRef={travelerRef}
            />
          ) : (
            <BalkansChart
              routing={routing}
              legs={legs}
              legIndex={legIndex}
              d={liveD}
              mode={liveMode}
              revealed={revealed}
              done={done}
              liveRef={liveRef}
              underRef={underRef}
              travelerRef={travelerRef}
            />
          )}
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_80px_rgb(60_35_10_/_0.35)]" />
          <p className="pointer-events-none absolute left-3 top-3 rounded-sm border border-parchment-ink/20 bg-parchment/85 px-3 py-1.5 font-display text-xs tracking-[0.18em] text-parchment-ink">
            {chart}
          </p>
        </div>

        {wiping ? <div className="jones-wipe pointer-events-none absolute inset-0 z-10 bg-parchment-ink" /> : null}

        <figcaption className="relative flex flex-col gap-3 border-t border-parchment-ink/15 bg-parchment px-4 py-3 md:flex-row md:items-center md:justify-between md:px-5">
          <p aria-live="polite" className="font-display text-lg leading-snug text-parchment-ink md:text-xl">
            {caption}
          </p>
          <div className="flex gap-2">
            <Button
              size="md"
              variant="secondary"
              className="border-parchment-ink/25 bg-parchment-deep/60 text-parchment-ink hover:bg-parchment-deep"
              onClick={() => {
                if (done) {
                  started.current = true;
                  reset(true);
                  return;
                }
                setPlaying((p) => !p);
              }}
            >
              {done ? (
                <>
                  <RotateCcw className="size-4" strokeWidth={1.75} /> Roll it again
                </>
              ) : playing ? (
                <>
                  <Pause className="size-4" strokeWidth={1.75} /> Pause
                </>
              ) : (
                <>
                  <Play className="size-4" strokeWidth={1.75} /> Play
                </>
              )}
            </Button>
          </div>
        </figcaption>
      </div>
    </figure>
  );
}

type ChartRefs = {
  liveRef: RefObject<SVGPathElement | null>;
  underRef: RefObject<SVGPathElement | null>;
  travelerRef: RefObject<SVGGElement | null>;
};

function Line({
  d,
  width,
  live,
  liveRef,
  underRef,
}: {
  d: string;
  width: number;
  live?: boolean;
  liveRef?: ChartRefs["liveRef"];
  underRef?: ChartRefs["underRef"];
}) {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path
        ref={live ? underRef : undefined}
        d={d}
        className="stroke-parchment-ink/35"
        strokeWidth={width * 1.7}
        pathLength={live ? 1000 : undefined}
        strokeDasharray={live ? 1000 : undefined}
        strokeDashoffset={live ? 1000 : undefined}
      />
      <path
        ref={live ? liveRef : undefined}
        d={d}
        className="stroke-accent"
        strokeWidth={width}
        pathLength={live ? 1000 : undefined}
        strokeDasharray={live ? 1000 : undefined}
        strokeDashoffset={live ? 1000 : undefined}
      />
    </g>
  );
}

function TravelerMark({ mode, scale, travelerRef }: { mode: Mode; scale: number; travelerRef: ChartRefs["travelerRef"] }) {
  return (
    <g ref={travelerRef} opacity={0}>
      <g transform={`scale(${scale})`}>
        {mode === "air" ? (
          <path
            d="M -16 0 L -10 -3.5 L 6 -2.2 L 2 -8 L 8 -1.2 L 18 0 L 8 1.2 L 2 8 L 6 2.2 L -10 3.5 Z"
            className="fill-accent stroke-parchment-ink/40"
            strokeWidth="0.6"
          />
        ) : mode === "rail" ? (
          <g>
            <rect x="-12" y="-6" width="26" height="11" rx="2" className="fill-accent stroke-parchment-ink/40" strokeWidth="0.7" />
            <circle cx="-5" cy="7" r="2.4" className="fill-parchment-ink" />
            <circle cx="8" cy="7" r="2.4" className="fill-parchment-ink" />
          </g>
        ) : (
          <g>
            <rect x="-10" y="-6" width="22" height="12" rx="3" className="fill-accent stroke-parchment-ink/40" strokeWidth="0.7" />
            <circle cx="-4" cy="7" r="2.2" className="fill-parchment-ink" />
            <circle cx="7" cy="7" r="2.2" className="fill-parchment-ink" />
          </g>
        )}
      </g>
    </g>
  );
}

function StampMark({ stamp, on, size = 1 }: { stamp: Stamp; on: boolean; size?: number }) {
  const off = labelOffset(stamp.dir);
  const r = 11 * size;
  const fs = 30 * size;
  const sub = 18 * size;
  return (
    <g transform={`translate(${stamp.x} ${stamp.y})`}>
      <g opacity={on ? 1 : 0.3} className={on ? "jones-stamp" : undefined}>
      <circle r={r * 2.1} className="fill-parchment" />
      {stamp.mark === "x" && on ? (
        <path
          d={`M ${-r} ${-r} L ${r} ${r} M ${r} ${-r} L ${-r} ${r}`}
          className="stroke-accent"
          strokeWidth={4.2 * size}
          strokeLinecap="round"
        />
      ) : (
        <>
          <circle r={on ? r : r * 0.55} className={on ? "fill-accent" : "fill-parchment-ink/45"} />
          <circle r={r * 1.45} className="fill-none stroke-accent" strokeWidth={2.2 * size} />
        </>
      )}
      <text
        x={off.x * size}
        y={off.y * size}
        textAnchor={off.anchor ?? "start"}
        fontSize={fs}
        fontFamily="Fraunces, Times New Roman, serif"
        letterSpacing="0.16em"
        fontWeight={600}
        className="fill-parchment-ink"
        stroke="rgb(228 212 176)"
        strokeWidth={7 * size}
        paintOrder="stroke"
      >
        {stamp.label.toUpperCase()}
      </text>
      {stamp.sub ? (
        <text
          x={off.x * size}
          y={off.y * size + sub + 4}
          textAnchor={off.anchor ?? "start"}
          fontSize={sub}
          fontFamily="Outfit, ui-sans-serif, system-ui, sans-serif"
          letterSpacing="0.12em"
          className="fill-parchment-ink/75"
          stroke="rgb(228 212 176)"
          strokeWidth={5 * size}
          paintOrder="stroke"
        >
          {stamp.sub}
        </text>
      ) : null}
      </g>
    </g>
  );
}

function CompassRose({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} className="fill-none stroke-parchment-ink">
      <circle cx="0" cy="0" r="28" strokeWidth="1.2" className="fill-parchment/55" />
      <circle cx="0" cy="0" r="22" strokeWidth="0.6" />
      <path d="M0 -22 L5 4 L0 1 L-5 4 Z" className="fill-accent stroke-none" />
      <path d="M0 22 L5 -4 L0 -1 L-5 -4 Z" className="fill-parchment-ink/70 stroke-none" />
      <text x="0" y="-34" textAnchor="middle" className="fill-parchment-ink font-display text-xs tracking-widest">
        N
      </text>
    </g>
  );
}

function AtlanticChart({
  d,
  mode,
  revealed,
  done,
  liveRef,
  underRef,
  travelerRef,
}: {
  d: string;
  mode: Mode;
  revealed: Set<string>;
  done: boolean;
} & ChartRefs) {
  return (
    <svg
      viewBox={`0 0 ${ATLANTIC.w} ${ATLANTIC.h}`}
      preserveAspectRatio="xMidYMid meet"
      className="relative block h-full w-full"
      role="img"
      aria-label="Animated parchment map from Dulles to Istanbul"
    >
      <image href={asset("/images/map-atlantic.jpg")} width={ATLANTIC.w} height={ATLANTIC.h} />
      <Line d={d} width={8} live={!done} liveRef={liveRef} underRef={underRef} />
      <TravelerMark mode={mode} scale={2.3} travelerRef={travelerRef} />
      {ATLANTIC_STAMPS.map((s) => (
        <StampMark key={s.id} stamp={s} on={revealed.has(s.id)} size={1.15} />
      ))}
      <CompassRose x={170} y={760} scale={1.35} />
    </svg>
  );
}

function BalkansChart({
  routing,
  legs,
  legIndex,
  d,
  mode,
  revealed,
  done,
  liveRef,
  underRef,
  travelerRef,
}: {
  routing: RoutingId;
  legs: Leg[];
  legIndex: number;
  d: string;
  mode: Mode;
  revealed: Set<string>;
  done: boolean;
} & ChartRefs) {
  const stamps = balkansStamps(routing).filter((s) => !(routing === "fly" && s.id === "sofia"));
  return (
    <svg
      viewBox={`0 0 ${BALKANS.w} ${BALKANS.h}`}
      preserveAspectRatio="xMidYMid meet"
      className="relative block h-full w-full"
      role="img"
      aria-label="Animated parchment map of the Balkan crossing and Transylvania"
    >
      <image href={asset("/images/map-balkans.jpg")} width={BALKANS.w} height={BALKANS.h} />
      {legs.slice(0, Math.max(0, legIndex)).map((leg) => (
        <Line key={leg.id} d={leg.d} width={6.5} />
      ))}
      {legIndex >= 0 ? (
        <Line d={d} width={6.5} live={!done} liveRef={liveRef} underRef={underRef} />
      ) : (
        <path ref={liveRef} d={d} className="fill-none stroke-none" />
      )}
      <TravelerMark mode={mode} scale={1.85} travelerRef={travelerRef} />
      {stamps.map((s) => (
        <StampMark key={s.id} stamp={s} on={revealed.has(s.id)} size={1.05} />
      ))}
      <CompassRose x={120} y={1000} scale={1.15} />
    </svg>
  );
}
