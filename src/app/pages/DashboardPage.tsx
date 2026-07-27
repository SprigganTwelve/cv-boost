import { FileText, Plus, Search } from "lucide-react";
import { useState } from "react";
import AnalysisCard from "../components/AnalysisCard";
import Button from "../components/ui/button";
import { MOCK_ANALYSES } from "../lib/mockData";
import type { Analysis } from "../lib/types";

const DashboardPage = ({
     onNewAnalysis,
     onOpenAnalysis,
}: {
     onNewAnalysis: () => void;
     onOpenAnalysis: (id: string) => void;
}) => {
     const [analyses, setAnalyses] = useState<Analysis[]>(MOCK_ANALYSES);
     const [search, setSearch] = useState("");
     const [sortBy, setSortBy] = useState<"date" | "score">("date");

     const filteredAnalyses: Analysis[] = analyses
          .filter(
               (a) =>
                    a.company.toLowerCase().includes(search.toLowerCase()) ||
                    a.role.toLowerCase().includes(search.toLowerCase()),
          )
          .sort((a, b) => (sortBy === "score" ? b.score - a.score : 0));

     return (
          <main>
               {/* Hero */}
               <section className="border-b-4 px-6 py-10">
                    <div className="mx-auto max-w-4xl">
                         <p className="text-xs font-bold uppercase tracking-widest text-yellow-600 mb-2">
                              Tableau de bord
                         </p>
                         <h1
                              className="text-4xl md:text-5xl font-black mb-3 leading-tight"
                              style={{ fontFamily: "'Stack Sans Notch', sans-serif" }}
                         >
                              Analysez votre CV
                              <br />
                              pour une offre d'emploi
                         </h1>
                         <p className="text-lg font-medium text-gray-600 mb-6 max-w-xl">
                              Découvrez comment améliorer votre CV grâce à une analyse IA détaillée.
                         </p>
                         <Button size="lg" onClick={onNewAnalysis}>
                              <Plus size={13} /> Nouvelle analyse
                         </Button>
                    </div>
               </section>

               {/* Analyses already created */}
               <section className="px-6 py-8 mx-auto max-w-4xl">
                    {/* ToolBar */}
                    <div className="flex flex-col sm:flex-row gap-3 mb-6 items-start sm:items-center justify-between">
                         <h1 className="font-bold">
                              Mes analyses <span className="text-muted-foreground">({filteredAnalyses.length})</span>
                         </h1>
                         <div className="flex gap-2 flex-wrap">
                              <div className="relative">
                                   <Search
                                        size={15}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                                        aria-hidden="true"
                                   />
                                   <input
                                        id="search-input"
                                        type="text"
                                        placeholder="Rechercher..."
                                        className="pl-9 pr-4 py-2 border-2 font-medium focus:outline-none focus:bg-primary/10  text-sm shadow-md"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                   />
                              </div>
                              <select
                                   id="sort-select"
                                   className="px-3 py-2 border-2 font-bold cursor-pointer focus:outline-none text-sm shadow-md "
                                   value={sortBy}
                                   onChange={(e) => setSortBy(e.target.value as "date" | "score")}
                              >
                                   <option className="dark:text-background" value="date">
                                        Trier par date
                                   </option>
                                   <option className="dark:text-background" value="score">
                                        Trier par score
                                   </option>
                              </select>
                         </div>
                    </div>

                    {/* Analyses when none exist */}
                    {filteredAnalyses.length === 0 ? (
                         <div className="flex flex-col items-center justify-center border-4 p-12 shadow-lg">
                              <FileText size={70} className="text-7xl mb-5" />
                              <h3 className="font-black text-2xl mb-2">Aucune analyse</h3>
                              <p className="mb-6 font-medium">Commencez par analyser votre premier CV.</p>
                              <Button size="lg" onClick={onNewAnalysis}>
                                   <Plus size={20} /> Créer ma première analyse
                              </Button>
                         </div>
                    ) : (
                         <ul className="space-y-4">
                              {filteredAnalyses.map((analysis) => (
                                   <li key={analysis.id}>
                                        <AnalysisCard analysis={analysis} onOpen={() => onOpenAnalysis(analysis.id)} />
                                   </li>
                              ))}
                         </ul>
                    )}
               </section>
          </main>
     );
};

export default DashboardPage;
