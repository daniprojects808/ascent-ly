import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import PricingCard from "@/components/pricing-card";
import Footer from "@/components/footer";
import { createClient } from "@/../supabase/server";
import {
  ArrowUpRight,
  LayoutGrid,
  GripVertical,
  BarChart3,
  Chrome,
  Zap,
  Shield,
  Globe,
  TrendingUp,
  Search,
  Bell,
  Sparkles,
} from "lucide-react";

export default async function Home() {
  const supabase = await createClient();

  // Run auth check and plans fetch in parallel
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
    <div className="min-h-screen bg-[#1a1d24]">
      <Navbar user={user} />
      <Hero />

      {/* Features Section */}
      <section
        className="relative py-32 bg-[#1a1d24] overflow-hidden"
        id="features"
      >
        {/* Background elements */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <div className="absolute top-[50%] left-[-5%] w-[400px] h-[400px] rounded-full bg-cyan-500/[0.03] blur-[100px]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] mb-6">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs font-medium text-[#f5f1e8]/50 uppercase tracking-wider">
                Built for Job Seekers
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#f5f1e8] mb-5 tracking-tight">
              Everything You Need to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                Stay Ahead
              </span>
            </h2>
            <p className="text-[#f5f1e8]/40 max-w-2xl mx-auto text-lg font-body">
              Designed for professionals managing multiple opportunities
              simultaneously. Every feature serves a purpose.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: <LayoutGrid className="w-5 h-5" />,
                title: "Kanban Board",
                description:
                  "Drag-and-drop cards between Not Started, In Progress, and Completed columns with smooth spring physics.",
                color: "#06b6d4",
                accent: "from-cyan-500/10",
              },
              {
                icon: <BarChart3 className="w-5 h-5" />,
                title: "Real-Time Metrics",
                description:
                  "Oversized animated counters that track your total applications, status breakdowns, and offers received.",
                color: "#10b981",
                accent: "from-emerald-500/10",
              },
              {
                icon: <Chrome className="w-5 h-5" />,
                title: "Chrome Extension",
                description:
                  "Auto-capture job data from LinkedIn, Indeed, and Glassdoor. One click to save any listing to your board.",
                color: "#f59e0b",
                accent: "from-amber-500/10",
              },
              {
                icon: <Search className="w-5 h-5" />,
                title: "Smart Filtering",
                description:
                  "Real-time search with pill-shaped filters for work type, experience level, and industry categories.",
                color: "#06b6d4",
                accent: "from-cyan-500/10",
              },
              {
                icon: <GripVertical className="w-5 h-5" />,
                title: "Drag & Drop Flow",
                description:
                  "Cards lift with shadow on grab, snap into position with visual bounce, and columns highlight valid drop zones.",
                color: "#fbbf24",
                accent: "from-yellow-500/10",
              },
              {
                icon: <Bell className="w-5 h-5" />,
                title: "Quick Actions",
                description:
                  "Right-click context menus and batch operations let you update, archive, or delete applications instantly.",
                color: "#10b981",
                accent: "from-emerald-500/10",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] p-7 hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-500 hover:scale-[1.02]"
                style={{
                  transitionTimingFunction:
                    "cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                {/* Gradient glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(ellipse at 30% 20%, ${feature.color}10, transparent 70%)`,
                  }}
                />

                <div className="relative z-10">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-5"
                    style={{
                      backgroundColor: `${feature.color}15`,
                      color: feature.color,
                    }}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#f5f1e8] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[#f5f1e8]/40 leading-relaxed font-body">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-32 bg-[#16181e] overflow-hidden" id="how-it-works">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <div className="absolute bottom-[30%] right-[-5%] w-[400px] h-[400px] rounded-full bg-amber-500/[0.03] blur-[100px]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#f5f1e8] mb-5 tracking-tight">
              Three Steps to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                Organized
              </span>
            </h2>
            <p className="text-[#f5f1e8]/40 max-w-xl mx-auto text-lg font-body">
              From chaotic spreadsheets to a data-driven workflow in minutes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Add Applications",
                description:
                  "Use the Chrome extension to auto-capture jobs from LinkedIn, Indeed, and Glassdoor — or add them manually with our quick-add form.",
                color: "#f59e0b",
              },
              {
                step: "02",
                title: "Track Progress",
                description:
                  "Drag cards between columns as you move through interview stages. Your metrics dashboard updates in real-time.",
                color: "#06b6d4",
              },
              {
                step: "03",
                title: "Land The Role",
                description:
                  "Review your pipeline analytics, spot patterns in successful applications, and optimize your approach to land offers faster.",
                color: "#10b981",
              },
            ].map((item, i) => (
              <div key={i} className="relative text-center group">
                {/* Connector line */}
                {i < 2 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-gradient-to-r from-white/[0.08] to-transparent z-0" />
                )}

                <div className="relative z-10">
                  <div
                    className="text-6xl font-bold font-mono-data mb-6 leading-none"
                    style={{ color: `${item.color}30` }}
                  >
                    {item.step}
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#f5f1e8] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#f5f1e8]/40 leading-relaxed font-body max-w-xs mx-auto">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-24 bg-[#1a1d24] overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              {
                value: "12K+",
                label: "Applications Tracked",
                color: "#06b6d4",
              },
              {
                value: "3.2K",
                label: "Active Users",
                color: "#10b981",
              },
              {
                value: "89%",
                label: "More Organized",
                color: "#f59e0b",
              },
              {
                value: "2.5x",
                label: "More Offers",
                color: "#fbbf24",
              },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div
                  className="text-4xl sm:text-5xl font-bold font-mono-data mb-2"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-[0.15em] text-[#f5f1e8]/30 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative py-32 bg-[#16181e] overflow-hidden" id="pricing">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <div className="absolute top-[30%] left-[10%] w-[300px] h-[300px] rounded-full bg-cyan-500/[0.03] blur-[100px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] rounded-full bg-emerald-500/[0.03] blur-[100px]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#f5f1e8] mb-5 tracking-tight">
              Simple,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                Transparent
              </span>{" "}
              Pricing
            </h2>
            <p className="text-[#f5f1e8]/40 max-w-xl mx-auto text-lg font-body">
              Choose the plan that fits your job search. Upgrade anytime.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans?.map((item: any) => (
              <PricingCard key={item.id} item={item} user={user} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 bg-[#1a1d24] overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/[0.03] via-transparent to-transparent" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#f5f1e8] mb-6 tracking-tight">
              Ready to Take Control of Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                Job Search
              </span>
              ?
            </h2>
            <p className="text-[#f5f1e8]/40 mb-10 text-lg font-body">
              Join thousands of professionals who&apos;ve transformed their application
              process into a data-driven workflow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/sign-up"
                className="group inline-flex items-center gap-2 px-8 py-4 text-[#1a1d24] bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-xl hover:from-cyan-300 hover:to-cyan-400 transition-all duration-300 text-base font-semibold shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-[0_0_40px_rgba(6,182,212,0.45)] hover:scale-[1.02]"
              >
                Get Started Free
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
            <p className="text-xs text-[#f5f1e8]/25 mt-6 font-body">
              No credit card required · Free forever plan available
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
