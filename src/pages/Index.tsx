import HeroSection from "@/components/sections/HeroSection";
import WaterSection from "@/components/sections/WaterSection";
import MedicalSection from "@/components/sections/MedicalSection";
import FamilySection from "@/components/sections/FamilySection";
import ServicesSection from "@/components/sections/ServicesSection";
import ContactSection from "@/components/sections/ContactSection";

const Index = () => (
  <main className="w-full snap-y snap-mandatory overflow-y-auto h-screen">
    <HeroSection />
    <WaterSection />
    <MedicalSection />
    <FamilySection />
    <ServicesSection />
    <ContactSection />
  </main>
);

export default Index;
