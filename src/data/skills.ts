import {
  Code,
  FileCode,
  Blocks,
  BrainCircuit,
  Paintbrush,
  GitBranch,
  BoxIcon,
  LayoutGrid,
  PenTool,
  Globe,
  Server,
  Database,
  type LucideIcon
} from 'lucide-react';

export interface Skill {
  id?: number;
  name: string;
  category: string;
  level: number;
  icon: LucideIcon;
}

export const skills: Skill[] = [
  // Frontend Core
  {
    name: "HTML & CSS",
    category: "frontend",
    level: 90,
    icon: FileCode
  },
  {
    name: "JavaScript",
    category: "frontend",
    level: 85,
    icon: BrainCircuit
  },
  {
    name: "React",
    category: "frontend",
    level: 80,
    icon: Code
  },
  {
    name: "TypeScript",
    category: "frontend",
    level: 60,
    icon: Blocks
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    level: 85,
    icon: Paintbrush
  },
  
  // Backend
  {
    name: "Node.js",
    category: "backend",
    level: 75,
    icon: Server
  },
  {
    name: "MongoDB",
    category: "backend",
    level: 70,
    icon: Database
  },
  
  // Development Tools
  {
    name: "Git & GitHub",
    category: "tools",
    level: 80,
    icon: GitBranch
  },
  {
    name: "Next.js",
    category: "tools",
    level: 50,
    icon: BoxIcon
  },
  
  // Design
  {
    name: "Responsive Design",
    category: "design",
    level: 85,
    icon: LayoutGrid
  },
  {
    name: "UI/UX Design",
    category: "design",
    level: 65,
    icon: PenTool
  },
  
  // CMS
  {
    name: "WordPress",
    category: "cms",
    level: 80,
    icon: Globe
  }
];
