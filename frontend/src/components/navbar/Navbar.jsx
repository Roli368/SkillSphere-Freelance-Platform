import {
  Bell,
  Search,
  Moon,
  Sun,
  Menu,
  X
} from "lucide-react";

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { getUnreadCount } from "../../services/notificationApi";
import { useTheme } from "../../context/ThemeContext";
import { getSocket } from "../../services/socket";
import Logo from "../ui/Logo";
import NotificationBell from "../notifications/NotificationBell";

function Navbar({ onMenuClick }) {
  const { user } = useSelector((state) => state.auth);
  const { theme, toggleTheme } = useTheme();
  const [count, setCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await getUnreadCount();
        setCount(data.data.count);
      } catch {}
    };

    if (user) {
      load();

      const socket = getSocket();
      socket.connect();
      socket.emit("join", user._id || user.id);

      const handleNotification = () => {
        setCount((prev) => prev + 1);
      };

      socket.on("newNotification", handleNotification);

      return () => {
        socket.off("newNotification", handleNotification);
      };
    }
  }, [user]);

  const handleHamburgerClick = () => {
    if (onMenuClick) {
      onMenuClick();
    } else {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    }
  };

  return (
    <>
      <header className="flex h-20 items-center justify-between border-b border-slate-200/50 dark:border-slate-800/50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl px-4 md:px-8 sticky top-0 z-40 transition-colors duration-300">
        
        {/* Left side - Logo & Menu */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <button 
            onClick={handleHamburgerClick}
            className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {isMobileMenuOpen && !onMenuClick ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Show logo if NOT in dashboard OR if on mobile */}
          <div className={onMenuClick ? "lg:hidden" : "block"}>
            <Logo />
          </div>
        </div>

        {/* Center - Search Bar (Only visible in Dashboard or optionally globally) */}
        {user && (
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-slate-400 group-focus-within:text-brand-500 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search for gigs, freelancers..."
                className="block w-full pl-10 pr-4 py-2.5 bg-slate-100/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-full text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all duration-300"
              />
            </div>
          </div>
        )}

        {/* Right side */}
        <div className="flex items-center gap-3 md:gap-5 flex-shrink-0">
          
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors hidden sm:block"
            title="Toggle Theme"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {user ? (
            <div className="flex items-center gap-4">
              <NotificationBell userId={user._id || user.id} />

              <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block"></div>

              <Link to="/profile" className="flex items-center gap-3 group">
                <img
                  src={user?.avatar || "https://i.pravatar.cc/100"}
                  alt={user?.fullName || "User"}
                  className="h-10 w-10 rounded-full object-cover border-2 border-transparent group-hover:border-brand-500 transition-colors shadow-sm"
                />
              </Link>
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-4">
              <Link
                to="/login"
                className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors px-4 py-2"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="text-sm font-bold bg-brand-600 text-white px-6 py-2.5 rounded-full hover:bg-brand-700 transition-colors shadow-sm hover:shadow-brand-500/25"
              >
                Sign up
              </Link>
            </div>
          )}

        </div>
      </header>

      {/* Mobile Menu Dropdown (Public only) */}
      {!onMenuClick && isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 z-40 bg-white dark:bg-slate-950 p-6 flex flex-col gap-6 border-t border-slate-100 dark:border-slate-800">
          <div className="flex flex-col gap-4 items-center mt-8">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-3 p-4 w-full rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors justify-center font-semibold"
            >
              {theme === "light" ? <Moon size={22} /> : <Sun size={22} />}
              {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
            </button>
            
            {!user && (
              <div className="flex flex-col gap-4 w-full mt-4">
                <Link
                  to="/login"
                  className="w-full text-center text-lg font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-6 py-4 rounded-2xl transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="w-full text-center text-lg font-bold bg-brand-600 text-white px-6 py-4 rounded-2xl shadow-lg shadow-brand-500/25"
                >
                  Join SkillSphere
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;