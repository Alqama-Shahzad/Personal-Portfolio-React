import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { testimonials } from "@/data/testimonials";
import { ScrollingTestimonialCard } from "./ScrollingTestimonialCard";

export function TestimonialsSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    const section = document.getElementById("testimonials");
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section
      id="testimonials"
      className="relative py-20 md:py-32 overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      <div className="container max-w-6xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <header className={cn(
          "text-center mb-16 opacity-0 transform translate-y-8 transition-all duration-700 ease-out",
          isVisible && "opacity-100 translate-y-0"
        )}>
          <span className="inline-block py-1 px-3 text-sm bg-primary/10 text-primary rounded-full mb-5">
            Client Testimonials
          </span>
          <h2 
            id="testimonials-heading"
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            What My Clients Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from Pakistani businesses who have trusted me with their web development projects
          </p>
        </header>

        {/* Scrolling Testimonials */}
        <div className={cn(
          "space-y-8 opacity-0 transform translate-y-8 transition-all duration-700 delay-300 ease-out",
          isVisible && "opacity-100 translate-y-0"
        )}>
          {/* Top Row - Scrolling Left */}
          <div className="relative overflow-hidden py-4">
            <div className="flex animate-scroll-left">
              {/* First set of testimonials */}
              {testimonials.slice(0, 3).map((testimonial) => (
                <ScrollingTestimonialCard
                  key={`top-1-${testimonial.id}`}
                  testimonial={testimonial}
                />
              ))}
              {/* Duplicate for seamless loop */}
              {testimonials.slice(0, 3).map((testimonial) => (
                <ScrollingTestimonialCard
                  key={`top-2-${testimonial.id}`}
                  testimonial={testimonial}
                />
              ))}
            </div>
            {/* Gradient overlays for fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
          </div>

          {/* Bottom Row - Scrolling Right */}
          <div className="relative overflow-hidden py-4">
            <div className="flex animate-scroll-right">
              {/* Second set of testimonials */}
              {testimonials.slice(3, 6).map((testimonial) => (
                <ScrollingTestimonialCard
                  key={`bottom-1-${testimonial.id}`}
                  testimonial={testimonial}
                />
              ))}
              {/* Duplicate for seamless loop */}
              {testimonials.slice(3, 6).map((testimonial) => (
                <ScrollingTestimonialCard
                  key={`bottom-2-${testimonial.id}`}
                  testimonial={testimonial}
                />
              ))}
            </div>
            {/* Gradient overlays for fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
          </div>
        </div>

        {/* Optional: Add a subtle background decoration */}
        <div 
          className="absolute inset-0 -z-10 opacity-30"
          aria-hidden="true"
        >
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-primary/3 rounded-full blur-3xl" />
        </div>
      </div>
    </section>
  );
}