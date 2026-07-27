import { useState } from "react";
import AppHeader from "./components/AppHeader";
import DashboardPage from "./pages/DashboardPage";
import NewAnalysisPage from "./pages/NewAnalysisPage";
import ReportPage from "./pages/ReportPage";

type Page = "dashboard" | "new-analysis" | "report";

function App() {
     const [page, setPage] = useState<Page>("dashboard");
     return (
          <div className="min-h-screen">
               <AppHeader onDashboard={() => setPage("dashboard")} onNewAnalysis={() => setPage("new-analysis")} />
               {page === "dashboard" && (
                    <DashboardPage
                         onNewAnalysis={() => setPage("new-analysis")}
                         onOpenAnalysis={() => setPage("report")}
                    />
               )}
               {page === "new-analysis" && <NewAnalysisPage onBack={() => setPage("dashboard")} />}
               {page === "report" && <ReportPage />}
          </div>
     );
}

export default App;
