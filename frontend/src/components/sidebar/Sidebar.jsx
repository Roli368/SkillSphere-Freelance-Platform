import {
  LayoutDashboard,
  User,
  Briefcase,
  PlusSquare,
  FileText,
  MessageCircle,
  Settings,
  LogOut,
  Bell,
  Heart,
  X
} from "lucide-react";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import SidebarItem from "./SidebarItem";
import SidebarHeader from "./SidebarHeader";

import { logout } from "../../redux/slices/authSlice";
import { logoutUser } from "../../services/authApi";
import toast from "react-hot-toast";

function Sidebar({ onClose, isCollapsed, onToggleCollapse }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (onClose) onClose();
    try {
      await logoutUser();
    } catch (err) {
      console.log("Logout API failed", err);
    }
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <aside className={`flex h-screen flex-col bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl text-slate-800 dark:text-slate-300 border-r border-slate-200/50 dark:border-slate-800/50 shadow-[4px_0_24px_rgba(0,0,0,0.02)] dark:shadow-[4px_0_24px_rgba(0,0,0,0.2)] transition-all duration-300 ${isCollapsed ? 'w-24' : 'w-72'}`}>
      
      <div className="flex items-center justify-between relative z-10">
        <SidebarHeader isCollapsed={isCollapsed} onToggleCollapse={onToggleCollapse} />
        {onClose && (
          <button onClick={onClose} className="lg:hidden p-2 mr-4 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <X size={20} />
          </button>
        )}
      </div>

      <div className={`flex-1 overflow-y-auto custom-scrollbar space-y-1.5 py-6 relative z-10 ${isCollapsed ? 'px-3' : 'px-4'}`}>

        {/* Common */}
        <SidebarItem isCollapsed={isCollapsed} to="/dashboard" icon={<LayoutDashboard size={20} />} text="Dashboard" onClick={onClose} />
        <SidebarItem isCollapsed={isCollapsed} to="/profile" icon={<User size={20} />} text="Profile" onClick={onClose} />
        <SidebarItem isCollapsed={isCollapsed} to="/browse-gigs" icon={<Briefcase size={20} />} text="Browse Gigs" onClick={onClose} />

        {/* Client */}
        {user?.role === "client" && (
          <>
            {!isCollapsed && (
              <div className="pt-4 pb-2 px-3 transition-opacity duration-300">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Client Actions</p>
              </div>
            )}
            {isCollapsed && <div className="h-4"></div>}
            <SidebarItem isCollapsed={isCollapsed} to="/create-gig" icon={<PlusSquare size={20} />} text="Create Gig" onClick={onClose} />
            <SidebarItem isCollapsed={isCollapsed} to="/my-gigs" icon={<FileText size={20} />} text="My Gigs" onClick={onClose} />
          </>
        )}

        {/* Freelancer */}
        {user?.role === "freelancer" && (
          <>
            {!isCollapsed && (
              <div className="pt-4 pb-2 px-3 transition-opacity duration-300">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Freelancer Actions</p>
              </div>
            )}
            {isCollapsed && <div className="h-4"></div>}
            <SidebarItem isCollapsed={isCollapsed} to="/my-proposals" icon={<FileText size={20} />} text="My Proposals" onClick={onClose} />
          </>
        )}

        {!isCollapsed && (
          <div className="pt-4 pb-2 px-3 transition-opacity duration-300">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Personal</p>
          </div>
        )}
        {isCollapsed && <div className="h-4"></div>}
        
        {/* Common */}
        <SidebarItem isCollapsed={isCollapsed} to="/favorites" icon={<Heart size={20} />} text="Saved Gigs" onClick={onClose} />
        <SidebarItem isCollapsed={isCollapsed} to="/notifications" icon={<Bell size={20} />} text="Notifications" onClick={onClose} />
        <SidebarItem isCollapsed={isCollapsed} to="/messages" icon={<MessageCircle size={20} />} text="Messages" onClick={onClose} />
        <SidebarItem isCollapsed={isCollapsed} to="/settings" icon={<Settings size={20} />} text="Settings" onClick={onClose} />

      </div>

      <div className={`border-t border-slate-200/50 dark:border-slate-800/50 p-4 shrink-0 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col ${isCollapsed ? 'items-center' : ''}`}>
        
        {/* Mini User Profile Card */}
        <div className={`flex items-center gap-3 mb-4 ${isCollapsed ? 'px-0' : 'px-2'}`}>
           <img
              src={user?.avatar || "https://i.pravatar.cc/100"}
              alt="Avatar"
              className="w-10 h-10 rounded-full object-cover border-2 border-brand-500/20 shrink-0"
            />
            {!isCollapsed && (
              <div className="flex-1 min-w-0 transition-opacity duration-300">
                <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{user?.fullName || "User"}</p>
                <p className="text-xs font-medium text-brand-600 dark:text-brand-400 capitalize truncate">{user?.role}</p>
              </div>
            )}
        </div>

        <button
          onClick={handleLogout}
          title="Sign Out"
          className={`flex items-center rounded-xl py-3 transition-all duration-300 hover:bg-rose-50 dark:hover:bg-rose-500/10 text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 font-semibold ${isCollapsed ? 'w-12 justify-center px-0' : 'w-full gap-3 px-4'}`}
        >
          <LogOut size={20} className="shrink-0" />
          {!isCollapsed && <span className="transition-opacity duration-300">Sign Out</span>}
        </button>
      </div>

    </aside>
  );
}

export default Sidebar;