"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState, useRef } from "react";

function AnimatedCounter({
  target,
  delay = 0,
}: {
  target: number;
  delay?: number;
}) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const timeout = setTimeout(() => {
      const duration = 1600;
      const startTime = performance.now();
      const animate = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
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
    </span>
  );
}

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative bg-[#08090c] overflow-hidden bg-noise">
      {/* Ambient glow — violet accent */}
      <div
        className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[1000px] h-[700px] opacity-[0.06] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, #8b5cf6 0%, transparent 65%)",
        }}
      />
      {/* Secondary subtle white glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] opacity-[0.025] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, #ffffff 0%, transparent 70%)",
        }}
      />

      {/* Hero content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 pt-40 pb-20 sm:pt-48 sm:pb-24 lg:pt-56 lg:pb-28">
        {/* Eyebrow — violet pill */}
        <div
          className={`flex justify-center mb-10 transition-all duration-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
        >
          <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#8b5cf6]/20 bg-[#8b5cf6]/[0.06] text-[11px] font-mono-data text-[#8b5cf6]/80 tracking-[0.08em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6] animate-glow" />
            Now tracking 12,000+ applications
          </span>
        </div>

        {/* Main headline — editorial, tight, two-tone */}
        <div className="text-center">
          <h1
            className={`font-display text-[44px] sm:text-[68px] lg:text-[84px] xl:text-[96px] font-extrabold text-white leading-[0.95] tracking-[-0.05em] mb-8 transition-all duration-900 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{ transitionDelay: "80ms", transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
          >
            Land your
            <br />
            <span className="text-gradient-amber">next role.</span>
          </h1>

          {/* Subheadline */}
          <p
            className={`font-body text-[16px] sm:text-[18px] text-white/40 max-w-[480px] mx-auto leading-[1.7] mb-12 transition-all duration-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "180ms", transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
          >
            A calm, focused dashboard for tracking every application,
            interview, and offer — all in one place.
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 transition-all duration-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
            style={{ transitionDelay: "280ms", transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
          >
            <Link
              href="/sign-up"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3 bg-[#8b5cf6] text-white rounded-full text-[14px] font-semibold transition-all duration-200 hover:bg-[#7c3aed] hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]"
            >
              Get started free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
            </Link>
            <Link
              href="/sign-in"
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3 text-white/40 hover:text-white border border-white/[0.08] hover:border-white/[0.16] rounded-full transition-all duration-200 text-[14px] font-body hover:bg-white/[0.03]"
            >
              Sign in
              <ArrowRight className="w-3.5 h-3.5 ml-2 opacity-40" />
            </Link>
          </div>

          {/* Social proof */}
          <p
            className={`font-mono-data text-[11px] text-white/[0.2] tracking-[0.05em] transition-all duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
            style={{ transitionDelay: "380ms" }}
          >
            Trusted by 3,200+ professionals · Free forever plan · No credit
            card required
          </p>
        </div>
      </div>

      {/* Product mockup */}
      <div
        className={`max-w-[1100px] mx-auto px-6 pb-0 relative z-10 transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-14"}`}
        style={{ transitionDelay: "450ms", transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
      >
        {/* Outer glow ring */}
        <div className="relative">
          <div className="absolute -inset-[1px] rounded-[22px] bg-gradient-to-b from-[#8b5cf6]/20 via-white/[0.06] to-transparent" />
          <div className="absolute -inset-[2px] rounded-[23px] bg-gradient-to-b from-[#8b5cf6]/10 via-transparent to-transparent blur-sm" />

          {/* App frame */}
          <div className="relative rounded-[22px] bg-[#0d0e12] border border-white/[0.07] overflow-hidden shadow-[0_25px_80px_-20px_rgba(0,0,0,0.8)]">
            {/* Titlebar */}
            <div className="flex items-center gap-0 px-5 py-3.5 border-b border-white/[0.05] bg-[#0b0c10]">
              <div className="flex items-center gap-2 mr-4">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]/70 hover:bg-[#ff5f57] transition-colors" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]/70 hover:bg-[#febc2e] transition-colors" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]/70 hover:bg-[#28c840] transition-colors" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="flex items-center gap-2 px-5 py-1.5 rounded-lg bg-white/[0.04] text-[11px] text-white/25 font-mono-data border border-white/[0.04]">
                  <svg
                    className="w-3 h-3 text-white/15"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  app.ascent-ly.com/dashboard
                </div>
              </div>
            </div>

            {/* Inner app chrome — sidebar + main content */}
            <div className="flex min-h-[440px] sm:min-h-[520px]">
              {/* Sidebar */}
              <div className="hidden sm:flex flex-col w-[210px] border-r border-white/[0.04] p-4 gap-0.5 flex-shrink-0 bg-[#0a0b0e]">
                <div className="text-[10px] text-white/15 px-2.5 py-1.5 mb-2 tracking-[0.15em] uppercase font-mono-data">
                  Workspace
                </div>
                {[
                  { label: "Dashboard", active: true, icon: "◉" },
                  { label: "Applications", active: false, icon: "◎" },
                  { label: "Calendar", active: false, icon: "◎" },
                  { label: "Analytics", active: false, icon: "◎" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`px-2.5 py-2 rounded-lg text-[12px] font-body cursor-default flex items-center gap-2 transition-all duration-200 ${
                      item.active
                        ? "bg-[#8b5cf6]/[0.08] text-[#8b5cf6]/80 border border-[#8b5cf6]/[0.1]"
                        : "text-white/20 hover:text-white/40 hover:bg-white/[0.02]"
                    }`}
                  >
                    <span className="text-[10px]">{item.icon}</span>
                    {item.label}
                  </div>
                ))}
                <div className="mt-auto pt-4 border-t border-white/[0.04]">
                  <div className="flex items-center gap-2 px-2.5 py-2">
                    <div className="w-6 h-6 rounded-full bg-[#8b5cf6]/20 flex items-center justify-center text-[9px] font-mono-data text-[#8b5cf6]/60">
                      JD
                    </div>
                    <div className="text-[11px] text-white/25 font-body">
                      John Doe
                    </div>
                  </div>
                </div>
              </div>

              {/* Main dashboard area */}
              <div className="flex-1 p-5 sm:p-7 space-y-5 overflow-hidden bg-[#0d0e12]">
                {/* Header row */}
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="text-[14px] font-display font-bold text-white/70">
                      Good morning, John
                    </div>
                    <div className="text-[11px] text-white/20 font-body mt-1">
                      Here&apos;s your pipeline overview
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-7 rounded-lg bg-white/[0.03] border border-white/[0.05] flex items-center px-2.5">
                      <svg
                        className="w-3 h-3 text-white/15"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      <span className="text-[10px] text-white/15 ml-1.5 font-mono-data">
                        Search...
                      </span>
                    </div>
                  </div>
                </div>

                {/* Metric cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    {
                      label: "Total Applied",
                      value: 47,
                      accent: "text-white/80",
                      border: "border-white/[0.05]",
                    },
                    {
                      label: "In Progress",
                      value: 18,
                      accent: "text-cyan-400/80",
                      border: "border-cyan-400/[0.08]",
                    },
                    {
                      label: "Completed",
                      value: 23,
                      accent: "text-emerald-400/80",
                      border: "border-emerald-400/[0.08]",
                    },
                    {
                      label: "Offers",
                      value: 6,
                      accent: "text-[#8b5cf6]/80",
                      border: "border-[#8b5cf6]/[0.08]",
                    },
                  ].map((m, i) => (
                    <div
                      key={i}
                      className={`rounded-xl border ${m.border} bg-white/[0.02] p-4 hover:bg-white/[0.04] transition-all duration-200`}
                    >
                      <div className="text-[10px] text-white/20 mb-2.5 tracking-[0.05em] font-mono-data uppercase">
                        {m.label}
                      </div>
                      <div
                        className={`text-[30px] font-bold font-display leading-none ${m.accent}`}
                      >
                        <AnimatedCounter
                          target={m.value}
                          delay={600 + i * 180}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Kanban columns */}
                <div className="hidden sm:grid grid-cols-3 gap-3 pt-1">
                  {[
                    {
                      title: "Not Started",
                      dot: "bg-violet-400",
                      cards: [
                        {
                          company: "Stripe",
                          role: "Sr. Engineer",
                          tag: "Fintech",
                          salary: "$180k",
                        },
                        {
                          company: "Figma",
                          role: "Product Designer",
                          tag: "Design",
                          salary: "$165k",
                        },
                      ],
                    },
                    {
                      title: "In Progress",
                      dot: "bg-cyan-400",
                      cards: [
                        {
                          company: "Vercel",
                          role: "Full Stack Dev",
                          tag: "Infra",
                          salary: "$190k",
                        },
                        {
                          company: "Linear",
                          role: "Frontend Lead",
                          tag: "SaaS",
                          salary: "$175k",
                        },
                        {
                          company: "Notion",
                          role: "Design Eng.",
                          tag: "Productivity",
                          salary: "$160k",
                        },
                      ],
                    },
                    {
                      title: "Completed",
                      dot: "bg-emerald-400",
                      cards: [
                        {
                          company: "Arc",
                          role: "UX Engineer",
                          tag: "Browser",
                          salary: "$155k",
                        },
                        {
                          company: "Raycast",
                          role: "iOS Developer",
                          tag: "Tools",
                          salary: "$170k",
                        },
                      ],
                    },
                  ].map((col, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex items-center gap-2 px-1 pb-1.5">
                        <span
                          className={`w-2 h-2 rounded-full ${col.dot} opacity-60`}
                        />
                        <span className="text-[10px] text-white/30 tracking-wide font-body font-medium">
                          {col.title}
                        </span>
                        <span className="ml-auto text-[10px] font-mono-data text-white/15">
                          {col.cards.length}
                        </span>
                      </div>
                      {col.cards.map((card, j) => (
                        <div
                          key={j}
                          className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-3 hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-200 cursor-default"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="text-[12px] font-medium text-white/60 font-body">
                              {card.company}
                            </div>
                            <div className="text-[10px] font-mono-data text-[#8b5cf6]/50">
                              {card.salary}
                            </div>
                          </div>
                          <div className="text-[10px] text-white/20 font-body">
                            {card.role}
                          </div>
                          <div className="mt-2">
                            <span className="inline-block px-2 py-0.5 rounded-md bg-white/[0.04] text-[9px] text-white/20 font-mono-data border border-white/[0.03]">
                              {card.tag}
                            </span>
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

        {/* Bottom fade-out */}
        <div className="relative -mt-36 h-36 bg-gradient-to-t from-[#08090c] to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
