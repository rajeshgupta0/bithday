import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

// Floating Memory Fragment Component
const MemoryFragment = ({ delay, x, y }: { delay: number; x: number; y: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
    animate={{
      opacity: [0, 0.15, 0.08, 0],
      scale: [0, 1, 0.8, 0],
      x: [0, x],
      y: [0, y],
      rotate: [0, Math.random() * 360],
    }}
    transition={{
      duration: 15 + Math.random() * 10,
      delay,
      repeat: Infinity,
      ease: "linear",
    }}
    className="absolute rounded-lg overflow-hidden backdrop-blur-sm"
    style={{
      width: 60 + Math.random() * 80,
      height: 70 + Math.random() * 100,
      background: `linear-gradient(135deg, rgba(255,77,141,0.15), rgba(168,85,247,0.1))`,
      border: "1px solid rgba(255,255,255,0.1)",
    }}
  />
);

// Shooting Star Component
const ShootingStar = ({ delay }: { delay: number }) => (
  <motion.div
    initial={{ x: "-20%", y: "-20%", opacity: 0 }}
    animate={{
      x: ["-20%", "120%"],
      y: ["-20%", "80%"],
      opacity: [0, 1, 0.8, 0],
    }}
    transition={{
      duration: 2.5,
      delay,
      repeat: Infinity,
      repeatDelay: 8 + Math.random() * 5,
      ease: "linear",
    }}
    className="absolute"
    style={{
      width: 2,
      height: 2,
      background: "white",
      boxShadow: "0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,77,141,0.6)",
    }}
  >
    <motion.div
      className="absolute -left-[80px] top-0 h-[2px] w-[80px]"
      style={{
        background: "linear-gradient(90deg, transparent, white, rgba(255,77,141,0.6))",
      }}
    />
  </motion.div>
);

// Rotating Messages
const messages = [
  "Every memory became a favorite story.",
  "The best moments always included you.",
  "Some people become memories. You became a whole chapter.",
  "Life gave me moments. You made them unforgettable.",
  "Every laugh, every late night, every heartbeat.",
];

export function Hero() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [showName, setShowName] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Mouse tracking for interactive depth
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });
  
  // Transform values for parallax
  const rotateX = useTransform(springY, [-0.5, 0.5], [2, -2]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-2, 2]);
  const backgroundX = useTransform(springX, [-0.5, 0.5], [-20, 20]);
  const backgroundY = useTransform(springY, [-0.5, 0.5], [-15, 15]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowName(true), 2200);
    const timer2 = setTimeout(() => setShowHeart(true), 2800);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    }
  };

  const handleBeginJourney = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      document.getElementById("timeline")?.scrollIntoView({ behavior: "smooth" });
      setIsTransitioning(false);
    }, 1200);
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative isolate min-h-screen overflow-hidden bg-[#0A0A0F]"
    >
      {/* ===== LAYER 1: Animated Galaxy Starfield ===== */}
      <div className="absolute inset-0">
        {[...Array(200)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              width: 1 + Math.random() * 2,
              height: 1 + Math.random() * 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.2 + Math.random() * 0.5,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* ===== LAYER 2: Slow Moving Aurora Gradients ===== */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-[20%] -top-[20%] h-[140%] w-[140%] rounded-full bg-[#FF4D8D] opacity-15 blur-[120px]"
          animate={{
            x: ["0%", "10%", "-5%", "0%"],
            y: ["0%", "-5%", "10%", "0%"],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-[20%] -right-[20%] h-[140%] w-[140%] rounded-full bg-[#A855F7] opacity-15 blur-[120px]"
          animate={{
            x: ["0%", "-10%", "5%", "0%"],
            y: ["0%", "10%", "-5%", "0%"],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute left-[30%] top-[40%] h-[80%] w-[80%] rounded-full bg-[#67E8F9] opacity-10 blur-[100px]"
          animate={{
            scale: [1, 1.2, 0.8, 1],
            opacity: [0.1, 0.15, 0.08, 0.1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* ===== LAYER 3: Floating Particles ===== */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(80)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              width: 2 + Math.random() * 4,
              height: 2 + Math.random() * 4,
              background: `hsla(${260 + Math.random() * 100}, 80%, 70%, ${0.2 + Math.random() * 0.5})`,
              boxShadow: `0 0 ${5 + Math.random() * 15}px hsla(${260 + Math.random() * 100}, 80%, 70%, 0.3)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30 - Math.random() * 50],
              x: [0, (Math.random() - 0.5) * 30],
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 7,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* ===== LAYER 4: Soft Fog Layers ===== */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-[#0A0A0F] via-transparent to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-[30%] bg-gradient-to-b from-[#0A0A0F]/50 via-transparent to-transparent" />
      </div>

      {/* ===== LAYER 5: Mouse-Reactive Light Effect ===== */}
      <motion.div
        className="pointer-events-none absolute h-[600px] w-[600px] rounded-full bg-gradient-to-r from-[#FF4D8D]/20 via-[#A855F7]/20 to-transparent blur-[80px]"
        style={{
          left: useTransform(springX, [-0.5, 0.5], ["30%", "70%"]),
          top: useTransform(springY, [-0.5, 0.5], ["20%", "60%"]),
        }}
      />

      {/* ===== LAYER 6: Shooting Stars ===== */}
      {[...Array(4)].map((_, i) => (
        <ShootingStar key={`shooting-${i}`} delay={i * 3} />
      ))}

      {/* ===== Memory Fragments Drifting ===== */}
      {[...Array(12)].map((_, i) => (
        <MemoryFragment
          key={`memory-${i}`}
          delay={i * 1.5}
          x={(Math.random() - 0.5) * 300}
          y={(Math.random() - 0.5) * 200}
        />
      ))}

      {/* ===== Bokeh Light Effects ===== */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={`bokeh-${i}`}
            className="absolute rounded-full bg-white/5"
            style={{
              width: 30 + Math.random() * 80,
              height: 30 + Math.random() * 80,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.03, 0.08, 0.03],
            }}
            transition={{
              duration: 8 + Math.random() * 7,
              repeat: Infinity,
              delay: Math.random() * 10,
            }}
          />
        ))}
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <motion.div
        ref={containerRef}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative z-20 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 text-center"
      >
        {/* Cinematic Reveal Sequence */}
        <div className="relative">
          {/* Small Glowing Text */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2 backdrop-blur-2xl">
              <motion.div
                className="h-1.5 w-1.5 rounded-full bg-[#FF4D8D]"
                animate={{ scale: [1, 1.8, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-[11px] font-light uppercase tracking-[0.3em] text-white/50">
                A Celebration of Memories
              </span>
            </div>
          </motion.div>

          {/* "Happy Birthday" Text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <h1 className="text-5xl font-light tracking-tight text-white/80 md:text-7xl lg:text-8xl">
              Happy Birthday
            </h1>
          </motion.div>

          {/* Name Reveal - Dramatic */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={showName ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 1.2, type: "spring", stiffness: 80 }}
            className="relative mt-4"
          >
            <div className="relative">
              {/* Name Glow Background */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={showName ? { scale: 1, opacity: 0.3 } : {}}
                transition={{ delay: 0.3, duration: 1 }}
                className="absolute inset-0 blur-3xl"
                style={{
                  background: "radial-gradient(circle, rgba(255,77,141,0.3), rgba(168,85,247,0.2))",
                }}
              />
              
              <h2 className="relative text-6xl font-bold tracking-tight md:text-8xl lg:text-9xl">
                <span className="bg-gradient-to-r from-[#FF4D8D] via-[#A855F7] to-[#67E8F9] bg-clip-text text-transparent">
                  ANKIT VERMA
                </span>
              </h2>
            </div>

            {/* Animated underline */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={showName ? { width: "100%", opacity: 1 } : {}}
              transition={{ delay: 0.8, duration: 1 }}
              className="mx-auto mt-4 h-px w-32 bg-gradient-to-r from-transparent via-[#FF4D8D] to-transparent"
            />
          </motion.div>

          {/* Heart Animation */}
          <AnimatePresence>
            {showHeart && (
              <motion.div
                initial={{ scale: 0, rotate: -30, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="mt-6"
              >
                <motion.span
                  className="inline-block text-4xl md:text-5xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{
                    filter: "drop-shadow(0 0 20px #FF4D8D)",
                  }}
                >
                  ❤
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Rotating Message System */}
        <div className="relative mt-12 h-20">
          <AnimatePresence mode="wait">
            <motion.p
              key={messageIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
              className="text-center text-base font-light italic text-white/40 md:text-xl"
            >
              {messages[messageIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Premium Cinematic CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.2, duration: 0.8 }}
          className="mt-12"
        >
          <motion.button
            onClick={handleBeginJourney}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group relative overflow-hidden rounded-full px-8 py-3.5 md:px-10 md:py-4"
          >
            {/* Button Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF4D8D] via-[#A855F7] to-[#67E8F9]" />
            
            {/* Animated Border Glow */}
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF4D8D] via-[#A855F7] to-[#67E8F9] blur-xl" />
            </div>
            
            {/* Shimmer Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            </div>
            
            <span className="relative text-sm font-medium uppercase tracking-[0.2em] text-white md:text-base">
              Begin the Journey
            </span>
          </motion.button>
        </motion.div>

        {/* Premium Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.8, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-3">
            {/* Mouse Icon */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <svg width="26" height="40" viewBox="0 0 26 40" fill="none" className="text-white/30">
                <rect x="1" y="1" width="24" height="38" rx="12" stroke="currentColor" strokeWidth="1.5" />
                <motion.circle
                  cx="13"
                  cy="12"
                  r="2"
                  fill="currentColor"
                  animate={{ y: [0, 16, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </svg>
            </motion.div>
            
            {/* Particle Trail */}
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="h-1 w-1 rounded-full bg-white/30"
                  animate={{
                    opacity: [0.3, 0.8, 0.3],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ===== Portal Transition Overlay ===== */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl"
          >
            <motion.div
              animate={{ scale: [1, 1.5, 0], opacity: [1, 0.5, 0] }}
              transition={{ duration: 1.2 }}
              className="relative"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF4D8D] via-[#A855F7] to-[#67E8F9] blur-3xl" />
              <div className="relative text-4xl md:text-6xl">✨</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Hero;