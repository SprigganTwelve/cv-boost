import { Plus } from "lucide-react";
import Badge from "../components/ui/badge";
import Button from "../components/ui/button";
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
          </main>
     );
};

export default ReportPage;
