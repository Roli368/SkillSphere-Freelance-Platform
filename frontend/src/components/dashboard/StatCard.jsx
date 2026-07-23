function StatCard({
  title,
  value,
  color = "text-blue-600",
}) {
  return (
    <div className="rounded-3xl bg-white dark:bg-slate-900 p-8 shadow-sm border border-slate-200 dark:border-slate-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <p className="text-slate-500 dark:text-slate-400 font-medium tracking-wide text-sm uppercase">
        {title}
      </p>
      <h2 className={`mt-3 text-5xl font-extrabold ${color}`}>
        {value}
      </h2>
    </div>
  );
}

export default StatCard;