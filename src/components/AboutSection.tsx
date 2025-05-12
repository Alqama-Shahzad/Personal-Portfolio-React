import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Rocket, Sparkle, Code } from "lucide-react";
import profileImage from '../assets/picofme1.png';

export function AboutSection() {
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
        threshold: 0.2,
      }
    );

    const section = document.getElementById("about");
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
    <section id="about" className="relative py-20 md:py-32 overflow-hidden">
      <div className="container max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className={cn(
            "order-2 md:order-1 opacity-0 transform translate-y-10 transition-all duration-700 ease-out",
            isVisible && "opacity-100 translate-y-0"
          )}>
            <span className="inline-block py-1 px-3 text-sm bg-primary/10 text-primary rounded-full mb-5">
              About Me
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Beginning My Journey in Web Development
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Hello! I'm Alqama, a passionate frontend developer with 1+ year of experience building web applications. 
                My journey in web development began when I built my first website while learning to code, and I've been hooked ever since.
              </p>
              <p>
                I'm currently focusing on building responsive, accessible web applications using React and its ecosystem. 
                I'm passionate about clean code, user experience, and continuously expanding my knowledge of web technologies.
              </p>
              <p>
                When I'm not coding, I enjoy reading tech blogs, participating in coding challenges, and contributing to open-source projects. 
                I'm eager to apply my skills in a professional setting and grow as a developer.
              </p>
            </div>
            
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-primary/10 text-primary">
                  <Rocket size={20} />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Self-Taught Developer</h3>
                  <p className="text-sm text-muted-foreground">
                    Learning through online courses, documentation, and building projects
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-primary/10 text-primary">
                  <Sparkle size={20} />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Active Learner</h3>
                  <p className="text-sm text-muted-foreground">
                    Constantly improving through hands-on projects and learning new technologies
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-primary/10 text-primary">
                  <Code size={20} />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Project-Based Experience</h3>
                  <p className="text-sm text-muted-foreground">
                    Over 2 year of building personal and freelance projects
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className={cn(
            "order-1 md:order-2 opacity-0 transform translate-y-10 transition-all duration-700 delay-300 ease-out",
            isVisible && "opacity-100 translate-y-0"
          )}>
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-2xl">
                <img 
                  src={profileImage}
                  alt="Alqama - Frontend Developer" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 md:w-32 md:h-32 bg-primary/10 rounded-lg -z-10"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 md:w-44 md:h-44 border-2 border-primary/20 rounded-lg -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
