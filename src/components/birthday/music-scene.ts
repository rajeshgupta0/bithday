// components/birthday/music-scene.ts
import { useEffect, useState } from "react";

export type Scene = "intro" | "galaxy" | "gallery" | "scrapbook" | "letter" | "finale";

// ============================================
// SONG LIST - Section Wise
// ============================================

export interface Song {
  id: string;
  name: string;
  artist: string;
  file: string;
  scene: Scene;
  duration?: string;
}

export const SONGS: Song[] = [
  // Intro Section (Chapter 1 - Start)
  { 
    id: "being-binod", 
    name: "Being Binod", 
    artist: "TVF Rewind", 
    file: "/src/assets/being-binod.mp3",
    scene: "intro",
    duration: "2:30"
  },
  { 
    id: "shanivar-raati", 
    name: "Shanivar Raati", 
    artist: "Khyati Sahdev", 
    file: "/src/assets/shanivar-raati.mp3",
    scene: "intro",
    duration: "3:00"
  },
  
  // Galaxy Section (Chapter 2 - Celestial)
  { 
    id: "chahun-main", 
    name: "Chahun Main Ya Naa", 
    artist: "Aashiqui 2", 
    file: "/src/assets/chahun-main-ya-naa.mp3",
    scene: "galaxy",
    duration: "4:30"
  },
  
  // Gallery Section (Chapter 3 - Memories)
  { 
    id: "kyo-kisi-ko", 
    name: "Kyo Kisi Ko", 
    artist: "Tere Naam", 
    file: "/src/assets/kyo-kisi-ko.mp3",
    scene: "gallery",
    duration: "5:00"
  },
  
  // Scrapbook/Letter Section (Chapter 4-5 - Emotional)
  { 
    id: "main-rang", 
    name: "Main Rang Sharbaton Ka", 
    artist: "Romantic Hindi", 
    file: "/src/assets/main-rang-sharbaton-ka.mp3",
    scene: "letter",
    duration: "3:30"
  },
];

// ============================================
// AUDIO PLAYER STATE
// ============================================

let audioElement: HTMLAudioElement | null = null;
let currentSongId: string | null = null;
let isPlayingState = false;
let currentVolume = 0.35;

// Get audio element
const getAudio = (): HTMLAudioElement => {
  if (!audioElement) {
    audioElement = new Audio();
    audioElement.loop = true;
    audioElement.volume = currentVolume;
  }
  return audioElement;
};

// Load and play a song
export const playSong = async (songId: string) => {
  const song = SONGS.find(s => s.id === songId);
  if (!song) {
    console.error("Song not found:", songId);
    return false;
  }

  const audio = getAudio();
  
  // If same song is already playing, do nothing
  if (currentSongId === songId && isPlayingState) {
    return true;
  }
  
  // Store current volume
  const currentVol = audio.volume;
  
  // Change source
  audio.src = song.file;
  currentSongId = songId;
  
  try {
    await audio.load();
    await audio.play();
    isPlayingState = true;
    audio.volume = currentVol;
    return true;
  } catch (error) {
    console.error("Failed to play song:", song.name, error);
    isPlayingState = false;
    return false;
  }
};

// Pause current song
export const pauseSong = () => {
  const audio = getAudio();
  audio.pause();
  isPlayingState = false;
};

// Resume current song
export const resumeSong = () => {
  const audio = getAudio();
  if (currentSongId) {
    audio.play().catch(console.error);
    isPlayingState = true;
  }
};

// Toggle play/pause
export const toggleSong = () => {
  if (isPlayingState) {
    pauseSong();
  } else {
    resumeSong();
  }
};

// Set volume
export const setVolume = (volume: number) => {
  currentVolume = Math.max(0, Math.min(1, volume));
  const audio = getAudio();
  audio.volume = currentVolume;
};

// Get current song
export const getCurrentSong = () => {
  if (!currentSongId) return SONGS[0];
  return SONGS.find(s => s.id === currentSongId) || SONGS[0];
};

// Get playing state
export const isPlaying = () => isPlayingState;

// Change song by scene (auto-play based on section)
export const setSongByScene = (scene: Scene) => {
  // Find first song matching the scene
  const songForScene = SONGS.find(s => s.scene === scene);
  if (songForScene && songForScene.id !== currentSongId) {
    playSong(songForScene.id);
  }
};

// Get all songs grouped by scene
export const getSongsByScene = (scene: Scene): Song[] => {
  return SONGS.filter(s => s.scene === scene);
};

// Get next song in same scene
export const getNextSongInScene = (currentId: string): Song | null => {
  const currentSong = SONGS.find(s => s.id === currentId);
  if (!currentSong) return null;
  
  const sceneSongs = SONGS.filter(s => s.scene === currentSong.scene);
  const currentIndex = sceneSongs.findIndex(s => s.id === currentId);
  const nextIndex = (currentIndex + 1) % sceneSongs.length;
  
  return sceneSongs[nextIndex];
};

// ============================================
// SCENE MANAGEMENT (Preserved)
// ============================================

const SCENE_KEY = "birthday:scene";
const VALID: Scene[] = ["intro", "galaxy", "gallery", "scrapbook", "letter", "finale"];

const initialScene = (): Scene => {
  if (typeof window === "undefined") return "intro";
  const v = window.localStorage.getItem(SCENE_KEY) as Scene | null;
  return v && VALID.includes(v) ? v : "intro";
};

let scene: Scene = initialScene();
const listeners = new Set<(s: Scene) => void>();

export const getScene = (): Scene => scene;

export const setScene = (s: Scene) => {
  if (s === scene) return;
  scene = s;
  if (typeof window !== "undefined") {
    try { window.localStorage.setItem(SCENE_KEY, s); } catch {}
  }
  // Auto-play song for new scene
  setSongByScene(s);
  listeners.forEach((l) => l(s));
};

export const useScene = (): Scene => {
  const [s, setS] = useState<Scene>(scene);
  useEffect(() => {
    const l = (next: Scene) => setS(next);
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, []);
  return s;
};

// Initialize with first song
if (typeof window !== "undefined") {
  // Start with Being Binod (first song)
  setTimeout(() => {
    if (!currentSongId) {
      playSong("being-binod");
    }
  }, 100);
}