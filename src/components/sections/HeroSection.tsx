import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import KenBurnsBackground from "@/components/KenBurnsBackground";
import crowdedImg from "@/assets/crowded_crop.png";
import rivyeraImg from "@/assets/rivyera_crop.jpg";

const HeroSection = () => {
  const [flipped, setFlipped] = useState(false);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative h-screen w-full snap-start overflow-hidden">
      {/* View 1 - Crowded beach: slides up and away */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-in-out"
        style={{ transform: flipped ? "translateY(-100%)" : "translateY(0)" }}
      >
        <KenBurnsBackground image={crowdedImg} effect="zoom-in" overlay="bg-black/45">
          <div className="flex flex-col items-center justify-center h-full px-6 text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-white drop-shadow-lg leading-tight tracking-tight">
              На переполненный пляж?
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-white/80 font-light">
              есть места почище
            </p>
          </div>
        </KenBurnsBackground>
      </div>

      {/* View 2 - Kazan: slides up from below */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-in-out"
        style={{ transform: flipped ? "translateY(0)" : "translateY(100%)" }}
      >
        <KenBurnsBackground
          image={rivyeraImg}
          effect="zoom-out"
          overlay="bg-gradient-to-t from-black/60 to-black/30"
        >
          <div className="flex flex-col items-center justify-center h-full px-6 text-center">
            <h2 className="text-2xl sm:text-4xl font-bold text-white drop-shadow-md">
              Или культурный отдых в Казани?
            </h2>
            <p className="mt-2 text-base text-white/75 font-light">
              отдых для души и для тела
            </p>
            <button
              onClick={scrollToContact}
              className="mt-4 px-8 py-3 rounded-full bg-kazan-gold text-accent-foreground font-semibold text-lg shadow-lg animate-pulse-glow hover:scale-105 transition-transform"
            >
              айда в Казань
            </button>
          </div>
        </KenBurnsBackground>
      </div>

      {/* Diagonal divider - only visible before flip */}
      <div
        className="absolute inset-x-0 top-[70%] z-20 h-[6%] pointer-events-none transition-opacity duration-500"
        style={{ opacity: flipped ? 0 : 1 }}
      >
        <svg viewBox="0 0 100 10" preserveAspectRatio="none" className="w-full h-full">
          <polygon points="0,0 100,4 100,10 0,10" fill="transparent" />
          <line x1="0" y1="0" x2="100" y2="4" stroke="hsl(43 90% 55%)" strokeWidth="0.3" />
        </svg>
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setFlipped((f) => !f)}
        className="absolute z-30 left-1/2 bottom-8 -translate-x-1/2 w-14 h-14 rounded-full bg-kazan-gold/20 backdrop-blur-md border border-kazan-gold/50 flex items-center justify-center text-white shadow-lg animate-float-arrow hover:bg-kazan-gold/40 transition-colors"
        aria-label={flipped ? "Назад" : "Далее"}
      >
        {flipped ? <ChevronDown className="w-6 h-6" /> : <ChevronUp className="w-6 h-6" />}
      </button>
    </section>
  );
};

export default HeroSection;
