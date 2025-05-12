export interface Experience {
  id: number;
  role: string;
  company: string;
  duration: string;
  description: string;
  technologies: string[];
}

export const experiences: Experience[] = [
  {
    id: 1,
    role: "Frontend Foundations",
    company: "Self-Learning Path",
    duration: "Jan 2023 - Mar 2023",
    description: "Mastered HTML5, CSS3, and JavaScript fundamentals. Built responsive layouts and interactive user interfaces using modern web technologies.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
  },
  {
    id: 2,
    role: "React Development",
    company: "Self-Learning Path",
    duration: "Apr 2023 - Jun 2023",
    description: "Specialized in React.js development, learning component architecture, hooks, state management, and modern development practices.",
    technologies: ["React.js", "Hooks", "State Management", "Component Design"],
  },
  {
    id: 3,
    role: "Advanced Frontend Skills",
    company: "Self-Learning Path",
    duration: "Jul 2023 - Sep 2023",
    description: "Expanded expertise with TypeScript, Next.js, and Tailwind CSS. Focused on building performant and scalable web applications.",
    technologies: ["TypeScript", "Next.js", "Tailwind CSS", "Web Performance"],
  },
  {
    id: 4,
    role: "Full Stack Development",
    company: "Self-Learning Path",
    duration: "Oct 2023 - Present",
    description: "Building full-stack applications with modern technologies. Working on personal projects and continuously learning new development tools.",
    technologies: ["Full Stack", "API Integration", "Git", "Modern Tooling"],
  },
];
