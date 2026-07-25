import { ArrowRight, Trash2 } from "lucide-react";
import { getScoreBadgeVariant, getScoreColor, getScoreLabel } from "../lib/helpers";
import type { Analysis } from "../lib/types";
import Badge from "./ui/badge";
import Button from "./ui/button";

interface AnalysisCard {
     analysis: Analysis;
}
const AnalysisCard: React.FC<AnalysisCard> = ({ analysis }) => {
     const { score } = analysis;
     const color = getScoreColor(score);
     const badgeColor = getScoreBadgeVariant(score);
     return (
          <article className="border-2 p-4 md:p-5 flex items-center gap-4 cursor-pointer hover:translate-y-0.5 transition-transform shadow-md">
               {/* Company avatar */}
               <div
                    className="w-12 h-12 md:w-14 md:h-14 bg-primary border-2 flex items-center justify-center font-bold text-xl"
                    aria-hidden="true"
               >
                    {analysis.company[0]}
               </div>
               {/* Informations */}
               <div className="flex-1 min-w-0">
                    <p className="font-bold text-lg leading-tight">{analysis.company}</p>
                    <p className="font-medium text-muted-foreground truncate">{analysis.role}</p>
                    <p className="text-sm text-muted-foreground">Analyse du {analysis.date}</p>
               </div>

               {/* Score + actions */}
               <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                         <p className="font-black text-3xl leading-none" style={{ color }}>
                              {score}
                         </p>
                         <p className="text-xs font-bold" style={{ color }}>
                              /100
                         </p>
                         <div className="mt-1">
                              <Badge color={badgeColor}>{getScoreLabel(score)}</Badge>
                         </div>
                    </div>

                    <div className="flex flex-col gap-2">
                         <Button className="shadow-sm" size="icon" variant="black" aria-label="Voir l'analyse">
                              <ArrowRight size={16} />
                         </Button>
                         <Button
                              className="shadow-sm"
                              size="icon"
                              variant="outlinedestructive"
                              aria-label="Supprimer l'analyse"
                         >
                              <Trash2 size={16} />
                         </Button>
                    </div>
               </div>
          </article>
     );
};

export default AnalysisCard;
