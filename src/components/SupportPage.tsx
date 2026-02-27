import { motion } from "motion/react";
import { MessageCircle, Mail, Phone, HelpCircle, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "How accurate is the burnout assessment?",
      a: "Our assessment is based on the Maslach Burnout Inventory (MBI) and refined using machine learning models trained on over 100,000 professional data points. While highly accurate for screening, it is not a clinical diagnosis."
    },
    {
      q: "Is my data private?",
      a: "Absolutely. We use end-to-end encryption. Your individual data is never shared with your employer or third parties without your explicit consent."
    },
    {
      q: "Can I use this for my entire team?",
      a: "Yes! We offer an Enterprise version that provides aggregated, anonymous insights for managers to improve team well-being without compromising individual privacy."
    },
    {
      q: "What should I do if I have a high risk score?",
      a: "Our platform provides immediate recommendations. However, we strongly suggest consulting with a mental health professional or your primary care physician."
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-20">
      <header className="text-center space-y-4">
        <h1 className="text-5xl font-black text-slate-900">How can we help?</h1>
        <p className="text-slate-500 font-medium">We're here to support your journey to professional well-being.</p>
      </header>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          { icon: <MessageCircle className="w-6 h-6" />, title: "Live Chat", desc: "Available 24/7", action: "Start Chat" },
          { icon: <Mail className="w-6 h-6" />, title: "Email Support", desc: "Response in 2h", action: "Send Email" },
          { icon: <Phone className="w-6 h-6" />, title: "Crisis Line", desc: "Immediate help", action: "Call Now" }
        ].map((item, i) => (
          <div key={i} className="glass p-8 rounded-3xl text-center space-y-4">
            <div className="p-4 bg-primary/10 text-primary rounded-2xl w-fit mx-auto">
              {item.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-800">{item.title}</h3>
            <p className="text-slate-500 text-sm font-medium">{item.desc}</p>
            <button className="w-full py-3 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-all">
              {item.action}
            </button>
          </div>
        ))}
      </div>

      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <HelpCircle className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold text-slate-900">Frequently Asked Questions</h2>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="glass overflow-hidden rounded-2xl border border-slate-100">
              <button 
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full p-6 text-left flex justify-between items-center hover:bg-slate-50/50 transition-colors"
              >
                <span className="font-bold text-slate-800">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === i && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="px-6 pb-6 text-slate-500 font-medium leading-relaxed"
                >
                  {faq.a}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="glass p-12 rounded-[3rem] text-center space-y-6">
        <h2 className="text-3xl font-bold text-slate-900">Still have questions?</h2>
        <p className="text-slate-500 font-medium max-w-xl mx-auto">Our support team is ready to assist you with any technical or clinical questions you might have about the platform.</p>
        <button className="px-10 py-4 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all">
          Contact Support Team
        </button>
      </section>
    </div>
  );
}
