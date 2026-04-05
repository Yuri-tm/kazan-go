import { useState, useEffect } from "react";
import KenBurnsBackground from "@/components/KenBurnsBackground";
import ScrollReveal from "@/components/ScrollReveal";
import childrenImg from "@/assets/children.jpg";

const attractions = [
  { name: "Театр кукол «Экият»", url: "https://www.puppet-show.ru/", desc: "Волшебный мир для детей" },
  { name: "Детский парк Елмай", url: "#", desc: "Активный отдых на свежем воздухе" },
  { name: "Зооботсад «Река Замбези»", url: "https://kazzoobotsad.ru/", desc: "Знакомство с дикой природой" },
  { name: "Казанский цирк", url: "https://kazan-circus.ru/", desc: "Незабываемые представления" },
];

const FamilySection = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActive((p) => (p + 1) % attractions.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="family" className="relative min-h-screen w-full snap-start overflow-hidden">
      <KenBurnsBackground image={childrenImg} effect="diagonal" overlay="bg-gradient-to-b from-black/50 to-black/70">
        <div className="flex flex-col items-center justify-center min-h-screen px-6 py-16">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-5xl font-bold text-white text-center drop-shadow-lg">
              Отдых всей семьёй
            </h2>
            <p className="mt-3 text-lg text-white/80 text-center">
              детский парк Елмай, Зооботсад «Река Замбези», казанский цирк
            </p>
          </ScrollReveal>

          {/* Carousel */}
          <div className="mt-10 relative w-full max-w-lg h-48 sm:h-56">
            {attractions.map((a, i) => (
              <a
                key={a.name}
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`absolute inset-0 glass flex flex-col items-center justify-center p-8 text-center transition-all duration-700 ${
                  i === active ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <span className="text-2xl font-bold text-white">{a.name}</span>
                <span className="mt-3 text-white/70">{a.desc}</span>
              </a>
            ))}
          </div>

          {/* Dots */}
          <div className="mt-6 flex gap-2">
            {attractions.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === active ? "bg-kazan-gold scale-125" : "bg-white/40"
                }`}
                aria-label={`Слайд ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </KenBurnsBackground>
    </section>
  );
};

export default FamilySection;
