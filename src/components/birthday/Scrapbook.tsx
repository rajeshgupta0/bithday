import { motion } from "framer-motion";
import m3 from "@/assets/memory-13.jpg";
import m5 from "@/assets/img10.jpg";
import m8 from "@/assets/memory-8.jpg";

const notes = [
  { text: "remember that one night we couldn't stop laughing?", color: "from-neon-pink/30 to-neon-purple/20", rot: -4 },
  { text: "you said 'we'll be friends forever' — i kept the receipt.", color: "from-neon-cyan/30 to-neon-purple/20", rot: 3 },
  { text: "thank you for every 3am call. every single one.", color: "from-peach/40 to-neon-pink/20", rot: -2 },
];

export function Scrapbook() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-32">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 h-[500px] w-[500px] rounded-full bg-[#FF4D8D] opacity-10 blur-[150px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] rounded-full bg-[#A855F7] opacity-10 blur-[150px] animate-pulse delay-1000" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-xl mb-6">
            <motion.div
              className="h-1.5 w-1.5 rounded-full bg-[#FF4D8D]"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/40">Chapter 04</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-light tracking-tight">
            <span className="bg-gradient-to-r from-white via-white/80 to-white/60 bg-clip-text text-transparent">The Scrapbook</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/30 text-xs tracking-[0.2em] uppercase">
            Half-torn paper, sticky notes, things I never said out loud.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Polaroid 1 */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: -5 }}
            whileInView={{ opacity: 1, y: 0, rotate: -5 }}
            whileHover={{ rotate: 0, scale: 1.04 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-xl bg-white/95 p-3 pb-10 shadow-2xl"
          >
            <img src={m3} alt="" loading="lazy" className="aspect-square w-full rounded-md object-cover" />
            <p className="mt-3 text-center font-hand text-2xl text-neutral-800">Happy Moment</p>
            <span className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 rotate-2 rounded-sm bg-[#FF4D8D]/50" />
          </motion.div>

          {/* Sticky notes */}
          <div className="space-y-5">
            {notes.map((n, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: n.rot }}
                whileHover={{ rotate: 0, y: -4, scale: 1.03 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                className={`relative rounded-xl bg-gradient-to-br ${n.color} p-6 backdrop-blur-md shadow-2xl border border-white/10`}
              >
                <p className="font-hand text-2xl leading-snug text-white/90">{n.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Polaroid 2 */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: 4 }}
            whileInView={{ opacity: 1, y: 0, rotate: 4 }}
            whileHover={{ rotate: 0, scale: 1.03 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-xl bg-white/95 p-3 pb-10 shadow-2xl"
          >
            <img src={m8} alt="" loading="lazy" className="aspect-square w-full rounded-md object-cover" />
            <p className="mt-3 text-center font-hand text-2xl text-neutral-800">words I almost forgot to say</p>
            <span className="absolute -top-3 right-6 h-6 w-16 -rotate-12 rounded-sm bg-[#67E8F9]/50" />
          </motion.div>

          {/* Wide Polaroid */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: -2 }}
            whileInView={{ opacity: 1, y: 0, rotate: -2 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-xl bg-white/95 p-3 pb-10 shadow-2xl md:col-span-2"
          >
            <div className="relative h-48 w-full overflow-hidden rounded-md">
              <img src={m5} alt="" loading="lazy" className="h-full w-full object-cover" />
            </div>
            <p className="mt-3 text-center font-hand text-2xl text-neutral-800">
              wherever you go, take this little universe with you ✶
            </p>
          </motion.div>

          {/* Stats Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid place-items-center rounded-2xl bg-white/5 backdrop-blur-xl p-8 shadow-2xl border border-white/10"
          >
            <p className="font-display text-4xl text-[#FF4D8D]">365</p>
            <p className="mt-2 text-[9px] uppercase tracking-[0.3em] text-white/40">days I'll do this again</p>
          </motion.div>
        </div>
      </div>

      {/* Custom font for handwritten style */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&display=swap');
        .font-hand {
          font-family: 'Kalam', cursive;
        }
      `}</style>
    </section>
  );
}

export default Scrapbook;