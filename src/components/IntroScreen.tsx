"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroScreen() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-80 text-white z-50"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.5 } }}
        >
          {/* Top-left title */}
          <motion.div
            className="absolute top-6 left-6 text-3xl font-bold tracking-wide"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Golfdaddy 🎬
          </motion.div>

          {/* Centered welcome message */}
          <div className="flex items-center justify-center h-full">
            <motion.h1
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 2 }}
              className="text-2xl sm:text-4xl font-semibold text-center"
            >
              Welcome
            </motion.h1>
          </div>

          {/* Bottom-right credit */}
          <motion.div
            className="absolute bottom-4 right-4 text-sm text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            Brought to you by Golfdaddy
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}