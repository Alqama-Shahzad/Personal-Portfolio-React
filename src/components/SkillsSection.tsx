import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { skills as defaultSkills, type Skill } from "@/data/skills";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { Code } from "lucide-react";

export function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [skills, setSkills] = useState(defaultSkills);
  
  // Load skills from localStorage if available
  useEffect(() => {
    const savedSkills = localStorage.getItem('skills');
    if (savedSkills) {
      try {
        // Parse the saved skills
        const parsedSkills = JSON.parse(savedSkills);
        
        // Create a map of original skills by name for icon lookup
        const skillIconMap = new Map(
          defaultSkills.map(skill => [skill.name, skill.icon])
        );
        
        // Check if we have any new default skills that aren't in saved skills
        const savedSkillNames = new Set(parsedSkills.map((skill: Skill) => skill.name));
        const newDefaultSkills = defaultSkills.filter(skill => !savedSkillNames.has(skill.name));
        
        // Merge saved skills with their original icons when available
        const hydratedSkills = parsedSkills.map((skill: Skill) => {
          // Try to find the original icon for this skill
          const originalIcon = skillIconMap.get(skill.name);
          
          return {
            ...skill,
            // Use original icon if found, otherwise fall back to Code icon
            icon: originalIcon || Code
          };
        });
        
        // Combine saved skills with any new default skills
        setSkills([...hydratedSkills, ...newDefaultSkills]);
      } catch (error) {
        console.error("Error parsing saved skills:", error);
      }
    }
  }, []);
  
  const categories = [...new Set(skills.map(skill => skill.category))];
  
  const filteredSkills = selectedCategory 
    ? skills.filter(skill => skill.category === selectedCategory)
    : skills;

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

    const section = document.getElementById("skills");
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
      id="skills"
      className="relative py-20 md:py-32 overflow-hidden"
    >      
      <div className="container max-w-6xl mx-auto px-4 md:px-8">
        <div className={cn(
          "text-center mb-16 opacity-0 transform translate-y-8 transition-all duration-700 ease-out",
          isVisible && "opacity-100 translate-y-0"
        )}>
          <span className="inline-block py-1 px-3 text-sm bg-primary/10 text-primary rounded-full mb-5">
            Skills & Technologies
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My Technical Skills
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I've worked with to create modern web applications
          </p>
        </div>

        {/* Category filters */}
        <div className={cn(
          "flex flex-wrap justify-center gap-3 mb-16 opacity-0 transform translate-y-8 transition-all duration-700 delay-200 ease-out",
          isVisible && "opacity-100 translate-y-0"
        )}>
          <Button 
            variant={selectedCategory === null ? "default" : "ghost"} 
            size="sm"
            onClick={() => setSelectedCategory(null)}
            className="text-sm min-w-[80px]"
          >
            All
          </Button>
          {categories.map(category => (
            <Button 
              key={category} 
              variant={selectedCategory === category ? "default" : "ghost"} 
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="text-sm capitalize min-w-[80px]"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {filteredSkills.map((skill, index) => {
            // Calculate row index based on grid columns
            const rowIndex = Math.floor(index / 3); // Using 3 columns as base
            const Icon = skill.icon;
            
            return (
              <div
                key={skill.name}
                className={cn(
                  "group relative bg-background/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 transition-all duration-200",
                  "hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5",
                  isVisible && "opacity-100 translate-y-0"
                )}
                style={{
                  transitionDelay: `${isVisible ? 100 + rowIndex * 100 : 0}ms`,
                  transitionDuration: "400ms",
                  opacity: isVisible ? 1 : 0,
                  transform: `translateY(${isVisible ? '0' : '20px'})`,
                  transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)'
                }}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-200">
                      <Icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-200" />
                    </div>
                    <div>
                      <h3 className="text-base font-medium group-hover:text-primary transition-colors duration-200">
                        {skill.name}
                      </h3>
                      <p className="text-xs text-muted-foreground capitalize mt-1">
                        {skill.category}
                      </p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="relative pt-1">
                    <div className="h-1.5 w-full bg-border/50 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary/60 to-primary transition-all duration-300 ease-out rounded-full origin-left scale-x-0 group-hover:scale-x-100"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <span className="absolute -top-1 right-0 text-[11px] font-medium text-muted-foreground group-hover:text-primary transition-colors duration-200">
                      {skill.level}%
                    </span>
                  </div>
                </div>

                {/* Decorative corner accent */}
                <div 
                  className="absolute -bottom-0.5 -right-0.5 w-10 h-10 bg-primary/5 rounded-br-lg 
                    transition-all duration-200 opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
