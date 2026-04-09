import { useState, useCallback } from "react";
import HeroSection from "@/components/sections/HeroSection";
import KazanSection from "@/components/sections/KazanSection";
import WaterSection from "@/components/sections/WaterSection";
import MedicalSection from "@/components/sections/MedicalSection";
import FamilySection from "@/components/sections/FamilySection";
import ServicesSection from "@/components/sections/ServicesSection";
import ContactSection from "@/components/sections/ContactSection";

const sections = [
  { id: "hero", Component: HeroSection },
  { id: "kazan", Component: KazanSection },
  { id: "water", Component: WaterSection },
  { id: "medical", Component: MedicalSection },
  { id: "family", Component: FamilySection },
  { id: "services", Component: ServicesSection },
  { id: "contact", Component: ContactSection },
];

const Index = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goToNext = useCallback(() => {
    if (animating || activeIndex >= sections.length - 1) return;
    setAnimating(true);
    // After animation completes, advance index
    setTimeout(() => {
      setActiveIndex((prev) => prev + 1);
      setAnimating(false);
    }, 700);
  }, [animating, activeIndex]);

  const goToPrev = useCallback(() => {
    if (animating || activeIndex <= 0) return;
    setActiveIndex((prev) => prev - 1);
  }, [animating, activeIndex]);

  // Always render active layer + next layer (at minimum)
  const visibleIndices: number[] = [];
  // The "underneath" layer (next section) renders first
  if (activeIndex + 1 < sections.length) {
    visibleIndices.push(activeIndex + 1);
  }
  // The active (top) layer
  visibleIndices.push(activeIndex);

  return (
    <main
      className="relative w-full h-screen overflow-hidden"
      onWheel={(e) => {
        if (e.deltaY > 30) goToNext();
        else if (e.deltaY < -30) goToPrev();
      }}
    >
      {visibleIndices.map((idx) => {
        const { id, Component } = sections[idx];
        const isActive = idx === activeIndex;
        const shouldSlideUp = isActive && animating;

        return (
          <div
            key={id}
            id={`wrap-${id}`}
            className="absolute inset-0 w-full h-screen"
            style={{
              zIndex: isActive ? 2 : 1,
              transform: shouldSlideUp ? "translateY(-100%)" : "translateY(0)",
              transition: shouldSlideUp ? "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
              boxShadow: isActive ? "0 10px 40px rgba(0,0,0,0.5)" : "none",
            }}
          >
            <Component />
          </div>
        );
      })}
      </main>
    </NavigationProvider>
  );
};

export default Index;
