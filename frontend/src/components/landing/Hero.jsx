import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white min-h-[90vh] flex items-center justify-center">
      
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-900/40 via-slate-900 to-indigo-900/40 z-0" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-600/20 rounded-full blur-[100px] animate-pulse z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[100px] animate-pulse delay-1000 z-0" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-center px-6 text-center">

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
        >
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="text-sm font-medium text-slate-300">The premier platform for top talent</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight"
        >
          Intelligent Hyperlocal <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-400">
            Freelance Ecosystem
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-8 max-w-2xl text-lg md:text-xl text-slate-400"
        >
          SkillSphere connects clients with verified local professionals using AI-powered job matching, milestone payments, and real-time collaboration.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row gap-5"
        >
          <Link
            to="/register"
            className="rounded-full bg-white px-8 py-4 font-bold text-slate-900 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-white/20 active:scale-95"
          >
            Get Started
          </Link>

          <Link
            to="/browse-gigs"
            className="flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm px-8 py-4 font-bold text-white transition-all duration-300 hover:bg-white/10 hover:border-white/40 active:scale-95"
          >
            Browse Jobs
            <ArrowRight size={20}/>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}

export default Hero;