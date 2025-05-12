
import { Github, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 border-t border-border/50">
      <div className="container max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-muted-foreground">
              &copy; {new Date().getFullYear()} Alqama. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <span>Made with</span>
            <Heart size={14} className="text-red-500 animate-pulse" />
            <span>using React</span>
          </div>
          
          <div>
            <a
              href="https://github.com/johndoe/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github size={16} />
              <span>View Source</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
