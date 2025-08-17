import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Testimonial } from "@/data/testimonials";

interface ScrollingTestimonialCardProps {
  testimonial: Testimonial;
}

export function ScrollingTestimonialCard({ testimonial }: ScrollingTestimonialCardProps) {
  // Generate initials from name for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div
      className={cn(
        "flex-shrink-0 w-80 bg-background/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 mx-3",
        "shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/50"
      )}
      role="article"
      aria-label={`Testimonial from ${testimonial.name}`}
    >
      {/* Header with avatar and client info */}
      <header className="flex items-start gap-4 mb-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div 
            className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-sm"
            role="img"
            aria-label={`Initials for ${testimonial.name}`}
          >
            {getInitials(testimonial.name)}
          </div>
        </div>

        {/* Client info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-base">
            {testimonial.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            <span className="sr-only">Position: </span>
            {testimonial.role}
          </p>
          <p className="text-sm text-muted-foreground">
            {testimonial.company}
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
              "w-4 h-4",
              i < testimonial.rating
                ? "text-primary fill-primary"
                : "text-muted-foreground/30"
            )}
            aria-hidden="true"
          />
        ))}
        <span className="sr-only">{testimonial.rating} out of 5 stars</span>
      </div>

      {/* Testimonial content */}
      <blockquote className="text-sm leading-relaxed text-foreground mb-4 line-clamp-4">
        "{testimonial.content}"
      </blockquote>

      {/* Project type badge */}
      <footer>
        <span 
          className="inline-block py-1 px-2 text-xs bg-primary/10 text-primary rounded-md"
          role="note"
          aria-label={`Project type: ${testimonial.projectType}`}
        >
          {testimonial.projectType}
        </span>
      </footer>
    </div>
  );
}