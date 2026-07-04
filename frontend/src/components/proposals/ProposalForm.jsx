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
      toast.error(
        err.response?.data?.message ||
          "Submission Failed"
      );
    }
  };

  return (
    <form
      onSubmit={submit}
      className="space-y-4 rounded-2xl bg-white p-6 shadow"
    >
      <textarea
        name="coverLetter"
        value={form.coverLetter}
        onChange={handleChange}
        placeholder="Cover Letter"
        rows={5}
        className="w-full rounded border p-3"
      />

      <input
        type="number"
        name="bidAmount"
        value={form.bidAmount}
        onChange={handleChange}
        placeholder="Bid Amount"
        className="w-full rounded border p-3"
      />

      <input
        type="number"
        name="estimatedDays"
        value={form.estimatedDays}
        onChange={handleChange}
        placeholder="Estimated Days"
        className="w-full rounded border p-3"
      />

      <button className="w-full rounded-xl bg-blue-600 py-3 text-white">
        Submit Proposal
      </button>
    </form>
  );
}

export default ProposalForm;