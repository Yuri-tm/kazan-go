import { ChevronUp } from "lucide-react";

interface SectionPeekProps {
  nextSectionId: string;
  nextImage: string;
  nextTitle: string;
  onNavigate?: () => void;
}

const SectionPeek = ({ nextSectionId, nextImage, nextTitle, onNavigate }: SectionPeekProps) => {
  const handleClick = () => {
    if (onNavigate) {
      onNavigate();
    }
  };

  return (
    <>
      {/* Next section preview - bottom 25% with diagonal clip */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          clipPath: "polygon(0 78%, 100% 72%, 100% 100%, 0 100%)",
        }}
      >
        <div className="absolute inset-0">
          <img
            src={nextImage}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[28%] flex items-center justify-center">
          <span className="text-white/80 text-sm sm:text-base font-light tracking-wide">
            {nextTitle}
          </span>
        </div>
      </div>

      {/* Diagonal gold line */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
          <line x1="0" y1="78" x2="100" y2="72" stroke="hsl(43 90% 55%)" strokeWidth="0.25" />
        </svg>
      </div>

      {/* UP button on the diagonal */}
      <button
        onClick={handleClick}
        className="absolute z-30 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-kazan-gold/20 backdrop-blur-md border border-kazan-gold/50 flex items-center justify-center text-white shadow-lg animate-float-arrow hover:bg-kazan-gold/40 transition-colors"
        style={{ top: "calc(75% - 24px)" }}
        aria-label="Далее"
      >
        <ChevronUp className="w-5 h-5" />
      </button>
    </>
  );
};

export default SectionPeek;
