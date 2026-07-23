import { UserCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import { uploadAvatar } from "../../services/authApi";

function ProfileHeader({ user }) {
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("avatar", file);

    try {
      setLoading(true);

      await uploadAvatar(formData);

      toast.success(
        "Profile picture updated"
      );

      window.location.reload();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Upload failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors duration-300">
      
      {/* Banner Gradient */}
      <div className="h-40 w-full bg-gradient-to-r from-brand-400 via-brand-500 to-brand-600"></div>

      <div className="px-8 pb-8">
        <div className="flex flex-col md:flex-row gap-6 md:items-end -mt-16 md:-mt-20">
          
          <div className="relative inline-block rounded-full p-1.5 bg-white dark:bg-slate-900">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.fullName}
                className="h-32 w-32 rounded-full object-cover border-4 border-slate-50 dark:border-slate-800"
              />
            ) : (
              <UserCircle
                size={128}
                className="text-slate-300 dark:text-slate-600 bg-white dark:bg-slate-800 rounded-full"
              />
            )}
          </div>

          <div className="flex-1 mt-4 md:mt-0">
            <h1 className="text-3xl font-bold dark:text-white">
              {user?.fullName}
            </h1>
            <p className="mt-1 text-slate-500 dark:text-slate-400 font-medium">
              {user?.email}
            </p>
            <p className="mt-1 inline-block px-3 py-1 bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 rounded-full text-sm font-semibold capitalize tracking-wide">
              {user?.role}
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <label className="inline-flex items-center justify-center cursor-pointer rounded-full px-6 py-2.5 btn-primary">
              {loading ? "Uploading..." : "Change Picture"}
              <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="hidden"
              />
            </label>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;