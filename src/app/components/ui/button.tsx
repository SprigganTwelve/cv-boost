import { cn } from "../../lib/cn";

interface ButtonProps {
     children: React.ReactNode;
     onClick?: () => void;
     variant?: "primary" | "secondary" | "black";
     size?: "sm" | "md" | "lg" | "icon";
     className?: string;
     type?: "button" | "submit";
}

const Button: React.FC<ButtonProps> = ({
     children,
     onClick,
     variant = "primary",
     size = "md",
     className,
     type = "button",
}) => {
     const variantStyles: Record<string, string> = {
          primary: "bg-primary text-black border-black hover:bg-yellow-300",
          secondary: "bg-white text-black border-black hover:bg-gray-50",
          black: "bg-black text-primary border-black hover:bg-gray-900",
     };
     const sizeStyles: Record<string, string> = {
          sm: "px-3 py-1.5 text-sm gap-1.5",
          md: "px-4 py-2.5 gap-2",
          lg: "px-6 py-3 text-lg gap-2",
          icon: "w-9 h-9",
     };
     return (
          <button
               type={type}
               onClick={onClick}
               className={cn(
                    "inline-flex items-center justify-center border-2 shadow-md font-black cursor-pointer transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none",
                    variantStyles[variant],
                    sizeStyles[size],
                    className,
               )}
          >
               {children}
          </button>
     );
};

export default Button;
