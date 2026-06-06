// components/birthday/AmbientAudio.tsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Sparkles, Music2, ChevronRight, Play, Pause, SkipForward } from "lucide-react";
import { useDreamMode } from "./dream-mode";
import { 
  useScene, 
  SONGS, 
  playSong, 
  pauseSong, 
  toggleSong, 
  setVolume, 
  isPlaying, 
  getCurrentSong,
  getNextSongInScene,
  getSongsByScene
} from "./music-scene";

export function AmbientAudio() {
  const [open, setOpen] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolumeState] = useState(0.35);
  const [playing, setPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(getCurrentSong());
  const [showPlaylist, setShowPlaylist] = useState(false);
  
  const { isActive: dream, toggle: toggleDream } = useDreamMode();
  const scene = useScene();

  // Check playing state periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaying(isPlaying());
      setCurrentSong(getCurrentSong());
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Auto-play song when scene changes
  useEffect(() => {
    const sceneSongs = getSongsByScene(scene);
    if (sceneSongs.length > 0 && currentSong.scene !== scene) {
      playSong(sceneSongs[0].id);
    }
  }, [scene]);

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolumeState(v);
    if (v === 0) {
      setMuted(true);
      setVolume(0);
    } else {
      setMuted(false);
      setVolume(v);
    }
  };

  // Handle mute toggle
  const handleMuteToggle = () => {
    if (muted) {
      setMuted(false);
      setVolume(volume);
    } else {
      setMuted(true);
      setVolume(0);
    }
  };

  // Handle next song
  const handleNextSong = () => {
    const nextSong = getNextSongInScene(currentSong.id);
    if (nextSong) {
      playSong(nextSong.id);
    }
  };

  // Handle song selection from playlist
  const handleSelectSong = (songId: string) => {
    playSong(songId);
    setShowPlaylist(false);
  };

  // Enable audio on first interaction
  const [audioAllowed, setAudioAllowed] = useState(false);
  useEffect(() => {
    const enableAudio = () => {
      if (!audioAllowed) {
        setAudioAllowed(true);
      }
    };
    document.addEventListener("click", enableAudio);
    return () => document.removeEventListener("click", enableAudio);
  }, [audioAllowed]);

  // Get songs for current scene
  const sceneSongs = getSongsByScene(scene);
  const sceneLabel = {
    intro: "Introduction",
    galaxy: "Galaxy",
    gallery: "Gallery",
    scrapbook: "Scrapbook",
    letter: "Letter",
    finale: "Finale"
  }[scene];

  return (
    <div className="fixed bottom-6 right-6 z-[80] flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="glass-strong w-80 rounded-2xl p-5 shadow-cinema"
          >
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Music2 className="h-4 w-4 text-neon-cyan" />
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  {sceneLabel}
                </span>
              </div>
              <button
                onClick={toggleSong}
                className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-widest transition ${
                  playing
                    ? "bg-neon-pink/20 text-neon-pink"
                    : "bg-white/5 text-muted-foreground hover:text-foreground"
                }`}
              >
                {playing ? "Playing" : "Paused"}
              </button>
            </div>

            {/* Current Song Info */}
            <div className="mb-4 rounded-xl bg-gradient-to-r from-neon-pink/10 to-neon-purple/10 p-4 text-center">
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-1">
                Currently Playing
              </p>
              <p className="font-display text-xl text-aurora font-semibold">
                {currentSong.name}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {currentSong.artist}
              </p>
              {currentSong.duration && (
                <p className="text-[10px] text-muted-foreground/60 mt-2">
                  {currentSong.duration}
                </p>
              )}
            </div>

            {/* Playback Controls */}
            <div className="flex justify-center gap-4 mb-4">
              <button
                onClick={toggleSong}
                className="group relative grid h-14 w-14 place-items-center rounded-full bg-gradient-to-r from-neon-pink to-neon-purple shadow-lg transition-transform hover:scale-110"
              >
                {playing ? (
                  <Pause className="h-6 w-6 text-white" />
                ) : (
                  <Play className="h-6 w-6 text-white ml-0.5" />
                )}
                <span className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-neon-pink to-neon-purple opacity-75 blur-xl group-hover:opacity-100 transition-opacity" />
              </button>
              
              <button
                onClick={handleNextSong}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-white/20 hover:scale-105"
              >
                <SkipForward className="h-4 w-4 text-white" />
              </button>
            </div>

            {/* Volume Control */}
            <div className="mb-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Volume</span>
                <button
                  onClick={handleMuteToggle}
                  className="grid h-7 w-7 place-items-center rounded-full bg-white/5 transition hover:bg-white/10"
                >
                  {muted ? (
                    <VolumeX className="h-3.5 w-3.5 text-muted-foreground" />
                  ) : (
                    <Volume2 className="h-3.5 w-3.5 text-neon-cyan" />
                  )}
                </button>
              </div>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={muted ? 0 : volume}
                onChange={handleVolumeChange}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-full"
                style={{
                  background: `linear-gradient(to right, var(--neon-purple), var(--neon-pink) ${
                    (muted ? 0 : volume) * 100
                  }%, rgba(255,255,255,0.08) ${(muted ? 0 : volume) * 100}%)`,
                }}
              />
            </div>

            {/* Playlist Toggle */}
            <button
              onClick={() => setShowPlaylist(!showPlaylist)}
              className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm transition hover:bg-white/[0.06] mb-3"
            >
              <span className="text-muted-foreground">📋 Section Playlist</span>
              <ChevronRight className={`h-4 w-4 transition-transform ${showPlaylist ? "rotate-90" : ""}`} />
            </button>

            {/* Playlist */}
            <AnimatePresence>
              {showPlaylist && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 overflow-hidden"
                >
                  <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                    {SONGS.map((song) => (
                      <button
                        key={song.id}
                        onClick={() => handleSelectSong(song.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                          currentSong.id === song.id
                            ? "bg-gradient-to-r from-neon-pink/20 to-neon-purple/20 text-neon-pink"
                            : "hover:bg-white/10 text-muted-foreground"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{song.name}</p>
                            <p className="text-[10px] text-muted-foreground">{song.artist}</p>
                          </div>
                          {currentSong.id === song.id && (
                            <span className="text-xs text-neon-pink animate-pulse">● Playing</span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Dream Mode Toggle */}
            <button
              onClick={toggleDream}
              className={`group flex w-full items-center justify-between rounded-xl border px-4 py-3 transition ${
                dream
                  ? "border-neon-purple/60 bg-neon-purple/15"
                  : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
              }`}
            >
              <span className="flex items-center gap-2">
                <Sparkles
                  className={`h-4 w-4 transition ${
                    dream ? "text-neon-pink" : "text-muted-foreground"
                  }`}
                />
                <span className="text-sm">Dream Mode</span>
              </span>
              <span
                className={`relative h-5 w-9 rounded-full transition ${
                  dream ? "bg-aurora" : "bg-white/10"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                    dream ? "translate-x-4" : "translate-x-0.5"
                  }`}
                />
              </span>
            </button>

            {/* Now Playing Indicator */}
            {playing && !muted && (
              <div className="mt-3 flex items-center justify-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-neon-pink animate-pulse" />
                <span className="h-1.5 w-1.5 rounded-full bg-neon-pink animate-pulse delay-150" />
                <span className="h-1.5 w-1.5 rounded-full bg-neon-pink animate-pulse delay-300" />
                <span className="text-[10px] text-muted-foreground ml-1">Now playing...</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative grid h-12 w-12 place-items-center rounded-full glass-strong text-foreground shadow-cinema transition-transform hover:scale-110"
      >
        {open ? (
          <ChevronRight className="h-5 w-5 rotate-90" />
        ) : muted || !playing ? (
          <VolumeX className="h-5 w-5 text-muted-foreground" />
        ) : (
          <Music2 className="h-5 w-5 text-neon-pink" />
        )}
        {playing && !muted && (
          <>
            <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-neon-pink/40" />
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-neon-pink animate-pulse" />
          </>
        )}
      </button>
    </div>
  );
}