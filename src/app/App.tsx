import { useState } from "react";
import AppHeader from "./components/AppHeader";
import DashboardPage from "./pages/DashboardPage";
import LoadingPage from "./pages/LoadingPage";
import NewAnalysisPage from "./pages/NewAnalysisPage";
import ReportPage from "./pages/ReportPage";

type Page = "dashboard" | "new-analysis" | "loading" | "report";

function App() {
     const [page, setPage] = useState<Page>("dashboard");
     const [selectedId, setSelectedId] = useState<string>("1");

     return (
          <div className="min-h-screen">
               <AppHeader onDashboard={() => setPage("dashboard")} onNewAnalysis={() => setPage("new-analysis")} />
               {page === "dashboard" && (
                    <DashboardPage
                         onNewAnalysis={() => setPage("new-analysis")}
                         onOpenAnalysis={(id) => {
                              setSelectedId(id);
                              setPage("report");
                         }}
                    />
               )}
               {page === "new-analysis" && (
                    <NewAnalysisPage onBack={() => setPage("dashboard")} onSubmit={() => setPage("loading")} />
               )}
               {page === "loading" && <LoadingPage />}
               {page === "report" && (
                    <ReportPage
                         reportId={selectedId}
                         onNewAnalysis={() => setPage("new-analysis")}
                         onBack={() => setPage("dashboard")}
                    />
               )}
          </div>
     );
}

export default App;
