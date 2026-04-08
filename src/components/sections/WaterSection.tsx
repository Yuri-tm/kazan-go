import KenBurnsBackground from "@/components/KenBurnsBackground";
import ScrollReveal from "@/components/ScrollReveal";
import SectionPeek from "@/components/SectionPeek";
import kamskoeImg from "@/assets/Kamskoye.webp";
import doctorsImg from "@/assets/Doctors.webp";

const venues = [
  { name: "«Ривьера»", url: "https://kazanriviera.ru/aquapark/", desc: "Аквапарк" },
  { name: "«Пляж»", url: "https://plyazh.pro/", desc: "Велнес-спа" },
  { name: "Tatar Su", url: "#", desc: "Пляжный комплекс" },
  { name: "«Аквазаврия»", url: "https://baryonix.ru", desc: "Аквапарк" },
];

const WaterSection = () => (
  <section id="water" className="relative h-screen w-full overflow-hidden">
    <KenBurnsBackground image={kamskoeImg} effect="diagonal" overlay="bg-gradient-to-b from-black/60 via-black/40 to-black/70">
      <div className="flex flex-col items-center justify-center h-[72%] px-6 py-16">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-5xl font-bold text-white text-center drop-shadow-lg">
            Отдых на воде
          </h2>
          <p className="mt-3 text-lg text-white/80 text-center max-w-md">
            акватермальные комплексы и аквапарки
          </p>
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-2 gap-4 w-full max-w-lg">
          {venues.map((v, i) => (
            <ScrollReveal key={v.name} delay={i * 150}>
              <a
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass group flex flex-col items-center justify-center p-6 text-center transition-all duration-300 hover:scale-105 hover:bg-white/15 hover:shadow-xl"
              >
                <span className="text-lg font-semibold text-white group-hover:text-kazan-gold transition-colors">
                  {v.name}
                </span>
                <span className="mt-1 text-sm text-white/60">{v.desc}</span>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </KenBurnsBackground>

    <SectionPeek
      nextSectionId="medical"
      nextImage={doctorsImg}
      nextTitle="Отдых с пользой для здоровья"
    />
  </section>
);

export default WaterSection;
