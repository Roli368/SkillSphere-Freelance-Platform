import { useEffect } from "react";
import { getMyProposals } from "../../services/proposalApi";

function MyProposals() {
  useEffect(() => {
    getMyProposals().then(console.log);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">
        My Proposals
      </h1>
    </div>
  );
}

export default MyProposals;