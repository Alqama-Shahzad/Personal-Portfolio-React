export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
  category: 'frontend' | 'wordpress';
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
    category: 'frontend',
  },
  {
    id: 2,
    title: "EzyShare File Sharing",
    description: "A file sharing application that allows users to easily upload, share, and manage documents and media files.",
    image: "/Assets/ezyshare-project.png",
    tags: ["React", "Node.js", "Express", "Supabase"],
    demoUrl: "https://ezyshare.netlify.app/",
    githubUrl: "https://github.com/Alqama-Shahzad/ezy-share-quick-transfer",
    category: 'frontend',
  },
  {
    id: 3,
    title: "3D Gaming Website",
    description: "Modern UI/UX 3D Animated Gaming Website built with React, TypeScript, GSAP animations, and Tailwind CSS.",
    image: "/Assets/3d-gaming-project.png",
    tags: ["GSAP", "React", "TypeScript", "3DAnimation"],
    demoUrl: "https://3d-nova-gaming-website.netlify.app/",
    githubUrl: "https://github.com/Alqama-Shahzad/nova-game-website",
    category: 'frontend',
  },
  {
    id: 4,
    title: "Resume Builder",
    description: "A professional resume creation tool that helps users build and export polished resumes in multiple formats.",
    image: "/Assets/resume-project.png",
    tags: ["React", "PDF Generation", "Responsive Design", "LocalStorage"],
    demoUrl: "https://resume-builder-x.netlify.app/",
    githubUrl: "https://github.com/Alqama-Shahzad/resume-builder",
    category: 'frontend',
  },
  {
    id: 5,
    title: "E-commerce Platform",
    description: "A feature-rich e-commerce platform with modern design and smooth user experience. Built with advanced frontend technologies and optimized for performance.",
    image: "/Assets/wordpress-eccommerce-project.jpg",
    tags: ["React", "E-commerce", "Responsive Design", "Performance", "Modern UI"],
    demoUrl: "https://gb.canali.com/",
    githubUrl: "https://gb.canali.com/",
    category: 'frontend',
  },
  {
    id: 6,
    title: "NotebookTherapy",
    description: "A global WooCommerce stationery store featuring Japanese & Korean designs. Built for seamless shopping, smooth checkout, and modern brand experience with international shipping capabilities.",
    image: "/Assets/wordpress-notebooktherapy-project.png",
    tags: ["WordPress", "WooCommerce", "PHP", "International Shipping", "Custom Design"],
    demoUrl: "https://notebooktherapy.com/",
    githubUrl: "https://notebooktherapy.com/",
    category: 'wordpress',
  },
  {
    id: 7,
    title: "Bailey Company",
    description: "Corporate website for an intralogistics leader, highlighting equipment, automation, and services. Designed to drive trust, leads, and client engagement with professional presentation.",
    image: "/Assets/wordpress-baileycompany-project.png",
    tags: ["WordPress", "Corporate Design", "PHP", "SEO Optimization", "Lead Generation"],
    demoUrl: "https://baileycompany.com/",
    githubUrl: "https://baileycompany.com/",
    category: 'wordpress',
  },
  {
    id: 8,
    title: "SADOS",
    description: "Modern IT services platform offering 24/7 support, cloud solutions, and enterprise tools. Built with clarity, scalability, and conversion optimization in mind.",
    image: "/Assets/wordpress-sados-project.png",
    tags: ["WordPress", "Cloud Solutions", "PHP", "Enterprise Tools", "24/7 Support"],
    demoUrl: "https://sados.com/",
    githubUrl: "https://sados.com/",
    category: 'wordpress',
  },
  {
    id: 9,
    title: "Wallz Decors",
    description: "E-commerce site for handcrafted wall art and Islamic décor. Features product customization, collections management, and international shipping with seamless user experience.",
    image: "/Assets/wordpress-wallzdecors-project.png",
    tags: ["WordPress", "WooCommerce", "Product Customization", "Art Gallery", "Islamic Design"],
    demoUrl: "https://wallzdecors.com/",
    githubUrl: "https://wallzdecors.com/",
    category: 'wordpress',
  },
  {
    id: 10,
    title: "Amarex Commerce",
    description: "Service-driven site focused on e-commerce automation and marketplace growth. Showcases Amazon solutions, web services, and client success stories with conversion optimization.",
    image: "/Assets/wordpress-amarexcommerce-project.png",
    tags: ["WordPress", "E-commerce Automation", "Amazon Solutions", "Marketplace Growth", "Client Portal"],
    demoUrl: "https://amarexcommerce.com/",
    githubUrl: "https://amarexcommerce.com/",
    category: 'wordpress',
  }
];
