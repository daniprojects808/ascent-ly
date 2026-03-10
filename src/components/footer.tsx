import Link from "next/link";
import { Twitter, Linkedin, Github } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0b] border-t border-white/[0.04]">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 md:gap-12 mb-12 md:mb-16">
          <div className="max-w-sm w-full">
            <Link href="/" className="flex items-center gap-0 mb-4 group">
              <span className="text-[15px] font-semibold text-white tracking-[-0.02em]">
                Ascent-ly
              </span>
            </Link>
            <p className="text-[13px] text-white/25 leading-relaxed">
              The job search tracker built for students and recent grads who are
              applying to everything and need to keep it all straight.
            </p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-3 gap-8 sm:gap-12 w-full md:w-auto">
            <div>
              <h3 className="text-[12px] text-white/40 font-medium mb-5 tracking-wide">
                Product
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#features"
                    className="text-[13px] text-white/20 hover:text-white/60 transition-colors duration-200"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#pricing"
                    className="text-[13px] text-white/20 hover:text-white/60 transition-colors duration-200"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard"
                    className="text-[13px] text-white/20 hover:text-white/60 transition-colors duration-200"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-[13px] text-white/20 hover:text-white/60 transition-colors duration-200"
                  >
                    Chrome Extension
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-[12px] text-white/40 font-medium mb-5 tracking-wide">
                Company
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#"
                    className="text-[13px] text-white/20 hover:text-white/60 transition-colors duration-200"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-[13px] text-white/20 hover:text-white/60 transition-colors duration-200"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-[12px] text-white/40 font-medium mb-5 tracking-wide">
                Legal
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#"
                    className="text-[13px] text-white/20 hover:text-white/60 transition-colors duration-200"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-[13px] text-white/20 hover:text-white/60 transition-colors duration-200"
                  >
                    Terms
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-[13px] text-white/20 hover:text-white/60 transition-colors duration-200"
                  >
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/[0.04] gap-4 md:gap-0 text-center md:text-left">
          <div className="text-[12px] text-white/15">
            © {currentYear} Ascent-ly. All rights reserved.
          </div>

          <div className="flex space-x-5">
            <a
              href="#"
              className="text-white/15 hover:text-white/40 transition-colors duration-200"
            >
              <span className="sr-only">Twitter</span>
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="text-white/15 hover:text-white/40 transition-colors duration-200"
            >
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="text-white/15 hover:text-white/40 transition-colors duration-200"
            >
              <span className="sr-only">GitHub</span>
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
