import Link from 'next/link';
import { Twitter, Linkedin, Github } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#13151a] border-t border-white/[0.06] relative overflow-hidden">
      {/* Subtle noise */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.03' /%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Top section with brand */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shadow-[0_0_16px_rgba(6,182,212,0.2)]">
                <span className="text-white font-display text-sm font-bold">A</span>
              </div>
              <span className="font-display text-lg font-bold text-[#f5f1e8] tracking-tight">
                Ascent-ly
              </span>
            </Link>
            <p className="text-sm text-[#f5f1e8]/40 leading-relaxed font-body">
              Transform your job search from chaos into an organized, data-driven workflow. Track every application, monitor your pipeline, and land your dream job.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
            {/* Product Column */}
            <div>
              <h3 className="text-xs uppercase tracking-[0.15em] text-[#f5f1e8]/60 font-semibold mb-5">Product</h3>
              <ul className="space-y-3">
                <li><Link href="#features" className="text-sm text-[#f5f1e8]/35 hover:text-cyan-400 transition-colors">Features</Link></li>
                <li><Link href="#pricing" className="text-sm text-[#f5f1e8]/35 hover:text-cyan-400 transition-colors">Pricing</Link></li>
                <li><Link href="/dashboard" className="text-sm text-[#f5f1e8]/35 hover:text-cyan-400 transition-colors">Dashboard</Link></li>
                <li><Link href="#" className="text-sm text-[#f5f1e8]/35 hover:text-cyan-400 transition-colors">Chrome Extension</Link></li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h3 className="text-xs uppercase tracking-[0.15em] text-[#f5f1e8]/60 font-semibold mb-5">Company</h3>
              <ul className="space-y-3">
                <li><Link href="#" className="text-sm text-[#f5f1e8]/35 hover:text-cyan-400 transition-colors">About</Link></li>
                <li><Link href="#" className="text-sm text-[#f5f1e8]/35 hover:text-cyan-400 transition-colors">Blog</Link></li>
                <li><Link href="#" className="text-sm text-[#f5f1e8]/35 hover:text-cyan-400 transition-colors">Careers</Link></li>
                <li><Link href="#" className="text-sm text-[#f5f1e8]/35 hover:text-cyan-400 transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h3 className="text-xs uppercase tracking-[0.15em] text-[#f5f1e8]/60 font-semibold mb-5">Legal</h3>
              <ul className="space-y-3">
                <li><Link href="#" className="text-sm text-[#f5f1e8]/35 hover:text-cyan-400 transition-colors">Privacy</Link></li>
                <li><Link href="#" className="text-sm text-[#f5f1e8]/35 hover:text-cyan-400 transition-colors">Terms</Link></li>
                <li><Link href="#" className="text-sm text-[#f5f1e8]/35 hover:text-cyan-400 transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/[0.06]">
          <div className="text-sm text-[#f5f1e8]/25 mb-4 md:mb-0 font-body">
            © {currentYear} Ascent-ly. All rights reserved.
          </div>
          
          <div className="flex space-x-5">
            <a href="#" className="text-[#f5f1e8]/20 hover:text-cyan-400 transition-colors">
              <span className="sr-only">Twitter</span>
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-[#f5f1e8]/20 hover:text-cyan-400 transition-colors">
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" className="text-[#f5f1e8]/20 hover:text-cyan-400 transition-colors">
              <span className="sr-only">GitHub</span>
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
