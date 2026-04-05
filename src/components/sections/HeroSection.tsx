import { ChevronUp } from "lucide-react";
import KenBurnsBackground from "@/components/KenBurnsBackground";
import crowdedImg from "@/assets/crowded_crop.png";
import rivyeraImg from "@/assets/rivyera_crop.jpg";

const HeroSection = () => {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative h-screen w-full snap-start overflow-hidden">
      {/* Top 3/4 - Crowded beach */}
      <div className="absolute inset-x-0 top-0 h-[72%] overflow-hidden">
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

      {/* Diagonal divider */}
      <div className="absolute inset-x-0 top-[70%] z-20 h-[6%] pointer-events-none">
        <svg viewBox="0 0 100 10" preserveAspectRatio="none" className="w-full h-full">
          <polygon points="0,0 100,4 100,10 0,10" fill="transparent" />
          <line x1="0" y1="0" x2="100" y2="4" stroke="hsl(43 90% 55%)" strokeWidth="0.3" />
        </svg>
      </div>

      {/* Arrow button at divider center */}
      <button
        onClick={() => document.getElementById("water")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute z-30 left-1/2 top-[70%] -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-kazan-gold/20 backdrop-blur-md border border-kazan-gold/50 flex items-center justify-center text-white shadow-lg animate-float-arrow hover:bg-kazan-gold/40 transition-colors"
        aria-label="Далее"
      >
        <ChevronUp className="w-6 h-6" />
      </button>

      {/* Bottom 1/4 - Kazan */}
      <div className="absolute inset-x-0 bottom-0 h-[30%] overflow-hidden">
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
    </section>
  );
};

export default HeroSection;
