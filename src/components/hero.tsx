"use client";

import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
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
      { threshold: 0.5 }
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
    const t = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#1a1d24] min-h-screen flex flex-col">
      {/* Noise overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.03' /%3E%3C/svg%3E")`,
        }}
      />

      {/* Gradient orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-500/[0.07] blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-amber-500/[0.05] blur-[120px]" />
      <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full bg-emerald-500/[0.04] blur-[100px]" />

      {/* Grid lines */}
      <div className="absolute inset-0 z-0 opacity-[0.04]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(245,241,232,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(245,241,232,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative z-20 flex-1 flex flex-col justify-center">
        <div className="container mx-auto px-4 pt-28 pb-12 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-20">
          {/* Badge */}
          <div
            className={`flex justify-center mb-8 sm:mb-10 transition-all duration-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-medium text-[#f5f1e8]/60 tracking-wide uppercase">
                Now with Chrome Extension &mdash; Auto-capture jobs
              </span>
            </div>
          </div>

          {/* Main heading */}
          <div className="text-center max-w-5xl mx-auto">
            <h1
              className={`font-display text-4xl sm:text-5xl lg:text-[5.5rem] font-bold text-[#f5f1e8] mb-6 sm:mb-8 tracking-tight leading-[1.05] transition-all duration-700 delay-100 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              Track Every{" "}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-emerald-400">
                  Application
                </span>
                <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full opacity-60" />
              </span>
              <br />
              Land Your Dream Job
            </h1>

            <p
              className={`text-base sm:text-xl text-[#f5f1e8]/50 max-w-2xl mx-auto leading-relaxed font-body mb-10 sm:mb-12 transition-all duration-700 delay-200 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              A comprehensive dashboard for job seekers to monitor their
              application pipeline with real-time metrics and visual progress
              tracking. Transform chaos into clarity.
            </p>

            {/* CTA buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-10 sm:mb-16 transition-all duration-700 delay-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <Link
                href="/sign-up"
                className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 px-8 py-4 text-[#1a1d24] bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-xl hover:from-cyan-300 hover:to-cyan-400 transition-all duration-300 text-base font-semibold shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_40px_rgba(6,182,212,0.45)] hover:scale-[1.02]"
              >
                Start Tracking Free
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>

              <Link
                href="#features"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-[#f5f1e8]/80 bg-white/[0.05] border border-white/[0.08] rounded-xl hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300 text-base font-medium"
              >
                See How It Works
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Trust pills */}
            <div
              className={`flex flex-wrap justify-center gap-4 sm:gap-6 text-sm text-[#f5f1e8]/40 transition-all duration-700 delay-[400ms] ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                </div>
                <span>Free forever plan</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                </div>
                <span>Chrome extension included</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard preview mockup */}
      <div
        className={`relative z-20 container mx-auto px-4 pb-16 transition-all duration-1000 delay-500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
      >
        <div className="relative max-w-5xl mx-auto">
          {/* Glow behind */}
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 via-transparent to-emerald-500/10 rounded-2xl blur-xl" />

          {/* Mockup frame */}
          <div className="relative rounded-xl border border-white/[0.08] bg-[#1e2028] overflow-hidden shadow-2xl shadow-black/40">
            {/* Browser bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-[#1a1d24]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
              </div>
              <div className="flex-1 mx-4">
                <div className="max-w-sm mx-auto px-3 py-1 rounded-md bg-white/[0.05] text-xs text-[#f5f1e8]/30 text-center font-mono-data">
                  ascent-ly.com/dashboard
                </div>
              </div>
            </div>

            {/* Dashboard content mockup */}
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
              {/* Metric cards row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                {[
                  { label: "Total", value: 47, color: "#06b6d4" },
                  { label: "In Progress", value: 18, color: "#06b6d4" },
                  { label: "Completed", value: 23, color: "#10b981" },
                  { label: "Offers", value: 6, color: "#fbbf24" },
                ].map((m, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 sm:p-4"
                  >
                    <div className="text-[10px] uppercase tracking-[0.15em] text-[#f5f1e8]/30 mb-1 sm:mb-2">
                      {m.label}
                    </div>
                    <div
                      className="text-2xl sm:text-3xl font-bold font-mono-data"
                      style={{ color: m.color }}
                    >
                      <AnimatedCounter
                        target={m.value}
                        delay={600 + i * 200}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Kanban mockup — hidden on small screens */}
              <div className="hidden sm:grid grid-cols-3 gap-3">
                {[
                  {
                    title: "Not Started",
                    color: "#f59e0b",
                    cards: [
                      { name: "Stripe", role: "Sr. Engineer" },
                      { name: "Figma", role: "Product Designer" },
                    ],
                  },
                  {
                    title: "In Progress",
                    color: "#06b6d4",
                    cards: [
                      { name: "Vercel", role: "Full Stack Dev" },
                      { name: "Linear", role: "Frontend Lead" },
                      { name: "Notion", role: "Design Engineer" },
                    ],
                  },
                  {
                    title: "Completed",
                    color: "#10b981",
                    cards: [
                      { name: "Arc", role: "UX Engineer" },
                      { name: "Raycast", role: "iOS Developer" },
                    ],
                  },
                ].map((col, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center gap-2 px-2 py-1.5">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: col.color }}
                      />
                      <span className="text-[10px] uppercase tracking-[0.15em] text-[#f5f1e8]/40 font-medium">
                        {col.title}
                      </span>
                      <span className="text-[10px] font-mono-data text-[#f5f1e8]/20 ml-auto">
                        {col.cards.length}
                      </span>
                    </div>
                    {col.cards.map((card, j) => (
                      <div
                        key={j}
                        className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 hover:bg-white/[0.04] transition-colors"
                      >
                        <div className="text-xs font-semibold text-[#f5f1e8]/70 mb-0.5">
                          {card.name}
                        </div>
                        <div className="text-[10px] text-[#f5f1e8]/30">
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
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1a1d24] to-transparent z-30 pointer-events-none" />
    </section>
  );
}
