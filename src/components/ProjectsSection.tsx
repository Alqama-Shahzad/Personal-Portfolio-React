import { useState, useEffect, useRef, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Project, projects as defaultProjects } from "@/data/projects";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TabNavigation, TabItem } from "@/components/TabNavigation";
import { EmptyState } from "@/components/EmptyState";

// Custom hook for intersection observer
const useIntersectionObserver = (options = {}) => {
  const [entries, setEntries] = useState<{ [key: string]: boolean }>({});
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementsRef = useRef<{ [key: string]: HTMLElement }>({});

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (observedEntries) => {
        observedEntries.forEach((entry) => {
          const id = entry.target.getAttribute('data-id');
          if (id) {
            setEntries((prev) => ({
              ...prev,
              [id]: entry.isIntersecting,
            }));
            if (entry.isIntersecting) {
              observerRef.current?.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px', ...options }
    );

    Object.entries(elementsRef.current).forEach(([id, element]) => {
      if (element) observerRef.current?.observe(element);
    });

    return () => observerRef.current?.disconnect();
  }, [options]);

  const observe = (id: string, element: HTMLElement | null) => {
    if (element) {
      elementsRef.current[id] = element;
      element.setAttribute('data-id', id);
      observerRef.current?.observe(element);
    }
  };

  return { entries, observe };
};

export function ProjectsSection() {
  const [imagesLoaded, setImagesLoaded] = useState<{ [key: string]: boolean }>({});
  const { entries: visibleCards, observe } = useIntersectionObserver();
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [activeTab, setActiveTab] = useState<string>('frontend');

  useEffect(() => {
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      localStorage.setItem('projects', JSON.stringify(defaultProjects));
    }
  }, []);

  // Filter projects based on active tab
  const filteredProjects = useMemo(() => {
    return projects.filter(project => project.category === activeTab);
  }, [projects, activeTab]);

  // Create tabs with project counts
  const tabs: TabItem[] = useMemo(() => {
    const frontendCount = projects.filter(p => p.category === 'frontend').length;
    const wordpressCount = projects.filter(p => p.category === 'wordpress').length;
    
    return [
      {
        id: 'frontend',
        label: 'Frontend Projects',
        count: frontendCount
      },
      {
        id: 'wordpress',
        label: 'WordPress Projects',
        count: wordpressCount
      }
    ];
  }, [projects]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLAnchorElement>, url: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.open(url, '_blank', 'noopener noreferrer');
    }
  };

  return (
    <section 
      id="projects" 
      className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-background to-background/50"
      aria-label="Projects Section"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" aria-hidden="true" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-muted/50 to-transparent" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-muted/50 to-transparent" aria-hidden="true" />
      
      <div className="container max-w-screen-xl mx-auto px-4 md:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center justify-center py-2 px-4 text-sm bg-primary/10 text-primary rounded-full mb-5 backdrop-blur-sm border border-primary/20 font-medium">
            My Work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
            Featured Projects
          </h2>
          <p className="text-muted-foreground text-lg">
            Here are some of the projects I've worked on. Each project represents a unique challenge and solution in web development.
          </p>
        </div>

        {/* Tab Navigation */}
        <TabNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          className="mb-12"
        />

        {/* Projects Grid or Empty State */}
        {filteredProjects.length > 0 ? (
          <div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in-0 duration-500"
            role="list"
            aria-label={`${activeTab} projects grid`}
            key={activeTab} // Force re-render for animation
          >
            {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => observe(project.id.toString(), el)}
              className={cn(
                "group relative overflow-hidden rounded-xl backdrop-blur-sm bg-background/50 shadow-lg transition-all duration-300 hover:shadow-xl opacity-0 transform translate-y-10 border border-border/50",
                "hover:border-primary/50 hover:-translate-y-1 focus-within:border-primary/50 focus-within:-translate-y-1",
                visibleCards[project.id] && "opacity-100 translate-y-0"
              )}
              style={{
                transitionDelay: `${visibleCards[project.id] ? index * 50 : 0}ms`,
                transitionDuration: "300ms",
              }}
              role="listitem"
              aria-label={`Project: ${project.title}`}
              tabIndex={0}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/10 group-hover:from-primary/5 group-hover:to-primary/10 transition-colors duration-200" aria-hidden="true" />
              
              <div className="aspect-video overflow-hidden relative">
                {!imagesLoaded[project.id] && (
                  <Skeleton className="absolute inset-0 bg-muted/20" aria-label="Loading project image" />
                )}
                <LazyLoadImage
                  src={project.image}
                  alt={`Screenshot of ${project.title} project`}
                  effect="blur"
                  className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105 group-hover:rotate-1"
                  onLoad={() => setImagesLoaded(prev => ({ ...prev, [project.id]: true }))}
                  wrapperClassName="w-full h-full"
                />
              </div>
              
              <div className="p-8 relative">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-6 line-clamp-3">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6" aria-label="Technologies used">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-4">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          asChild
                          variant="default"
                          size="sm"
                          className="transition-transform duration-200 hover:scale-105"
                        >
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2"
                            aria-label={`View live demo of ${project.title}`}
                            onKeyDown={(e) => handleKeyPress(e, project.demoUrl)}
                          >
                            <ExternalLink size={16} aria-hidden="true" />
                            Live Demo
                          </a>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View live demo</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="transition-transform duration-200 hover:scale-105"
                        >
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2"
                            aria-label={`View source code for ${project.title} on GitHub`}
                            onKeyDown={(e) => handleKeyPress(e, project.githubUrl)}
                          >
                            <Github size={16} aria-hidden="true" />
                            Code
                          </a>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View source code on GitHub</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>
            ))}
          </div>
        ) : (
          <div 
            className="animate-in fade-in-0 duration-500"
            key={`empty-${activeTab}`} // Force re-render for animation
          >
            <EmptyState 
              category={activeTab} 
              className="mx-auto max-w-2xl"
            />
          </div>
        )}
      </div>
    </section>
  );
}
