import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { LoadingIntro } from "@/components/birthday/LoadingIntro";
import { Hero } from "@/components/birthday/Hero";
import { Timeline } from "@/components/birthday/Timeline";
import { MemoryGalaxy } from "@/components/birthday/MemoryGalaxy";
import { Gallery } from "@/components/birthday/Gallery";
import { Scrapbook } from "@/components/birthday/Scrapbook";
import { SecretLetter } from "@/components/birthday/SecretLetter";
import { Finale } from "@/components/birthday/Finale";
import { AmbientAudio } from "@/components/birthday/AmbientAudio";
import { CursorGlow } from "@/components/birthday/Cursor";
import { type Scene, setScene } from "@/components/birthday/music-scene";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A Birthday Memory Experience — for Ankit Verma" },
      {
        name: "description",
        content:
          "A cinematic, interactive digital gift made of memories, music, and love — a magical birthday journey through our universe.",
      },
      { property: "og:title", content: "A Birthday Memory Experience — for [Friend]" },
      {
        property: "og:description",
        content: "A cinematic interactive birthday gift built from memories and love.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function SceneSection({
  scene,
  children,
}: {
  scene: Scene;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && e.intersectionRatio > 0.4) setScene(scene);
        }
      },
      { threshold: [0, 0.4, 0.6, 1] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [scene]);
  return <div ref={ref}>{children}</div>;
}

const SCROLL_KEY = "birthday:scroll-y";

function Index() {
  // Skip intro on back-navigation / repeat visits within the session so
  // scroll position to galaxy/gallery is restored reliably on mobile.
  const [ready, setReady] = useState(() => {
    if (typeof window === "undefined") return false;
    if (sessionStorage.getItem("birthday:intro-seen") === "1") return true;
    // If a previous session left a scroll position, skip the intro on reload
    // so the saved galaxy/gallery view restores immediately.
    const y = Number(localStorage.getItem(SCROLL_KEY) || "0");
    return y > 100;
  });

  useEffect(() => {
    if (!ready || typeof window === "undefined") return;
    sessionStorage.setItem("birthday:intro-seen", "1");

    // Restore scroll position after content has had a tick to lay out.
    const y = Number(localStorage.getItem(SCROLL_KEY) || "0");
    if (y > 0) {
      const restore = () => window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior });
      requestAnimationFrame(() => requestAnimationFrame(restore));
      // Second pass for late-loading images shifting layout
      setTimeout(restore, 400);
    }

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        try { localStorage.setItem(SCROLL_KEY, String(window.scrollY)); } catch {}
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ready]);

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      {!ready && <LoadingIntro onDone={() => setReady(true)} />}
      {ready && (
        <>
          <CursorGlow />
          <AmbientAudio />
          <SceneSection scene="intro"><Hero /></SceneSection>
          <SceneSection scene="intro"><Timeline /></SceneSection>
          <SceneSection scene="galaxy"><MemoryGalaxy /></SceneSection>
          <SceneSection scene="gallery"><Gallery /></SceneSection>
          <SceneSection scene="scrapbook"><Scrapbook /></SceneSection>
          <SceneSection scene="letter"><SecretLetter /></SceneSection>
          <SceneSection scene="finale"><Finale /></SceneSection>
        </>
      )}
    </main>
  );
}
