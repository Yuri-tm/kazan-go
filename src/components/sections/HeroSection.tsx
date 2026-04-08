import KenBurnsBackground from "@/components/KenBurnsBackground";
import SectionPeek from "@/components/SectionPeek";
import crowdedImg from "@/assets/Crowded.webp";
import rivyeraImg from "@/assets/Rivyera.webp";

const HeroSection = () => (
  <section id="hero" className="relative h-screen w-full overflow-hidden">
    <KenBurnsBackground image={crowdedImg} effect="pan-left" overlay="bg-black/45">
      <div className="flex flex-col items-center justify-center h-[72%] px-6 text-center">
        <h1 className="text-4xl sm:text-6xl font-bold text-white drop-shadow-lg leading-tight tracking-tight">
          На переполненный пляж?
        </h1>
      </div>
    </KenBurnsBackground>

    <SectionPeek
      nextSectionId="kazan"
      nextImage={rivyeraImg}
      nextTitle="Или культурный отдых в Казани?"
    />
  </section>
);

export default HeroSection;
