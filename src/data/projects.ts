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
    title: "React E-Commerce",
    description: "A modern, responsive e-commerce platform built with React, TypeScript, and Redux Toolkit featuring product filtering, cart management, and smooth animations",
    image: "/Assets/react-ecommerce-project.png",
    tags: ["React", "Redux", "TypeScript", "SCSS", "FramerMotion"],
    demoUrl: "https://flowycart-ecommerce.netlify.app/",
    githubUrl: "https://github.com/Alqama-Shahzad/FlowyCart-ecommerce",
  },
  {
    id: 2,
    title: "EzyShare File Sharing",
    description: "A file sharing application that allows users to easily upload, share, and manage documents and media files.",
    image: "/Assets/ezyshare-project.png",
    tags: ["React", "Node.js", "Express", "Supabase"],
    demoUrl: "https://ezyshare.netlify.app/",
    githubUrl: "https://github.com/Alqama-Shahzad/ezy-share-quick-transfer",
  },
  {
    id: 3,
    title: "3D Gaming Website",
    description: "Modern UI/UX 3D Animated Gaming Website built with React, TypeScript, GSAP animations, and Tailwind CSS.",
    image: "/Assets/3d-gaming-project.png",
    tags: ["GSAP", "React", "TypeScript", "3DAnimation"],
    demoUrl: "https://3d-nova-gaming-website.netlify.app/",
    githubUrl: "https://github.com/Alqama-Shahzad/nova-game-website",
  },
  {
    id: 4,
    title: "Resume Builder",
    description: "A professional resume creation tool that helps users build and export polished resumes in multiple formats.",
    image: "/Assets/resume-project.png",
    tags: ["React", "PDF Generation", "Responsive Design", "LocalStorage"],
    demoUrl: "https://resume-builder-x.netlify.app/",
    githubUrl: "https://github.com/Alqama-Shahzad/resume-builder",
  },
  {
    id: 5,
    title: "WordPress E-commerce",
    description: "A feature-rich e-commerce website built with WordPress and WooCommerce with custom theme development and responsive design.",
    image: "/Assets/wordpress-eccommerce-project.jpg",
    tags: ["WordPress", "WooCommerce", "PHP", "CSS", "jQuery"],
    demoUrl: "https://gb.canali.com/",
    githubUrl: "https://gb.canali.com/",
  }
];
