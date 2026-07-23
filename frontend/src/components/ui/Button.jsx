function Button({
  children,
  type = "button",
  onClick,
  disabled = false,
  variant = "primary",
  className = "",
}) {
  const variants = {
    primary:
      "bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-brand-500/20 hover:shadow-brand-500/40",

    secondary:
      "bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-slate-200/20",

    danger:
      "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-red-500/20 hover:shadow-red-500/40",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full rounded-xl px-5 py-3 font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95 disabled:opacity-60 disabled:hover:translate-y-0 disabled:active:scale-100 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;