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
  Check,
  Quote,
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

      {/* Social proof — student testimonials */}
      <section className="relative border-y border-white/[0.04] bg-[#08090c]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16 sm:py-20">
          {/* Stat callout */}
          <div className="text-center mb-14">
            <p className="font-mono-data text-[11px] text-[#8b5cf6]/50 uppercase tracking-[0.2em] mb-4">
              The reality
            </p>
            <p className="font-display text-[22px] sm:text-[28px] font-bold text-white/70 tracking-[-0.03em] leading-[1.2] max-w-xl mx-auto">
              The average job seeker applies to{" "}
              <span className="text-[#8b5cf6]">27 positions</span> before
              landing an offer.
            </p>
            <p className="font-body text-[14px] text-white/25 mt-3">
              Don&apos;t lose track. — Source: LinkedIn Economic Graph
            </p>
          </div>

          {/* Testimonials */}
          <div className="grid sm:grid-cols-3 gap-5 max-w-[1000px] mx-auto">
            {[
              {
                quote:
                  "I was applying to 25 internships and completely lost track. Ascent-ly was the only thing keeping me sane.",
                name: "Justin J.",
                detail: "CS Grad, UH Mānoa '24",
              },
              {
                quote:
                  "Wish I had this during recruiting season. My spreadsheet was a disaster. This actually made me feel in control.",
                name: "Dani P.",
                detail: "Marketing Grad, applied to 50+ roles",
              },
              {
                quote:
                  "Went from mass-applying on LinkedIn at 1am with no system to knowing exactly where I stand with every company.",
                name: "Max D.",
                detail: "MIS and Marketing Grad",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-7 hover:border-[#8b5cf6]/[0.12] hover:bg-white/[0.03] transition-all duration-300"
              >
                <Quote className="w-4 h-4 text-[#8b5cf6]/30 mb-4 rotate-180" />
                <p className="font-body text-[14px] text-white/40 leading-[1.7] mb-5">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <div className="font-display text-[13px] font-bold text-white/60">
                    {t.name}
                  </div>
                  <div className="font-mono-data text-[11px] text-white/20 mt-0.5">
                    {t.detail}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features — reframed for students */}
      <section
        className="relative bg-[#08090c] py-20 sm:py-36 lg:py-44"
        id="features"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          {/* Section header */}
          <div className="text-center mb-20 sm:mb-28">
            <p className="font-mono-data text-[11px] text-[#8b5cf6]/60 uppercase tracking-[0.2em] mb-6">
              Features
            </p>
            <h2 className="font-display text-[28px] sm:text-[52px] lg:text-[64px] font-extrabold text-white tracking-[-0.03em] sm:tracking-[-0.04em] leading-[1.05] sm:leading-[0.98] mb-6">
              Your whole job search.
              <br />
              <span className="text-white/25">One place.</span>
            </h2>
            <p className="font-body text-[16px] text-white/30 max-w-[460px] mx-auto leading-[1.7]">
              No more scattered spreadsheets, forgotten applications, or
              &ldquo;wait, did I already apply there?&rdquo; moments.
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
                    See every application at a glance
                  </h3>
                  <p className="font-body text-[14px] text-white/30 leading-[1.7] max-w-sm">
                    Three columns — Not Started, In Progress, Done. Drag cards
                    between stages as you hear back. Know exactly where you stand
                    with every company.
                  </p>
                </div>
                {/* Mini kanban preview */}
                <div className="relative z-10 mt-8 grid grid-cols-3 gap-2">
                  {[
                    {
                      label: "Not Started",
                      count: 12,
                      dot: "bg-violet-400",
                    },
                    {
                      label: "In Progress",
                      count: 5,
                      dot: "bg-cyan-400",
                    },
                    {
                      label: "Done",
                      count: 2,
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
                      Know your numbers
                    </h3>
                    <p className="font-body text-[14px] text-white/30 leading-[1.7]">
                      Response rate, offer rate, and where you keep getting
                      stuck. See which industries and roles are actually
                      getting back to you.
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
                      Filter by internship, full-time, remote
                    </h3>
                    <p className="font-body text-[14px] text-white/30 leading-[1.7]">
                      Find what you need in seconds. Search by company,
                      role type, or location — results update as you type.
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
                  title: "Add jobs in seconds",
                  desc: "Paste a link or fill in the basics. Every application saved in one click — no more copy-pasting between tabs.",
                },
                {
                  icon: FileText,
                  color: "rose",
                  title: "Notes & timeline for each app",
                  desc: "Click any card to see the full story — your notes, salary info, and a timeline of every status change.",
                },
                {
                  icon: Users,
                  color: "sky",
                  title: "Update a bunch at once",
                  desc: "Got rejection emails? Select multiple applications and archive them in one click. Bulk actions save you time.",
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

      {/* Built for the bulk apply era */}
      <section className="relative bg-[#08090c] border-t border-white/[0.04] py-20 sm:py-32">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-[800px] mx-auto">
            <div className="text-center mb-16">
              <p className="font-mono-data text-[11px] text-[#8b5cf6]/60 uppercase tracking-[0.2em] mb-6">
                We get it
              </p>
              <h2 className="font-display text-[28px] sm:text-[44px] lg:text-[52px] font-extrabold text-white tracking-[-0.03em] sm:tracking-[-0.04em] leading-[1.05] sm:leading-[0.98] mb-5">
                Built for the
                <br />
                <span className="text-gradient-amber">bulk apply era.</span>
              </h2>
              <p className="font-body text-[16px] text-white/30 max-w-md mx-auto leading-[1.7]">
                You&apos;re not applying to 3 jobs. You&apos;re applying to 30.
                That&apos;s a different problem — and it needs a different tool.
              </p>
            </div>

            <div className="space-y-5 max-w-[560px] mx-auto">
              {[
                {
                  text: "Applied but forgot the company name? We've got it.",
                  emoji: "🔍",
                },
                {
                  text: "Waiting to hear back from 8 places at once? Track them all.",
                  emoji: "⏳",
                },
                {
                  text: "Interviewing at 3 companies simultaneously? Stay sharp.",
                  emoji: "🎯",
                },
                {
                  text: "Getting ghosted and can't remember who? We remember.",
                  emoji: "👻",
                },
                {
                  text: "Need to follow up but lost the details? It's all here.",
                  emoji: "📋",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="group flex items-start gap-4 p-4 rounded-xl border border-white/[0.04] bg-white/[0.015] hover:border-[#8b5cf6]/[0.12] hover:bg-white/[0.03] transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#8b5cf6]/[0.08] border border-[#8b5cf6]/[0.1] flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-[#8b5cf6]/70" />
                  </div>
                  <div className="flex-1">
                    <span className="font-body text-[15px] text-white/50 leading-[1.6] group-hover:text-white/70 transition-colors duration-300">
                      {item.text}
                    </span>
                  </div>
                  <span className="text-[18px] opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0">
                    {item.emoji}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works — horizontal numbered steps */}
      <section
        className="relative bg-[#08090c] border-t border-white/[0.04] py-20 sm:py-36"
        id="how-it-works"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 sm:mb-24">
            <p className="font-mono-data text-[11px] text-[#8b5cf6]/60 uppercase tracking-[0.2em] mb-6">
              How it works
            </p>
            <h2 className="font-display text-[28px] sm:text-[48px] lg:text-[56px] font-extrabold text-white tracking-[-0.03em] sm:tracking-[-0.04em] leading-[1.1] sm:leading-[0.98]">
              Set up in 2 minutes.
              <br />
              <span className="text-white/25">Seriously.</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-10 sm:gap-8 max-w-[900px] mx-auto relative">
            {/* connector line */}
            <div className="hidden sm:block absolute top-7 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-[#8b5cf6]/20 to-transparent" />

            {[
              {
                step: "01",
                title: "Sign up (takes 30 seconds)",
                desc: "Create your free account. No credit card, no trial countdown, no nonsense.",
              },
              {
                step: "02",
                title: "Add your applications",
                desc: "Paste a job link or fill in the basics. Every app you've sent out, tracked in one place.",
              },
              {
                step: "03",
                title: "Track, follow up, get offers",
                desc: "Drag cards as you hear back. Always know what's pending, what needs a follow-up, and where you got the offer.",
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
        className="relative bg-[#08090c] border-t border-white/[0.04] py-20 sm:py-36 lg:py-44"
        id="pricing"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-20">
            <p className="font-mono-data text-[11px] text-[#8b5cf6]/60 uppercase tracking-[0.2em] mb-6">
              Pricing
            </p>
            <h2 className="font-display text-[28px] sm:text-[48px] lg:text-[56px] font-extrabold text-white tracking-[-0.03em] sm:tracking-[-0.04em] leading-[1.1] sm:leading-[0.98] mb-5">
              Free for all job seekers.
            </h2>
            <p className="font-body text-[16px] text-white/30 max-w-md mx-auto leading-[1.7]">
              No credit card. No trial period. Just free.
              <br />
              <span className="text-white/20">
                Upgrade later if you want extra features — but you probably
                won&apos;t need to.
              </span>
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[900px] mx-auto">
            {plans?.map((item: any) => (
              <PricingCard key={item.id} item={item} user={user} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA — bold, student-focused */}
      <section className="relative bg-[#08090c] border-t border-white/[0.04] py-20 sm:py-40 lg:py-48">
        {/* Ambient glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-[0.04] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 100%, #8b5cf6 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-[900px] mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-[28px] sm:text-[50px] lg:text-[64px] font-extrabold text-white tracking-[-0.035em] sm:tracking-[-0.045em] leading-[1.1] sm:leading-[0.95] mb-8">
            The job market is brutal.
            <br />
            <span className="text-gradient-amber">
              Be more organized than everyone else.
            </span>
          </h2>
          <p className="font-body text-[16px] text-white/30 mb-12 max-w-md mx-auto leading-[1.7]">
            Takes 2 minutes to set up. Free forever for students and recent
            grads. Stop losing track — start landing offers.
          </p>

          {/* Check list */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 items-center justify-center mb-14">
            {[
              "Free forever",
              "No credit card needed",
              "Set up in 2 minutes",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#8b5cf6]/60 flex-shrink-0" />
                <span className="text-[13px] font-body text-white/35">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <a
            href="/sign-up"
            className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#8b5cf6] text-white rounded-full text-[15px] font-semibold transition-all duration-200 hover:bg-[#7c3aed] hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(139,92,246,0.3)]"
          >
            Get Ascent-ly Free
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
