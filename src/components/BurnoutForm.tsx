import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { Brain, User, Building2, Home, BarChart3, Zap, Loader2 } from "lucide-react";

export interface BurnoutFormData {
  gender: number;
  companyType: number;
  wfhSetup: number;
  designation: number;
  resourceAllocation: number;
  mentalFatigueScore: number;
}

interface BurnoutFormProps {
  onPredict: (data: BurnoutFormData) => Promise<boolean>;
  isLoading: boolean;
}

export default function BurnoutForm({ onPredict, isLoading }: BurnoutFormProps) {
  const initialFormData: BurnoutFormData = {
    gender: 0,
    companyType: 0,
    wfhSetup: 0,
    designation: 2,
    resourceAllocation: 5,
    mentalFatigueScore: 5.0,
  };
  const [formData, setFormData] = useState<BurnoutFormData>(initialFormData);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const success = await onPredict(formData);
    if (success) {
      setFormData(initialFormData);
    }
  };

  const inputClasses = "w-full px-4 py-3 rounded-xl bg-white/50 border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-slate-700 placeholder:text-slate-400";
  const labelClasses = "block text-sm font-semibold text-slate-600 mb-2 flex items-center gap-2";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass p-8 rounded-3xl max-w-xl w-full"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-primary/10 rounded-2xl">
          <Brain className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Burnout Assessment</h2>
          <p className="text-slate-500 text-sm">Analyze your professional well-being</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClasses}>
              <User className="w-4 h-4" /> Gender
            </label>
            <select
              className={inputClasses}
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: parseInt(e.target.value) })}
            >
              <option value={0}>Male</option>
              <option value={1}>Female</option>
            </select>
          </div>

          <div>
            <label className={labelClasses}>
              <Building2 className="w-4 h-4" /> Company Type
            </label>
            <select
              className={inputClasses}
              value={formData.companyType}
              onChange={(e) => setFormData({ ...formData, companyType: parseInt(e.target.value) })}
            >
              <option value={0}>Service Based</option>
              <option value={1}>Product Based</option>
            </select>
          </div>

          <div>
            <label className={labelClasses}>
              <Home className="w-4 h-4" /> WFH Setup
            </label>
            <select
              className={inputClasses}
              value={formData.wfhSetup}
              onChange={(e) => setFormData({ ...formData, wfhSetup: parseInt(e.target.value) })}
            >
              <option value={0}>No (Office)</option>
              <option value={1}>Yes (Remote)</option>
            </select>
          </div>

          <div>
            <label className={labelClasses}>
              <BarChart3 className="w-4 h-4" /> Designation Level (0-5)
            </label>
            <input
              type="number"
              min="0"
              max="5"
              className={inputClasses}
              value={formData.designation}
              onChange={(e) => setFormData({ ...formData, designation: parseInt(e.target.value) })}
            />
          </div>
        </div>

        <div>
          <label className={labelClasses}>
            <Zap className="w-4 h-4" /> Resource Allocation (1-10)
          </label>
          <input
            type="range"
            min="1"
            max="10"
            className="w-full accent-primary"
            value={formData.resourceAllocation}
            onChange={(e) => setFormData({ ...formData, resourceAllocation: parseInt(e.target.value) })}
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>Low Workload</span>
            <span>Current: {formData.resourceAllocation}</span>
            <span>High Workload</span>
          </div>
        </div>

        <div>
          <label className={labelClasses}>
            <Brain className="w-4 h-4" /> Mental Fatigue Score (0-10)
          </label>
          <input
            type="range"
            min="0"
            max="10"
            step="0.1"
            className="w-full accent-primary"
            value={formData.mentalFatigueScore}
            onChange={(e) => setFormData({ ...formData, mentalFatigueScore: parseFloat(e.target.value) })}
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>Feeling Fresh</span>
            <span>Current: {formData.mentalFatigueScore}</span>
            <span>Exhausted</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing Data...
            </>
          ) : (
            "Predict Burnout Risk"
          )}
        </button>
      </form>
    </motion.div>
  );
}
