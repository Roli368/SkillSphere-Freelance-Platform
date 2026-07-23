import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Bell, CheckCircle2, CheckCircle } from "lucide-react";

import {
  getNotifications,
  markAsRead,
  markAllAsRead,
} from "../../services/notificationApi";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadNotifications = async () => {
    try {
      const { data } = await getNotifications();
      setNotifications(data.data);
    } catch {
      toast.error("Unable to load notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleRead = async (id) => {
    await markAsRead(id);
    loadNotifications();
  };

  const handleReadAll = async () => {
    await markAllAsRead();
    toast.success("All notifications marked as read");
    loadNotifications();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-5xl p-8"
    >
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2 flex items-center gap-3">
            <Bell className="text-brand-500" size={32} />
            Notifications
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Stay updated with your latest alerts and messages.
          </p>
        </div>

        {notifications.some((n) => !n.read) && (
          <button
            onClick={handleReadAll}
            className="flex items-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 px-5 py-2.5 font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <CheckCircle2 size={18} />
            Mark All Read
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div>
        </div>
      ) : notifications.length === 0 ? (
        <div className="rounded-3xl bg-white dark:bg-slate-900 p-16 text-center shadow-sm border border-slate-200 dark:border-slate-800 transition-colors">
          <div className="w-20 h-20 mx-auto bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
            <Bell size={32} className="text-slate-300 dark:text-slate-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            No Notifications
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            You're all caught up! Take a break or browse some new gigs. 🎉
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((item) => (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              key={item._id}
              className={`rounded-2xl border p-6 transition-all duration-300 ${
                item.read
                  ? "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm"
                  : "bg-brand-50 dark:bg-brand-900/20 border-brand-200 dark:border-brand-800/50 shadow-md"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {!item.read && (
                      <span className="flex h-2 w-2 rounded-full bg-brand-500 shrink-0"></span>
                    )}
                    <h2 className={`text-lg font-bold break-words ${item.read ? "text-slate-800 dark:text-slate-200" : "text-slate-900 dark:text-white"}`}>
                      {item.title}
                    </h2>
                  </div>
                  
                  <p className={`mt-2 break-words ${item.read ? "text-slate-600 dark:text-slate-400" : "text-slate-700 dark:text-slate-300"} leading-relaxed`}>
                    {item.message}
                  </p>

                  <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    {new Date(item.createdAt).toLocaleString(undefined, {
                      year: 'numeric', month: 'long', day: 'numeric',
                      hour: '2-digit', minute: '2-digit'
                    })}
                  </p>
                </div>

                {!item.read && (
                  <button
                    onClick={() => handleRead(item._id)}
                    className="flex items-center gap-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 px-4 py-2 text-sm font-semibold hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-colors shrink-0"
                  >
                    <CheckCircle size={16} />
                    Mark Read
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default Notifications;