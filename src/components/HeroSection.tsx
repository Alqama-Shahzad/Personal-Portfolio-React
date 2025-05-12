import { ArrowDown, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { ParticlesBackground } from "./ParticlesBackground";
import { TypeAnimation } from 'react-type-animation';
import AnimatedButton from "./AnimatedButton";
import ElegantButton from "./ElegantButton";
import { SocialLinks } from './SocialLinks';
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const typeAnimationSequence = [
  'I build things for the web',
  2000,
  'I create modern UIs',
  2000,
  'I develop web apps',
  2000,
  'I turn ideas into code',
  2000,
];

const codeSymbols = {
  left: ["{}", "</>", "[]", "//"],
  right: ["()", "=>", "&&", "||"],
} as const;

export function HeroSection() {
  const { isVisible, ref } = useIntersectionObserver({ threshold: 0.1 });

  const handleScrollToSection = useCallback((sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <section 
      id="home" 
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      aria-label="Hero section"
    >
      {/* Interactive Particles Background */}
      <ParticlesBackground />

      {/* Modern gradient backgrounds */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        {/* Main gradient orbs */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-primary/20 to-accent/20 dark:from-indigo-500/20 dark:to-cyan-500/20 rounded-full filter blur-3xl animate-pulse-subtle opacity-50"></div>
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 dark:from-fuchsia-500/20 dark:to-violet-500/20 rounded-full filter blur-3xl animate-float opacity-40"></div>
        
        {/* Animated dots grid */}
        <div className="absolute bottom-1/3 right-1/4 grid grid-cols-3 gap-2">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-primary/30 dark:bg-white/30 rounded-full animate-pulse-subtle"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
        
        {/* Modern code elements */}
        <div className="absolute top-32 left-10 text-sm font-mono hidden md:block space-y-2">
          {codeSymbols.left.map((symbol, i) => (
            <div
              key={i}
              className="text-primary/20 dark:text-white/20 animate-fade-right font-light tracking-wider"
              style={{ animationDelay: `${i * 0.3}s` }}
            >
              {symbol}
            </div>
          ))}
        </div>
        <div className="absolute bottom-32 right-10 text-sm font-mono hidden md:block space-y-2">
          {codeSymbols.right.map((symbol, i) => (
            <div
              key={i}
              className="text-accent/20 dark:text-cyan-400/20 animate-fade-left font-light tracking-wider"
              style={{ animationDelay: `${i * 0.3}s` }}
            >
              {symbol}
            </div>
          ))}
        </div>
      </div>

      <div className="container max-w-screen-xl mx-auto px-4 md:px-8 py-12 md:py-20">
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto">
          <div className={cn(
            "mb-4 opacity-0 transition-all duration-700 delay-100",
            isVisible && "opacity-100 translate-y-0"
          )}>
            <span 
              className="inline-block py-2 px-4 text-sm font-medium bg-background/50 dark:bg-white/5 text-primary dark:text-white/70 rounded-full mb-5 backdrop-blur-sm border border-transparent relative before:absolute before:inset-0 before:p-[1px] before:bg-gradient-to-r before:from-primary/40 before:via-accent/40 before:to-primary/40 before:rounded-full before:-z-10 before:animate-gradient-xy hover:scale-105 transition-transform duration-300"
              role="presentation"
            >
              Frontend Developer
            </span>
          </div>
          
          <h1 className={cn(
            "text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 opacity-0 transition-all duration-700 delay-200",
            isVisible && "opacity-100 translate-y-0"
          )}>
            <span className="block">Hi, I'm <span className="bg-gradient-to-r from-foreground to-foreground/70 dark:from-white dark:to-white/50 bg-clip-text text-transparent">Alqama</span></span>
            <span className="block mt-2 min-h-[1.2em]">
              <TypeAnimation
                sequence={typeAnimationSequence}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="inline-block min-w-[4em]"
                style={{ display: 'inline-block', textAlign: 'center', width: '100%' }}
              />
            </span>
          </h1>
          
          <p className={cn(
            "text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 opacity-0 transition-all duration-700 delay-300",
            isVisible && "opacity-100 translate-y-0"
          )}>
            I'm a passionate frontend developer specializing in creating exceptional digital experiences. 
            I focus on building accessible, human-centered products with modern technologies.
          </p>
          
          <div className={cn(
            "flex flex-wrap gap-4 justify-center mb-12 opacity-0 transition-all duration-700 delay-400",
            isVisible && "opacity-100 translate-y-0"
          )}>
            <AnimatedButton 
              text="VIEW MY WORK" 
              onClick={() => handleScrollToSection('projects')}
              aria-label="View my projects"
            />
            <ElegantButton 
              text="CONTACT ME" 
              onClick={() => handleScrollToSection('contact')}
              aria-label="Contact me"
            />
          </div>
          
          <div className={cn(
            "mb-12 opacity-0 transition-all duration-700 delay-500",
            isVisible && "opacity-100 translate-y-0"
          )}>
            <SocialLinks />
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
        aria-hidden="true"
      >
        <div className={cn(
          "flex flex-col items-center opacity-0 transition-all duration-700 delay-700",
          isVisible && "opacity-100"
        )}>
          <span className="text-xs font-medium text-muted-foreground mb-2">Scroll Down</span>
          <ArrowDown className="h-4 w-4 text-muted-foreground animate-bounce" />
        </div>
      </div>
    </section>
  );
}
