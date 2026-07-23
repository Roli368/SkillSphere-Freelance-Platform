import { useState } from "react";
import toast from "react-hot-toast";

import { applyProposal } from "../../services/proposalApi";

function ProposalForm({ gigId }) {
  const [form, setForm] = useState({
    coverLetter: "",
    bidAmount: "",
    estimatedDays: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      await applyProposal(gigId, form);

      toast.success("Proposal Submitted");

      setForm({
        coverLetter: "",
        bidAmount: "",
        estimatedDays: "",
      });
    } catch (err) {
      const data = err.response?.data;
      let errorMessage = data?.message || "Submission Failed";
      
      if (data?.errors && Object.keys(data.errors).length > 0) {
        errorMessage = Object.values(data.errors)[0];
      }

      toast.error(errorMessage);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="space-y-6 rounded-3xl bg-slate-50/50 dark:bg-slate-800/50 p-8 border border-slate-200 dark:border-slate-700/50 transition-colors"
    >
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
          Cover Letter
        </label>
        <textarea
          name="coverLetter"
          value={form.coverLetter}
          onChange={handleChange}
          placeholder="Why are you the best fit for this gig?"
          rows={5}
          className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 text-slate-900 dark:text-white focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/10 transition-all placeholder:text-slate-400 resize-none custom-scrollbar"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
            Bid Amount (₹)
          </label>
          <input
            type="number"
            name="bidAmount"
            value={form.bidAmount}
            onChange={handleChange}
            placeholder="e.g. 5000"
            className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 text-slate-900 dark:text-white focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/10 transition-all placeholder:text-slate-400"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
            Estimated Delivery (Days)
          </label>
          <input
            type="number"
            name="estimatedDays"
            value={form.estimatedDays}
            onChange={handleChange}
            placeholder="e.g. 7"
            className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 text-slate-900 dark:text-white focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/10 transition-all placeholder:text-slate-400"
          />
        </div>
      </div>

      <button className="w-full rounded-2xl bg-gradient-to-r from-brand-600 to-brand-500 py-4 text-lg font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md hover:shadow-brand-500/20 active:scale-95">
        Submit Proposal
      </button>
    </form>
  );
}

export default ProposalForm;