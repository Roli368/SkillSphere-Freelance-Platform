function Select({
  label,
  error,
  register,
  children,
}) {
  return (
    <div className="space-y-2">

      <label className="font-semibold">
        {label}
      </label>

      <select
        {...register}
        className={`w-full rounded-xl border px-4 py-3

        ${
          error
            ? "border-red-500"
            : "border-slate-300"
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