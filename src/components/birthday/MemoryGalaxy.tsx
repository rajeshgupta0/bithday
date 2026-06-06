import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StarField } from "./StarField";

// Images
import m1 from "@/assets/img1.jpg";
import m2 from "@/assets/img2.jpg";
import m3 from "@/assets/img3.jpg";
import m4 from "@/assets/img4.jpg";
import m5 from "@/assets/img5.jpg";
import m6 from "@/assets/img6.jpg";
import m7 from "@/assets/img7.jpg";
import m8 from "@/assets/img8.jpg";
import m9 from "@/assets/img9.jpg";
import m10 from "@/assets/img10.jpg";
import m11 from "@/assets/img20.jpg";
import m12 from "@/assets/img12.jpg";
import m13 from "@/assets/img13.jpg";
import m14 from "@/assets/img14.jpg";
import m15 from "@/assets/img15.jpg";
import m16 from "@/assets/img16.jpg";
import m17 from "@/assets/img17.jpg";
import m18 from "@/assets/img18.jpg";
import m19 from "@/assets/img19.jpg";

// Unique memories with emotional storytelling
const stars = [
  { img: m1, timeLabel: "First Day", locationLabel: "Gargi Hostel", momentText: "Two strangers. One room. Everything changed.", color: "#FF4D8D" },
  { img: m2, timeLabel: "Morning Walk", locationLabel: "KNIT Campus", momentText: "The first time we skipped class together.", color: "#67E8F9" },
  { img: m3, timeLabel: "New Year's Eve", locationLabel: "Somewhere Loud", momentText: "The night music felt like time travel.", color: "#FBBF24" },
  { img: m4, timeLabel: "2 AM", locationLabel: "College Streets", momentText: "Exploring campus when the world was asleep.", color: "#A855F7" },
  { img: m5, timeLabel: "Temple Morning", locationLabel: "Old City", momentText: "Peace found us when we weren't looking.", color: "#FF4D8D" },
  { img: m6, timeLabel: "Navratri Night", locationLabel: "Sultanpur", momentText: "Stole away. Came back with stories.", color: "#FBBF24" },
  { img: m7, timeLabel: "Youth Day", locationLabel: "KNIT Auditorium", momentText: "You on stage. Me in the crowd. Proud doesn't cover it.", color: "#67E8F9" },
  { img: m8, timeLabel: "Industrial Visit", locationLabel: "Korwa Factory", momentText: "Learning nothing. Creating everything. Memories.", color: "#A855F7" },
  { img: m9, timeLabel: "Study Session", locationLabel: "Our Room", momentText: "Pretended to study. Actually just laughed.", color: "#FF4D8D" },
  { img: m10, timeLabel: "Last Day", locationLabel: "Hostel", momentText: "One door closed. But nothing really ended.", color: "#67E8F9" },
  { img: m11, timeLabel: "Chill Evening", locationLabel: "Our Room", momentText: "No plans. No worries. Just us.", color: "#FBBF24" },
  { img: m12, timeLabel: "Counseling Day", locationLabel: "KNIT", momentText: "Second year started. So did new dreams.", color: "#A855F7" },
  { img: m13, timeLabel: "Dandiya Night", locationLabel: "College Ground", momentText: "Colors. Chaos. Laughter that wouldn't stop.", color: "#FF4D8D" },
  { img: m14, timeLabel: "Birthday Surprise", locationLabel: "Rent Room", momentText: "Seniors. Cake. A night to remember.", color: "#67E8F9" },
  { img: m15, timeLabel: "2 AM", locationLabel: "Lucknow Streets", momentText: "Hungry. Tired. Chasing dreams anyway.", color: "#FBBF24" },
  { img: m16, timeLabel: "Yoga Morning", locationLabel: "College Lawn", momentText: "Found peace. Then found chai.", color: "#A855F7" },
  { img: m17, timeLabel: "Teachers' Day", locationLabel: "RECP Campus", momentText: "New campus. Same old us.", color: "#FF4D8D" },
  { img: m18, timeLabel: "Vishwakarma Pooja", locationLabel: "Workshop", momentText: "Blessings for new beginnings.", color: "#67E8F9" },
  { img: m19, timeLabel: "The Return", locationLabel: "KNIT Fest", momentText: "Same campus. Different year. Same laughter.", color: "#FBBF24" },
];

export function MemoryGalaxy() {
  const [open, setOpen] = useState(null);
  const containerRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hoveredStar, setHoveredStar] = useState(null);

  // Galaxy spiral positions
  const positions = useMemo(
    () =>
      stars.map((_, i) => {
        const angle = (i / stars.length) * Math.PI * 2 * 2.5;
        const r = 25 + (i / stars.length) * 45;
        return {
          x: 50 + Math.cos(angle) * r * (1 - i / stars.length * 0.2),
          y: 50 + Math.sin(angle) * r * 0.65 * (1 - i / stars.length * 0.15),
          delay: i * 0.1,
          size: 12 + ((i * 11) % 9),
          depth: 0.3 + (i / stars.length) * 0.5,
        };
      }),
    []
  );

  // Parallax effect
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let raf = 0;
    const update = (clientX, clientY) => {
      const r = el.getBoundingClientRect();
      const x = ((clientX - r.left) / r.width) * 2 - 1;
      const y = ((clientY - r.top) / r.height) * 2 - 1;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() =>
        setMouse({ x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) })
      );
    };
    const onMouse = (e) => update(e.clientX, e.clientY);
    const onTouch = (e) => {
      if (e.touches[0]) update(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onLeave = () => setMouse({ x: 0, y: 0 });
    el.addEventListener("mousemove", onMouse);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("touchmove", onTouch, { passive: true });
    el.addEventListener("touchend", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mousemove", onMouse);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("touchmove", onTouch);
      el.removeEventListener("touchend", onLeave);
    };
  }, []);

  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-gradient-to-br from-[#0B1020] via-[#1a1030] to-[#0B1020] py-28 md:py-36">
      {/* Premium Aurora Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 h-[600px] w-[600px] rounded-full bg-[#FF4D8D] opacity-15 blur-[150px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 h-[600px] w-[600px] rounded-full bg-[#A855F7] opacity-15 blur-[150px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#67E8F9] opacity-10 blur-[150px] animate-pulse delay-2000" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <StarField density={1.6} />

      {/* Custom floating particles (inline version) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => {
          const size = 2 + Math.random() * 4;
          const left = Math.random() * 100;
          const duration = 12 + Math.random() * 20;
          const delay = -Math.random() * duration;
          return (
            <div
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                left: `${left}%`,
                width: size,
                height: size,
                animation: `floatUp ${duration}s linear ${delay}s infinite`,
              }}
            />
          );
        })}
      </div>

      {/* Nebula with parallax */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#FF4D8D]/20 to-[#A855F7]/20 blur-[160px]"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ transform: `translate(calc(-50% + ${mouse.x * -15}px), calc(-50% + ${mouse.y * -15}px))` }}
      />

      <div className="relative mx-auto max-w-6xl px-6 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-xl mb-6">
            <motion.div
              className="h-1.5 w-1.5 rounded-full bg-[#FF4D8D]"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/40">Chapter 02</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-light tracking-tight">
            <span className="bg-gradient-to-r from-white via-white/80 to-white/60 bg-clip-text text-transparent">
              Memory Galaxy
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/30 text-xs tracking-[0.2em] uppercase">
            Move your cursor through the stars. Tap one — relive the moment.
          </p>
        </motion.div>

        {/* Galaxy Container */}
        <div
          ref={containerRef}
          className="relative mx-auto mt-16 md:mt-20 aspect-square w-[min(800px,90vw)] [perspective:1500px] touch-none"
        >
          {/* Galaxy Center Glow */}
          <motion.div
            className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#FF4D8D]/40 to-[#A855F7]/40 blur-[60px]"
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {positions.map((p, i) => {
            const px = mouse.x * 35 * p.depth;
            const py = mouse.y * 35 * p.depth;
            const pz = p.depth * 50;
            const star = stars[i];
            const isHovered = hoveredStar === i;
            
            return (
              <motion.button
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: p.delay, type: "spring", stiffness: 100, damping: 12 }}
                onClick={() => setOpen(i)}
                onMouseEnter={() => setHoveredStar(i)}
                onMouseLeave={() => setHoveredStar(null)}
                className="group absolute -translate-x-1/2 -translate-y-1/2 will-change-transform"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  transform: `translate3d(calc(-50% + ${px}px), calc(-50% + ${py}px), ${pz}px)`,
                  transition: "transform 800ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                {/* Star Glow */}
                <motion.div
                  className="absolute inset-0 rounded-full blur-xl"
                  style={{ background: star.color }}
                  animate={{ opacity: isHovered ? 0.8 : 0.2 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Star Core */}
                <motion.div
                  className="relative rounded-full"
                  style={{
                    width: p.size,
                    height: p.size,
                    background: `radial-gradient(circle, white, ${star.color})`,
                    boxShadow: `0 0 ${p.size * 2}px ${star.color}`,
                  }}
                  animate={{
                    scale: isHovered ? 1.5 : 1,
                    rotate: isHovered ? 360 : 0,
                  }}
                  transition={{ scale: { duration: 0.3 }, rotate: { duration: 0.8, ease: "linear" } }}
                />

                {/* Tooltip */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="pointer-events-none absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap z-20"
                    >
                      <div className="rounded-full bg-black/80 backdrop-blur-md px-4 py-1.5 border border-white/15">
                        <span className="text-[10px] font-medium tracking-[0.15em] text-white/90">
                          {star.timeLabel}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Memory Modal */}
      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-black/85 backdrop-blur-md p-6"
            onClick={() => setOpen(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-[min(600px,92vw)] overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 shadow-2xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <motion.img
                  src={stars[open].img}
                  alt=""
                  className="h-full w-full object-cover"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div 
                  className="absolute inset-0 opacity-30"
                  style={{ background: `linear-gradient(135deg, ${stars[open].color}20, transparent)` }}
                />
              </div>

              <div className="p-6 md:p-7">
                <div className="flex items-center gap-2 mb-2">
                  <div 
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: stars[open].color }}
                  />
                  <span className="text-[10px] tracking-[0.2em] text-white/40 uppercase">
                    {stars[open].locationLabel}
                  </span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-light text-white tracking-tight mb-2">
                  {stars[open].timeLabel}
                </h3>
                
                <p className="text-white/60 text-sm leading-relaxed italic">
                  {stars[open].momentText}
                </p>

                <div className="mt-5 flex items-center gap-2">
                  <div 
                    className="h-px w-8"
                    style={{ background: `linear-gradient(90deg, ${stars[open].color}, transparent)` }}
                  />
                  <span className="text-[8px] tracking-[0.2em] text-white/25 uppercase">
                    Memory {String(open + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setOpen(null)}
                className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-white/60 hover:text-white transition-colors"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="relative mt-20 text-center"
      >
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent max-w-md mx-auto" />
        <p className="text-white/15 text-[9px] tracking-[0.3em] uppercase mt-6">
          {stars.length} memories • frozen in time
        </p>
      </motion.div>

      {/* Add CSS animation for floating particles */}
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(100vh) translateX(0px);
            opacity: 0;
          }
          10% {
            opacity: 0.5;
          }
          90% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-10vh) translateX(${Math.random() * 100 - 50}px);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}

export default MemoryGalaxy;