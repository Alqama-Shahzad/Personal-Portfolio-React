import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { safeStorage } from "@/lib/safeStorage";
import { Briefcase, Code, Lightbulb, GraduationCap } from "lucide-react";
import ConnectButton from "@/components/ConnectButton";
import { Experience, experiences as defaultExperiences } from "@/data/experience";

export function ExperienceSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [experiences, setExperiences] = useState<Experience[]>(defaultExperiences);

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

    const section = document.getElementById("experience");
    if (section) {
      observer.observe(section);
    }

    // Load experiences from localStorage if available
    const savedExperiences = safeStorage.getItem<Experience[]>('experiences', defaultExperiences);
    setExperiences(savedExperiences);
    
    // Save experiences to localStorage if available
    if (safeStorage.isAvailable()) {
      safeStorage.setItem('experiences', savedExperiences);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  // Function to get icon based on experience index
  const getIconForExperience = (index: number) => {
    switch (index) {
      case 0:
        return <Code className="h-4 w-4 text-primary" />;
      case 1:
        return <Briefcase className="h-4 w-4 text-primary" />;
      case 2:
        return <Lightbulb className="h-4 w-4 text-primary" />;
      case 3:
        return <GraduationCap className="h-4 w-4 text-primary" />;
      default:
        return <Briefcase className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <section id="experience" className="relative py-20 md:py-32 bg-muted/30 overflow-hidden">
      <div className="container max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block py-1 px-3 text-sm bg-primary/10 text-primary rounded-full mb-5">
            My Journey
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Learning Path
          </h2>
          <p className="text-muted-foreground">
            Although I haven't worked in the industry yet, I've been on an active learning journey to develop my skills as a frontend developer.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 transform md:-translate-x-1/2"></div>

          {experiences.map((experience, index) => (
            <div
              key={experience.id}
              className={cn(
                "relative mb-12 opacity-0 transform translate-y-10",
                isVisible && "opacity-100 translate-y-0"
              )}
              style={{
                transitionDelay: `${isVisible ? index * 200 : 0}ms`,
                transitionDuration: "800ms",
              }}
            >
              <div
                className={cn(
                  "flex flex-col md:flex-row items-start",
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                )}
              >
                {/* Timeline icon */}
                <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-primary/10 border-4 border-background flex items-center justify-center transform -translate-x-1/2 z-10">
                  {getIconForExperience(index)}
                </div>

                {/* Content */}
                <div
                  className={cn(
                    "ml-12 md:ml-0 md:w-1/2",
                    index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                  )}
                >
                  <div className="bg-background p-6 rounded-xl shadow-sm border border-border/50 hover:border-primary/30 transition-colors duration-300">
                    <span className="inline-block py-1 px-2 text-xs font-medium bg-primary/10 text-primary rounded-full mb-2">
                      {experience.duration}
                    </span>
                    <h3 className="text-xl font-semibold mb-3">{experience.role}</h3>
                    <p className="text-muted-foreground mb-4">{experience.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {experience.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs font-medium bg-muted rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            I'm excited to apply my skills in a professional environment and continue growing as a developer.
          </p>
          <ConnectButton text="Let's Connect" onClick={() => {
            const contactSection = document.getElementById('contact');
            contactSection?.scrollIntoView({ behavior: 'smooth' });
          }} />
        </div>
      </div>
    </section>
  );
}
