import { motion } from "motion/react";
import { ShieldCheck, AlertTriangle, Info, CheckCircle2, RefreshCcw } from "lucide-react";

interface AnalysisDashboardProps {
  data: {
    riskLevel: string;
    score: number;
    summary: string;
    recommendations: string[];
    insights: string;
  };
  onReset: () => void;
}

export default function AnalysisDashboard({ data, onReset }: AnalysisDashboardProps) {
  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "low": return "text-risk-low bg-risk-low/10 border-risk-low/20";
      case "moderate": return "text-risk-moderate bg-risk-moderate/10 border-risk-moderate/20";
      case "high": return "text-risk-high bg-risk-high/10 border-risk-high/20";
      case "critical": return "text-risk-critical bg-risk-critical/10 border-risk-critical/20";
      default: return "text-slate-500 bg-slate-100 border-slate-200";
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level.toLowerCase()) {
      case "low": return <ShieldCheck className="w-12 h-12" />;
      case "moderate": return <Info className="w-12 h-12" />;
      case "high": return <AlertTriangle className="w-12 h-12" />;
      case "critical": return <AlertTriangle className="w-12 h-12" />;
      default: return <Info className="w-12 h-12" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass p-8 rounded-3xl max-w-4xl w-full"
    >
      <div className="flex justify-end mb-6">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-all active:scale-[0.98]"
        >
          <RefreshCcw className="w-4 h-4" />
          Start New Assessment
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Risk Score */}
        <div className="lg:col-span-1 flex flex-col items-center text-center p-6 rounded-3xl border border-slate-100 bg-slate-50/50">
          <div className={`p-6 rounded-full border-2 mb-4 ${getRiskColor(data.riskLevel)}`}>
            {getRiskIcon(data.riskLevel)}
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-1">Risk Level</h3>
          <p className={`text-3xl font-black mb-4 ${getRiskColor(data.riskLevel).split(' ')[0]}`}>
            {data.riskLevel}
          </p>
          
          <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden mb-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${data.score}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`h-full ${data.score > 70 ? 'bg-risk-high' : data.score > 40 ? 'bg-risk-moderate' : 'bg-risk-low'}`}
            />
          </div>
          <p className="text-sm font-semibold text-slate-500">{data.score}% Probability</p>
        </div>

        {/* Right Column: Details */}
        <div className="lg:col-span-2 space-y-6">
          <section>
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Summary</h4>
            <p className="text-slate-700 leading-relaxed text-lg font-medium">
              {data.summary}
            </p>
          </section>

          <section>
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Key Insights</h4>
            <div className="p-4 rounded-2xl bg-accent/5 border border-accent/10 text-accent font-medium">
              {data.insights}
            </div>
          </section>

          <section>
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Recommendations</h4>
            <div className="grid gap-3">
              {data.recommendations.map((rec, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-xl bg-white/50 border border-slate-100"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-slate-600 text-sm font-medium">{rec}</span>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
}
