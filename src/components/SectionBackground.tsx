import { cn } from "@/lib/utils";

interface SectionBackgroundProps {
  variant?: "primary" | "secondary";
  className?: string;
  showParticles?: boolean;
}

export function SectionBackground({ variant = "primary", className, showParticles = false }: SectionBackgroundProps) {
  return (
    <div className={cn("absolute inset-0 -z-10", className)}>
      {/* Main gradient orbs */}
      <div 
        className={cn(
          "absolute w-[500px] h-[500px] rounded-full filter blur-3xl animate-pulse-subtle opacity-50",
          variant === "primary" 
            ? "top-1/4 right-1/4 bg-gradient-to-r from-primary/20 to-accent/20 dark:from-indigo-500/20 dark:to-cyan-500/20" 
            : "bottom-1/4 left-1/4 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 dark:from-fuchsia-500/20 dark:to-violet-500/20"
        )}
      />
      
      {/* Animated dots grid */}
      <div className={cn(
        "absolute grid grid-cols-3 gap-2",
        variant === "primary" ? "top-1/3 right-1/4" : "bottom-1/3 left-1/4"
      )}>
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-primary/30 dark:bg-white/30 rounded-full animate-pulse-subtle"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
      
      {/* Modern code elements */}
      <div className={cn(
        "absolute text-sm font-mono hidden md:block space-y-2",
        variant === "primary" ? "top-32 left-10" : "bottom-32 right-10"
      )}>
        {(variant === "primary" ? ["{}", "</>", "[]", "//"] : ["()", "=>", "&&", "||"]).map((symbol, i) => (
          <div
            key={i}
            className={cn(
              "font-light tracking-wider",
              variant === "primary" 
                ? "text-primary/20 dark:text-white/20 animate-fade-right" 
                : "text-accent/20 dark:text-cyan-400/20 animate-fade-left"
            )}
            style={{ animationDelay: `${i * 0.3}s` }}
          >
            {symbol}
          </div>
        ))}
      </div>
    </div>
  );
} 