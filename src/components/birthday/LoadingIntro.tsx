import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StarField } from "./StarField";

const lines = [
  "Initializing memories...",
  "Scanning beautiful moments...",
  "Loading friendship timeline...",
  "Happiness level detected ❤",
  "Core memories synced successfully",
];

export function LoadingIntro({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (step >= lines.length) {
      const t = setTimeout(() => setDone(true), 700);
      return () => clearTimeout(t);
    }
    const target = lines[step];
    setTyped("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(target.slice(0, i));
      if (i >= target.length) {
        clearInterval(id);
        setTimeout(() => setStep((s) => s + 1), 550);
      }
    }, 32);
    return () => clearInterval(id);
  }, [step]);

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(onDone, 900);
    return () => clearTimeout(t);
  }, [done, onDone]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.06 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] grid place-items-center bg-background grain"
        >
          <div className="absolute inset-0 bg-hero" />
          <StarField density={0.7} />

          <div className="relative z-10 w-[min(620px,90vw)] text-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-10 flex items-center justify-center gap-3 text-xs uppercase tracking-[0.4em] text-muted-foreground"
            >
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-neon-pink" />
              memory.os v1.0
            </motion.div>

            <h1 className="font-display text-3xl text-aurora md:text-5xl">
              A digital universe is being born...
            </h1>

            <div className="mt-10 space-y-2 text-left">
              {lines.slice(0, step).map((l, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 0.7, x: 0 }}
                  className="font-mono text-xs text-neon-cyan md:text-sm"
                >
                  <span className="text-neon-purple">[ok]</span> {l}
                </motion.div>
              ))}
              {step < lines.length && (
                <div className="font-mono text-xs text-foreground md:text-sm">
                  <span className="text-neon-pink">{">"}</span> {typed}
                  <span className="ml-0.5 inline-block h-3 w-2 -translate-y-[1px] bg-neon-pink align-middle" style={{ animation: "blink-caret 0.9s steps(1) infinite" }} />
                </div>
              )}
            </div>

            <div className="mt-10 h-[2px] w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full bg-aurora"
                initial={{ width: "0%" }}
                animate={{ width: `${((step + 1) / lines.length) * 100}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
