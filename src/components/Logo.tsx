import { useTheme } from "@/contexts/ThemeContext";
import darkLogo from "@/Assets/Asset 5.svg";
import lightLogo from "@/Assets/Asset 6.svg";

export function Logo() {
  const { theme } = useTheme();
  
  return (
    <img 
      src={theme === "dark" ? lightLogo : darkLogo}
      alt="Portfolio Logo"
      className="h-8 w-auto"
    />
  );
} 