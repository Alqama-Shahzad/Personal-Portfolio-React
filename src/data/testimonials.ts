export interface Testimonial {
  id: string;
  name: string;
  company: string;
  location: string;
  role: string;
  content: string;
  rating: number;
  avatar?: string;
  projectType: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Ahmed Hassan",
    company: "TechStart Karachi",
    location: "Karachi, Pakistan 🇵🇰",
    role: "CEO & Founder",
    content: "Alqama delivered an exceptional e-commerce platform that exceeded our expectations. The attention to detail and modern design helped increase our online sales by 150%. His understanding of the Pakistani market was invaluable.",
    rating: 5,
    projectType: "E-commerce Platform"
  },
  {
    id: "2",
    name: "Fatima Sheikh",
    company: "Digital Solutions Lahore",
    location: "Lahore, Pakistan 🇵🇰",
    role: "Marketing Director",
    content: "Working with Alqama was a game-changer for our digital presence. He created a stunning business website that perfectly represents our brand. The responsive design works flawlessly across all devices.",
    rating: 5,
    projectType: "Business Website"
  },
  {
    id: "3",
    name: "Muhammad Ali Khan",
    company: "StartupHub Islamabad",
    location: "Islamabad, Pakistan 🇵🇰",
    role: "Co-Founder",
    content: "Alqama's expertise in React and modern web technologies is outstanding. He built our startup's web application with clean code and excellent user experience. Highly recommended for any web development project.",
    rating: 5,
    projectType: "Web Application"
  },
  {
    id: "4",
    name: "Ayesha Malik",
    company: "Fashion Forward",
    location: "Rawalpindi, Pakistan 🇵🇰",
    role: "Business Owner",
    content: "The online store Alqama developed for my fashion business has been incredible. The modern design and smooth checkout process have significantly improved customer satisfaction and sales conversion.",
    rating: 5,
    projectType: "Online Store"
  },
  {
    id: "5",
    name: "Hassan Raza",
    company: "Tech Innovators",
    location: "Faisalabad, Pakistan 🇵🇰",
    role: "Technical Lead",
    content: "Alqama's technical skills and professionalism are top-notch. He delivered our company portfolio website on time with excellent performance optimization. The animations and interactions are smooth and engaging.",
    rating: 5,
    projectType: "Portfolio Website"
  },
  {
    id: "6",
    name: "Zara Ahmed",
    company: "Local Eats Karachi",
    location: "Karachi, Pakistan 🇵🇰",
    role: "Restaurant Owner",
    content: "Our restaurant's online ordering system built by Alqama has revolutionized our business. The user-friendly interface and mobile optimization have helped us reach more customers during challenging times.",
    rating: 5,
    projectType: "Restaurant Website"
  }
];