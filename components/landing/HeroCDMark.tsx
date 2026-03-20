"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroCDMark() {
  return (
    <div className="relative mx-auto h-[330px] w-full max-w-[900px] overflow-hidden rounded-[1.8rem] md:h-[400px] lg:h-[500px]">
      <motion.div
        initial={{ opacity: 0, scale: 1.05, filter: "blur(6px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <motion.div
          animate={{ scale: [1, 1.03, 1], opacity: [0.96, 1, 0.96] }}
          transition={{ duration: 14, ease: "easeInOut", repeat: Infinity }}
          className="relative h-full w-full"
        >
          <Image
            src="/images/hero-transformation.png"
            alt="Destruction transforming into intelligence"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 900px"
            className="object-cover object-center"
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="pointer-events-none absolute left-[45%] top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4ad8ff]/22 blur-[110px]"
        animate={{ opacity: [0.14, 0.28, 0.14], scale: [0.94, 1.08, 0.94] }}
        transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut", delay: 0.28 }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 1.05 }}
        className="absolute inset-0 flex items-center justify-center p-10 md:p-12"
      >
        <div className="relative h-full w-full max-h-[320px] max-w-[520px] md:max-h-[370px] md:max-w-[600px]">
          <Image
            src="/images/cd-vcc-logo.png"
            alt="Creative Destruction brand mark"
            fill
            sizes="(max-width: 1024px) 70vw, 600px"
            className="object-contain"
          />
        </div>
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(125deg,rgba(7,8,13,0.18)_0%,rgba(7,8,13,0)_34%,rgba(7,8,13,0.2)_100%)]" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#07080d]/55 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#07080d]/55 via-transparent to-transparent" />
    </div>
  );
}
