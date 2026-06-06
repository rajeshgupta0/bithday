import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { StarField } from "./StarField";

export function Finale() {
  const [boom, setBoom] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Auto fireworks
  useEffect(() => {
    const id = setInterval(() => setBoom((b) => b + 1), 2200);
    return () => clearInterval(id);
  }, []);

  // Premium colors matching Timeline
  const fireworkColors = [
    { hue: 340, name: "Rose Pink", hex: "#FF4D8D" },
    { hue: 270, name: "Lavender", hex: "#A855F7" },
    { hue: 190, name: "Sky Cyan", hex: "#67E8F9" },
    { hue: 50, name: "Soft Gold", hex: "#FBBF24" },
  ];

  return (
    <section ref={containerRef} className="relative isolate min-h-screen overflow-hidden bg-[#0A0A10] py-28 md:py-40">
      {/* Premium Background - Brighter */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 h-[600px] w-[600px] rounded-full bg-[#FF4D8D] opacity-25 blur-[150px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 h-[600px] w-[600px] rounded-full bg-[#A855F7] opacity-25 blur-[150px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#67E8F9] opacity-20 blur-[150px] animate-pulse delay-2000" />
        <div className="absolute bottom-1/3 right-1/3 h-[400px] w-[400px] rounded-full bg-[#FBBF24] opacity-15 blur-[150px] animate-pulse delay-3000" />
      </div>

      <StarField density={1.8} />

      {/* Fireworks bursts */}
      <Firework 
        key={boom} 
        x={20 + (boom * 13) % 60} 
        y={20 + (boom * 7) % 30} 
        color={fireworkColors[boom % fireworkColors.length]} 
      />
      <Firework 
        key={`b-${boom}`} 
        x={50 + (boom * 17) % 30} 
        y={15 + (boom * 11) % 25} 
        color={fireworkColors[(boom + 1) % fireworkColors.length]} 
        delay={0.4} 
      />
      <Firework 
        key={`c-${boom}`} 
        x={70 + (boom * 9) % 25} 
        y={25 + (boom * 13) % 20} 
        color={fireworkColors[(boom + 2) % fireworkColors.length]} 
        delay={0.7} 
      />

      {/* Heart of stars */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2">
        <HeartStars />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl px-4 py-1.5 mb-6"
        >
          <motion.div
            className="h-1.5 w-1.5 rounded-full bg-[#FF4D8D]"
            animate={{ scale: [1, 1.8, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/60">
            The End. Or Maybe Just The Beginning.
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-tight"
        >
          <span className="text-white/90">
            You are
          </span>
          <br />
          <span className="bg-gradient-to-r from-[#FF4D8D] via-[#A855F7] to-[#67E8F9] bg-clip-text text-transparent font-medium">
            one of the best parts
          </span>
          <br />
          <span className="text-white/90">
            of my life
          </span>
          <span className="inline-block ml-3 text-[#FF4D8D] animate-pulse text-5xl md:text-7xl">❤</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mx-auto mt-8 max-w-2xl text-white/50 text-sm tracking-wide md:text-base"
        >
          No matter where life goes…
          <br />
          these memories will always stay alive.
        </motion.p>

        {/* Premium Confetti */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-full overflow-hidden">
          {Array.from({ length: 100 }).map((_, i) => {
            const color = fireworkColors[i % fireworkColors.length];
            const sizeW = 4 + Math.random() * 8;
            const sizeH = 6 + Math.random() * 14;
            return (
              <motion.span
                key={i}
                initial={{ y: -20, x: `${Math.random() * 100}%`, rotate: 0, opacity: 0 }}
                animate={{ y: "110vh", rotate: 720, opacity: [0, 0.9, 0.9, 0] }}
                transition={{
                  duration: 6 + Math.random() * 5,
                  repeat: Infinity,
                  delay: -Math.random() * 7,
                  ease: "linear",
                }}
                className="absolute block"
                style={{
                  width: sizeW,
                  height: sizeH,
                  background: `linear-gradient(135deg, ${color.hex}, ${color.hex}cc)`,
                  boxShadow: `0 0 15px ${color.hex}`,
                  borderRadius: 2,
                  opacity: 0.8,
                }}
              />
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-16"
        >
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent max-w-md mx-auto" />
          <p className="mt-6 text-white/30 text-[8px] tracking-[0.5em] uppercase">
            made with love · for you
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// Premium Firework Component - Brighter
function Firework({ x, y, color, delay = 0 }: { x: number; y: number; color: { hue: number; name: string; hex: string }; delay?: number }) {
  const particles = 32;
  
  return (
    <div className="pointer-events-none absolute" style={{ left: `${x}%`, top: `${y}%` }} aria-hidden>
      {Array.from({ length: particles }).map((_, i) => {
        const angle = (i / particles) * Math.PI * 2;
        const dist = 90 + Math.random() * 110;
        const size = 2.5 + Math.random() * 3.5;
        
        return (
          <motion.span
            key={i}
            initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            animate={{
              opacity: 0,
              x: Math.cos(angle) * dist,
              y: Math.sin(angle) * dist,
              scale: 0.1,
            }}
            transition={{ duration: 1.5, delay: delay + Math.random() * 0.1, ease: "easeOut" }}
            className="absolute block rounded-full"
            style={{
              width: size,
              height: size,
              background: `radial-gradient(circle, ${color.hex}, ${color.hex}aa)`,
              boxShadow: `0 0 ${size * 4}px ${color.hex}, 0 0 ${size * 8}px ${color.hex}`,
            }}
          />
        );
      })}
      
      {/* Central bright flash */}
      <motion.span
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: 4, opacity: 0 }}
        transition={{ duration: 0.5, delay }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 block rounded-full"
        style={{
          width: 12,
          height: 12,
          background: `radial-gradient(circle, white, ${color.hex})`,
          boxShadow: `0 0 30px ${color.hex}, 0 0 60px white`,
        }}
      />
    </div>
  );
}

// Premium Heart Stars - Brighter and more vibrant
function HeartStars() {
  const pts = Array.from({ length: 64 }, (_, i) => {
    const t = (i / 64) * Math.PI * 2;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    return { x: x * 8, y: y * 8 };
  });
  
  const colors = [
    { hue: 340, hex: "#FF4D8D" },
    { hue: 270, hex: "#A855F7" },
    { hue: 190, hex: "#67E8F9" },
    { hue: 50, hex: "#FBBF24" },
  ];
  
  return (
    <div className="relative h-[320px] w-[320px]">
      {pts.map((p, i) => {
        const color = colors[i % colors.length];
        const size = 2.5 + Math.sin(i) * 1;
        return (
          <motion.span
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.02, duration: 0.4, ease: "backOut" }}
            className="absolute rounded-full"
            style={{
              left: `calc(50% + ${p.x}px)`,
              top: `calc(50% + ${p.y}px)`,
              width: size,
              height: size,
              background: `radial-gradient(circle, ${color.hex}, ${color.hex}cc)`,
              boxShadow: `0 0 ${size * 3}px ${color.hex}, 0 0 ${size * 6}px ${color.hex}`,
            }}
          />
        );
      })}
      
      {/* Heart center bright glow */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 0.8 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 80,
          height: 80,
          background: "radial-gradient(circle, rgba(255,77,141,0.4) 0%, rgba(168,85,247,0.2) 50%, transparent 80%)",
        }}
      />
    </div>
  );
}

export default Finale;