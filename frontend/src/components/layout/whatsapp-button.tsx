"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";

const GREETING = encodeURIComponent(
  "Hallo Harry! Ich interessiere mich für eine Sansibar Tour und hätte gerne mehr Informationen."
);

export function WhatsAppButton() {
  return (
    <motion.a
      href={`https://wa.me/${siteConfig.whatsappNumber}?text=${GREETING}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Über WhatsApp kontaktieren"
      className="fixed bottom-6 right-6 z-40 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-40" />
      <MessageCircle className="relative size-7" fill="white" strokeWidth={0} />
    </motion.a>
  );
}
