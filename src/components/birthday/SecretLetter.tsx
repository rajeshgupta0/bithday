import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const letter = `Ankit,

We met in 2023 at Gargi Hostel. Roommates by chance. Friends by choice.

That first year was something else. Late night college explorations — me, you. The night we secretly went to Sultanpur for Navratri. The New Year party. Your Youth Day performance. Every single memory is still fresh.

Then 2024 happened. It wasn't easy — especially for you. We took separate rooms. Some misunderstandings came along. But nothing could break what we built. We fixed things. Because that's what real friends do.

2025 brought us back together. Pratapgarh. New city, same bond. The night outs, the city lights, the new campus at RECP. And then returning to KNIT for the fest — one of the best times of our lives.

You've always been more than a roommate. You're family. I don't say it often — but you already know. You're my person.

Happy birthday, brother. This friendship isn't going anywhere.

— Rajesh`;

export function SecretLetter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const id = setInterval(() => {
      i += 2;
      setTyped(letter.slice(0, i));
      if (i >= letter.length) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <section ref={ref} className="relative isolate min-h-screen overflow-hidden bg-gradient-to-br from-[#0B1020] via-[#1a1030] to-[#0B1020] py-28 md:py-36">
      {/* Premium Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 h-[600px] w-[600px] rounded-full bg-[#FF4D8D] opacity-15 blur-[150px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 h-[600px] w-[600px] rounded-full bg-[#A855F7] opacity-15 blur-[150px] animate-pulse delay-1000" />
        <div className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF4D8D]/20 blur-[180px] animate-pulse delay-2000" />
      </div>

      {/* Floating Hearts */}
      {Array.from({ length: 24 }).map((_, i) => (
        <span
          key={i}
          className="absolute text-[#FF4D8D] pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: 0,
            fontSize: `${10 + Math.random() * 20}px`,
            animation: `floatUp ${12 + Math.random() * 15}s linear ${-Math.random() * 20}s infinite`,
            filter: `drop-shadow(0 0 ${5 + Math.random() * 10}px #FF4D8D)`,
            opacity: 0.3 + Math.random() * 0.5,
          }}
          aria-hidden
        >
          ❤
        </span>
      ))}

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-xl mb-6"
        >
          <motion.div
            className="h-1.5 w-1.5 rounded-full bg-[#FF4D8D]"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/40">
            Final Memory Unlocked
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight"
        >
          <span className="bg-gradient-to-r from-white via-white/80 to-white/60 bg-clip-text text-transparent">
            A Letter For You
          </span>
        </motion.h2>

        {/* Letter Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 text-left shadow-2xl md:p-12"
        >
          <div className="relative">
            {/* Decorative Quote Mark */}
            <span className="absolute -top-6 -left-4 text-6xl text-[#FF4D8D]/20 font-serif">"</span>
            
            <p className="whitespace-pre-line font-hand text-xl leading-relaxed text-white/80 md:text-2xl lg:text-3xl">
              {typed}
              <span 
                className="ml-1 inline-block h-6 w-0.5 -translate-y-[2px] bg-[#FF4D8D] align-middle"
                style={{ animation: "blink 0.9s step-end infinite" }}
              />
            </p>
            
            {/* Decorative Closing Quote */}
            <span className="absolute -bottom-8 -right-4 text-6xl text-[#FF4D8D]/20 font-serif">"</span>
          </div>
        </motion.div>

        {/* Signature Line */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          whileInView={{ opacity: 1, width: "80px" }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="h-px bg-gradient-to-r from-transparent via-[#FF4D8D] to-transparent mx-auto mt-8"
        />

        {/* Animated Heart at Bottom */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: 1.5, type: "spring" }}
          className="mt-8"
        >
          <span className="text-2xl text-[#FF4D8D] animate-pulse">💙</span>
        </motion.div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&display=swap');
        
        .font-hand {
          font-family: 'Kalam', cursive;
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        @keyframes floatUp {
          0% {
            transform: translateY(100vh) translateX(0px);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-10vh) translateX(${Math.random() * 60 - 30}px);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}

export default SecretLetter;