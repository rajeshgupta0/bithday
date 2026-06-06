import { motion, useScroll, useTransform, useInView, MotionValue } from "framer-motion";
import { useRef, useState } from "react";

// Images
import img1 from "@/assets/img1.jpg";
import img7 from "@/assets/img7.jpg";
import img6 from "@/assets/img6.jpg";
import img3 from "@/assets/img3.jpg";
import img15 from "@/assets/img15.jpg";
import img61 from "@/assets/img6.1.jpg";
import memory7 from "@/assets/memory-7.jpg";

interface Memory {
  id: number;
  timeLabel: string;
  locationLabel: string;
  momentText: string;
  img: string;
  colorStart: string;
  colorEnd: string;
}

const memories: Memory[] = [
  {
    id: 1,
    timeLabel: "First Day",
    locationLabel: "Gargi Hostel",
    momentText: "Two strangers. One room. Everything changed.",
    img: img1,
    colorStart: "#FF4D8D",
    colorEnd: "#FBBF24",
  },
  {
    id: 2,
    timeLabel: "26th January",
    locationLabel: "KNIT Campus",
    momentText: "Tiranga. Friends. A feeling of belonging.",
    img: img61,
    colorStart: "#67E8F9",
    colorEnd: "#A855F7",
  },
  {
    id: 3,
    timeLabel: "Youth Day",
    locationLabel: "KNIT Auditorium",
    momentText: "You on stage. Me in the crowd. Proud doesn't cover it.",
    img: img6,
    colorStart: "#A855F7",
    colorEnd: "#FF4D8D",
  },
  {
    id: 4,
    timeLabel: "Industrial Visit",
    locationLabel: "Korwa Factory",
    momentText: "Learning nothing. Creating everything. Memories.",
    img: img7,
    colorStart: "#FBBF24",
    colorEnd: "#67E8F9",
  },
  {
    id: 5,
    timeLabel: "Night Walk",
    locationLabel: "Somewhere Loud",
    momentText: "The night music felt like time travel.",
    img: img3,
    colorStart: "#FF4D8D",
    colorEnd: "#A855F7",
  },
  {
    id: 6,
    timeLabel: "Hackathon Time",
    locationLabel: "Lucknow Streets",
    momentText: "Hungry. Tired. Chasing dreams anyway.",
    img: img15,
    colorStart: "#67E8F9",
    colorEnd: "#FF4D8D",
  },
  {
    id: 7,
    timeLabel: "The Return",
    locationLabel: "KNIT Fest",
    momentText: "Same campus. Different year. Same laughter.",
    img: memory7,
    colorStart: "#FBBF24",
    colorEnd: "#FF4D8D",
  },
];

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-[#0B1020]"
    >
      <AuroraBackground scrollY={scrollYProgress} />
      <FloatingParticles />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-28 md:py-40">
        <CinematicHeader />
        
        <div className="relative mt-28">
          <ProgressLine scrollYProgress={scrollYProgress} />
          
          <div className="space-y-40 md:space-y-56">
            {memories.map((memory, index) => (
              <MemoryCard
                key={memory.id}
                memory={memory}
                index={index}
              />
            ))}
          </div>
        </div>

        <EndingCard />
      </div>
    </section>
  );
}

function AuroraBackground({ scrollY }: { scrollY: MotionValue<number> }) {
  const y = useTransform(scrollY, [0, 1], [0, 100]);

  return (
    <motion.div className="absolute inset-0 overflow-hidden" style={{ y }}>
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1020] via-[#1a1030] to-[#0B1020]" />
      
      <motion.div
        className="absolute top-0 left-1/4 h-[600px] w-[600px] rounded-full bg-[#FF4D8D] opacity-15 blur-[150px]"
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -50, 100, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      
      <motion.div
        className="absolute bottom-0 right-1/4 h-[600px] w-[600px] rounded-full bg-[#A855F7] opacity-15 blur-[150px]"
        animate={{
          x: [0, -80, 120, 0],
          y: [0, 80, -40, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 2 }}
      />
      
      <motion.div
        className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#67E8F9] opacity-10 blur-[150px]"
        animate={{
          scale: [1, 1.3, 0.9, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );
}

function FloatingParticles() {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    size: Math.random() * 2 + 1,
    left: Math.random() * 100,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 8,
    opacity: Math.random() * 0.3,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white/20"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.left}%`,
            opacity: particle.opacity,
          }}
          animate={{
            y: ["100vh", "-10vh"],
            x: [`${Math.random() * 60 - 30}px`, `${Math.random() * 60 - 30}px`],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

function CinematicHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="text-center mb-24"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-xl mb-6"
      >
        <motion.div
          className="h-1.5 w-1.5 rounded-full bg-[#FF4D8D]"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/50">
          Memories
        </span>
      </motion.div>

      <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight">
        <span className="bg-gradient-to-r from-white via-white/80 to-white/60 bg-clip-text text-transparent">
          Frozen in Time
        </span>
      </h1>
      
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-5 text-white/30 text-xs tracking-[0.2em] uppercase"
      >
        Scroll slowly. Let each moment breathe.
      </motion.p>
    </motion.div>
  );
}

function ProgressLine({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const lineHeight = useTransform(scrollYProgress, [0, 0.7, 0.9], ["0%", "70%", "100%"]);

  return (
    <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 lg:block">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent" />
      
      <motion.div
        className="absolute bottom-0 left-0 w-full origin-bottom bg-gradient-to-t from-[#FF4D8D] via-[#A855F7] to-[#67E8F9]"
        style={{ height: lineHeight }}
      />
      
      <motion.div
        className="absolute bottom-0 left-1/2 h-16 w-16 -translate-x-1/2 rounded-full blur-2xl"
        style={{
          background: "radial-gradient(circle, rgba(255,77,141,0.3) 0%, transparent 70%)",
          bottom: `calc(${lineHeight} - 30px)`,
        }}
      />
    </div>
  );
}

function MemoryCard({ memory, index }: { memory: Memory; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [imageOffset, setImageOffset] = useState({ x: 0, y: 0 });
  const isEven = index % 2 === 0;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX((y - centerY) / 25);
    setRotateY((centerX - x) / 25);
    setImageOffset({ x: (x - centerX) / 40, y: (y - centerY) / 40 });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setImageOffset({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: isEven ? -60 : 60, y: 40, rotate: isEven ? -2 : 2 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0, rotate: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.12, type: "spring", stiffness: 80 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className={`relative flex flex-col gap-6 ${
        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
      } lg:gap-10`}>
        
        <div className="flex-1">
          <motion.div
            className="relative group"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transformStyle: "preserve-3d",
              transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            }}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <div className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"
                 style={{ 
                   background: `linear-gradient(135deg, ${memory.colorStart}, ${memory.colorEnd})`,
                   filter: "blur(15px)",
                 }} />
            
            <div className="relative rounded-3xl bg-white/[0.02] backdrop-blur-md border border-white/5 overflow-hidden">
              
              <div className="relative aspect-[4/3] overflow-hidden">
                <motion.div
                  style={{ x: imageOffset.x, y: imageOffset.y }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  className="h-full w-full"
                >
                  <motion.img
                    src={memory.img}
                    alt=""
                    className="h-full w-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Time Label */}
                <div className="absolute bottom-6 left-6">
                  <div className="flex flex-col gap-1">
                    <span 
                      className="text-xs font-medium tracking-wider text-white/50"
                      style={{ letterSpacing: "0.15em" }}
                    >
                      {memory.locationLabel}
                    </span>
                    <span className="text-2xl md:text-3xl font-light text-white tracking-tight">
                      {memory.timeLabel}
                    </span>
                  </div>
                </div>

                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r"
                  style={{ background: `linear-gradient(90deg, ${memory.colorStart}, ${memory.colorEnd})` }}
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "100%" } : {}}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                />
              </div>

              <motion.div
                className="p-6 md:p-7"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <p className="text-white/70 text-sm md:text-base italic font-light leading-relaxed">
                  {memory.momentText}
                </p>
                
                <motion.div
                  className="mt-4 flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: index * 0.1 + 0.4 }}
                >
                  <div
                    className="h-px w-8 bg-gradient-to-r"
                    style={{ background: `linear-gradient(90deg, ${memory.colorStart}, transparent)` }}
                  />
                  <span className="text-[10px] tracking-[0.2em] text-white/25 uppercase">
                    Memory {String(index + 1).padStart(2, '0')}
                  </span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="hidden lg:flex lg:w-16 lg:items-center lg:justify-center">
          <HeartNode isInView={isInView} delay={index * 0.1} colorStart={memory.colorStart} colorEnd={memory.colorEnd} />
        </div>

        <div className="flex-1 hidden lg:block" />
      </div>
    </motion.div>
  );
}

function HeartNode({ isInView, delay, colorStart, colorEnd }: { isInView: boolean; delay: number; colorStart: string; colorEnd: string }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : {}}
      transition={{ delay, type: "spring", stiffness: 200 }}
      className="relative"
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ background: `radial-gradient(circle, ${colorStart}, ${colorEnd})` }}
        animate={{ scale: [1, 2, 1], opacity: [0.4, 0, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <svg
        className="relative h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
      >
        <motion.path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          fill={`url(#heartGrad-${colorStart})`}
          stroke="white"
          strokeWidth="1.2"
          strokeOpacity="0.5"
          initial={{ scale: 0.8 }}
          animate={{ scale: [0.8, 1.1, 0.8] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id={`heartGrad-${colorStart}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colorStart} />
            <stop offset="100%" stopColor={colorEnd} />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}

function EndingCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="mt-48 text-center"
    >
      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        </div>
        
        <div className="relative py-12">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-6"
          >
            <span className="text-xl">∞</span>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-white/30 text-xs tracking-[0.3em] uppercase mb-3"
          >
            The story continues
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-white/50 text-sm italic font-light"
          >
            Some chapters don't have an ending.
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}

export default Timeline;