import { Link } from "react-router-dom";

function Logo({ showText = true }) {
  return (
    <Link
      to="/"
      className="flex items-center gap-3 group"
    >
      <div className="relative flex items-center justify-center p-0.5 rounded-xl shadow-lg shadow-brand-500/10 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
        <img src="/logo.png" alt="SkillSphere Logo" className="w-8 h-8 md:w-10 md:h-10 object-contain rounded-lg" />
      </div>
      {showText && (
        <span className="text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-indigo-600 dark:from-brand-400 dark:to-indigo-400 tracking-tight transition-colors duration-300">
          SkillSphere
        </span>
      )}
    </Link>
  );
}

export default Logo;