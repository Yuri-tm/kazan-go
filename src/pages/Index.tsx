import { ChevronUp } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { NavigationProvider } from "@/contexts/NavigationContext";
import HeroSection from "@/components/sections/HeroSection";
import KazanSection from "@/components/sections/KazanSection";
import WaterSection from "@/components/sections/WaterSection";
import MedicalSection from "@/components/sections/MedicalSection";
import FamilySection from "@/components/sections/FamilySection";
import ServicesSection from "@/components/sections/ServicesSection";
import ContactSection from "@/components/sections/ContactSection";

const sections = [
  { id: "hero", Component: HeroSection, peekTitle: "На переполненный пляж?" },
  { id: "kazan", Component: KazanSection, peekTitle: "Или культурный отдых в Казани?" },
  { id: "water", Component: WaterSection, peekTitle: "Отдых на воде" },
  { id: "medical", Component: MedicalSection, peekTitle: "Отдых с пользой для здоровья" },
  { id: "family", Component: FamilySection, peekTitle: "Отдых всей семьёй" },
  { id: "services", Component: ServicesSection, peekTitle: "Наши услуги" },
  { id: "contact", Component: ContactSection, peekTitle: "Айда в Казань?" },
];

const EXIT_DURATION_MS = 700;
const PREVIEW_DELAY_MS = 1500;
const PREVIEW_OFFSET_Y = "translateY(14%)";
const CLOSED_CLIP_PATH = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
const ACTIVE_CLIP_PATH = "polygon(0 0, 100% 0, 100% 72%, 0 78%)";

const Index = () => {
  const [current, setCurrent] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [previewReadyIndex, setPreviewReadyIndex] = useState<number | null>(null);
  const exitTimeoutRef = useRef<number | null>(null);
  const previewTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (exitTimeoutRef.current !== null) {
        window.clearTimeout(exitTimeoutRef.current);
      }
      if (previewTimeoutRef.current !== null) {
        window.clearTimeout(previewTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setPreviewReadyIndex(null);

    if (previewTimeoutRef.current !== null) {
      window.clearTimeout(previewTimeoutRef.current);
      previewTimeoutRef.current = null;
    }

    if (current >= sections.length - 1) return;

    previewTimeoutRef.current = window.setTimeout(() => {
      setPreviewReadyIndex(current);
      previewTimeoutRef.current = null;
    }, PREVIEW_DELAY_MS);
  }, [current]);

  function goNext() {
    if (isExiting || current >= sections.length - 1 || !previewVisible) return;

    setIsExiting(true);

    if (previewTimeoutRef.current !== null) {
      window.clearTimeout(previewTimeoutRef.current);
      previewTimeoutRef.current = null;
    }

    exitTimeoutRef.current = window.setTimeout(() => {
      setCurrent((prev) => prev + 1);
      setIsExiting(false);
      exitTimeoutRef.current = null;
    }, EXIT_DURATION_MS);
  }

  function goPrev() {
    if (isExiting || current <= 0) return;
    setCurrent((prev) => prev - 1);
  }

  const navValue = useMemo(() => ({ goToNext: goNext, goToPrev: goPrev }), [current, isExiting]);

  const hasNext = current + 1 < sections.length;
  const backgroundIndex = hasNext ? current + 1 : Math.max(current - 1, 0);
  const previewVisible = hasNext && previewReadyIndex === current;

  const backgroundSection = sections[backgroundIndex];
  const activeSection = sections[current];
  const ActiveComponent = activeSection.Component;
  const BackgroundComponent = backgroundSection.Component;

  return (
    <NavigationProvider value={navValue}>
      <main
        className="relative w-full h-screen overflow-hidden"
        onWheel={(e) => {
          if (e.deltaY > 30) goNext();
          else if (e.deltaY < -30) goPrev();
        }}
      >
        <div
          key={`background-${backgroundSection.id}`}
          id={`wrap-${backgroundSection.id}`}
          className="absolute inset-0 w-full h-screen pointer-events-none"
          style={{
            zIndex: 1,
            transform: "translateY(0)",
          }}
        >
          <BackgroundComponent showPeek={false} />
        </div>

        <div
          key={`active-${activeSection.id}`}
          id={`wrap-${activeSection.id}`}
          className="absolute inset-0 w-full h-screen"
          style={{
            zIndex: 2,
            transform: isExiting ? "translateY(-100%)" : "translateY(0)",
            transition: `transform ${EXIT_DURATION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
            boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
            willChange: "transform, clip-path",
            clipPath: hasNext ? (previewVisible || isExiting ? ACTIVE_CLIP_PATH : CLOSED_CLIP_PATH) : "none",
            transitionProperty: "transform, clip-path",
          }}
        >
          <ActiveComponent showPeek={false} />
        </div>

        {hasNext && (
          <>
            <div
              className="absolute inset-x-0 bottom-0 z-20 h-[28%] pointer-events-none flex items-center justify-center"
              style={{
                opacity: previewVisible && !isExiting ? 1 : 0,
                transform: previewVisible && !isExiting ? "translateY(0)" : "translateY(48px)",
                transition: `opacity ${EXIT_DURATION_MS}ms ease, transform ${EXIT_DURATION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
              }}
            >
              <span className="text-white/80 text-sm sm:text-base font-light tracking-wide">
                {backgroundSection.peekTitle}
              </span>
            </div>

            <div
              className="absolute inset-0 z-30"
              style={{
                transform: isExiting
                  ? "translateY(-100%)"
                  : previewVisible
                    ? "translateY(0)"
                    : PREVIEW_OFFSET_Y,
                transition: `transform ${EXIT_DURATION_MS}ms cubic-bezier(0.4, 0, 0.2, 1), opacity ${EXIT_DURATION_MS}ms ease`,
                opacity: previewVisible || isExiting ? 1 : 0,
                pointerEvents: previewVisible && !isExiting ? "auto" : "none",
                willChange: "transform, opacity",
              }}
            >
              <div className="absolute inset-0 pointer-events-none">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                  <line x1="0" y1="78" x2="100" y2="72" stroke="hsl(43 90% 55%)" strokeWidth="0.25" />
                </svg>
              </div>

              <button
                onClick={goNext}
                disabled={isExiting}
                className="absolute z-10 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-kazan-gold/20 backdrop-blur-md border border-kazan-gold/50 flex items-center justify-center text-white shadow-lg animate-float-arrow hover:bg-kazan-gold/40 transition-colors disabled:opacity-60"
                style={{ top: "calc(75% - 24px)" }}
                aria-label="Далее"
              >
                <ChevronUp className="w-5 h-5" />
              </button>
            </div>
          </>
        )}
      </main>
    </NavigationProvider>
  );
};

export default Index;
