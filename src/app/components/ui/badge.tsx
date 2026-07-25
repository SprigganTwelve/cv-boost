import { cn } from "../../lib/cn";

interface BadgeProps {
     children: React.ReactNode;
     color: "green" | "blue" | "orange" | "red";
}

const Badge: React.FC<BadgeProps> = ({ children, color }) => {
     const map: Record<string, string> = {
          green: "bg-green-400 text-black border-green-600",
          blue: "bg-blue-400 text-black border-blue-600",
          orange: "bg-orange-400 text-black border-orange-600",
          red: "bg-red-400 text-black border-red-600",
     };
     return (
          <span
               className={cn(
                    "inline-flex items-center gap-1 px-2 py-0.5 border-2 text-xs font-black uppercase tracking-wide",
                    map[color],
               )}
          >
               {children}
          </span>
     );
};

export default Badge;
