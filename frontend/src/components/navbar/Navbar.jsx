import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  Search,
  Bell,
  PlusCircle,
  Briefcase,
  LayoutDashboard,
  User,
  LogOut,
} from "lucide-react";

import { logoutUser } from "../../services/authApi";
import { logout } from "../../redux/slices/authSlice";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch {}

    localStorage.removeItem("token");

    dispatch(logout());

    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-white px-8 shadow-sm">

      {/* Left */}

      <div className="flex items-center gap-8">

        <Link
          to="/dashboard"
          className="text-2xl font-bold text-blue-600"
        >
          SkillSphere
        </Link>

        <div className="relative hidden lg:block">

          <Search
            size={18}
            className="absolute left-3 top-3 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search gigs..."
            className="w-80 rounded-xl border bg-slate-100 py-2 pl-10 pr-4 outline-none transition focus:border-blue-500"
          />

        </div>

      </div>

      {/* Center */}

      <div className="hidden items-center gap-6 lg:flex">

        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-slate-700 hover:text-blue-600"
        >
          <LayoutDashboard size={18} />
          Dashboard
        </Link>

        <Link
          to="/browse-gigs"
          className="flex items-center gap-2 text-slate-700 hover:text-blue-600"
        >
          <Briefcase size={18} />
          Browse
        </Link>

        <Link
          to="/my-gigs"
          className="flex items-center gap-2 text-slate-700 hover:text-blue-600"
        >
          <Briefcase size={18} />
          My Gigs
        </Link>

        <Link
          to="/create-gig"
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <PlusCircle size={18} />
          Create Gig
        </Link>

      </div>

      {/* Right */}

      <div className="flex items-center gap-5">

        <button className="relative">

          <Bell size={22} />

          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500"></span>

        </button>

        <Link to="/profile">

          <img
            src={
              user?.avatar ||
              "https://i.pravatar.cc/100"
            }
            alt="Profile"
            className="h-10 w-10 rounded-full border object-cover"
          />

        </Link>

        <span className="hidden font-semibold lg:block">
          {user?.fullName || "User"}
        </span>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-xl border px-4 py-2 transition hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </header>
  );
}

export default Navbar;