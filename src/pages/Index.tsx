import { useState, useRef, useCallback, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

import crowdedImg from "@/assets/crowded_crop.png";
import rivyeraImg from "@/assets/rivyera_crop.jpg";
import kamskoeImg from "@/assets/kamskoe_crop.jpg";
import doctorsImg from "@/assets/doctors_small.jpg";
import childrenImg from "@/assets/children.jpg";
import servicesImg from "@/assets/services.jpeg";

interface PageData {
  bg: string;
  title: string;
  subtitle?: string;
  items?: string[];
}

const pages: PageData[] = [
  { bg: crowdedImg, title: "На переполненный пляж?" },
  { bg: rivyeraImg, title: "Или культурный отдых в Казани?" },
  {
    bg: kamskoeImg,
    title: "Отдых на воде",
    subtitle: "акватермальные комплексы и аквапарки",
    items: ["«Пляж»", "Tatar Su", "«Ривьера»", "«Аквазаврия»"],
  },
  {
    bg: doctorsImg,
    title: "Отдых с пользой для здоровья",
    subtitle: "персональный стоматолог",
  },
  {
    bg: childrenImg,
    title: "Отдых всей семьёй",
    subtitle: "детский парк Елмай, Зооботсад «Река Замбези», казанский цирк",
  },
  {
    bg: servicesImg,
    title: "Наши услуги",
    subtitle:
      "размещение в арендованных квартирах, трансфер, персональная программа реабилитации",
  },
];

const PEEK = 25; // bottom peek percentage

const Index = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [revealPercent, setRevealPercent] = useState(PEEK);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartY = useRef(0);
  const startReveal = useRef(PEEK);

  const hasNext = currentPage < pages.length - 1;
  const hasPrev = currentPage > 0;

  const goNext = useCallback(() => {
    if (!hasNext || isAnimating) return;
    setIsAnimating(true);
    setRevealPercent(100);
    setTimeout(() => {
      setCurrentPage((p) => p + 1);
      setRevealPercent(PEEK);
      setIsAnimating(false);
    }, 500);
  }, [hasNext, isAnimating]);

  const goPrev = useCallback(() => {
    if (!hasPrev || isAnimating) return;
    setIsAnimating(true);
    setRevealPercent(0);
    setTimeout(() => {
      setCurrentPage((p) => p - 1);
      setRevealPercent(PEEK);
      setIsAnimating(false);
    }, 500);
  }, [hasPrev, isAnimating]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    startReveal.current = revealPercent;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isAnimating) return;
    const dy = touchStartY.current - e.touches[0].clientY;
    const vh = window.innerHeight;
    const delta = (dy / vh) * 100;
    const next = Math.max(0, Math.min(100, startReveal.current + delta));
    setRevealPercent(next);
  };

  const handleTouchEnd = () => {
    if (isAnimating) return;
    if (revealPercent > 60 && hasNext) {
      goNext();
    } else if (revealPercent < 15 && hasPrev) {
      goPrev();
    } else {
      setRevealPercent(PEEK);
    }
  };

  // Mouse wheel
  useEffect(() => {
    let cooldown = false;
    const handler = (e: WheelEvent) => {
      if (cooldown || isAnimating) return;
      cooldown = true;
      setTimeout(() => (cooldown = false), 800);
      if (e.deltaY > 0) goNext();
      else goPrev();
    };
    window.addEventListener("wheel", handler, { passive: true });
    return () => window.removeEventListener("wheel", handler);
  }, [goNext, goPrev, isAnimating]);

  const currentData = pages[currentPage];
  const nextData = hasNext ? pages[currentPage + 1] : null;

  const clipTop = `polygon(0 0, 100% 0, 100% ${100 - revealPercent}%, 0 ${100 - revealPercent + 4}%)`;
  const clipBottom = `polygon(0 ${100 - revealPercent + 4}%, 100% ${100 - revealPercent}%, 100% 100%, 0 100%)`;
  const borderTop = 100 - revealPercent;

  return (
    <div
      className="fixed inset-0 overflow-hidden select-none"
      style={{ touchAction: "none" }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Current page (top) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${currentData.bg})`,
          clipPath: clipTop,
          transition: isAnimating ? "clip-path 0.5s cubic-bezier(.4,0,.2,1)" : "none",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex flex-col justify-center items-center h-full px-6 pb-[30vh]">
          <h1 className="text-3xl sm:text-5xl font-bold text-white text-center drop-shadow-lg leading-tight">
            {currentData.title}
          </h1>
          {currentData.subtitle && (
            <p className="mt-4 text-lg text-white/90 text-center max-w-sm">
              {currentData.subtitle}
            </p>
          )}
          {currentData.items && (
            <ul className="mt-3 space-y-1 text-white/85 text-center text-base">
              {currentData.items.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          )}
          {hasPrev && (
            <button
              onClick={goPrev}
              className="absolute top-8 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white"
              aria-label="Previous"
            >
              <ChevronDown className="w-5 h-5 rotate-180" />
            </button>
          )}
        </div>
      </div>

      {/* Next page (bottom peek) */}
      {nextData && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${nextData.bg})`,
            clipPath: clipBottom,
            transition: isAnimating ? "clip-path 0.5s cubic-bezier(.4,0,.2,1)" : "none",
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 flex flex-col justify-end items-center h-full px-6 pb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-white text-center drop-shadow-md">
              {nextData.title}
            </h2>
          </div>
        </div>
      )}

      {/* Diagonal border arrow button */}
      {hasNext && (
        <button
          onClick={goNext}
          className="absolute z-30 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm border border-white/50 flex items-center justify-center text-white shadow-lg"
          style={{
            top: `calc(${borderTop + 2}% - 24px)`,
            transition: isAnimating ? "top 0.5s cubic-bezier(.4,0,.2,1)" : "none",
            animation: "bounce-arrow 2s infinite",
          }}
          aria-label="Next page"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}

      {/* Page indicator */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-1.5">
        {pages.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === currentPage ? "bg-white scale-125" : "bg-white/40"
            }`}
          />
        ))}
      </div>

      <style>{`
        @keyframes bounce-arrow {
          0%, 100% { transform: translate(-50%, 0); }
          50% { transform: translate(-50%, -8px); }
        }
      `}</style>
    </div>
  );
};

export default Index;
