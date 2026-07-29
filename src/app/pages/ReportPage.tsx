import { Plus, TrendingUp } from "lucide-react";
import CircularGauge from "../components/CircularGauge";
import Badge from "../components/ui/badge";
import Button from "../components/ui/button";
import { getScoreColor } from "../lib/helpers";
import { MOCK_REPORTS } from "../lib/mockData";

const ReportPage = ({
     reportId,
     onNewAnalysis,
     onBack,
}: {
     reportId: string;
     onNewAnalysis: () => void;
     onBack: () => void;
}) => {
     const getReportById = (reportId: string) => {
          // use mock data for now
          return MOCK_REPORTS[reportId] ?? MOCK_REPORTS["1"];
     };
     const report = getReportById(reportId);

     const ScoreBar = ({ score }: { score: number }) => {
          return (
               <div className="w-full h-3 border-2 overflow-hidden">
                    <div
                         className="h-full transition-all duration-700"
                         style={{ width: `${score}%`, backgroundColor: getScoreColor(score) }}
                    />
               </div>
          );
     };

     return (
          <main>
               {/* Sub-header of the report */}
               <div className="bg-black text-white border-b-4 border-primary px-6 py-5">
                    <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                         <div>
                              <div className="flex items-center gap-3 mb-1">
                                   <Badge color="primary">Rapport</Badge>
                                   <span className=" text-sm">{report.date}</span>
                              </div>
                              <h1 className="font-bold text-2xl">{report.company}</h1>
                              <p className="text-primary font-medium">{report.role}</p>
                         </div>
                         <div className="flex gap-3 flex-wrap">
                              <Button variant="secondary" size="sm" onClick={onBack}>
                                   ← Dashboard
                              </Button>
                              <Button variant="primary" size="sm" onClick={onNewAnalysis}>
                                   <Plus size={13} /> Nouvelle analyse
                              </Button>
                         </div>
                    </div>
               </div>

               <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
                    {/* Global score */}
                    <section aria-labelledby="score-heading">
                         <div className="border-4 p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 shadow-lg">
                              <CircularGauge score={report.globalScore} size={180} />
                              <div className="flex-1">
                                   <h2 id="score-heading" className="font-black text-2xl mb-1">
                                        Score de compatibilité
                                   </h2>
                                   <p className="text-muted-foreground/60 font-medium mb-4">
                                        {report.company} — {report.role}
                                   </p>
                                   <p className="font-medium text-muted-foreground leading-relaxed mb-5">
                                        {report.summary.slice(0, 220)}...
                                   </p>
                                   <div className="inline-flex items-center gap-3 bg-success/15 border-2 border-success px-4 py-2 shadow-sm">
                                        <TrendingUp size={18} className="text-success" aria-hidden="true" />
                                        <span className="font-bold text-sm">Score estimé après améliorations :</span>
                                        <span className="font-bold text-2xl text-green-600 dark:text-green-400">
                                             ≈ {report.estimatedAfter}/100
                                        </span>
                                   </div>
                              </div>
                         </div>
                    </section>

                    {/* Detailed score0s */}
                    <section aria-labelledby="detail-scores-heading">
                         <h2 id="detail-scores-heading" className="font-bold text-2xl mb-4">
                              Scores détaillés
                         </h2>
                         <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                              {report.detailedScores.map((score) => (
                                   <div key={score.name} className="border-2 p-4 shadow-md">
                                        <div className="flex items-center justify-between mb-3">
                                             <span className="font-bold text-sm uppercase tracking-wide">
                                                  {score.name}
                                             </span>
                                             <span
                                                  className="font-bold text-2xl"
                                                  style={{
                                                       color: getScoreColor(score.score),
                                                  }}
                                             >
                                                  {score.score}
                                             </span>
                                        </div>
                                        <ScoreBar score={score.score} />
                                        <p className="text-xs text-muted-foreground mt-2 font-medium">
                                             {score.comment}
                                        </p>
                                   </div>
                              ))}
                         </div>
                    </section>

                    {/* AI Summary */}
                    <section aria-labelledby="summary-heading" className="border-4  bg-primary/10 p-6 shadow-md">
                         <h2 id="summary-heading" className="font-bold text-2xl mb-4">
                              Résumé de l'analyse IA
                         </h2>
                         <p className="font-medium text-muted-foreground leading-relaxed">{report.summary}</p>
                    </section>
               </div>
          </main>
     );
};

export default ReportPage;
