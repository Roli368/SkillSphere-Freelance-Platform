import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import { dashboardStats } from "../../services/dashboardApi";
import StatCard from "../../components/dashboard/StatCard";

function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await dashboardStats();
        setStats(data.data);
      } catch (err) {
        toast.error(
          err.response?.data?.message || "Dashboard Failed"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center text-xl font-medium text-slate-500 dark:text-slate-400">
        Loading Dashboard...
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8 p-8"
    >
      <motion.h1 variants={itemVariants} className="text-4xl font-bold dark:text-white">
        Welcome back, {user?.fullName?.split(' ')[0]} 👋
      </motion.h1>

      <motion.div variants={itemVariants}>
        {user?.role === "client" ? (
          <div className="grid gap-6 md:grid-cols-3">
            <StatCard
              title="Total Gigs"
              value={stats.totalGigs || 0}
              color="text-brand-600 dark:text-brand-400"
            />
            <StatCard
              title="Open Gigs"
              value={stats.openGigs || 0}
              color="text-emerald-600 dark:text-emerald-400"
            />
            <StatCard
              title="Total Proposals"
              value={stats.proposals || 0}
              color="text-indigo-600 dark:text-indigo-400"
            />
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            <StatCard
              title="Applied Jobs"
              value={stats.applied || 0}
              color="text-brand-600 dark:text-brand-400"
            />
            <StatCard
              title="Accepted Jobs"
              value={stats.accepted || 0}
              color="text-emerald-600 dark:text-emerald-400"
            />
          </div>
        )}
      </motion.div>

      <motion.div variants={itemVariants} className="rounded-3xl bg-white dark:bg-slate-900 p-8 shadow-sm border border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <h2 className="mb-4 text-2xl font-bold dark:text-white">
          Recent Activity
        </h2>
        <div className="py-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
          <p className="text-slate-500 dark:text-slate-400">
            More dashboard widgets (recent gigs, proposals, notifications) will be added here.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Dashboard;