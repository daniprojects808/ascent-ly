import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import PricingCard from "@/components/pricing-card";
import Footer from "@/components/footer";
import { createClient } from "@/../supabase/server";
import {
  ArrowRight,
  LayoutGrid,
  GripVertical,
  BarChart3,
  Chrome,
  Search,
  Bell,
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
    <div className="min-h-screen bg-[#09090b]">
      <Navbar />
      <Hero />

      {/* Features Section */}
      <section
        className="relative py-24 sm:py-32 lg:py-40 bg-[#09090b]"
        id="features"
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16 sm:mb-24">
            <p className="text-[13px] text-white/25 uppercase tracking-[0.2em] mb-5">
              Features
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-5 tracking-[-0.03em]">
              Everything you need
            </h2>
            <p className="text-[16px] text-white/30 max-w-lg mx-auto leading-relaxed">
              Built for professionals managing multiple opportunities
              simultaneously.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04] rounded-2xl overflow-hidden">
            {[
              {
                icon: <LayoutGrid className="w-5 h-5" />,
                title: "Kanban Board",
                description:
                  "Drag-and-drop cards between Not Started, In Progress, and Completed columns.",
              },
              {
                icon: <BarChart3 className="w-5 h-5" />,
                title: "Real-Time Metrics",
                description:
                  "Animated counters that track your total applications, status breakdowns, and offers.",
              },
              {
                icon: <Chrome className="w-5 h-5" />,
                title: "Chrome Extension",
                description:
                  "Auto-capture job data from LinkedIn, Indeed, and Glassdoor with one click.",
              },
              {
                icon: <Search className="w-5 h-5" />,
                title: "Smart Filtering",
                description:
                  "Real-time search with filters for work type, experience level, and industry.",
              },
              {
                icon: <GripVertical className="w-5 h-5" />,
                title: "Drag & Drop",
                description:
                  "Cards lift on grab, snap into position, and columns highlight valid drop zones.",
              },
              {
                icon: <Bell className="w-5 h-5" />,
                title: "Quick Actions",
                description:
                  "Context menus and batch operations to update, archive, or delete instantly.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-[#09090b] p-8 sm:p-10 hover:bg-white/[0.02] transition-colors duration-300"
              >
                <div className="w-9 h-9 rounded-lg bg-white/[0.04] flex items-center justify-center mb-5 text-white/40 group-hover:text-white/70 group-hover:bg-white/[0.06] transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-[15px] font-semibold text-white/90 mb-2 tracking-[-0.01em]">
                  {feature.title}
                </h3>
                <p className="text-[14px] text-white/30 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        className="relative py-24 sm:py-32 lg:py-40 bg-[#09090b]"
        id="how-it-works"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-white/[0.04]" />

        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16 sm:mb-24">
            <p className="text-[13px] text-white/25 uppercase tracking-[0.2em] mb-5">
              How it works
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-5 tracking-[-0.03em]">
              Three simple steps
            </h2>
            <p className="text-[16px] text-white/30 max-w-lg mx-auto leading-relaxed">
              From chaotic spreadsheets to a data-driven workflow in minutes.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-16 sm:gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Add Applications",
                description:
                  "Use the Chrome extension to auto-capture jobs from LinkedIn, Indeed, and Glassdoor — or add them manually.",
              },
              {
                step: "02",
                title: "Track Progress",
                description:
                  "Drag cards between columns as you move through interview stages. Metrics update in real-time.",
              },
              {
                step: "03",
                title: "Land The Role",
                description:
                  "Review pipeline analytics, spot patterns in successful applications, and optimize your approach.",
              },
            ].map((item, i) => (
              <div key={i} className="relative text-center">
                {i < 2 && (
                  <div className="hidden sm:block absolute top-6 left-[60%] w-[80%] h-px bg-white/[0.04]" />
                )}
                <div className="relative">
                  <div className="text-5xl font-semibold font-mono-data mb-6 text-white/[0.06] tracking-tighter">
                    {item.step}
                  </div>
                  <h3 className="text-[16px] font-semibold text-white/90 mb-3 tracking-[-0.01em]">
                    {item.title}
                  </h3>
                  <p className="text-[14px] text-white/30 leading-relaxed max-w-xs mx-auto">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 sm:py-28 bg-[#09090b]">
        <div className="absolute top-0 left-0 right-0 h-px bg-white/[0.04]" />

        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { value: "12K+", label: "Applications Tracked" },
              { value: "3.2K", label: "Active Users" },
              { value: "89%", label: "More Organized" },
              { value: "2.5x", label: "More Offers" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl sm:text-5xl font-semibold font-mono-data mb-2 text-white/90 tracking-tighter">
                  {stat.value}
                </div>
                <div className="text-[12px] text-white/20 tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        className="relative py-24 sm:py-32 lg:py-40 bg-[#09090b]"
        id="pricing"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-white/[0.04]" />

        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-[13px] text-white/25 uppercase tracking-[0.2em] mb-5">
              Pricing
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-5 tracking-[-0.03em]">
              Simple, transparent pricing
            </h2>
            <p className="text-[16px] text-white/30 max-w-lg mx-auto leading-relaxed">
              Choose the plan that fits your job search. Upgrade anytime.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {plans?.map((item: any) => (
              <PricingCard key={item.id} item={item} user={user} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 sm:py-32 lg:py-40 bg-[#09090b]">
        <div className="absolute top-0 left-0 right-0 h-px bg-white/[0.04]" />

        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white mb-6 tracking-[-0.03em]">
              Ready to take control?
            </h2>
            <p className="text-[16px] text-white/30 mb-10 leading-relaxed">
              Join thousands of professionals who&apos;ve transformed their
              application process.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/sign-up"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3 text-black bg-white rounded-full hover:bg-white/90 transition-all duration-200 text-[14px] font-medium"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
              </a>
            </div>
            <p className="text-[13px] text-white/15 mt-6">
              No credit card required · Free forever plan available
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
