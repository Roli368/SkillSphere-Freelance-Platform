import { useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { User, Shield, Bell, CreditCard, HelpCircle } from "lucide-react";

import { changePassword } from "../../services/settingsApi";

function Settings() {
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("Security");

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await changePassword(form);
      toast.success("Password Updated");
      setForm({
        currentPassword: "",
        newPassword: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Update Failed");
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { name: "Account", icon: User },
    { name: "Security", icon: Shield },
    { name: "Notifications", icon: Bell },
    { name: "Billing", icon: CreditCard },
  ];

  return (
    <div className="mx-auto max-w-6xl p-8 pb-24">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">Settings</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400 text-lg">Manage your account preferences and settings.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Navigation */}
        <aside className="lg:w-72 flex-shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.name;
              return (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 text-left text-sm font-semibold rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <Icon size={20} className={isActive ? "text-brand-600 dark:text-brand-400" : "text-slate-400 dark:text-slate-500"} />
                  {tab.name}
                </button>
              );
            })}
          </nav>
          
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
            <button className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              <HelpCircle size={20} />
              Help Center
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 min-w-0">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="rounded-3xl bg-white dark:bg-slate-900 p-10 shadow-sm border border-slate-200 dark:border-slate-800 transition-colors"
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">{activeTab} Settings</h2>
            
            {activeTab === "Security" && (
              <div className="max-w-md">
                <p className="text-slate-500 dark:text-slate-400 mb-6">
                  Ensure your account is using a long, random password to stay secure.
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={form.currentPassword}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-4 text-slate-900 dark:text-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      value={form.newPassword}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-4 text-slate-900 dark:text-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all outline-none"
                    />
                  </div>

                  <button
                    disabled={loading}
                    className="w-full rounded-2xl bg-gradient-to-r from-brand-600 to-brand-500 py-4 text-lg font-bold text-white shadow-sm transition hover:shadow-md hover:shadow-brand-500/20 active:scale-95 disabled:opacity-70 disabled:pointer-events-none"
                  >
                    {loading ? "Updating..." : "Update Password"}
                  </button>
                </form>
              </div>
            )}

            {activeTab === "Account" && (
              <div className="max-w-2xl space-y-8">
                <div className="flex items-center gap-6">
                  <img src={user?.avatar || "https://i.pravatar.cc/100"} alt="Avatar" className="w-24 h-24 rounded-full border-4 border-slate-100 dark:border-slate-800 object-cover" />
                  <div>
                    <button className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      Change Avatar
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                    <input type="text" readOnly value={user?.fullName || ""} className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 p-4 text-slate-500 dark:text-slate-400 opacity-70 cursor-not-allowed outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                    <input type="email" readOnly value={user?.email || ""} className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 p-4 text-slate-500 dark:text-slate-400 opacity-70 cursor-not-allowed outline-none" />
                  </div>
                </div>
              </div>
            )}

            {(activeTab === "Notifications" || activeTab === "Billing") && (
              <div className="flex flex-col items-center justify-center py-16 text-slate-500 dark:text-slate-400">
                <Bell size={48} className="mb-4 text-slate-300 dark:text-slate-600" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{activeTab}</h3>
                <p>This section is currently under construction.</p>
              </div>
            )}

          </motion.div>
        </main>
      </div>
    </div>
  );
}

export default Settings;