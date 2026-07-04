import {
  LayoutDashboard,
  User,
  Briefcase,
  PlusSquare,
  FileText,
  MessageCircle,
  Settings,
  LogOut,
} from "lucide-react";

import SidebarItem from "./SidebarItem";
import SidebarHeader from "./SidebarHeader";

function Sidebar() {
  return (
    <aside className="w-72 min-h-screen bg-slate-900 text-white flex flex-col">

      <SidebarHeader />

      <div className="flex-1 px-4 py-6 space-y-2">

        <SidebarItem
          to="/dashboard"
          icon={<LayoutDashboard size={20} />}
          text="Dashboard"
        />

        <SidebarItem
          to="/profile"
          icon={<User size={20} />}
          text="Profile"
        />

        <SidebarItem
          to="/browse-gigs"
          icon={<Briefcase size={20} />}
          text="Browse Gigs"
        />

        <SidebarItem
          to="/create-gig"
          icon={<PlusSquare size={20} />}
          text="Create Gig"
        />

        <SidebarItem
          to="/my-proposals"
          icon={<FileText size={20} />}
          text="My Proposals"
        />

        <SidebarItem
          to="/messages"
          icon={<MessageCircle size={20} />}
          text="Messages"
        />

        <SidebarItem
          to="/settings"
          icon={<Settings size={20} />}
          text="Settings"
        />

      </div>

      <div className="border-t border-slate-700 p-4">

        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 hover:bg-red-600 transition">

          <LogOut size={20} />

          Logout

        </button>

      </div>

    </aside>
  );
}

export default Sidebar;