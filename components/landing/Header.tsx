"use client";

import { motion } from "framer-motion";

const navItems = ["Services", "Projects", "About", "Blog"];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 px-4 py-4 md:px-8">
      <div className="glass mx-auto flex w-full max-w-7xl items-center justify-between gap-4 rounded-2xl px-4 py-3 md:px-6">
        <a href="#" className="min-w-0">
          <span className="block truncate font-[var(--font-display)] text-[12px] tracking-[0.2em] text-white md:text-sm">
            Creative Destruction
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className="group relative text-[12px] uppercase tracking-[0.18em] text-[#b4b4b4] transition-colors duration-300 hover:text-white"
            >
              {item}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[#69d7ff] transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <motion.a
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          href="#"
          className="rounded-full border border-[#6bd1ff]/45 bg-[linear-gradient(145deg,rgba(87,205,255,0.2),rgba(79,172,254,0.08))] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white shadow-[0_0_20px_rgba(79,172,254,0.2)] transition duration-300 hover:border-[#93e4ff]/70 hover:shadow-[0_0_30px_rgba(79,172,254,0.3)] md:px-5 md:py-2.5"
        >
          Contact Us
        </motion.a>
      </div>
    </header>
  );
}
