import HeroSection from "@/components/sections/HeroSection";
import KazanSection from "@/components/sections/KazanSection";
import WaterSection from "@/components/sections/WaterSection";
import MedicalSection from "@/components/sections/MedicalSection";
import FamilySection from "@/components/sections/FamilySection";
import ServicesSection from "@/components/sections/ServicesSection";
import ContactSection from "@/components/sections/ContactSection";

const sections = [
  HeroSection,
  KazanSection,
  WaterSection,
  MedicalSection,
  FamilySection,
  ServicesSection,
  ContactSection,
];

const Index = () => (
  <main className="w-full snap-y snap-mandatory overflow-y-auto h-screen">
    {sections.map((Section, i) => (
      <div
        key={i}
        className="relative h-screen w-full snap-start"
        style={{ zIndex: sections.length - i }}
      >
        <div className="sticky top-0 h-screen w-full">
          <Section />
        </div>
      </div>
    ))}
  </main>
);

export default Index;
