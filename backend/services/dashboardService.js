import Gig from "../models/Gig.js";
import Proposal from "../models/Proposal.js";

export const getDashboard = async (
user
)=>{

if(user.role==="client"){

const totalGigs=
await Gig.countDocuments({
client:user._id
});

const openGigs=
await Gig.countDocuments({
client:user._id,
status:"Open"
});

const proposals =
await Proposal.countDocuments({
  gig: {
    $in: (
      await Gig.find({
        client: user._id,
      }).select("_id")
    ).map((g) => g._id),
  },
});

return{
totalGigs,
openGigs,
proposals
};

}

const applied=
await Proposal.countDocuments({
freelancer:user._id
});

const accepted=
await Proposal.countDocuments({
freelancer:user._id,
status:"Accepted"
});

return{
applied,
accepted
};

};