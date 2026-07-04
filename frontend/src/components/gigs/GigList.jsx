import GigCard from "./GigCard";

function GigList({ gigs }) {
  if (!gigs?.length) {
    return (
      <div className="py-20 text-center text-xl">
        No Gigs Found
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

      {gigs.map((gig) => (
        <GigCard
          key={gig._id}
          gig={gig}
        />
      ))}

    </div>
  );
}

export default GigList;