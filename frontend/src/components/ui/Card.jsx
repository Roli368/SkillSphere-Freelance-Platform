function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-3xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 p-8 transition-colors duration-300 ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;