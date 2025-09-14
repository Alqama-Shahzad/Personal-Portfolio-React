import { cn } from "@/lib/utils";
import { FolderOpen, Code2 } from "lucide-react";

interface EmptyStateProps {
  category: string;
  className?: string;
}

export function EmptyState({ category, className }: EmptyStateProps) {
  const getEmptyStateContent = (category: string) => {
    switch (category.toLowerCase()) {
      case 'frontend':
        return {
          icon: Code2,
          title: "No Frontend Projects Yet",
          description: "Frontend projects will appear here when they're added to the portfolio."
        };
      case 'wordpress':
        return {
          icon: FolderOpen,
          title: "No WordPress Projects Yet",
          description: "WordPress projects will appear here when they're added to the portfolio."
        };
      default:
        return {
          icon: FolderOpen,
          title: "No Projects Found",
          description: "Projects in this category will appear here when they're added."
        };
    }
  };

  const { icon: Icon, title, description } = getEmptyStateContent(category);

  return (
    <div className={cn(
      "flex flex-col items-center justify-center py-20 px-4 text-center",
      "bg-background/30 backdrop-blur-sm rounded-xl border border-border/50",
      "min-h-[400px] animate-in fade-in-0 slide-in-from-bottom-4 duration-700",
      className
    )}>
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" aria-hidden="true" />
        <div className="relative bg-primary/10 p-6 rounded-full border border-primary/20">
          <Icon 
            size={48} 
            className="text-primary/70" 
            aria-hidden="true"
          />
        </div>
      </div>
      
      <h3 className="text-2xl font-semibold mb-3 text-foreground">
        {title}
      </h3>
      
      <p className="text-muted-foreground max-w-md leading-relaxed">
        {description}
      </p>
    </div>
  );
}