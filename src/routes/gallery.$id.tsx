import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, Sparkles } from "lucide-react";
import { getPhoto, getSimilar } from "@/components/birthday/photos";
import { StarField } from "@/components/birthday/StarField";

export const Route = createFileRoute("/gallery/$id")({
  head: ({ params }) => {
    const p = getPhoto(params.id);
    const title = p ? `${p.title} — A Memory` : "A Memory";
    return {
      meta: [
        { title },
        { name: "description", content: p?.tagline ?? "A captured moment." },
        { property: "og:title", content: title },
        { property: "og:description", content: p?.tagline ?? "A captured moment." },
        ...(p ? [{ property: "og:image", content: p.src }] : []),
      ],
    };
  },
  loader: ({ params }) => {
    const photo = getPhoto(params.id);
    if (!photo) throw notFound();
    return { photo, similar: getSimilar(params.id) };
  },
  notFoundComponent: () => (
    <main className="grid min-h-screen place-items-center bg-background px-6 text-center">
      <div>
        <p className="font-display text-3xl">This memory has faded.</p>
        <Link
          to="/"
          className="mt-4 inline-flex items-center gap-2 text-neon-cyan hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Back to the universe
        </Link>
      </div>
    </main>
  ),
  errorComponent: ({ reset }) => (
    <main className="grid min-h-screen place-items-center bg-background text-center">
      <div>
        <p>Something went sideways.</p>
        <button onClick={reset} className="mt-3 text-neon-cyan underline">
          Try again
        </button>
      </div>
    </main>
  ),
  component: MemoryDetail,
});

function MemoryDetail() {
  const { photo, similar } = Route.useLoaderData();
  const router = useRouter();

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.history.length > 1) {
      router.history.back();
    } else {
      router.navigate({ to: "/", hash: "gallery" });
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <StarField />
      <div className="absolute inset-0 bg-hero opacity-60" />
      <div className="absolute left-1/3 top-0 h-[500px] w-[500px] rounded-full bg-neon-purple/25 blur-[160px]" />

      <div className="relative mx-auto max-w-6xl px-6 py-12">
        <a
          href="/"
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back one step
        </a>

        <div className="mt-10 grid items-center gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-md rounded-3xl bg-white/95 p-3 pb-12 shadow-cinema"
          >
            <img
              src={photo.src}
              alt={photo.title}
              className="aspect-[4/5] w-full rounded-2xl object-cover"
            />
            <p className="absolute bottom-3 left-0 right-0 text-center font-hand text-2xl text-neutral-700">
              {photo.title}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
          >
            <p className="mb-3 text-xs uppercase tracking-[0.4em] text-neon-cyan">
              Memory · {photo.mood}
            </p>
            <h1 className="font-display text-4xl leading-tight md:text-6xl">
              <span className="text-aurora">{photo.title}</span>
            </h1>
            <p className="mt-6 font-hand text-2xl leading-snug text-foreground/90">
              "{photo.tagline}"
            </p>
            <p className="mt-6 max-w-md text-muted-foreground">
              Some frames you don't just look at — you fall back into them. This
              is one of those. A breath, a glance, a forever-second pinned to
              the inside of our story.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-neon-pink/15 px-4 py-2 text-xs uppercase tracking-widest text-neon-pink">
                <Heart className="h-3.5 w-3.5" /> Kept forever
              </span>
              <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs uppercase tracking-widest text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5 text-neon-cyan" /> {photo.mood}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Related "store ad" — a soft, in-universe promo */}
        <motion.aside
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mt-20 overflow-hidden rounded-3xl glass-strong p-8 md:p-12"
        >
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-neon-purple/30 blur-[120px]" />
          <div className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-neon-pink/25 blur-[120px]" />
          <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <p className="mb-2 text-[10px] uppercase tracking-[0.4em] text-neon-cyan">
                From the Memory Atelier
              </p>
              <h3 className="font-display text-3xl md:text-4xl">
                Print this moment in <span className="text-aurora">museum quality</span>
              </h3>
              <p className="mt-3 max-w-xl text-muted-foreground">
                Turn “{photo.title}” into a hand-framed giclée, an aurora-foil
                postcard, or a velvet-bound mini album. Made slow, on demand —
                because some memories deserve a body.
              </p>
            </div>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="group inline-flex items-center justify-center rounded-full bg-aurora px-8 py-4 text-sm font-medium uppercase tracking-widest text-white shadow-cinema transition hover:scale-105"
            >
              Order a print →
            </a>
          </div>
        </motion.aside>

        {/* Similar photos */}
        <section className="mt-20">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.4em] text-neon-cyan">
                More like this
              </p>
              <h2 className="font-display text-3xl md:text-4xl">
                Moments cut from the same light
              </h2>
            </div>
            <Link
              to="/"
              hash="gallery"
              className="hidden text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground md:block"
            >
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-7">
            {similar.map((s: typeof photo, i: number) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  to="/gallery/$id"
                  params={{ id: s.id }}
                  className="group block overflow-hidden rounded-2xl bg-white/95 p-2 pb-6 shadow-cinema transition hover:-translate-y-1"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                    <img
                      src={s.src}
                      alt={s.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                    />
                  </div>
                  <p className="mt-2 text-center font-hand text-lg text-neutral-800">
                    {s.title}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
