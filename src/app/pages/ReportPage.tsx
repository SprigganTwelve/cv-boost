import { CheckCircle, ChevronDown, ChevronUp, Copy, Download, Plus, TrendingUp } from "lucide-react";
import { useState } from "react";
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
     const [copiedKey, setCopiedKey] = useState<string | null>(null);
     const [openCriterion, setOpenCriterion] = useState<string | null>(null);

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
     function copyText(text: string, key: string) {
          navigator.clipboard.writeText(text).then(() => {
               setCopiedKey(key);
               setTimeout(() => setCopiedKey(null), 2000);
          });
     }

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

                    {/* Strengths + Weaknesses */}
                    <div className="grid md:grid-cols-2 gap-4">
                         <section aria-labelledby="strengths-heading" className="border-2 p-5 shadow-md">
                              <h3 id="strengths-heading" className="font-bold text-lg mb-4 flex items-center gap-2">
                                   <span
                                        className="w-6 h-6 bg-success border-2 flex items-center justify-center text-xs font-bold"
                                        aria-hidden="true"
                                   >
                                        ✓
                                   </span>
                                   Points forts
                              </h3>
                              <ul className="space-y-2">
                                   {report.strengths.map((strength, key) => (
                                        <li key={key} className="flex items-start gap-2 text-sm font-medium">
                                             <span className="text-primary mt-0.5 flex-shrink-0" aria-hidden="true">
                                                  ●
                                             </span>
                                             {strength}
                                        </li>
                                   ))}
                              </ul>
                         </section>

                         <section aria-labelledby="weaknesses-heading" className="border-2 p-5 shadow-md">
                              <h3
                                   id="weaknesses-heading"
                                   className="font-black text-lg mb-4 flex items-center gap-2"
                                   style={{ fontFamily: "'Stack Sans Notch', sans-serif" }}
                              >
                                   <span
                                        className="w-6 h-6 bg-destructive border-2 flex items-center justify-center text-xs font-bold"
                                        aria-hidden="true"
                                   >
                                        !
                                   </span>
                                   Points faibles
                              </h3>
                              <ul className="space-y-2">
                                   {report.weaknesses.map((weakness, key) => (
                                        <li key={key} className="flex items-start gap-2 text-sm font-medium">
                                             <span className="text-destructive mt-0.5 flex-shrink-0" aria-hidden="true">
                                                  ●
                                             </span>
                                             {weakness}
                                        </li>
                                   ))}
                              </ul>
                         </section>
                    </div>

                    {/* Priority recommendations */}
                    <section aria-labelledby="reco-heading">
                         <h2 id="reco-heading" className="font-bold text-2xl mb-4">
                              Recommandations prioritaires
                         </h2>
                         <div className="space-y-5">
                              {report.recommendations.map((recommendation, key) => (
                                   <article key={key} className="border-4 p-6 shadow-lg">
                                        <div className="flex items-start justify-between gap-4 mb-5">
                                             <div>
                                                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                                                       <Badge
                                                            color={
                                                                 recommendation.priority === "haute"
                                                                      ? "red"
                                                                      : recommendation.priority === "moyenne"
                                                                        ? "orange"
                                                                        : "green"
                                                            }
                                                       >
                                                            Priorité {recommendation.priority}
                                                       </Badge>
                                                       <Badge color="primaryblack">
                                                            Impact : {recommendation.impact}
                                                       </Badge>
                                                  </div>
                                                  <h3 className="font-bold text-xl">{recommendation.title}</h3>
                                             </div>
                                             <span
                                                  className="font-bold text-4xl text-muted-foreground/20 leading-none select-none"
                                                  aria-hidden="true"
                                             >
                                                  #{key + 1}
                                             </span>
                                        </div>

                                        <div className="space-y-3">
                                             <div className="bg-muted-foreground/5 border-l-4 border-black dark:border-primary p-4">
                                                  <p className="text-xs font-bold uppercase tracking-widest mb-1">
                                                       Pourquoi ?
                                                  </p>
                                                  <p className="text-sm font-medium text-muted-foreground">
                                                       {recommendation.why}
                                                  </p>
                                             </div>
                                             <div className="bg-muted-foreground/5 border-l-4 border-yellow-600 dark:border-primary p-4">
                                                  <p className="text-xs font-bold uppercase tracking-widest mb-1">
                                                       Comment faire ?
                                                  </p>
                                                  <p className="text-sm font-medium text-muted-foreground">
                                                       {recommendation.how}
                                                  </p>
                                             </div>

                                             <div className="grid md:grid-cols-2 gap-3">
                                                  <div className="bg-destructive/10 border-2 border-destructive p-4">
                                                       <p className="text-xs font-bold uppercase tracking-widest text-destructive mb-2">
                                                            Avant
                                                       </p>
                                                       <p className="text-sm font-medium text-muted-foreground">
                                                            {recommendation.before}
                                                       </p>
                                                  </div>
                                                  <div className="bg-success/10 border-2 border-success p-4 relative">
                                                       <p className="text-xs font-bold uppercase tracking-widest text-success mb-2">
                                                            Après
                                                       </p>
                                                       <p className="text-sm font-medium text-muted-foreground pr-8">
                                                            {recommendation.after}
                                                       </p>
                                                       <button
                                                            onClick={() =>
                                                                 copyText(recommendation.after, `recommendation-${key}`)
                                                            }
                                                            className="absolute top-3 right-3 p-1.5 border-2  hover:bg-primary/50  cursor-pointer transition-colors shadow-sm"
                                                            aria-label="Copier la reformulation"
                                                            title="Copier"
                                                       >
                                                            {copiedKey === `recommendation-${key}` ? (
                                                                 <CheckCircle size={14} className="text-success" />
                                                            ) : (
                                                                 <Copy size={14} />
                                                            )}
                                                       </button>
                                                  </div>
                                             </div>
                                        </div>
                                   </article>
                              ))}
                         </div>
                    </section>

                    {/* Detailed criteria accordion */}
                    <section aria-labelledby="criteria-heading">
                         <h2 id="criteria-heading" className="font-black text-2xl mb-4">
                              Analyse détaillée par critère
                         </h2>
                         <div className="border-2 shadow-md">
                              {report.criteria.map((criterion, i) => {
                                   const isOpen = openCriterion === criterion.name;
                                   return (
                                        <div
                                             key={criterion.name}
                                             className={i < report.criteria.length - 1 ? "border-b-2" : ""}
                                        >
                                             <button
                                                  className="w-full flex items-center justify-between p-4  hover:bg-primary/10 transition-colors cursor-pointer"
                                                  onClick={() => setOpenCriterion(isOpen ? null : criterion.name)}
                                                  aria-expanded={isOpen}
                                                  aria-controls={`criterion-${criterion.name}`}
                                             >
                                                  <div className="flex items-center gap-4">
                                                       <span className="font-black text-base uppercase tracking-wide">
                                                            {criterion.name}
                                                       </span>
                                                       <div className="w-28 hidden sm:block">
                                                            <ScoreBar score={criterion.score} />
                                                       </div>
                                                  </div>
                                                  <div className="flex items-center gap-3">
                                                       <span
                                                            className="font-black text-2xl"
                                                            style={{
                                                                 color: getScoreColor(criterion.score),
                                                            }}
                                                       >
                                                            {criterion.score}
                                                       </span>
                                                       {isOpen ? (
                                                            <ChevronUp size={18} aria-hidden="true" />
                                                       ) : (
                                                            <ChevronDown size={18} aria-hidden="true" />
                                                       )}
                                                  </div>
                                             </button>

                                             {isOpen && (
                                                  <div
                                                       id={`criterion-${criterion.name}`}
                                                       className="border-t-2 p-5 space-y-4"
                                                  >
                                                       <p className="font-medium">{criterion.summary}</p>
                                                       <div className="grid md:grid-cols-2 gap-4">
                                                            <div>
                                                                 <p className="text-xs font-bold uppercase tracking-widest text-success mb-2">
                                                                      ✓ Forces
                                                                 </p>
                                                                 <ul className="space-y-1.5">
                                                                      {criterion.strengths.map((strength, j) => (
                                                                           <li
                                                                                key={j}
                                                                                className="text-sm font-medium flex gap-2"
                                                                           >
                                                                                <span className="text-success flex-shrink-0">
                                                                                     ●
                                                                                </span>
                                                                                <span className="text-muted-foreground">
                                                                                     {strength}
                                                                                </span>
                                                                           </li>
                                                                      ))}
                                                                 </ul>
                                                            </div>
                                                            <div>
                                                                 <p className="text-xs font-bold uppercase tracking-widest text-destructive mb-2">
                                                                      ✗ Faiblesses
                                                                 </p>
                                                                 <ul className="space-y-1.5">
                                                                      {criterion.weaknesses.map((weakness, j) => (
                                                                           <li
                                                                                key={j}
                                                                                className="text-sm font-medium flex gap-2"
                                                                           >
                                                                                <span className="text-destructive flex-shrink-0">
                                                                                     ●
                                                                                </span>
                                                                                <span className="text-muted-foreground">
                                                                                     {weakness}
                                                                                </span>
                                                                           </li>
                                                                      ))}
                                                                 </ul>
                                                            </div>
                                                       </div>
                                                       <div>
                                                            <p className="text-xs font-bold uppercase tracking-widest mb-2">
                                                                 Conseils
                                                            </p>
                                                            <ul className="space-y-1.5">
                                                                 {criterion.tips.map((t, j) => (
                                                                      <li
                                                                           key={j}
                                                                           className="text-sm font-medium flex gap-2 text-muted-foreground"
                                                                      >
                                                                           <span className="flex-shrink-0">→</span>
                                                                           {t}
                                                                      </li>
                                                                 ))}
                                                            </ul>
                                                       </div>
                                                       {criterion.example && (
                                                            <div className="grid md:grid-cols-2 gap-3">
                                                                 <div className="bg-destructive/5 border-2 border-destructive p-3">
                                                                      <p className="text-xs font-bold uppercase text-destructive mb-1">
                                                                           Avant
                                                                      </p>
                                                                      <p className="text-sm font-medium text-muted-foreground">
                                                                           {criterion.example.before}
                                                                      </p>
                                                                 </div>
                                                                 <div className="bg-success/5 border-2 border-success p-3">
                                                                      <p className="text-xs font-bold uppercase text-success mb-1">
                                                                           Après
                                                                      </p>
                                                                      <p className="text-sm font-medium text-muted-foreground">
                                                                           {criterion.example.after}
                                                                      </p>
                                                                 </div>
                                                            </div>
                                                       )}
                                                  </div>
                                             )}
                                        </div>
                                   );
                              })}
                         </div>
                    </section>

                    {/* Keywords */}
                    <section aria-labelledby="keywords-heading">
                         <h2 id="keywords-heading" className="font-bold text-2xl mb-4">
                              Analyse des mots-clés
                         </h2>
                         <div className="grid md:grid-cols-3 gap-4">
                              {[
                                   {
                                        label: "Présents",
                                        keywords: report.keywords.present,
                                        light: { bg: "#bbf7d0", border: "var(--success)" },
                                   },
                                   {
                                        label: "Manquants",
                                        keywords: report.keywords.missing,
                                        light: { bg: "#fecaca", border: "var(--destructive)" },
                                   },
                                   {
                                        label: "Optionnels",
                                        keywords: report.keywords.optional,
                                        light: { bg: "#f3f4f6", border: "#9ca3af" },
                                   },
                              ].map(({ label, keywords, light }) => (
                                   <div key={label} className="border-2 p-4 shadow-md">
                                        <h3 className="font-bold text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
                                             <span
                                                  className="w-3 h-3 border inline-block"
                                                  style={{ backgroundColor: light.border }}
                                                  aria-hidden="true"
                                             />
                                             {label} ({keywords.length})
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                             {keywords.map((keyword) => (
                                                  <span
                                                       key={keyword}
                                                       className="px-2 py-0.5 text-xs font-bold border-2 text-black"
                                                       style={{
                                                            backgroundColor: light.bg,
                                                            borderColor: light.border,
                                                       }}
                                                  >
                                                       {keyword}
                                                  </span>
                                             ))}
                                        </div>
                                   </div>
                              ))}
                         </div>
                    </section>

                    {/* Skills */}
                    <section aria-labelledby="skills-heading">
                         <h2 id="skills-heading" className="font-bold text-2xl mb-4">
                              Compétences
                         </h2>
                         <div className="grid md:grid-cols-2 gap-4">
                              <div className="border-2 p-4 shadow-md">
                                   <h3 className="font-bold text-sm uppercase tracking-widest mb-3">
                                        Détectées ({report.skills.detected.length})
                                   </h3>
                                   <div className="flex flex-wrap gap-2">
                                        {report.skills.detected.map((skill, key) => (
                                             <span
                                                  key={key}
                                                  className="bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-500 dark:border-blue-400 px-2 py-0.5 text-xs font-bold text-blue-900 dark:text-blue-300"
                                             >
                                                  {skill}
                                             </span>
                                        ))}
                                   </div>
                              </div>
                              <div className="border-2 p-4 shadow-md">
                                   <h3 className="font-bold text-sm uppercase tracking-widest mb-3">
                                        À mettre davantage en avant
                                   </h3>
                                   <div className="flex flex-wrap gap-2">
                                        {report.skills.toHighlight.map((skill, key) => (
                                             <span
                                                  key={key}
                                                  className="bg-yellow-300 dark:bg-yellow-400 dark:text-black border-2 border-black px-2 py-0.5 text-xs font-bold text-bold"
                                             >
                                                  {skill}
                                             </span>
                                        ))}
                                   </div>
                              </div>
                         </div>
                    </section>

                    {/* CTA footer */}
                    <section
                         aria-label="Actions"
                         className="border-4 bg-primary p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between shadow-lg dark:text-black"
                    >
                         <div>
                              <h3 className="font-bold text-xl mb-1">Prêt à améliorer votre CV ?</h3>
                              <p className="font-medium text-sm">
                                   Appliquez les recommandations et relancez une analyse pour suivre vos progrès.
                              </p>
                         </div>
                         <div className="flex gap-3 flex-wrap flex-shrink-0">
                              <Button variant="secondary" size="md">
                                   <Download size={16} /> Télécharger le rapport
                              </Button>
                              <Button onClick={onNewAnalysis} variant="black" size="md">
                                   <Plus size={16} /> Nouvelle analyse
                              </Button>
                         </div>
                    </section>
               </div>
          </main>
     );
};

export default ReportPage;
