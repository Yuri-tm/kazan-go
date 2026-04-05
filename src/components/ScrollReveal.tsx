import { cn } from "@/lib/utils";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: "fade-up" | "slide-in-left" | "slide-in-right";
}

const animationMap = {
  "fade-up": "animate-fade-up",
  "slide-in-left": "animate-slide-in-left",
  "slide-in-right": "animate-slide-in-right",
};

const ScrollReveal = ({ children, className, delay = 0, animation = "fade-up" }: ScrollRevealProps) => {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <div
      ref={ref}
      className={cn("opacity-0", isVisible && animationMap[animation], className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
