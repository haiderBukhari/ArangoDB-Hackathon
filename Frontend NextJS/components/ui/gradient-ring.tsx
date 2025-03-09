'use client';
import { motion } from "framer-motion";

export const GradientRing = ({ className }: { className?: string }) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0.4 }}
    animate={{ 
      scale: 1, 
      opacity: 1,
      rotate: 360 
    }}
    transition={{ 
      duration: 10,
      repeat: Infinity,
      ease: "linear"
    }}
    className={`absolute w-[600px] h-[600px] ${className}`}
  >
    <div className="w-full h-full rounded-full border-[40px] border-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 [mask-image:linear-gradient(white,transparent)] rotate-45 blur-lg opacity-50" />
  </motion.div>
);
