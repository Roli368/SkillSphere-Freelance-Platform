import { ArrowUpRight } from "lucide-react";

function StatCard({ title, value, icon }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md hover:shadow-xl transition">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {value}
          </h2>

        </div>

        <div className="rounded-xl bg-blue-100 p-4 text-blue-600">

          {icon}

        </div>

      </div>

      <div className="mt-5 flex items-center text-green-600">

        <ArrowUpRight size={18} />

        <span className="ml-2 text-sm">
          +12% this month
        </span>

      </div>

    </div>
  );
}

export default StatCard;