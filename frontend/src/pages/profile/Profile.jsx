import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileInfo from "../../components/profile/ProfileInfo";
import ReviewList from "../../components/reviews/ReviewList";

import { getReviews } from "../../services/reviewApi";
import { getMyFreelancerProfile } from "../../services/freelancerApi";

function Profile() {
  const { user } = useSelector((state) => state.auth);
  const [reviews, setReviews] = useState([]);
  const [freelancerProfile, setFreelancerProfile] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      if (!user?._id && !user?.id) return;

      try {
        const reviewRes = await getReviews(user._id || user.id);
        setReviews(reviewRes.data.data);

        if (user?.role === "freelancer") {
          const profileRes = await getMyFreelancerProfile();
          setFreelancerProfile(profileRes.data.data);
        }
      } catch (err) {
        toast.error("Unable to load profile data");
      }
    };

    loadData();
  }, [user]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <ProfileHeader user={user} />
      <ProfileInfo user={user} freelancerProfile={freelancerProfile} />

      <div className="rounded-3xl bg-white dark:bg-slate-900 p-8 shadow-sm border border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
          Reviews
        </h2>

        {reviews.length > 0 ? (
          <ReviewList reviews={reviews} />
        ) : (
          <p className="text-slate-500 dark:text-slate-400">
            No reviews yet.
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default Profile;