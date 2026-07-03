import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white">
      <div className="mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-center px-6 text-center">

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-6xl font-extrabold leading-tight"
        >
          Hire Top Freelancers
          <br />
          Build Amazing Projects
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .3 }}
          className="mt-8 max-w-2xl text-lg text-slate-100"
        >
          SkillSphere connects talented freelancers with
          clients across the globe.
        </motion.p>

        <div className="mt-10 flex gap-5">

          <Link
            to="/register"
            className="rounded-xl bg-white px-7 py-4 font-semibold text-blue-700 hover:scale-105 transition"
          >
            Get Started
          </Link>

          <Link
            to="/browse-gigs"
            className="flex items-center gap-2 rounded-xl border border-white px-7 py-4 hover:bg-white hover:text-blue-700 transition"
          >
            Browse Jobs
            <ArrowRight size={20}/>
          </Link>

        </div>

      </div>
    </section>
  );
}

export default Hero;