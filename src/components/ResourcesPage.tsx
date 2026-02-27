import { motion } from "motion/react";
import { BookOpen, Video, FileText, ExternalLink, Search } from "lucide-react";

export default function ResourcesPage() {
  const resources = [
    {
      type: "Article",
      title: "The 5 Stages of Burnout: What to Look For",
      author: "Dr. Elena Vance",
      readTime: "8 min read",
      image: "https://picsum.photos/seed/burnout1/400/250"
    },
    {
      type: "Video",
      title: "Mindfulness for High-Pressure Environments",
      author: "Marcus Aurelius (Coach)",
      readTime: "12 min video",
      image: "https://picsum.photos/seed/meditation/400/250"
    },
    {
      type: "Guide",
      title: "Setting Boundaries with Remote Work",
      author: "Burnout AI Team",
      readTime: "15 min guide",
      image: "https://picsum.photos/seed/remotework/400/250"
    },
    {
      type: "Article",
      title: "Nutrition and Mental Fatigue: The Connection",
      author: "Sarah Miller, RD",
      readTime: "6 min read",
      image: "https://picsum.photos/seed/nutrition/400/250"
    },
    {
      type: "Podcast",
      title: "Recovering from Chronic Stress",
      author: "The Wellness Lab",
      readTime: "45 min audio",
      image: "https://picsum.photos/seed/podcast/400/250"
    },
    {
      type: "Guide",
      title: "Manager's Guide to Team Well-being",
      author: "Burnout AI Team",
      readTime: "20 min guide",
      image: "https://picsum.photos/seed/management/400/250"
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-12">
      <header className="text-center space-y-4">
        <h1 className="text-5xl font-black text-slate-900">Knowledge Hub</h1>
        <p className="text-slate-500 max-w-2xl mx-auto font-medium">Explore our curated library of articles, videos, and guides to help you maintain your professional well-being.</p>
      </header>

      <div className="relative max-w-xl mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input 
          type="text" 
          placeholder="Search for topics (e.g. sleep, boundaries, stress)..." 
          className="w-full pl-12 pr-4 py-4 rounded-2xl glass border-slate-200 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {resources.map((res, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass overflow-hidden rounded-[2rem] group cursor-pointer"
          >
            <div className="h-48 overflow-hidden relative">
              <img 
                src={res.image} 
                alt={res.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur text-xs font-bold text-primary uppercase tracking-wider">
                {res.type}
              </div>
            </div>
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-bold text-slate-800 leading-tight group-hover:text-primary transition-colors">
                {res.title}
              </h3>
              <div className="flex items-center justify-between text-sm font-medium text-slate-400">
                <span>{res.author}</span>
                <span>{res.readTime}</span>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-primary font-bold text-sm">Read More</span>
                <ExternalLink className="w-4 h-4 text-slate-300" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <section className="glass p-12 rounded-[3rem] bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Subscribe to our Newsletter</h2>
          <p className="text-slate-400 font-medium">Get weekly tips and research updates directly in your inbox.</p>
        </div>
        <div className="flex w-full md:w-auto gap-2">
          <input 
            type="email" 
            placeholder="your@email.com" 
            className="flex-1 md:w-64 px-6 py-4 rounded-2xl bg-white/10 border border-white/10 outline-none focus:ring-2 focus:ring-primary/50"
          />
          <button className="px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all">
            Join
          </button>
        </div>
      </section>
    </div>
  );
}
