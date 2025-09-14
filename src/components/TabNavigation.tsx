import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface TabItem {
  id: string;
  label: string;
  count?: number;
}

interface TabNavigationProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export function TabNavigation({ 
  tabs, 
  activeTab, 
  onTabChange, 
  className 
}: TabNavigationProps) {
  return (
    <div className={cn("flex justify-center mb-12", className)}>
      <Tabs 
        value={activeTab} 
        onValueChange={onTabChange}
        className="w-full max-w-md"
      >
        <TabsList className="grid w-full grid-cols-2 bg-background/50 backdrop-blur-sm border border-border/50 shadow-lg">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className={cn(
                "relative transition-all duration-300 ease-out",
                "hover:bg-primary/10 hover:scale-105 hover:shadow-sm",
                "focus:bg-primary/10 focus:scale-105",
                "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
                "data-[state=active]:shadow-md data-[state=active]:scale-105",
                "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
              )}
              aria-label={`Show ${tab.label}${tab.count ? ` (${tab.count} projects)` : ''}`}
            >
              <span className="flex items-center gap-2">
                {tab.label}
                {tab.count !== undefined && (
                  <span 
                    className={cn(
                      "inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-medium rounded-full",
                      "bg-muted text-muted-foreground transition-colors duration-200",
                      "group-data-[state=active]:bg-primary-foreground/20 group-data-[state=active]:text-primary-foreground"
                    )}
                    aria-label={`${tab.count} projects`}
                  >
                    {tab.count}
                  </span>
                )}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}