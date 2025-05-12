// src/hooks/usePadPlayer.ts
import { useState, useEffect, useRef } from "react";

type PadPlayerOptions = {
  patch: string;
  volume: number; // 0–100
  crossfade: number; // in seconds
};

export function usePadPlayer({ patch, volume, crossfade }: PadPlayerOptions) {
  const [activePads, setActivePads] = useState<{ [key: string]: boolean }>({});
  const currentAudio = useRef<{ [key: string]: HTMLAudioElement | null }>({});

  const togglePad = (key: string) => {
    const isActive = activePads[key];

    // Desativa todos os pads ativos
    Object.keys(activePads).forEach((k) => {
      if (activePads[k] && currentAudio.current[k]) {
        const audio = currentAudio.current[k]!;
        const fadeOut = setInterval(() => {
          if (audio.volume > 0) {
            audio.volume = Math.max(0, audio.volume - 0.02);
          } else {
            audio.pause();
            clearInterval(fadeOut);
            currentAudio.current[k] = null;
          }
        }, (crossfade * 1000) / 20);
      }
    });

    if (!isActive) {
      const encodedKey = key.replace("#", "%23");
      const audio = new Audio(`/pads/${patch}/${encodedKey}.mp3`);
      audio.loop = true;
      audio.volume = 0;
      audio.play().catch(console.error);

      // Fade in
      const fadeIn = setInterval(() => {
        if (audio.volume < volume / 100) {
          audio.volume = Math.min(volume / 100, audio.volume + 0.02);
        } else {
          clearInterval(fadeIn);
        }
      }, (crossfade * 1000) / 20);

      currentAudio.current[key] = audio;
    }

    // Atualiza estado dos pads
    setActivePads(
      Object.fromEntries(
        Object.keys(activePads).map((k) => [k, false])
      )
    );
    setActivePads((prev) => ({ ...prev, [key]: !isActive }));
  };

  // Suporte a teclado
  useEffect(() => {
    const validKeys = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

    const handleKeyDown = (event: KeyboardEvent) => {
      let padKey = event.key.toUpperCase();
      if (event.altKey && /^[A-G]$/.test(padKey)) padKey += "#";
      if (validKeys.includes(padKey)) togglePad(padKey);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [patch, volume, crossfade, activePads]);

  // Atualiza o volume dos pads ativos quando o volume muda
  useEffect(() => {
    Object.keys(currentAudio.current).forEach((key) => {
      const audio = currentAudio.current[key];
      if (audio && activePads[key]) {
        audio.volume = volume / 100;
      }
    });
  }, [volume, activePads]);

  return { togglePad, activePads };
}
