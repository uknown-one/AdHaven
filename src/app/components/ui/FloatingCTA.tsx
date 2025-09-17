"use client";

import { motion } from "framer-motion";
import { Plus, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FloatingCTA() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5, type: "spring" }}
      className="fixed bottom-6 right-6 z-50"
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative"
      >
        {/* Pulsing glow effect */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-neon-electric/30 rounded-full blur-xl"
        />

        {/* Main button */}
        <Button
          size="lg"
          className="relative glass-card bg-gradient-to-r from-neon-electric to-neon-purple border-neon-electric/50 hover:border-neon-electric text-white font-semibold shadow-glow-lg hover:shadow-glow-neon transition-all duration-300 w-16 h-16 rounded-full p-0"
        >
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
          >
            <Plus className="w-6 h-6" />
          </motion.div>
        </Button>

        {/* Tooltip */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          whileHover={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute right-full top-1/2 transform -translate-y-1/2 mr-4 whitespace-nowrap"
        >
          <div className="glass-card bg-void-900/90 text-white text-sm font-medium px-3 py-2 rounded-lg border border-neon-electric/30">
            Post Free Ad
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-neon-electric/30 border-y-4 border-y-transparent" />
          </div>
        </motion.div>

        {/* Secondary action indicator */}
        <motion.div
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-2 -right-2 w-6 h-6"
        >
          <Zap className="w-4 h-4 text-yellow-400 animate-glow-pulse" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
