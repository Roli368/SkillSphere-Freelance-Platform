import { useState, useEffect } from "react";
import { Shield, ShieldAlert, CheckCircle, Ban, RefreshCw, Mail, Search } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { getPlatformUsers, suspendUserAccount, verifyFreelancerAccount } from "../../services/adminApi";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchUsers = async () => {
    try {
      const { data } = await getPlatformUsers();
      setUsers(data);
    } catch (err) {
      toast.error("Failed to load platform users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSuspend = async (id, currentStatus) => {
    try {
      await suspendUserAccount(id);
      setUsers(users.map(u => u._id === id ? { ...u, isActive: !currentStatus } : u));
      toast.success(currentStatus ? "User suspended" : "User reactivated");
    } catch (err) {
      toast.error("Action failed");
    }
  };

  const handleVerify = async (id) => {
    try {
      await verifyFreelancerAccount(id);
      setUsers(users.map(u => u._id === id ? { ...u, isVerified: true } : u));
      toast.success("Freelancer verified successfully");
    } catch (err) {
      toast.error("Verification failed");
    }
  };

  const filteredUsers = users.filter((user) => 
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-7xl p-4 md:p-8"
    >
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2 flex items-center gap-3">
          <Shield className="text-brand-500" size={36} /> User Management
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Control platform access, verify freelancer accounts, and maintain marketplace safety.
        </p>
      </div>

      <div className="rounded-3xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-50/50 dark:bg-slate-800/20">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 py-2.5 pl-11 pr-4 outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 dark:text-slate-200 transition-all"
            />
          </div>
          <button 
            onClick={() => { setLoading(true); fetchUsers(); }}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
          >
            <RefreshCw size={16} /> Refresh Data
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-10 h-10 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-bold">
                  <th className="p-4 pl-6">User</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Verification</th>
                  <th className="p-4 text-right pr-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-10 text-slate-500">No users found matching your search.</td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={user.avatar || "https://i.pravatar.cc/100"}
                            alt=""
                            className="w-10 h-10 rounded-full bg-slate-200 object-cover border border-slate-200 dark:border-slate-700"
                          />
                          <div>
                            <p className="font-bold text-slate-900 dark:text-white">{user.fullName}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
                              <Mail size={12} /> {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border ${
                          user.role === 'freelancer' ? 'bg-indigo-50 text-indigo-600 border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20' : 
                          user.role === 'admin' ? 'bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20' : 
                          'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="p-4">
                        {user.isActive ? (
                          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-rose-600 dark:text-rose-400">
                            <ShieldAlert size={16} /> Suspended
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        {user.isVerified ? (
                          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                            <CheckCircle size={16} /> Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-600 dark:text-amber-400">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Pending
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-right pr-6">
                        <div className="flex items-center justify-end gap-2">
                          
                          {user.role === "freelancer" && !user.isVerified && (
                            <button
                              onClick={() => handleVerify(user._id)}
                              className="px-3 py-1.5 bg-brand-50 hover:bg-brand-100 dark:bg-brand-500/10 dark:hover:bg-brand-500/20 text-brand-600 dark:text-brand-400 text-sm font-bold rounded-lg transition-colors flex items-center gap-1.5"
                            >
                              <CheckCircle size={14} /> Verify
                            </button>
                          )}

                          {user.role !== "admin" && (
                            <button
                              onClick={() => handleSuspend(user._id, user.isActive)}
                              className={`px-3 py-1.5 text-sm font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
                                user.isActive 
                                  ? 'bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 dark:bg-slate-800 dark:hover:bg-rose-500/10 dark:text-slate-400 dark:hover:text-rose-400' 
                                  : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/20'
                              }`}
                            >
                              {user.isActive ? <><Ban size={14} /> Suspend</> : <><RefreshCw size={14} /> Restore</>}
                            </button>
                          )}
                          
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default ManageUsers;
