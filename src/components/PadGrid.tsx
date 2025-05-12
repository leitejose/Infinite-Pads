import React from "react";

type PadGridProps = {
  keys: string[];
  activePads: { [key: string]: boolean };
  onToggle: (key: string) => void;
};

export function PadGrid({ keys, activePads, onToggle }: PadGridProps) {
  const handleToggle = (key: string) => {
    Object.keys(activePads).forEach((k) => {
      if (activePads[k]) {
        onToggle(k);
      }
    });
    onToggle(key);
  };

  return (
    <div className="grid gap-4 p-4 w-full h-full"
         style={{
           gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
           maxHeight: "60vh"
         }}
    >
      {keys.map((key) => (
        <button
          key={key}
          onClick={() => handleToggle(key)}
          className={`rounded-xl text-white font-semibold aspect-square w-full h-full
            ${
              activePads[key]
                ? "bg-pink-600 shadow-lg scale-105"
                : "bg-gray-800 hover:bg-gray-700"
            }
            transition-all duration-200`}
        >
          {key}
        </button>
      ))}
    </div>
  );
}
