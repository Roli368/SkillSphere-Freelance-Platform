import ProposalCard from "./ProposalCard";

function ProposalList({
  proposals,
  isClient,
  onAccept,
  onReject,
}) {
  if (!proposals?.length) {
    return (
      <div className="py-20 text-center text-xl">
        No Proposals Found
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {proposals.map((proposal) => (
        <ProposalCard
          key={proposal._id}
          proposal={proposal}
          isClient={isClient}
          onAccept={onAccept}
          onReject={onReject}
        />
      ))}

    </div>
  );
}

export default ProposalList;