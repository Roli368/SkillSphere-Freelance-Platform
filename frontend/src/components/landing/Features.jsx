import {
  Briefcase,
  ShieldCheck,
  Wallet,
} from "lucide-react";

const features = [
  {
    icon: <Briefcase size={40} />,
    title: "AI-Powered Matching",
    desc: "Our HuggingFace AI algorithm matches you with the best gigs based on skill similarity and trending requirements."
  },
  {
    icon: <Wallet size={40} />,
    title: "Secure Escrow Payments",
    desc: "Payments are protected via Stripe/Razorpay integration with milestone-based automatic payouts."
  },
  {
    icon: <ShieldCheck size={40} />,
    title: "Real-Time Collaboration",
    desc: "Built-in Socket.IO messaging with file sharing, typing indicators, and seamless dispute resolution."
  }
];

function Features() {
  return (
    <section className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300 relative overflow-hidden">
      
      {/* Decorative gradient */}
      <div className="absolute top-0 inset-x-0 h-px w-full bg-gradient-to-r from-transparent via-brand-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <div className="text-center mb-16">
          <span className="text-brand-600 dark:text-brand-400 font-bold uppercase tracking-wider text-sm block mb-2">Why Choose Us</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            Why SkillSphere?
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">

          {features.map((item,index)=>(
            <div
              key={index}
              className="group rounded-3xl bg-slate-50 dark:bg-slate-800/50 p-10 border border-slate-200/50 dark:border-slate-700/50 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-brand-300 dark:hover:border-brand-700/50 transition-all duration-300"
            >

              <div className="inline-flex p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-sm text-brand-600 dark:text-brand-400 group-hover:scale-110 transition-transform duration-300 border border-slate-100 dark:border-slate-700">
                {item.icon}
              </div>

              <h3 className="mt-8 text-2xl font-bold text-slate-900 dark:text-white">
                {item.title}
              </h3>

              <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                {item.desc}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default Features;