function DeleteModal({
  open,
  onClose,
  onDelete,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">

      <div className="w-96 rounded-2xl bg-white p-8">

        <h2 className="mb-4 text-2xl font-bold">
          Delete Gig
        </h2>

        <p className="mb-8">
          Are you sure you want to delete
          this gig?
        </p>

        <div className="flex justify-end gap-4">

          <button
            onClick={onClose}
            className="rounded-xl border px-5 py-2"
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            className="rounded-xl bg-red-600 px-5 py-2 text-white"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeleteModal;