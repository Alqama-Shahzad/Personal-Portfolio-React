import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Testimonial } from "@/data/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
  isVisible: boolean;
}

export function TestimonialCard({ testimonial, index, isVisible }: TestimonialCardProps) {
  // Generate initials from name for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Calculate row index for staggered animations based on responsive breakpoints
  const getRowIndex = (index: number) => {
    // Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns
    if (window.innerWidth < 768) return index; // Mobile: each card is its own row
    if (window.innerWidth < 1024) return Math.floor(index / 2); // Tablet: 2 columns
    return Math.floor(index / 3); // Desktop: 3 columns
  };

  const rowIndex = getRowIndex(index);

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div
      className={cn(
        "group relative bg-background/50 backdrop-blur-sm border border-border/50 rounded-lg p-4 sm:p-6 transition-all duration-200",
        "hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5",
        !prefersReducedMotion && "hover:-translate-y-0.5",
        "opacity-0 transform translate-y-5"
      )}
      style={{
        transitionDelay: prefersReducedMotion ? '0ms' : `${isVisible ? 100 + rowIndex * 100 : 0}ms`,
        transitionDuration: prefersReducedMotion ? "200ms" : "400ms",
        opacity: isVisible ? 1 : 0,
        transform: `translateY(${isVisible ? '0' : (prefersReducedMotion ? '0' : '20px')})`,
        transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)'
      }}
      role="article"
      aria-label={`Testimonial from ${testimonial.name}`}
    >
      {/* Header with avatar and client info */}
      <header className="flex items-start gap-4 mb-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {testimonial.avatar ? (
            <img
              src={testimonial.avatar}
              alt={`Profile photo of ${testimonial.name}`}
              className="w-12 h-12 rounded-full object-cover"
              onError={(e) => {
                // Fallback to initials if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
          ) : null}
          <div 
            className={cn(
              "w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-sm",
              testimonial.avatar && "hidden"
            )}
            role="img"
            aria-label={`Initials for ${testimonial.name}`}
          >
            {getInitials(testimonial.name)}
          </div>
        </div>

        {/* Client info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-base group-hover:text-primary transition-colors duration-200">
            {testimonial.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            <span className="sr-only">Position: </span>
            {testimonial.role} at {testimonial.company}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            <span className="sr-only">Location: </span>
            {testimonial.location}
          </p>
        </div>
      </header>

      {/* Rating stars */}
      <div className="flex items-center gap-1 mb-4" role="img" aria-label={`Rating: ${testimonial.rating} out of 5 stars`}>
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={cn(
              "w-4 h-4 transition-all duration-200",
              i < testimonial.rating
                ? "text-primary fill-primary group-hover:scale-110"
                : "text-muted-foreground/30"
            )}
            aria-hidden="true"
          />
        ))}
        <span className="sr-only">{testimonial.rating} out of 5 stars</span>
      </div>

      {/* Testimonial content */}
      <blockquote className="text-sm leading-relaxed text-foreground mb-4">
        "{testimonial.content}"
      </blockquote>

      {/* Project type badge */}
      <footer className="flex items-center justify-between">
        <span 
          className="inline-block py-1 px-2 text-xs bg-primary/10 text-primary rounded-md"
          role="note"
          aria-label={`Project type: ${testimonial.projectType}`}
        >
          {testimonial.projectType}
        </span>
      </footer>

      {/* Decorative corner accent */}
      <div 
        className="absolute -bottom-0.5 -right-0.5 w-10 h-10 bg-primary/5 rounded-br-lg 
          transition-all duration-200 opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100"
        aria-hidden="true"
      />
    </div>
  );
}