import { motion } from "motion/react";
import { Shield, Zap, Heart, Users, ArrowRight, CheckCircle } from "lucide-react";

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  const features = [
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: "Privacy First",
      description: "Your data is encrypted and used solely for your personal assessment."
    },
    {
      icon: <Zap className="w-6 h-6 text-accent" />,
      title: "Real-time Analysis",
      description: "Get instant feedback powered by advanced generative AI models."
    },
    {
      icon: <Heart className="w-6 h-6 text-red-400" />,
      title: "Holistic Approach",
      description: "We look at workload, mental fatigue, and environment for a complete picture."
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-32">
      {/* Hero Section */}
      <section className="text-center space-y-8 pt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Next-Gen Mental Health Intelligence
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-7xl font-black text-slate-900 leading-tight tracking-tight"
        >
          Reclaim Your <span className="text-primary">Energy</span>.<br />
          Prevent <span className="text-accent">Burnout</span>.
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-slate-500 max-w-2xl mx-auto font-medium"
        >
          The world's first AI-driven platform designed to predict professional exhaustion before it happens. 
          Science-backed insights for the modern workforce.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={onStart}
            className="px-8 py-4 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2 group"
          >
            Start Free Assessment
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 bg-white text-slate-600 font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all">
            View Methodology
          </button>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-y border-slate-200">
        {[
          { label: "Assessments Done", value: "50k+" },
          { label: "Accuracy Rate", value: "94%" },
          { label: "Active Users", value: "12k" },
          { label: "Burnout Prevented", value: "8k+" }
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <div className="text-3xl font-black text-slate-900">{stat.value}</div>
            <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Features Grid */}
      <section className="space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black text-slate-900">Why Burnout AI?</h2>
          <p className="text-slate-500 max-w-xl mx-auto">We combine psychological research with cutting-edge machine learning to provide the most accurate professional health tracking.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="glass p-8 rounded-3xl space-y-4"
            >
              <div className="p-3 bg-slate-50 rounded-2xl w-fit">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800">{f.title}</h3>
              <p className="text-slate-500 leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <h2 className="text-4xl font-black text-slate-900 leading-tight">
            A Science-Backed <br />
            <span className="text-primary">3-Step Process</span>
          </h2>
          <div className="space-y-6">
            {[
              "Input your current workload and fatigue metrics",
              "AI analyzes patterns against 100k+ professional data points",
              "Receive a custom roadmap to recovery and balance"
            ].map((step, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0">
                  {i + 1}
                </div>
                <p className="text-lg text-slate-600 font-medium">{step}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="glass p-4 rounded-[2rem] aspect-square relative overflow-hidden">
          <img 
            src="https://picsum.photos/seed/healthcare/800/800" 
            alt="Healthcare visualization" 
            className="w-full h-full object-cover rounded-[1.5rem]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent pointer-events-none" />
        </div>
      </section>

      {/* Testimonial */}
      <section className="glass p-12 rounded-[3rem] text-center space-y-8">
        <div className="flex justify-center gap-1">
          {[1, 2, 3, 4, 5].map(i => <CheckCircle key={i} className="w-6 h-6 text-primary fill-primary/20" />)}
        </div>
        <blockquote className="text-2xl md:text-3xl font-medium text-slate-700 italic">
          "Burnout AI literally saved my career. I didn't realize how close I was to the edge until I saw the data. The recommendations were practical and life-changing."
        </blockquote>
        <div className="flex items-center justify-center gap-4">
          <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden">
            <img src="https://picsum.photos/seed/user1/100/100" alt="User" referrerPolicy="no-referrer" />
          </div>
          <div className="text-left">
            <div className="font-bold text-slate-900">Sarah Jenkins</div>
            <div className="text-sm text-slate-500 font-medium">Senior Product Manager @ TechFlow</div>
          </div>
        </div>
      </section>
    </div>
  );
}
