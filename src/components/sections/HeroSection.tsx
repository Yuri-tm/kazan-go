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
      {/* View 1 - Crowded beach */}
      <div
        className="absolute inset-0 transition-all duration-700 ease-in-out"
        style={{
          clipPath: flipped
            ? "polygon(0 0, 100% 0, 100% 0%, 0 0%)"
            : "polygon(0 0, 100% 0, 100% 72%, 0 78%)",
          transform: flipped ? "translateY(-20%)" : "translateY(0)",
        }}
      >
        <KenBurnsBackground image={crowdedImg} effect="zoom-in" overlay="bg-black/45">
          <div className="flex flex-col items-center justify-center h-[75%] px-6 text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-white drop-shadow-lg leading-tight tracking-tight">
              На переполненный пляж?
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-white/80 font-light">
              есть места почище
            </p>
          </div>
        </KenBurnsBackground>
      </div>

      {/* View 2 - Kazan */}
      <div
        className="absolute inset-0 transition-all duration-700 ease-in-out"
        style={{
          clipPath: flipped
            ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
            : "polygon(0 78%, 100% 72%, 100% 100%, 0 100%)",
          transform: flipped ? "translateY(0)" : "translateY(0)",
        }}
      >
        <KenBurnsBackground
          image={rivyeraImg}
          effect="zoom-out"
          overlay="bg-gradient-to-t from-black/60 to-black/30"
        >
          <div
            className="flex flex-col items-center justify-end h-full px-6 text-center transition-all duration-700"
            style={{ paddingBottom: flipped ? "20vh" : "4vh" }}
          >
            <h2
              className="font-bold text-white drop-shadow-md transition-all duration-700"
              style={{
                fontSize: flipped ? "clamp(1.5rem, 4vw, 2.25rem)" : "clamp(1rem, 2.5vw, 1.25rem)",
              }}
            >
              Или культурный отдых в Казани?
            </h2>
            <p
              className="mt-2 text-white/75 font-light transition-all duration-700"
              style={{ fontSize: flipped ? "1rem" : "0.75rem" }}
            >
              отдых для души и для тела
            </p>
            <button
              onClick={scrollToContact}
              className="mt-4 px-8 py-3 rounded-full bg-kazan-gold text-accent-foreground font-semibold text-lg shadow-lg animate-pulse-glow hover:scale-105 transition-transform"
              style={{
                opacity: flipped ? 1 : 0,
                pointerEvents: flipped ? "auto" : "none",
                transition: "opacity 0.5s ease 0.3s",
              }}
            >
              айда в Казань
            </button>
          </div>
        </KenBurnsBackground>
      </div>

      {/* Diagonal divider line — visible only before flip */}
      <div
        className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-500"
        style={{ opacity: flipped ? 0 : 1 }}
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <line
            x1="0" y1="78" x2="100" y2="72"
            stroke="hsl(43 90% 55%)"
            strokeWidth="0.25"
          />
        </svg>
      </div>

      {/* Toggle button — sits on the diagonal */}
      <button
        onClick={() => setFlipped((f) => !f)}
        className="absolute z-30 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-kazan-gold/20 backdrop-blur-md border border-kazan-gold/50 flex items-center justify-center text-white shadow-lg animate-float-arrow hover:bg-kazan-gold/40 transition-all duration-700"
        style={{ top: flipped ? "calc(50% - 28px)" : "calc(75% - 28px)" }}
        aria-label={flipped ? "Назад" : "Далее"}
      >
        {flipped ? <ChevronDown className="w-6 h-6" /> : <ChevronUp className="w-6 h-6" />}
      </button>
    </section>
  );
};

export default HeroSection;
