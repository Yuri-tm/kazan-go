import KenBurnsBackground from "@/components/KenBurnsBackground";
import ScrollReveal from "@/components/ScrollReveal";
import SectionPeek from "@/components/SectionPeek";
import rivyeraImg from "@/assets/Rivyera.webp";
import kamskoeImg from "@/assets/Kamskoye.webp";

const KazanSection = () => {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="kazan" className="relative h-screen w-full snap-start overflow-hidden">
      <KenBurnsBackground
        image={rivyeraImg}
        effect="zoom-out"
        overlay="bg-gradient-to-t from-black/60 to-black/30"
      >
        <div className="flex flex-col items-center justify-center h-[72%] px-6 text-center">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-5xl font-bold text-white drop-shadow-md">
              Или культурный отдых в Казани?
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="mt-4 text-lg sm:text-xl text-white/75 font-light">
              отдых для души и для тела
            </p>
          </ScrollReveal>
          <ScrollReveal delay={400}>
            <button
              onClick={scrollToContact}
              className="mt-6 px-8 py-3 rounded-full bg-kazan-gold text-accent-foreground font-semibold text-lg shadow-lg animate-pulse-glow hover:scale-105 transition-transform"
            >
              айда в Казань
            </button>
          </ScrollReveal>
        </div>
      </KenBurnsBackground>

      <SectionPeek
        nextSectionId="water"
        nextImage={kamskoeImg}
        nextTitle="Отдых на воде"
      />
    </section>
  );
};

export default KazanSection;
