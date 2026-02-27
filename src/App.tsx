import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import ThreeBackground from "./components/ThreeBackground";
import BurnoutForm from "./components/BurnoutForm";
import AnalysisDashboard from "./components/AnalysisDashboard";
import LandingPage from "./components/LandingPage";
import ResourcesPage from "./components/ResourcesPage";
import SupportPage from "./components/SupportPage";
import { HeartPulse, Menu, X } from "lucide-react";
import type { BurnoutFormData } from "./components/BurnoutForm";

type Page = "home" | "assessment" | "resources" | "support";
type PredictionResult = {
  riskLevel: string;
  score: number;
  summary: string;
  recommendations: string[];
  insights: string;
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handlePredict = async (data: BurnoutFormData): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Prediction request failed with status ${response.status}`);
      }
      const result = await response.json();
      if (result.error) {
        throw new Error(result.error);
      }
      setPrediction(result as PredictionResult);
      return true;
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to analyze burnout risk. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleAssessmentReset = () => {
    setPrediction(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <LandingPage onStart={() => navigateTo("assessment")} />;
      case "assessment":
        return (
          <div className="w-full flex flex-col items-center">
            <AnimatePresence mode="wait" initial={false}>
              {!prediction ? (
                <motion.div
                  key="assessment-form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full flex flex-col items-center"
                >
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12 max-w-2xl"
                  >
                    <h1 className="text-5xl font-black text-slate-900 mb-6">Burnout Assessment</h1>
                    <p className="text-lg text-slate-500 font-medium">
                      Answer a few questions about your current work environment and mental state.
                      Our AI will provide a detailed risk analysis.
                    </p>
                  </motion.div>
                  <BurnoutForm onPredict={handlePredict} isLoading={isLoading} />
                </motion.div>
              ) : (
                <motion.div
                  key="assessment-dashboard"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full flex justify-center"
                >
                  <AnalysisDashboard data={prediction} onReset={handleAssessmentReset} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      case "resources":
        return <ResourcesPage />;
      case "support":
        return <SupportPage />;
      default:
        return <LandingPage onStart={() => navigateTo("assessment")} />;
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <ThreeBackground />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center glass border-b-0 rounded-none">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateTo("home")}>
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <HeartPulse className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800">Burnout AI</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 text-sm font-bold text-slate-500">
          {[
            { id: "home", label: "Home" },
            { id: "assessment", label: "Assessment" },
            { id: "resources", label: "Knowledge Hub" },
            { id: "support", label: "Support" }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id as Page)}
              className={`hover:text-primary transition-colors relative py-1 ${
                currentPage === item.id ? "text-primary" : ""
              }`}
            >
              {item.label}
              {currentPage === item.id && (
                <motion.div 
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden sm:block px-5 py-2 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-all">
            Sign In
          </button>
          <button 
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {[
                { id: "home", label: "Home" },
                { id: "assessment", label: "Assessment" },
                { id: "resources", label: "Knowledge Hub" },
                { id: "support", label: "Support" }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id as Page)}
                  className="text-2xl font-black text-slate-900 text-left"
                >
                  {item.label}
                </button>
              ))}
              <hr className="border-slate-100" />
              <button className="w-full py-4 bg-primary text-white font-bold rounded-2xl">
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-6 min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-slate-100 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <HeartPulse className="text-white w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-slate-800">Burnout AI</span>
            </div>
            <p className="text-slate-400 font-medium">Empowering the modern workforce with mental health intelligence.</p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Platform</h4>
            <ul className="space-y-2 text-slate-500 font-medium">
              <li><button onClick={() => navigateTo("assessment")}>Assessment</button></li>
              <li><button onClick={() => navigateTo("resources")}>Knowledge Hub</button></li>
              <li><button>Enterprise</button></li>
              <li><button>API Access</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Company</h4>
            <ul className="space-y-2 text-slate-500 font-medium">
              <li><button>About Us</button></li>
              <li><button>Methodology</button></li>
              <li><button>Privacy Policy</button></li>
              <li><button onClick={() => navigateTo("support")}>Contact</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Support</h4>
            <ul className="space-y-2 text-slate-500 font-medium">
              <li><button onClick={() => navigateTo("support")}>Help Center</button></li>
              <li><button>Crisis Resources</button></li>
              <li><button>Security</button></li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-20 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-sm font-medium">
          <p>&copy; 2026 Burnout AI Healthcare. All rights reserved.</p>
          <p className="italic opacity-50">Disclaimer: This is an AI-powered assessment tool and does not replace professional medical advice.</p>
        </div>
      </footer>
    </div>
  );
}
