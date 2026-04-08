import { useRef, useState, useEffect, useCallback } from "react";
import HeroSection from "@/components/sections/HeroSection";
import KazanSection from "@/components/sections/KazanSection";
import WaterSection from "@/components/sections/WaterSection";
import MedicalSection from "@/components/sections/MedicalSection";
import FamilySection from "@/components/sections/FamilySection";
import ServicesSection from "@/components/sections/ServicesSection";
import ContactSection from "@/components/sections/ContactSection";

const sectionComponents = [
  HeroSection,
  KazanSection,
  WaterSection,
  MedicalSection,
  FamilySection,
  ServicesSection,
  ContactSection,
];

const Index = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [viewportH, setViewportH] = useState(window.innerHeight);
  const total = sectionComponents.length;

  useEffect(() => {
    const onResize = () => setViewportH(window.innerHeight);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      setScrollY(scrollRef.current.scrollTop);
    }
  }, []);

  // Each section gets 1 viewport of "dwell" space
  // Total scrollable height = (total) * viewportH
  const totalHeight = total * viewportH;

  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      className="w-full h-screen overflow-y-auto"
      style={{ scrollBehavior: "smooth" }}
    >
      {/* Spacer to create scroll room */}
      <div style={{ height: totalHeight, position: "relative" }}>
        {sectionComponents.map((Section, i) => {
          // Each section "owns" the scroll range [i*vh, (i+1)*vh]
          const sectionStart = i * viewportH;
          const progress = Math.min(
            Math.max((scrollY - sectionStart) / viewportH, 0),
            1
          );

          // The current section slides up as user scrolls past it
          // Sections below stay in place (translateY: 0)
          const isActive = scrollY >= sectionStart - viewportH && scrollY < sectionStart + viewportH;
          const isPast = scrollY >= sectionStart + viewportH;
          
          let translateY = 0;
          if (scrollY < sectionStart) {
            // Section hasn't been reached yet — position below viewport
            translateY = 0; // it's stacked, just hidden by z-index
          }
          if (scrollY >= sectionStart) {
            // Section is being scrolled past — slide it up
            translateY = -(scrollY - sectionStart);
          }

          return (
            <div
              key={i}
              className="fixed top-0 left-0 w-full h-screen overflow-hidden"
              style={{
                zIndex: total - i,
                transform: isPast
                  ? `translateY(-${viewportH}px)`
                  : scrollY > sectionStart
                  ? `translateY(${-(scrollY - sectionStart)}px)`
                  : "translateY(0)",
                willChange: "transform",
              }}
            >
              <Section />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Index;
