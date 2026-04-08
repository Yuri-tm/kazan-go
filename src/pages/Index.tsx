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

const Index = () => (
  <main className="relative">
    {sections.map(({ id, Component }, i) => {
      const isLast = i === sections.length - 1;
      return (
        <div
          key={id}
          id={`wrap-${id}`}
          className={isLast ? "relative" : "relative"}
          style={{
            height: isLast ? "100vh" : "200vh",
            zIndex: sections.length - i,
          }}
        >
          <div
            className="sticky top-0 w-full overflow-hidden"
            style={{
              height: "100vh",
              boxShadow: "0 -10px 40px rgba(0,0,0,0.6)",
            }}
          >
            <Component />
          </div>
        </div>
      );
    })}
  </main>
);

export default Index;
