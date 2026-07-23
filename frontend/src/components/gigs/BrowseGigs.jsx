import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import GigList from "../../components/gigs/GigList";

import {
  gigStart,
  gigFailure,
  setGigs,
} from "../../redux/slices/gigSlice";

import { getAllGigs } from "../../services/gigApi";

function BrowseGigs() {
  const dispatch = useDispatch();

  const { gigs, loading } = useSelector(
    (state) => state.gig
  );

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        dispatch(gigStart());

        const { data } = await getAllGigs();

        dispatch(setGigs(data.data));
      } catch (err) {
        dispatch(
          gigFailure(
            err.response?.data?.message ||
              "Failed to load gigs"
          )
        );
      }
    };

    fetchGigs();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-8">

      <h1 className="mb-8 text-4xl font-bold">
        Browse Gigs
      </h1>

      <GigList gigs={gigs} />

    </div>
  );
}

export default BrowseGigs;