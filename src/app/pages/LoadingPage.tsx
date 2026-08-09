import { useEffect, useState } from "react";
import { cn } from "../lib/cn";

const LOADING_STEPS = [
     "Lecture du CV",
     "Extraction des expériences",
     "Analyse des compétences",
     "Lecture de l'offre",
     "Comparaison des contenus",
     "Calcul des scores ATS",
     "Génération des conseils",
];

const TIPS = [
     "Les recruteurs passent en moyenne moins de 10 secondes sur un CV.",
     "Un CV adapté à l'offre a 3× plus de chances de passer les filtres ATS.",
     "Les verbes d'action forts augmentent l'impact de vos expériences.",
     "Les recruteurs préfèrent les résultats chiffrés aux descriptions vagues.",
     "Un CV d'une page est souvent préféré pour les profils juniors.",
];

const LoadingPage = ({ onComplete }: { onComplete: () => void }) => {
     const [step, setStep] = useState(0);
     const [tipIndex] = useState(() => Math.floor(Math.random() * TIPS.length));

     // to simulate time spent on each steps
     useEffect(() => {
          const t = setInterval(() => {
               setStep((prev) => {
                    if (prev >= LOADING_STEPS.length - 1) {
                         clearInterval(t);
                         setTimeout(onComplete, 3000);
                         return prev;
                    }
                    return prev + 1;
               });
          }, 1000);
          return () => clearInterval(t);
     }, [onComplete]);

     const pct = Math.round(((step + 1) / LOADING_STEPS.length) * 100);

     return (
          <main className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12">
               <div className="w-full max-w-md">
                    {/* Logo */}
                    <div className="text-center mb-10">
                         <div className="inline-flex items-center gap-2">
                              <span className="bg-foreground text-primary dark:text-black px-3 py-1 text-2xl font-black">
                                   CV
                              </span>
                              <span className="font-black text-3xl tracking-tight">BOOST</span>
                         </div>
                    </div>

                    {/* Card */}
                    <div className="border-4 p-7 mb-5 shadow-lg">
                         {/* Spinner */}
                         <div className="flex justify-center mb-7">
                              <div className="w-16 h-16 border-4 border-t-primary rounded-full animate-spin" />
                         </div>

                         {/* Progress bar */}
                         <div className="mb-6">
                              <div className="flex justify-between items-baseline mb-2">
                                   <span className="text-xs font-black uppercase tracking-widest">
                                        Analyse en cours
                                   </span>
                                   <span className="font-black text-lg">{pct}%</span>
                              </div>
                              <div className="w-full h-4 border-2 overflow-hidden">
                                   <div
                                        className="h-full bg-primary border-r-2 transition-all duration-500"
                                        style={{ width: `${pct}%` }}
                                   />
                              </div>
                         </div>

                         {/* Steps */}
                         <ul aria-label="Étapes de l'analyse" className="space-y-1.5">
                              {LOADING_STEPS.map((label, i) => {
                                   const done = i < step;
                                   const active = i === step;
                                   return (
                                        <li
                                             key={label}
                                             className={cn(
                                                  "flex items-center gap-3 px-3 py-2 transition-all",
                                                  active ? "bg-primary/15 border-l-4 border-primary" : "",
                                             )}
                                        >
                                             <div
                                                  className={cn(
                                                       "w-5 h-5 shrink-0 border-2 flex items-center justify-center text-xs font-black transition-colors",
                                                       done
                                                            ? "bg-green-400"
                                                            : active
                                                              ? "bg-primary"
                                                              : "bg-muted-foreground",
                                                  )}
                                             >
                                                  {done ? "✓" : active ? "→" : ""}
                                             </div>
                                             <span
                                                  className={`text-sm font-medium ${done ? "text-muted-foreground/50 line-through" : active ? "font-black" : "text-muted-foreground/50"}`}
                                             >
                                                  {label}
                                             </span>
                                        </li>
                                   );
                              })}
                         </ul>
                    </div>

                    {/* Tip */}
                    <div className="border-2 bg-primary p-4 shadow-md">
                         <p className="text-xs font-black uppercase tracking-widest mb-1 text-black">
                              💡︎ Le savez-vous ?
                         </p>
                         <p className="font-medium text-sm text-black">{TIPS[tipIndex]}</p>
                    </div>
               </div>

               <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
          </main>
     );
};

export default LoadingPage;
