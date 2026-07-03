function RecentJobs() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">

      <h2 className="mb-5 text-2xl font-bold">
        Recent Jobs
      </h2>

      <div className="space-y-4">

        <div className="rounded-xl border p-4">

          <h3 className="font-semibold">

            MERN Developer

          </h3>

          <p className="text-slate-500">

            Budget ₹15,000

          </p>

        </div>

        <div className="rounded-xl border p-4">

          <h3 className="font-semibold">

            UI Designer

          </h3>

          <p className="text-slate-500">

            Budget ₹8,000

          </p>

        </div>

      </div>

    </div>
  );
}

export default RecentJobs;