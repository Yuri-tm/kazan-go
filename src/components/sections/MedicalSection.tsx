import KenBurnsBackground from "@/components/KenBurnsBackground";
import ScrollReveal from "@/components/ScrollReveal";
import SectionPeek from "@/components/SectionPeek";
import doctorsImg from "@/assets/Doctors.webp";
import childrenImg from "@/assets/Elmai.webp";

const MedicalSection = () => (
  <section id="medical" className="relative h-screen w-full snap-start overflow-hidden">
    <KenBurnsBackground image={doctorsImg} effect="pan-left" overlay="bg-gradient-to-r from-black/70 via-black/40 to-transparent">
      <div className="flex flex-col justify-center h-[72%] px-8 sm:px-16 py-16 max-w-2xl">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-5xl font-bold text-white drop-shadow-lg leading-tight">
            Отдых с пользой для здоровья
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <p className="mt-6 text-xl text-white/85 leading-relaxed">
            персональный стоматолог, терапевт, специалисты
          </p>
        </ScrollReveal>
        <ScrollReveal delay={400}>
          <div className="mt-8 glass-dark inline-flex items-center gap-3 px-6 py-4 max-w-fit">
            <div className="w-3 h-3 rounded-full bg-kazan-emerald animate-pulse" />
            <span className="text-white/90 text-base">Индивидуальный подбор специалистов</span>
          </div>
        </ScrollReveal>
      </div>
    </KenBurnsBackground>

    <SectionPeek
      nextSectionId="family"
      nextImage={childrenImg}
      nextTitle="Отдых всей семьёй"
    />
  </section>
);

export default MedicalSection;
