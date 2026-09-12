"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { site } from "@/data/site";

export function WhatsAppFloat() {
  return (
    <motion.a
      href={site.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-[#25D366]/40 transition-all hover:shadow-[#25D366]/60"
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-30" />
      <MessageCircle className="relative h-7 w-7 fill-white text-white" />
    </motion.a>
  );
}
