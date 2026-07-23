import { NavLink } from "react-router-dom";

function SidebarItem({ to, icon, text, onClick, isCollapsed }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      title={isCollapsed ? text : undefined}
      className={({ isActive }) =>
        `flex items-center rounded-xl py-3 transition-all duration-300 group font-semibold text-sm ${
          isActive
            ? "bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-lg shadow-brand-500/20 translate-x-1"
            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:translate-x-1"
        } ${isCollapsed ? "justify-center px-0 w-12 mx-auto" : "gap-3 px-4 w-full"}`
      }
    >
      <div className={`transition-transform duration-300 group-hover:scale-110 shrink-0`}>
        {icon}
      </div>
      {!isCollapsed && <span className="transition-opacity duration-300 truncate">{text}</span>}
    </NavLink>
  );
}

export default SidebarItem;