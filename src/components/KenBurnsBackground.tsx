import { cn } from "@/lib/utils";

type KenBurnsEffect = "zoom-in" | "zoom-out" | "pan-left" | "diagonal";

interface KenBurnsBackgroundProps {
  image: string;
  effect?: KenBurnsEffect;
  overlay?: string;
  className?: string;
  children?: React.ReactNode;
}

const effectClasses: Record<KenBurnsEffect, string> = {
  "zoom-in": "animate-ken-burns-zoom-in",
  "zoom-out": "animate-ken-burns-zoom-out",
  "pan-left": "animate-ken-burns-pan-left",
  diagonal: "animate-ken-burns-diagonal",
};

const KenBurnsBackground = ({
  image,
  effect = "zoom-in",
  overlay = "bg-black/40",
  className,
  children,
}: KenBurnsBackgroundProps) => {
  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
      <div
        className={cn("absolute inset-0 bg-cover bg-center will-change-transform", effectClasses[effect])}
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className={cn("absolute inset-0", overlay)} />
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
};

export default KenBurnsBackground;
