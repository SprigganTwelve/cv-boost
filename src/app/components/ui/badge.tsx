import { cn } from "../../lib/cn";

interface BadgeProps {
     children: React.ReactNode;
     color: "green" | "blue" | "orange" | "red" | "gray" | "primary";
}

const Badge: React.FC<BadgeProps> = ({ children, color }) => {
     const map: Record<string, string> = {
          green: "bg-success/30 text-bold border-success",
          blue: "bg-info/30 text-bold border-info",
          orange: "bg-warning/30 text-bold border-warning",
          red: "bg-destructive/30 text-bold border-destructive",
          gray: "bg-muted-foreground/30 text-bold border-muted-foreground",
          primary: "bg-primary/30 text-bold border-primary",
     };
     return (
          <span
               className={cn(
                    "inline-flex items-center gap-1 px-2 py-0.5 border-2 text-xs font-bold uppercase tracking-wide",
                    map[color],
               )}
          >
               {children}
          </span>
     );
};

export default Badge;
