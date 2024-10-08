"use client";
import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { useLanguage } from "@/components/provider/language-provider";
import LogoSite from "@/components/overview/logo-site";

export function AuthBackground() {

  const { dict } = useLanguage();

  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="relative z-20 flex items-center text-lg font-medium">
          <LogoSite />
        </div>
        <div className="text-3xl md:text-5xl font-bold dark:text-white text-center">
          &ldquo;{dict.auth.quote}&rdquo;
        </div>
        <div className="font-extralight text-base md:text-xl dark:text-neutral-200 py-4">
          {dict.auth.author}
        </div>
      </motion.div>
    </AuroraBackground>
  );
}
