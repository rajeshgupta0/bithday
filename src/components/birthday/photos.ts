// photos.ts
import m1 from "@/assets/img1.jpg";
import m2 from "@/assets/memory-7.jpg";
import m3 from "@/assets/img15.jpg";
import m4 from "@/assets/img20.jpg";
import m5 from "@/assets/img8.jpg";
import m6 from "@/assets/img9.jpg";
import m8 from "@/assets/memory-8.jpg";

// Define Photo type
export type Photo = {
  id: string;
  src: string;
  span: string;
  rot: number;
  title: string;
  tagline: string;
  mood: "golden" | "neon" | "nostalgic" | "dreamy";
};

export const photos: Photo[] = [
  { id: "1", src: m2, span: "row-span-2", rot: -3, title: "Golden Hour", tagline: "The sky wore your favorite colors that evening.", mood: "golden" },
  { id: "2", src: m3, span: "", rot: 2, title: "City Lights", tagline: "We chased neon reflections through wet streets.", mood: "neon" },
  { id: "3", src: m1, span: "", rot: -2, title: "First Adventure", tagline: "Where it all began — two souls, one map.", mood: "nostalgic" },
  { id: "4", src: m6, span: "row-span-2", rot: 3, title: "Endless Summer", tagline: "Days that tasted like salt, laughter, and freedom.", mood: "golden" },
  { id: "5", src: m5, span: "", rot: -1, title: "Quiet Magic", tagline: "Small moments, infinite gravity.", mood: "dreamy" },
  { id: "6", src: m4, span: "", rot: 2, title: "Midnight Plans", tagline: "We made stars our witnesses.", mood: "neon" },
  { id: "7", src: m2, span: "", rot: -3, title: "Soft Focus", tagline: "Blurred edges, sharpest memories.", mood: "dreamy" }, // Changed m7 to m2
  { id: "8", src: m8, span: "", rot: 1, title: "Just Because", tagline: "No reason needed — joy was the whole plan.", mood: "nostalgic" },
];

// Helper functions
export const getPhoto = (id: string) => photos.find((p) => p.id === id);

export const getSimilar = (id: string) => {
  const p = getPhoto(id);
  if (!p) return [];
  return photos.filter((q) => q.id !== id && q.mood === p.mood).concat(
    photos.filter((q) => q.id !== id && q.mood !== p.mood),
  ).slice(0, 6);
};