function Select({
  label,
  error,
  register,
  children,
}) {
  return (
    <div className="space-y-2">

      <label className="font-semibold text-slate-700 dark:text-slate-300">
        {label}
      </label>

      <select
        {...register}
        className={`w-full rounded-xl border bg-white dark:bg-slate-900 px-4 py-3 text-slate-900 dark:text-slate-100 transition-colors duration-300
        ${
          error
            ? "border-red-500 focus:ring-2 focus:ring-red-500/50 outline-none"
            : "border-slate-300 dark:border-slate-700 input-focus"
        }`}
      >
        {children}
      </select>

      {error && (
        <p className="text-red-600 text-sm">
          {error.message}
        </p>
      )}

    </div>
  );
}

export default Select;