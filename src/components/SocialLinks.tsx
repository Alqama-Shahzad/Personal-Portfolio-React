import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SocialLink {
  name: string;
  href: string;
  icon: typeof Github;
  color: string;
}

const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    href: 'https://github.com/Alqama-Shahzad',
    icon: Github,
    color: 'hover:text-[#333] dark:hover:text-white',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/alqama-shahzad/',
    icon: Linkedin,
    color: 'hover:text-[#0077B5]',
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com',
    icon: Twitter,
    color: 'hover:text-[#1DA1F2]',
  },
  {
    name: 'Email',
    href: 'mailto:alqamarex@gmail.com',
    icon: Mail,
    color: 'hover:text-primary',
  },
];

export function SocialLinks({ className }: { className?: string }) {
  return (
    <TooltipProvider>
      <div className={cn("flex gap-4", className)}>
        {socialLinks.map((link) => (
          <Tooltip key={link.name}>
            <TooltipTrigger asChild>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group relative p-2 rounded-lg transition-all duration-300",
                  "hover:bg-muted/50 active:scale-95",
                  "focus:outline-none focus:ring-2 focus:ring-primary/50",
                )}
                aria-label={link.name}
              >
                <link.icon
                  size={20}
                  className={cn(
                    "transition-all duration-300",
                    "text-muted-foreground group-hover:scale-110",
                    link.color
                  )}
                />
                <span className="sr-only">{link.name}</span>
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>{link.name}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
} 