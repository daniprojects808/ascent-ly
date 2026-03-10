import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import PricingCard from "@/components/pricing-card";
import Footer from "@/components/footer";
import { createClient } from "@/../supabase/server";
import {
  ArrowRight,
  CheckCircle2,
  Zap,
  Layers,
  Search,
  MousePointerClick,
  FileText,
  Users,
} from "lucide-react";

export default async function Home() {
  const supabase = await createClient();

  const [
    {
      data: { user },
    },
    plansResult,
  ] = await Promise.all([
    supabase.auth.getUser(),
    supabase.functions
      .invoke("get-plans")
      .catch(() => ({ data: null, error: null })),
  ]);

  const plans = plansResult?.data ?? null;

  return (
    <div className="min-h-screen bg-[#08090c] bg-noise">
      <Navbar />
      <Hero />

      {/* Social proof / stats bar */}
      <section className="relative border-y border-white/[0.04] bg-[#08090c]">
        <div className="max-w-[1200px] mx-auto px-6 py-12">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-20">
            {[
              { value: "12,000+", label: "Applications tracked" },
              { value: "3,200+", label: "Active users" },
              { value: "68%", label: "More interviews" },
              { value: "$0", label: "To start, forever" },
            ].map((s, i) => (
              <div key={i} className="text-center group">
                <div className="text-[28px] sm:text-[32px] font-display font-bold text-white/80 tracking-[-0.03em] leading-none mb-1.5 group-hover:text-[#8b5cf6] transition-colors duration-300">
                  {s.value}
                </div>
                <div className="text-[12px] font-body text-white/20 tracking-wide">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features — editorial bento layout */}
      <section
        className="relative bg-[#08090c] py-28 sm:py-36 lg:py-44"
        id="features"
      >
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Section header */}
          <div className="text-center mb-20 sm:mb-28">
            <p className="font-mono-data text-[11px] text-[#8b5cf6]/60 uppercase tracking-[0.2em] mb-6">
              Features
            </p>
            <h2 className="font-display text-[36px] sm:text-[52px] lg:text-[64px] font-extrabold text-white tracking-[-0.04em] leading-[0.98] mb-6">
              Everything you need.
              <br />
              <span className="text-white/25">Nothing you don&apos;t.</span>
            </h2>
            <p className="font-body text-[16px] text-white/30 max-w-[440px] mx-auto leading-[1.7]">
              Built for focus. Designed to disappear — giving you clarity
              without getting in the way.
            </p>
          </div>

          {/* Feature bento grid */}
          <div className="space-y-4">
            {/* Row 1: Large + 2 stacked */}
            <div className="grid lg:grid-cols-2 gap-4">
              {/* Large feature card — Kanban */}
              <div className="group rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent p-8 sm:p-10 flex flex-col justify-between min-h-[320px] hover:border-[#8b5cf6]/[0.15] hover:bg-white/[0.03] transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#8b5cf6]/[0.03] rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-[#8b5cf6]/[0.08] border border-[#8b5cf6]/[0.12] flex items-center justify-center mb-7">
                    <Layers className="w-4.5 h-4.5 text-[#8b5cf6]/70" />
                  </div>
                  <h3 className="font-display text-[22px] sm:text-[26px] font-bold text-white/90 tracking-[-0.025em] mb-3">
                    Visual Kanban pipeline
                  </h3>
                  <p className="font-body text-[14px] text-white/30 leading-[1.7] max-w-sm">
                    Three columns — Not Started, In Progress, Completed. Drag
                    cards between stages with spring physics. Your entire job
                    search at a glance.
                  </p>
                </div>
                {/* Mini kanban preview */}
                <div className="relative z-10 mt-8 grid grid-cols-3 gap-2">
                  {[
                    {
                      label: "Not Started",
                      count: 4,
                      dot: "bg-violet-400",
                    },
                    {
                      label: "In Progress",
                      count: 7,
                      dot: "bg-cyan-400",
                    },
                    {
                      label: "Completed",
                      count: 12,
                      dot: "bg-emerald-400",
                    },
                  ].map((col, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-3"
                    >
                      <div className="flex items-center gap-1.5 mb-2.5">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${col.dot} opacity-60`}
                        />
                        <span className="text-[9px] text-white/20 font-mono-data truncate">
                          {col.label}
                        </span>
                      </div>
                      <div className="space-y-1.5">
                        {Array.from({ length: Math.min(col.count, 3) }).map(
                          (_, j) => (
                            <div
                              key={j}
                              className="h-5 rounded-lg bg-white/[0.03] border border-white/[0.03]"
                            />
                          ),
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right column — two stacked */}
              <div className="flex flex-col gap-4">
                <div className="group rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent p-8 flex-1 hover:border-[#8b5cf6]/[0.15] hover:bg-white/[0.03] transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-cyan-400/[0.03] rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-cyan-400/[0.08] border border-cyan-400/[0.12] flex items-center justify-center mb-6">
                      <Zap className="w-4.5 h-4.5 text-cyan-400/70" />
                    </div>
                    <h3 className="font-display text-[18px] sm:text-[20px] font-bold text-white/90 tracking-[-0.02em] mb-2.5">
                      Live metrics dashboard
                    </h3>
                    <p className="font-body text-[14px] text-white/30 leading-[1.7]">
                      Animated counters show total applications, active stages,
                      and offers. Numbers that actually mean something.
                    </p>
                  </div>
                </div>
                <div className="group rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent p-8 flex-1 hover:border-[#8b5cf6]/[0.15] hover:bg-white/[0.03] transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-emerald-400/[0.03] rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-emerald-400/[0.08] border border-emerald-400/[0.12] flex items-center justify-center mb-6">
                      <Search className="w-4.5 h-4.5 text-emerald-400/70" />
                    </div>
                    <h3 className="font-display text-[18px] sm:text-[20px] font-bold text-white/90 tracking-[-0.02em] mb-2.5">
                      Smart search & filters
                    </h3>
                    <p className="font-body text-[14px] text-white/30 leading-[1.7]">
                      Filter by work type, experience level, or industry.
                      Results fade in real-time as you type.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2 — three equal cards */}
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  icon: MousePointerClick,
                  color: "violet",
                  title: "One-click capture",
                  desc: "Save job listings from LinkedIn, Indeed, and Glassdoor directly into your board instantly.",
                },
                {
                  icon: FileText,
                  color: "rose",
                  title: "Card details & notes",
                  desc: "Click any card to expand — full details, notes section, and a timeline of every status change.",
                },
                {
                  icon: Users,
                  color: "sky",
                  title: "Bulk operations",
                  desc: "Shift-click to multi-select, then update, archive, or delete a batch of applications at once.",
                },
              ].map((f, i) => (
                <div
                  key={i}
                  className="group rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent p-7 hover:border-[#8b5cf6]/[0.15] hover:bg-white/[0.03] transition-all duration-300 relative overflow-hidden"
                >
                  <div
                    className={`absolute top-0 right-0 w-[120px] h-[120px] bg-${f.color}-400/[0.03] rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                  <div className="relative z-10">
                    <div
                      className={`w-10 h-10 rounded-xl bg-${f.color}-400/[0.08] border border-${f.color}-400/[0.12] flex items-center justify-center mb-6`}
                    >
                      <f.icon className={`w-4 h-4 text-${f.color}-400/70`} />
                    </div>
                    <h3 className="font-display text-[16px] sm:text-[18px] font-bold text-white/90 tracking-[-0.015em] mb-2.5">
                      {f.title}
                    </h3>
                    <p className="font-body text-[13px] text-white/[0.28] leading-[1.7]">
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works — horizontal numbered steps */}
      <section
        className="relative bg-[#08090c] border-t border-white/[0.04] py-28 sm:py-36"
        id="how-it-works"
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-24">
            <p className="font-mono-data text-[11px] text-[#8b5cf6]/60 uppercase tracking-[0.2em] mb-6">
              How it works
            </p>
            <h2 className="font-display text-[36px] sm:text-[48px] lg:text-[56px] font-extrabold text-white tracking-[-0.04em] leading-[0.98]">
              Up and running
              <br />
              <span className="text-white/25">in minutes.</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-12 sm:gap-8 max-w-[900px] mx-auto relative">
            {/* connector line */}
            <div className="hidden sm:block absolute top-7 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-[#8b5cf6]/20 to-transparent" />

            {[
              {
                step: "01",
                title: "Add your applications",
                desc: "Use the quick-add form or paste a URL. Every job in your pipeline in seconds.",
              },
              {
                step: "02",
                title: "Move cards as you progress",
                desc: "Drag cards between columns at each stage. Your metrics update instantly.",
              },
              {
                step: "03",
                title: "Land the offer",
                desc: "See what's working, stay organized, and never lose track of an opportunity.",
              },
            ].map((item, i) => (
              <div key={i} className="relative text-center group">
                <div className="w-14 h-14 rounded-2xl border border-[#8b5cf6]/[0.15] bg-[#8b5cf6]/[0.05] flex items-center justify-center mx-auto mb-7 text-[14px] font-bold text-[#8b5cf6]/70 font-mono-data relative z-10 group-hover:border-[#8b5cf6]/30 group-hover:bg-[#8b5cf6]/[0.1] transition-all duration-300">
                  {item.step}
                </div>
                <h3 className="font-display text-[17px] font-bold text-white/80 tracking-[-0.015em] mb-3">
                  {item.title}
                </h3>
                <p className="font-body text-[13px] text-white/[0.28] leading-[1.7] max-w-[250px] mx-auto">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section
        className="relative bg-[#08090c] border-t border-white/[0.04] py-28 sm:py-36 lg:py-44"
        id="pricing"
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-20">
            <p className="font-mono-data text-[11px] text-[#8b5cf6]/60 uppercase tracking-[0.2em] mb-6">
              Pricing
            </p>
            <h2 className="font-display text-[36px] sm:text-[48px] lg:text-[56px] font-extrabold text-white tracking-[-0.04em] leading-[0.98] mb-5">
              Simple pricing.
            </h2>
            <p className="font-body text-[16px] text-white/30 max-w-sm mx-auto leading-[1.7]">
              Start free. Upgrade when you need more.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[900px] mx-auto">
            {plans?.map((item: any) => (
              <PricingCard key={item.id} item={item} user={user} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA — bold, confident */}
      <section className="relative bg-[#08090c] border-t border-white/[0.04] py-32 sm:py-40 lg:py-48">
        {/* Ambient glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-[0.04] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 100%, #8b5cf6 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-[900px] mx-auto px-6 text-center">
          <h2 className="font-display text-[38px] sm:text-[56px] lg:text-[72px] font-extrabold text-white tracking-[-0.045em] leading-[0.95] mb-8">
            Stop managing your
            <br />
            job search in a{" "}
            <span className="text-gradient-amber">spreadsheet.</span>
          </h2>
          <p className="font-body text-[16px] text-white/30 mb-12 max-w-md mx-auto leading-[1.7]">
            Join thousands of professionals who replaced chaos with clarity —
            and landed better jobs, faster.
          </p>

          {/* Check list */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 items-center justify-center mb-14">
            {["Free to start", "No credit card", "Cancel anytime"].map(
              (item, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#8b5cf6]/60 flex-shrink-0" />
                  <span className="text-[13px] font-body text-white/35">
                    {item}
                  </span>
                </div>
              ),
            )}
          </div>

          <a
            href="/sign-up"
            className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#8b5cf6] text-white rounded-full text-[15px] font-semibold transition-all duration-200 hover:bg-[#7c3aed] hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(139,92,246,0.3)]"
          >
            Get started free
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
