import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import GigList from "../../components/gigs/GigList";
import { getFavorites } from "../../services/favoriteApi";

function Favorites() {
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const { data } = await getFavorites();

      setGigs(
        data.data.map((item) => item.gig)
      );
    } catch {
      toast.error("Unable to load favorites");
    }
  };

  return (
    <div className="mx-auto max-w-7xl p-8">

      <h1 className="mb-8 text-4xl font-bold">
        Saved Gigs ❤️
      </h1>

      <GigList gigs={gigs} />

    </div>
  );
}

export default Favorites;