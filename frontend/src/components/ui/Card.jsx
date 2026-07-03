function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl bg-white shadow-xl p-8 ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;