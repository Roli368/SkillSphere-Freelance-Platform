function Textarea({
  label,
  placeholder,
  error,
  register,
}) {
  return (
    <div className="space-y-2">

      <label className="font-semibold">
        {label}
      </label>

      <textarea
        rows={5}
        placeholder={placeholder}
        {...register}
        className={`w-full rounded-xl border px-4 py-3

        ${
          error
            ? "border-red-500"
            : "border-slate-300"
        }`}
      />

      {error && (
        <p className="text-red-600 text-sm">
          {error.message}
        </p>
      )}

    </div>
  );
}

export default Textarea;