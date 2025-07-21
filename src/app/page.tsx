"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const videoList = [
  "/video/cinematic.mp4",
  "/video/cinematic2.mp4",
  "/video/cinematic4.mp4",
];

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(true);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  useEffect(() => {
    const introTimer = setTimeout(() => {
      setShowIntro(false);
    }, 4000);
    return () => clearTimeout(introTimer);
  }, []);

  useEffect(() => {
    const currentVideo = videoRefs.current[currentVideoIndex];
    const handleEnded = () => {
      if (currentVideoIndex < videoList.length - 1) {
        setCurrentVideoIndex((prev) => prev + 1);
      } else {
        setCurrentVideoIndex(0);
      }
    };

    if (currentVideo) {
      currentVideo.addEventListener("ended", handleEnded);
      currentVideo.play();
    }

    return () => {
      if (currentVideo) {
        currentVideo.removeEventListener("ended", handleEnded);
      }
    };
  }, [currentVideoIndex]);

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background Video */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        {videoList.map((src, index) => (
          <video
            key={src}
            ref={(el) => {
              if (el) videoRefs.current[index] = el;
            }}
            muted
            playsInline
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentVideoIndex ? "opacity-100" : "opacity-0"
            }`}
            src={src}
          />
        ))}
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Top Navbar */}
        <header className="w-full bg-black bg-opacity-60 backdrop-blur-md p-4 border-b border-gray-700 flex items-center justify-between">
          <h2 className="text-3xl font-bold italic text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
            golfdaddy-hub.com
          </h2>
          <nav className="flex space-x-6 text-lg font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
            <a href="#" className="hover:text-green-400 transition">Home</a>
            <a href="#" className="hover:text-green-400 transition">Dashboard</a>
            <a href="#" className="hover:text-green-400 transition">Settings</a>
            <a href="#" className="hover:text-green-400 transition">Logout</a>
          </nav>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
          {/* Intro Animation */}
          <AnimatePresence>
            {showIntro && (
              <motion.div
                className="absolute inset-0 bg-black flex items-center justify-center z-20"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 1.5 } }}
              >
                <motion.h1
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1.1, opacity: 1 }}
                  transition={{ duration: 2 }}
                  className="text-4xl font-bold tracking-wider text-white"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Welcome to golfdaddy-hub.com 🎬
                </motion.h1>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
