import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import GigForm from "../../components/gigs/GigForm";
import { getGig } from "../../services/gigApi";

function EditGig() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGig = async () => {
      try {
        const { data } = await getGig(id);
        setGig(data.data);
      } catch (err) {
        toast.error("Unable to load gig.");
        navigate("/my-gigs");
      } finally {
        setLoading(false);
      }
    };
    fetchGig();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-10 h-10 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <GigForm gigData={gig} />
    </div>
  );
}

export default EditGig;