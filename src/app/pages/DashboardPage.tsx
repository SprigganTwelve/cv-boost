import { Plus } from "lucide-react";
import Button from "../components/ui/button";

const DashboardPage = () => {
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
                         <p className="text-lg font-medium text-gray-600 dark:text-zinc-300 mb-6 max-w-xl">
                              Découvrez comment améliorer votre CV grâce à une analyse IA détaillée.
                         </p>
                         <Button size="lg">
                              <Plus size={13} /> Nouvelle analyse
                         </Button>
                    </div>
               </section>
               <section>Analyses</section>
          </main>
     );
};

export default DashboardPage;
