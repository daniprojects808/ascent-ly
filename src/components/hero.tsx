"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState, useRef } from "react";

function AnimatedCounter({
  target,
  suffix = "",
  delay = 0,
}: {
  target: number;
  suffix?: string;
  delay?: number;
}) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const timeout = setTimeout(() => {
      const duration = 1500;
      const startTime = performance.now();
      const animate = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * target));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, delay);
    return () => clearTimeout(timeout);
  }, [started, target, delay]);

  return (
    <span ref={ref} className="font-mono-data tabular-nums">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#09090b] min-h-screen flex flex-col">
      {/* Subtle top gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-white/[0.03] via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-20 flex-1 flex flex-col justify-center">
        <div className="max-w-[1200px] mx-auto px-6 pt-32 pb-16 sm:pt-40 sm:pb-20 lg:pt-48 lg:pb-24">
          {/* Badge */}
          <div
            className={`flex justify-center mb-10 transition-all duration-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
              </span>
              <span className="text-[12px] text-white/40 tracking-wide">
                Now with Chrome Extension
              </span>
            </div>
          </div>

          {/* Main heading */}
          <div className="text-center max-w-4xl mx-auto">
            <h1
              className={`text-4xl sm:text-6xl lg:text-[72px] font-semibold text-white mb-6 sm:mb-8 tracking-[-0.04em] leading-[1.05] transition-all duration-700 delay-75 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >
              Track every application.
              <br />
              <span className="text-white/40">Land the role.</span>
            </h1>

            <p
              className={`text-[16px] sm:text-[18px] text-white/35 max-w-xl mx-auto leading-[1.7] mb-12 transition-all duration-700 delay-150 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >
              Monitor your job pipeline with real-time metrics and visual
              progress tracking. Transform chaos into clarity.
            </p>

            {/* CTA buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-3 justify-center items-center mb-20 transition-all duration-700 delay-200 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >
              <Link
                href="/sign-up"
                className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 px-7 py-3 text-black bg-white rounded-full hover:bg-white/90 transition-all duration-200 text-[14px] font-medium"
              >
                Start for free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
              </Link>

              <Link
                href="#features"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 text-white/50 hover:text-white/80 border border-white/[0.08] hover:border-white/[0.15] rounded-full transition-all duration-200 text-[14px]"
              >
                See how it works
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard preview mockup */}
      <div
        className={`relative z-20 max-w-[1100px] mx-auto px-6 pb-24 transition-all duration-1000 delay-400 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="relative">
          {/* Subtle glow */}
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-white/[0.08] to-transparent opacity-50" />

          {/* Mockup frame */}
          <div className="relative rounded-2xl border border-white/[0.06] bg-[#111113] overflow-hidden">
            {/* Browser bar */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.04]">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
              </div>
              <div className="flex-1 mx-8">
                <div className="max-w-xs mx-auto px-3 py-1 rounded-lg bg-white/[0.03] text-[11px] text-white/20 text-center font-mono-data">
                  ascent-ly.com/dashboard
                </div>
              </div>
            </div>

            {/* Dashboard content */}
            <div className="p-5 sm:p-8 space-y-5">
              {/* Metric cards row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Total", value: 47, color: "white" },
                  { label: "In Progress", value: 18, color: "white" },
                  { label: "Completed", value: 23, color: "white" },
                  { label: "Offers", value: 6, color: "white" },
                ].map((m, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-white/[0.04] bg-white/[0.02] p-4"
                  >
                    <div className="text-[11px] text-white/25 mb-2 tracking-wide">
                      {m.label}
                    </div>
                    <div className="text-3xl font-semibold text-white/90 font-mono-data">
                      <AnimatedCounter
                        target={m.value}
                        delay={600 + i * 200}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Kanban mockup */}
              <div className="hidden sm:grid grid-cols-3 gap-3">
                {[
                  {
                    title: "Not Started",
                    count: 2,
                    cards: [
                      { name: "Stripe", role: "Sr. Engineer" },
                      { name: "Figma", role: "Product Designer" },
                    ],
                  },
                  {
                    title: "In Progress",
                    count: 3,
                    cards: [
                      { name: "Vercel", role: "Full Stack Dev" },
                      { name: "Linear", role: "Frontend Lead" },
                      { name: "Notion", role: "Design Engineer" },
                    ],
                  },
                  {
                    title: "Completed",
                    count: 2,
                    cards: [
                      { name: "Arc", role: "UX Engineer" },
                      { name: "Raycast", role: "iOS Developer" },
                    ],
                  },
                ].map((col, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between px-1 py-1.5">
                      <span className="text-[11px] text-white/30 tracking-wide">
                        {col.title}
                      </span>
                      <span className="text-[11px] font-mono-data text-white/15">
                        {col.count}
                      </span>
                    </div>
                    {col.cards.map((card, j) => (
                      <div
                        key={j}
                        className="rounded-lg border border-white/[0.04] bg-white/[0.015] p-3"
                      >
                        <div className="text-[13px] font-medium text-white/60 mb-0.5">
                          {card.name}
                        </div>
                        <div className="text-[11px] text-white/20">
                          {card.role}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#09090b] to-transparent z-30 pointer-events-none" />
    </section>
  );
}
