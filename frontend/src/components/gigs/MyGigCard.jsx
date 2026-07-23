import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import GigList from "../../components/gigs/GigList";

import {
  gigStart,
  gigFailure,
  setMyGigs,
} from "../../redux/slices/gigSlice";

import { getMyGigs } from "../../services/gigApi";

function MyGigs() {
  const dispatch = useDispatch();

  const { myGigs, loading } = useSelector(
    (state) => state.gig
  );

  useEffect(() => {
    const fetchMyGigs = async () => {
      try {
        dispatch(gigStart());

        const { data } = await getMyGigs();

        dispatch(setMyGigs(data.data));
      } catch (err) {
        dispatch(
          gigFailure(
            err.response?.data?.message ||
              "Failed to load gigs"
          )
        );
      }
    };

    fetchMyGigs();
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
        My Gigs
      </h1>

      <GigList gigs={myGigs} />

    </div>
  );
}

export default MyGigs;