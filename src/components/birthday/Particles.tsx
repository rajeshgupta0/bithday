/**
 * Drifting particles overlay (CSS only, GPU-friendly).
 */
export function FloatingParticles({ count = 30 }: { count?: number }) {
  const items = Array.from({ length: count });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {items.map((_, i) => {
        const size = 2 + Math.random() * 5;
        const left = Math.random() * 100;
        const dur = 14 + Math.random() * 24;
        const delay = -Math.random() * dur;
        const hue = 260 + Math.random() * 80;
        return (
          <span
            key={i}
            className="animate-drift absolute rounded-full"
            style={{
              left: `${left}%`,
              width: size,
              height: size,
              background: `hsla(${hue}, 90%, 75%, 0.7)`,
              boxShadow: `0 0 ${size * 4}px hsla(${hue}, 90%, 70%, 0.7)`,
              animationDuration: `${dur}s`,
              animationDelay: `${delay}s`,
              bottom: 0,
            }}
          />
        );
      })}
    </div>
  );
}
