"use client";

import { useState, useEffect } from "react";
import { Sora } from "next/font/google";

const sora = Sora({ subsets: ["latin"], weight: ["800"] });

const words = [
  "un CV qui impressionne.",
  "une lettre de motivation parfaite.",
  "un profil qui se démarque."
];

export function TypewriterHero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");

  useEffect(() => {
    const word = words[currentWordIndex];
    
    if (phase === "typing") {
      if (currentText === word) {
        const t = setTimeout(() => setPhase("deleting"), 8000);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => {
        setCurrentText(word.substring(0, currentText.length + 1));
      }, 90);
      return () => clearTimeout(t);
    }

    if (phase === "deleting") {
      if (currentText === "") {
        const t = setTimeout(() => {
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
          setPhase("typing");
        }, 600);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => {
        setCurrentText(currentText.substring(0, currentText.length - 1));
      }, 45);
      return () => clearTimeout(t);
    }
  }, [currentText, phase, currentWordIndex]);

  return (
    <h1 
      className={`text-[clamp(2.2rem,10vw,5rem)] md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] text-slate-900 animate-fade-up ${sora.className}`}
      style={{ animationDelay: '150ms' }}
    >
      Ton prochain emploi commence par{" "}
      <span className="block min-h-[140px] sm:min-h-[100px] md:min-h-[80px] lg:min-h-[160px] xl:min-h-[100px]">
        <span className="text-indigo-600">
          {currentText}
          <span className="text-indigo-400 inline-block animate-blink">|</span>
        </span>
      </span>
    </h1>
  );
}
