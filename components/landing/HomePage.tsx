"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Header from "@/components/landing/Header";
import HeroCDMark from "@/components/landing/HeroCDMark";
import SectionReveal from "@/components/ui/SectionReveal";

const frameworkStages = [
  {
    index: "01",
    title: "RETHINK",
    copy: [
      "We break down the logic your business was built on.",
      "What once worked may now be limiting what comes next."
    ]
  },
  {
    index: "02",
    title: "REPLACE",
    copy: [
      "We remove outdated systems and rebuild them with intelligence at the core.",
      "Every process is redesigned for clarity, speed, and scale."
    ]
  },
  {
    index: "03",
    title: "REIMAGINE",
    copy: [
      "We move your business beyond incremental improvement into real transformation.",
      "New models. New capabilities. New value creation."
    ]
  }
] as const;

const governancePrinciples = [
  {
    title: "Transparency",
    text: "Every intelligent system is designed to be explainable, observable, and understandable to decision-makers."
  },
  {
    title: "Control",
    text: "Human oversight, escalation paths, and policy boundaries are embedded directly into operational workflows."
  },
  {
    title: "Compliance",
    text: "Architecture choices align with regulatory and industry obligations from the first design decision."
  },
  {
    title: "Security & Risk",
    text: "We engineer resilience against model drift, misuse, and systemic failure with structured safeguards."
  }
] as const;

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-bg text-textPrimary">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute left-[-22%] top-[-34%] h-[62rem] w-[62rem] rounded-full bg-[#4facfe]/18 blur-[165px]"
          animate={{ x: [0, 75, 0], y: [0, 55, 0] }}
          transition={{ repeat: Infinity, duration: 19, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-40%] right-[-22%] h-[62rem] w-[62rem] rounded-full bg-[#00d7ff]/12 blur-[185px]"
          animate={{ x: [0, -85, 0], y: [0, -55, 0] }}
          transition={{ repeat: Infinity, duration: 22, ease: "easeInOut" }}
        />
        <div className="bg-grid absolute inset-0 opacity-[0.16]" />
        <div className="bg-noise absolute inset-0 opacity-[0.1]" />
      </div>

      <Header />

      <main>
        <section className="section-tone-a relative flex min-h-[92vh] items-center overflow-hidden px-4 pb-14 pt-12 md:px-8 md:pb-16 md:pt-16">
          <motion.div
            initial={{ scale: 1.05, opacity: 0.65 }}
            animate={{ scale: [1.05, 1, 1.05], opacity: [0.65, 0.9, 0.65] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute inset-0"
          >
            <Image
              src="/images/hero-transformation.png"
              alt="Destruction transforming into intelligence"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>

          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.6)_52%,rgba(0,0,0,0.2)_100%)]" />
          <motion.div
            className="pointer-events-none absolute right-[26%] top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-[#49d8ff]/24 blur-[110px]"
            animate={{ opacity: [0.12, 0.26, 0.12], scale: [0.95, 1.08, 0.95] }}
            transition={{ duration: 6.4, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-10 xl:gap-12">
            <SectionReveal className="order-1">
              <p className="mb-6 text-xs uppercase tracking-[0.32em] text-[#9cb0c4]">Strategic AI Transformation</p>

              <motion.div
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.22 } } }}
                className="max-w-[12ch] text-5xl font-semibold leading-[0.9] text-white md:text-7xl xl:text-[5.6rem]"
              >
                <motion.span
                  className="block"
                  variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
                >
                  Intelligence
                </motion.span>
                <motion.span
                  className="mt-1 block"
                  variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
                >
                  that
                </motion.span>
                <motion.span
                  className="mt-1 block"
                  variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
                >
                  <motion.span
                    className="accent-word"
                    animate={{ textShadow: ["0 0 0px rgba(102,216,255,0)", "0 0 16px rgba(102,216,255,0.3)", "0 0 0px rgba(102,216,255,0)"] }}
                    transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    Transforms.
                  </motion.span>
                </motion.span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.66 }}
                className="mt-8 max-w-[48ch] text-[1.03rem] leading-[1.82] text-[#c5ccd5] md:text-[1.12rem]"
              >
                In the AI era, innovation is no longer optional. It is the strategic discipline that determines survival,
                reinvention, and long-term market advantage.
              </motion.p>

              <motion.blockquote
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                animate={{ opacity: 0.6, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 1.02 }}
                className="mt-8 max-w-[600px] space-y-3"
              >
                <p className="text-sm italic leading-[1.8] text-[#b7bec8]">
                  "The 'creative destruction' is the process of industrial mutation that incessantly revolutionizes the economic
                  structure from within, incessantly destroying the old one, incessantly creating a new one."
                </p>
                <footer className="text-xs uppercase tracking-[0.2em] text-[#8f99a6]">Joseph Schumpeter</footer>
              </motion.blockquote>

              <motion.a
                href="#"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.3 }}
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#7bd8ff]/45 bg-[linear-gradient(145deg,rgba(111,223,255,0.25),rgba(79,172,254,0.1))] px-7 py-3 text-xs font-medium uppercase tracking-[0.19em] text-white shadow-[0_0_28px_rgba(79,172,254,0.24)] transition duration-300 hover:border-[#afeeff]/75 hover:shadow-[0_0_44px_rgba(79,172,254,0.34)]"
              >
                Become Part of the Evolution
              </motion.a>
            </SectionReveal>

            <div className="order-2 hidden lg:flex items-center justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 12 }}
                animate={{ opacity: [0.18, 0.3, 0.18], scale: [0.98, 1.04, 0.98], y: [0, -6, 0] }}
                transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut" }}
                className="h-[280px] w-[280px] rounded-full bg-[#4dd9ff]/20 blur-[90px]"
              />
            </div>
          </div>
        </section>

        <section className="section-tone-b relative px-4 py-14 md:px-8 md:py-16">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#0a0d13]/35 to-transparent" />
          <SectionReveal className="mx-auto max-w-4xl text-center">
            <div className="pointer-events-none mx-auto mb-8 h-px w-40 bg-gradient-to-r from-transparent via-[#6fd6ff]/55 to-transparent" />
            <h2 className="mx-auto max-w-3xl text-[2.25rem] font-semibold leading-[1.08] text-white md:text-[3rem]">
              Creative destruction is the engine of transformation.
            </h2>
            <p className="mx-auto mt-8 max-w-2xl text-[1.08rem] leading-[1.9] text-[#bec4cc] md:text-[1.18rem]">
              We apply it to redesign systems, strategy, and intelligence.
            </p>
          </SectionReveal>
        </section>

        <section className="section-tone-a relative px-4 py-16 md:px-8 md:py-20">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#0b0e14]/30 to-transparent" />
          <div className="mx-auto max-w-7xl">
            <SectionReveal className="mb-10 md:mb-12">
              <p className="mb-4 text-xs uppercase tracking-[0.32em] text-[#8ea4b8]">OUR APPROACH</p>
              <h2 className="text-4xl font-semibold md:text-5xl">Rethink. Replace. <span className="accent-word">Reimagine.</span></h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#bac0c8] md:text-lg">
                A strategic model for dismantling legacy systems and rebuilding business around intelligence.
              </p>
            </SectionReveal>

            <div className="relative">
              <div className="pointer-events-none absolute left-[16%] right-[16%] top-[1.9rem] hidden h-px bg-gradient-to-r from-transparent via-[#69d7ff]/34 to-transparent lg:block" />
              <div className="grid gap-10 md:gap-12 lg:grid-cols-3">
                {frameworkStages.map((stage, idx) => {
                  const isMiddle = idx === 1;
                  return (
                    <SectionReveal key={stage.title} delay={idx * 0.08} className="relative">
                      <motion.article
                        initial={{ y: 0 }}
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.24, ease: "easeOut" }}
                        className="group relative pl-9 lg:pl-0 lg:pt-12"
                      >
                        <span
                          className={`absolute left-0 top-1 h-5 w-5 rounded-full border shadow-[0_0_14px_rgba(91,207,255,0.3)] lg:left-1/2 lg:top-0 lg:-translate-x-1/2 ${
                            isMiddle ? "border-[#80e5ff]/70 bg-[#6bd9ff]/24" : "border-[#5bcfff]/44 bg-[#68d9ff]/14"
                          }`}
                        />
                        {idx < frameworkStages.length - 1 ? (
                          <span className="pointer-events-none absolute left-[9px] top-7 h-[calc(100%-0.9rem)] w-px bg-gradient-to-b from-[#5bcfff]/30 to-transparent lg:hidden" />
                        ) : null}

                        <div
                          className={`rounded-2xl border border-white/7 bg-[linear-gradient(165deg,rgba(255,255,255,0.02),rgba(255,255,255,0.008))] p-7 transition duration-300 group-hover:-translate-y-0.5 group-hover:border-[#75dcff]/30 group-hover:bg-[linear-gradient(165deg,rgba(111,223,255,0.05),rgba(255,255,255,0.012))] ${
                            isMiddle ? "border-[#73dcff]/18 bg-[linear-gradient(165deg,rgba(111,223,255,0.04),rgba(255,255,255,0.012))]" : ""
                          }`}
                        >
                          <p className="mb-4 text-xs tracking-[0.22em] text-[#8e96a4]">{stage.index}</p>
                          <h3 className="mb-4 text-2xl tracking-[0.09em]">{stage.title}</h3>
                          <div className="space-y-3.5">
                            {stage.copy.map((line) => (
                              <p key={line} className="text-[1rem] leading-[1.85] text-[#c0c5cd]">
                                {line}
                              </p>
                            ))}
                          </div>
                        </div>
                      </motion.article>
                    </SectionReveal>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="section-tone-b relative px-4 py-16 md:px-8 md:py-20">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#0a0d13]/30 to-transparent" />
          <div className="mx-auto max-w-7xl">
            <SectionReveal className="mb-9 md:mb-11">
              <p className="mb-4 text-xs uppercase tracking-[0.32em] text-[#8ea4b8]">AI GOVERNANCE</p>
              <h2 className="text-4xl font-semibold md:text-5xl"><span className="text-[#79dcff]">Intelligence</span> You Can Trust</h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#bac0c8] md:text-lg">
                Built with transparency, control, and compliance at its core.
              </p>
            </SectionReveal>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {governancePrinciples.map((item, idx) => (
                <SectionReveal key={item.title} delay={idx * 0.08}>
                  <motion.article
                    initial={{ y: 0 }}
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.24, ease: "easeOut" }}
                    className="surface-panel h-full rounded-2xl p-6 transition duration-300 hover:border-[#74ddff]/36 hover:bg-[linear-gradient(160deg,rgba(111,223,255,0.06),rgba(255,255,255,0.014))]"
                  >
                    <p className="mb-4 text-[11px] uppercase tracking-[0.26em] text-[#95a8ba]">{`0${idx + 1}`}</p>
                    <h3 className="mb-3 text-2xl">{item.title}</h3>
                    <p className="text-[0.98rem] leading-[1.82] text-[#c0c5cd]">{item.text}</p>
                  </motion.article>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section-tone-a relative px-4 py-16 md:px-8 md:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="pointer-events-none mb-7 h-px w-full bg-gradient-to-r from-transparent via-[#76dfff]/36 to-transparent" />
            <div className="rounded-3xl border border-white/9 bg-[linear-gradient(165deg,rgba(255,255,255,0.03),rgba(255,255,255,0.012))] px-7 py-12 md:px-12">
              <SectionReveal className="max-w-3xl space-y-5">
                <p className="text-xs uppercase tracking-[0.3em] text-[#8ea4b8]">Institutional Collaboration</p>
                <h2 className="text-3xl font-semibold tracking-[-0.01em] md:text-4xl">Partnership for Radical <span className="accent-word">Innovation</span>.</h2>
                <p className="text-lg leading-[1.85] text-[#bcc3cb]">
                  We participate in national and international research and development programs, bringing together
                  academic, institutional, and business partners for sustainable AI progress.
                </p>
              </SectionReveal>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-4 py-10 md:px-8">
        <div className="mx-auto grid w-full max-w-7xl gap-10 md:grid-cols-[1.1fr_1fr_1fr]">
          <div>
            <p className="mb-3 text-lg tracking-[0.18em]">CREATIVE DESTRUCTION</p>
            <p className="text-textSecondary">Intelligence. Strategy. Transformation.</p>
          </div>
          <div className="space-y-2 text-textSecondary">
            <p>office@creativedestruction.vc</p>
          </div>
          <div className="space-y-2 text-textSecondary">
            <a href="#" className="block transition hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="block transition hover:text-white">
              AI Code of Ethics
            </a>
            <a href="#" className="block transition hover:text-white">
              Regulations and Licenses
            </a>
          </div>
        </div>
        <div className="mx-auto mt-8 w-full max-w-7xl border-t border-white/10 pt-6 text-sm text-textSecondary">
          (c) 2024 Creative Destruction VCC. All rights reserved.
        </div>
      </footer>
    </div>
  );
}













