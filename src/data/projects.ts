
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Dashboard",
    description: "A comprehensive dashboard for e-commerce businesses with analytics, inventory management, and order processing features.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["React", "Redux", "Tailwind CSS", "Chart.js"],
    demoUrl: "https://example.com/demo1",
    githubUrl: "https://github.com/username/project1",
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A productivity application for managing tasks, projects, and deadlines with collaborative features.",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["React", "TypeScript", "Firebase", "CSS Modules"],
    demoUrl: "https://example.com/demo2",
    githubUrl: "https://github.com/username/project2",
  },
  {
    id: 3,
    title: "Weather Forecast Application",
    description: "A weather application with 7-day forecasts, location-based services, and interactive maps.",
    image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["React", "Context API", "OpenWeather API", "Styled Components"],
    demoUrl: "https://example.com/demo3",
    githubUrl: "https://github.com/username/project3",
  },
  {
    id: 4,
    title: "Social Media Platform",
    description: "A full-featured social media platform with real-time messaging, post sharing, and user authentication.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["React", "Node.js", "Socket.io", "MongoDB"],
    demoUrl: "https://example.com/demo4",
    githubUrl: "https://github.com/username/project4",
  },
  {
    id: 5,
    title: "E-Learning Platform",
    description: "An educational platform for online courses, featuring video lectures, quizzes, and progress tracking.",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["React", "Express", "PostgreSQL", "AWS"],
    demoUrl: "https://example.com/demo5",
    githubUrl: "https://github.com/username/project5",
  },
  {
    id: 6,
    title: "Fitness Tracking Application",
    description: "A health and fitness application for tracking workouts, nutrition, and personal goals.",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["React Native", "Redux", "Expo", "HealthKit API"],
    demoUrl: "https://example.com/demo6",
    githubUrl: "https://github.com/username/project6",
  },
];
