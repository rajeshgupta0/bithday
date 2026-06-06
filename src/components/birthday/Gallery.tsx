import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { photos, type Photo } from "./photos";

// Hand-drawn decorative elements
const DoodleStar = ({ x, y, delay }: { x: number; y: number; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 0.3, scale: 1 }}
    transition={{ delay, duration: 0.5 }}
    className="absolute pointer-events-none"
    style={{ left: x, top: y }}
  >
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5">
      <path d="M12 2 L12 22 M2 12 L22 12" />
      <path d="M5 5 L19 19 M19 5 L5 19" />
    </svg>
  </motion.div>
);

const HandwrittenArrow = ({ x, y, angle }: { x: number; y: number; angle: number }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.4 }}
    transition={{ delay: 1, duration: 0.8 }}
    className="absolute pointer-events-none"
    style={{ left: x, top: y, transform: `rotate(${angle}deg)` }}
  >
    <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
      <path d="M2 10 L30 10 M30 10 L22 4 M30 10 L22 16" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </motion.div>
);

// String Lights Component
function StringLights() {
  const lights = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: 5 + i * 8.5,
    delay: i * 0.3,
  }));

  return (
    <div className="absolute top-8 left-0 right-0 pointer-events-none">
      {/* The wire */}
      <svg className="absolute top-0 w-full h-[60px]" preserveAspectRatio="none">
        <path
          d="M0,20 Q100,5 200,25 T400,20 T600,30 T800,22 T1000,28 T1200,18"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
      
      {/* Light bulbs */}
      {lights.map((light) => (
        <motion.div
          key={light.id}
          className="absolute"
          style={{ left: `${light.left}%`, top: 15 + Math.sin(light.id) * 8 }}
          animate={{
            y: [0, -3, 0, 3, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 3 + light.id * 0.2,
            repeat: Infinity,
            delay: light.delay,
            ease: "easeInOut",
          }}
        >
          <div className="relative">
            <div className="absolute -inset-3 rounded-full bg-[#FBBF24] blur-md opacity-50" />
            <div className="w-2 h-2 rounded-full bg-[#FBBF24]" />
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-white/30" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Memory Modal Component
function MemoryModal({ photo, onClose }: { photo: Photo; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 30 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative max-w-3xl w-full bg-gradient-to-br from-white/10 to-white/5 rounded-3xl border border-white/20 overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img src={photo.src} alt={photo.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>
        
        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-2 mb-3">
            <div className={`h-1.5 w-1.5 rounded-full ${
              photo.mood === 'golden' ? 'bg-amber-400' :
              photo.mood === 'neon' ? 'bg-pink-400' :
              photo.mood === 'nostalgic' ? 'bg-blue-400' : 'bg-violet-400'
            }`} />
            <span className="text-[10px] tracking-[0.2em] text-white/40 uppercase">Memory Unlocked</span>
          </div>
          
          <h3 className="text-2xl md:text-3xl font-light text-white tracking-tight mb-2">{photo.title}</h3>
          <p className="text-white/60 text-base leading-relaxed italic mb-4">{photo.tagline}</p>
          
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent my-4" />
          
          <p className="text-white/40 text-xs tracking-wide">
            Some moments deserve to be remembered forever.
          </p>
        </div>
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 text-white/60 hover:text-white transition-colors flex items-center justify-center"
        >
          ✕
        </button>
      </motion.div>
    </motion.div>
  );
}

export function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [secretRevealed, setSecretRevealed] = useState(false);
  const [discoveredSecret, setDiscoveredSecret] = useState(false);

  // Secret memory index (the 4th photo - Endless Summer)
  const secretIndex = 3;
  const secretMessage = "Out of all the moments here, you somehow became my favorite one. ❤️";

  // Extended photos data with handwritten captions
  const memoriesWithCaptions = photos.map((photo, idx) => ({
    ...photo,
    handwrittenCaption: [
      "Still laughing about this. ✨",
      "This day deserves its own movie. 🎬",
      "Proof we were happy. 💫",
      "Peak friendship. 🤝",
      "Nobody else understands this memory. 💭",
      "One ordinary day became unforgettable. 🌟",
      "This photo still makes me smile. 😊",
      "Some moments hit different. 💖",
    ][idx],
    rotation: (photo.rot || 0) + (Math.random() - 0.5) * 2,
    size: idx === secretIndex ? "large" : idx % 3 === 0 ? "medium" : "small",
  }));

  const handlePhotoClick = (photo: Photo, index: number) => {
    if (index === secretIndex && !discoveredSecret) {
      setSecretRevealed(true);
      setDiscoveredSecret(true);
      setTimeout(() => setSecretRevealed(false), 4000);
    }
    setSelectedPhoto(photo);
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0A0A10] via-[#1a1030] to-[#0A0A10] py-28 md:py-36">
      {/* Premium Background Layers */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 h-[600px] w-[600px] rounded-full bg-[#FF4D8D] opacity-20 blur-[150px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 h-[600px] w-[600px] rounded-full bg-[#A855F7] opacity-20 blur-[150px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#67E8F9] opacity-15 blur-[150px] animate-pulse delay-2000" />
        
        {/* Film Grain */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }} />
        
        {/* Dust Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={`dust-${i}`}
              className="absolute rounded-full bg-white/10"
              style={{
                width: 1 + Math.random() * 2,
                height: 1 + Math.random() * 2,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20 - Math.random() * 30],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 8 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 15,
                ease: "linear",
              }}
            />
          ))}
        </div>
      </div>

      {/* String Lights */}
      <StringLights />

      {/* Section Header */}
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl px-4 py-1.5 mb-6">
            <motion.div
              className="h-1.5 w-1.5 rounded-full bg-[#FF4D8D]"
              animate={{ scale: [1, 1.8, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/50">
              Chapter 03
            </span>
          </div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight">
            <span className="bg-gradient-to-r from-white via-white/80 to-white/60 bg-clip-text text-transparent">
              A Box Full of Moments
            </span>
          </h2>
          
          <p className="mx-auto mt-4 max-w-xl text-white/30 text-xs tracking-[0.2em] uppercase">
            Scattered memories. Collected over time. Each one a story.
          </p>
        </motion.div>

        {/* Scrapbook Layout - Organic Grid */}
        <div className="relative">
          {/* Hand-drawn decorative elements */}
          <DoodleStar x="5%" y="15%" delay={0.5} />
          <DoodleStar x="90%" y="25%" delay={0.8} />
          <DoodleStar x="15%" y="75%" delay={1.1} />
          <HandwrittenArrow x="8%" y="40%" angle={-15} />
          <HandwrittenArrow x="85%" y="60%" angle={10} />
          
          {/* Floating heart doodle */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="absolute left-[12%] top-[45%] pointer-events-none"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,77,141,0.4)" strokeWidth="1.5">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>

          {/* Scrapbook Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 auto-rows-min">
            {memoriesWithCaptions.map((memory, idx) => (
              <motion.div
                key={memory.id}
                initial={{ opacity: 0, y: 50, rotate: (memory.rotation || 0) + 5 }}
                whileInView={{ opacity: 1, y: 0, rotate: memory.rotation || 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.05, duration: 0.6, type: "spring", stiffness: 100 }}
                whileHover={{ 
                  rotate: 0, 
                  y: -12, 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className={`relative cursor-pointer group ${
                  memory.size === "large" ? "md:col-span-2 md:row-span-2" : 
                  memory.size === "medium" ? "md:col-span-1" : ""
                }`}
                style={{
                  zIndex: idx === secretIndex ? 10 : 1,
                }}
                onClick={() => handlePhotoClick(memory, idx)}
              >
                {/* Polaroid Card */}
                <div className="relative bg-white/95 rounded-lg p-3 pb-6 shadow-2xl transition-all duration-300 group-hover:shadow-3xl"
                     style={{
                       transform: `rotate(${memory.rotation || 0}deg)`,
                       boxShadow: idx === secretIndex ? "0 0 30px rgba(255,77,141,0.3)" : "",
                     }}>
                  
                  {/* Tape piece */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-[#67E8F9]/30 backdrop-blur-sm rounded-sm rotate-2" />
                  
                  {/* Pinned corner effect */}
                  <div className="absolute top-1 left-1 w-6 h-6 rounded-full bg-black/5" />
                  <div className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/5" />
                  
                  {/* Image */}
                  <div className="relative aspect-[4/5] overflow-hidden rounded-md">
                    <img
                      src={memory.src}
                      alt={memory.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Light leak effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                         style={{
                           background: "linear-gradient(135deg, rgba(255,200,150,0.3), rgba(255,100,150,0.2))",
                         }} />
                    
                    {/* Mood indicator glow */}
                    {idx === secretIndex && !discoveredSecret && (
                      <motion.div
                        animate={{ opacity: [0.3, 0.8, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -inset-2 rounded-lg bg-[#FF4D8D]/20 blur-md pointer-events-none"
                      />
                    )}
                  </div>
                  
                  {/* Handwritten caption */}
                  <div className="mt-3 text-center">
                    <p className="text-neutral-700 text-sm font-hand tracking-wide">
                      {memory.handwrittenCaption}
                    </p>
                  </div>
                  
                  {/* Decorative heart or star */}
                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[#FF4D8D] text-xs">❤</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Secret Message Toast */}
          <AnimatePresence>
            {secretRevealed && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
              >
                <div className="bg-gradient-to-r from-[#FF4D8D] to-[#A855F7] rounded-2xl px-6 py-4 shadow-2xl border border-white/20">
                  <p className="text-white text-sm md:text-base font-medium tracking-wide">
                    {secretMessage}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Final Oversized Card */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
            className="relative mt-20 max-w-2xl mx-auto"
          >
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-10 md:p-12 text-center border border-white/20 shadow-2xl">
              {/* Decorative elements */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-8 bg-[#67E8F9]/30 backdrop-blur-sm rounded-sm rotate-1" />
              
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-5xl mb-6"
              >
                ✨
              </motion.div>
              
              <h3 className="text-2xl md:text-3xl font-light text-white tracking-tight">
                And somehow...
              </h3>
              
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#FF4D8D] to-transparent mx-auto my-6" />
              
              <p className="text-white/60 text-lg md:text-xl italic">
                our favorite picture<br />
                hasn't been taken yet
              </p>
              
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="mt-6 text-2xl"
              >
                ❤️
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Memory Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <MemoryModal photo={selectedPhoto} onClose={() => setSelectedPhoto(null)} />
        )}
      </AnimatePresence>

      {/* Custom Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&display=swap');
        .font-hand {
          font-family: 'Kalam', cursive;
        }
      `}</style>
    </section>
  );
}

export default Gallery;