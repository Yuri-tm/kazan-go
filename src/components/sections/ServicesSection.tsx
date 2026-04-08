import { Home, Car, HeartPulse } from "lucide-react";
import KenBurnsBackground from "@/components/KenBurnsBackground";
import ScrollReveal from "@/components/ScrollReveal";
import SectionPeek from "@/components/SectionPeek";
import servicesImg from "@/assets/services.jpeg";

const services = [
  { icon: Home, title: "Размещение", desc: "в арендованных квартирах", delay: 0 },
  { icon: Car, title: "Трансфер", desc: "встреча и транспорт", delay: 200 },
  { icon: HeartPulse, title: "Реабилитация", desc: "персональная программа", delay: 400 },
];

const ServicesSection = () => (
  <section id="services" className="relative h-screen w-full overflow-hidden">
    <KenBurnsBackground image={servicesImg} effect="zoom-in" overlay="bg-gradient-to-b from-black/60 to-black/70">
      <div className="flex flex-col items-center justify-center h-[72%] px-6 py-16">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-5xl font-bold text-white text-center drop-shadow-lg">
            Ваш персональный помощник в Казани
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl">
          {services.map((s) => (
            <ScrollReveal key={s.title} delay={s.delay}>
              <div className="glass group flex flex-col items-center p-8 text-center transition-all duration-300 hover:scale-105 hover:bg-white/15">
                <s.icon className="w-10 h-10 text-kazan-gold mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-white/70 text-sm">{s.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </KenBurnsBackground>

    <SectionPeek
      nextSectionId="contact"
      nextImage={servicesImg}
      nextTitle="Айда в Казань?"
    />
  </section>
);

export default ServicesSection;
