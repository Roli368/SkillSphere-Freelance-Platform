import Logo from "../ui/Logo";
import { Menu } from "lucide-react";

function SidebarHeader({ isCollapsed, onToggleCollapse }) {
  return (
    <div className={`border-b border-slate-200/50 dark:border-slate-800/50 flex items-center ${isCollapsed ? 'justify-center py-6' : 'justify-between p-6'}`}>
      
      {!isCollapsed && <Logo showText={true} />}
      {isCollapsed && <Logo showText={false} />}

      {/* Hamburger Toggle - Hidden on mobile as mobile uses Navbar hamburger and Sidebar X */}
      <button 
        onClick={onToggleCollapse} 
        className="hidden lg:flex p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      >
        <Menu size={24} />
      </button>

    </div>
  );
}

export default SidebarHeader;