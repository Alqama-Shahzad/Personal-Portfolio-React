import { useState, useEffect, useCallback } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ResumeButton from "./ResumeButton";
import { Logo } from "./Logo";
import { useMediaQuery } from "@/hooks/use-media-query";

interface NavLink {
  title: string;
  href: string;
}

const navLinks: NavLink[] = [
  { title: "Home", href: "#home" },
  { title: "About", href: "#about" },
  { title: "Skills", href: "#skills" },
  { title: "Projects", href: "#projects" },
  { title: "Experience", href: "#experience" },
  { title: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Memoize scroll handler for better performance
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);

    const sections = navLinks.map(link => link.href.substring(1));
    const currentSection = sections.find(section => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      }
      return false;
    });

    if (currentSection) {
      setActiveSection(currentSection);
    }
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const debouncedScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 100);
    };

    window.addEventListener("scroll", debouncedScroll);
    return () => {
      window.removeEventListener("scroll", debouncedScroll);
      clearTimeout(timeoutId);
    };
  }, [handleScroll]);

  useEffect(() => {
    if (isDesktop && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isDesktop, isMenuOpen]);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled ? "py-4" : "py-6"
      )}
      role="banner"
    >
      {/* Skip to main content link - hidden by default, visible on focus */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none"
      >
        Skip to main content
      </a>

      <div className={cn(
        "container max-w-screen-xl mx-auto px-4",
        "relative"
      )}>
        {/* Navbar Background with Blur Effect */}
        <div 
          className={cn(
            "absolute inset-0 transition-all duration-500",
            isScrolled 
              ? "bg-background/70 backdrop-blur-xl shadow-lg shadow-black/[0.03] rounded-2xl border border-border/50" 
              : "bg-transparent"
          )}
          aria-hidden="true"
        />

        {/* Navbar Content */}
        <div className="relative flex items-center justify-between">
          <a 
            href="#home" 
            className="relative overflow-hidden group py-2"
            aria-label="Go to home section"
          >
            <Logo />
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-primary/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" aria-hidden="true"></span>
          </a>

          {/* Desktop Navigation */}
          <nav 
            className="hidden md:flex items-center gap-8"
            role="navigation"
            aria-label="Main navigation"
          >
            <ul className="flex items-center gap-1" role="menubar">
              {navLinks.map((link) => (
                <li key={link.href} role="none">
                  <a
                    href={link.href}
                    onClick={handleLinkClick}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative hover:text-primary",
                      activeSection === link.href.substring(1)
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                    role="menuitem"
                    aria-current={activeSection === link.href.substring(1) ? "page" : undefined}
                  >
                    {link.title}
                    {activeSection === link.href.substring(1) && (
                      <span className="absolute inset-0 bg-primary/10 rounded-lg" aria-hidden="true"></span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
            
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <ResumeButton text="Resume" href="/Assets/MyResume-Frontend.pdf" />
            </div>
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              className="hover:bg-primary/10"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 top-[65px] bg-background/80 backdrop-blur-xl z-40 transition-all duration-500 ease-in-out border-t border-border/50 md:hidden",
          isMenuOpen 
            ? "opacity-100 translate-x-0" 
            : "opacity-0 translate-x-full pointer-events-none"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <nav 
          className="flex flex-col h-full"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <ul 
            className="flex flex-col gap-1 p-4"
            role="menu"
          >
            {navLinks.map((link) => (
              <li key={link.href} role="none">
                <a
                  href={link.href}
                  className={cn(
                    "block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300",
                    activeSection === link.href.substring(1)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                  )}
                  onClick={handleLinkClick}
                  role="menuitem"
                  aria-current={activeSection === link.href.substring(1) ? "page" : undefined}
                >
                  {link.title}
                </a>
              </li>
            ))}
            <li className="p-4 mt-4 border-t border-border/50" role="none">
              <ResumeButton text="Resume" href="/Assets/MyResume-Frontend.pdf" />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
