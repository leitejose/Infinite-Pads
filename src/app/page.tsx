"use client";

import React, { useState } from "react";
import { PadGrid } from "../components/PadGrid";
import { usePadPlayer } from "../components/PadPlayer";
import Image from 'next/image'; // Importa o componente Image do Next.js

export default function App() {
  const [patch] = useState("reawaken");
  const [volume, setVolume] = useState(50);
  const [crossfade, setCrossfade] = useState(2);

  const { togglePad, activePads } = usePadPlayer({ patch, volume, crossfade });

  const validKeys = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

  return (
    <main
      className="w-screen h-screen overflow-hidden flex flex-col bg-cover bg-center"
      style={{ backgroundColor: "#1a1623" }}
    >

      <div className="absolute top-4 left-4">
        {/* Substitui a tag img pelo componente Image */}
        <Image
          src="/logo.svg"
          alt="Logo"
          className="w-16 h-16 object-contain"
          width={64}    // Define a largura da imagem
          height={64}   // Define a altura da imagem
        />
      </div>

      <h1 className="text-3xl text-white font-bold p-7 text-center">Infinite Pads</h1>

      <div className="flex-grow overflow-hidden">
        <PadGrid keys={validKeys} activePads={activePads} onToggle={togglePad} />
      </div>

      {/* Controles Responsivos */}
      <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center gap-4 px-4 py-4 flex-wrap w-full">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label htmlFor="volume" className="text-white text-sm sm:text-base">Volume:</label>
          <input
            id="volume"
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full sm:w-64"
          />
          <span className="text-white text-sm sm:text-base">{volume}%</span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label htmlFor="crossfade" className="text-white text-sm sm:text-base">Crossfade:</label>
          <input
            id="crossfade"
            type="range"
            min="1"
            max="10"
            value={crossfade}
            onChange={(e) => setCrossfade(Number(e.target.value))}
            className="w-full sm:w-64"
          />
          <span className="text-white text-sm sm:text-base">{crossfade}s</span>
        </div>
      </div>
    </main>
  );
}
