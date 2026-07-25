import { Plus, Sun } from "lucide-react";
import { useState } from "react";
import Button from "./ui/button";

const AppHeader = () => {
     const [theme, setTheme] = useState<"light" | "dark">(() => {
          const savedTheme = localStorage.getItem("cvb-theme");
          return (savedTheme as "light" | "dark") || "light";
     });

     const handleThemeToggle = () => {
          const newTheme = theme === "dark" ? "light" : "dark";
          setTheme(newTheme);
          localStorage.setItem("cvb-theme", newTheme);
          document.documentElement.classList.toggle("dark", newTheme === "dark");
     };

     return (
          <header className="sticky top-0 z-50 bg-primary border-b-4 px-5 py-3 flex items-center justify-between">
               <button className="flex items-center gap-2 cursor-pointer">
                    <span
                         className="bg-black text-primary px-2 py-0.5 text-xl leading-none"
                         aria-label="CVBoost — retour au tableau de bord"
                    >
                         CV
                    </span>
                    <span className="text-xl tracking-tight">BOOST</span>
               </button>
               <div className="flex items-center gap-3">
                    <Button size="sm" variant="black">
                         <Plus size={13} /> Nouvelle analyse
                    </Button>
                    <Button size="icon" variant="black" onClick={handleThemeToggle}>
                         <Sun size={16} />
                    </Button>
               </div>
          </header>
     );
};

export default AppHeader;
