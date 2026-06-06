import { useEffect, useState } from "react";

type Listener = (on: boolean) => void;
let dreamOn = false;
const listeners = new Set<Listener>();

export const setDreamMode = (on: boolean) => {
  dreamOn = on;
  if (typeof document !== "undefined") {
    document.documentElement.classList.toggle("dream-mode", on);
  }
  listeners.forEach((l) => l(on));
};

export const useDreamMode = (): [boolean, (on: boolean) => void] => {
  const [on, setOn] = useState(dreamOn);
  useEffect(() => {
    const l: Listener = (v) => setOn(v);
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, []);
  return [on, setDreamMode];
};
