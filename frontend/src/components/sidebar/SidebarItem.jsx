import { NavLink } from "react-router-dom";

function SidebarItem({
  to,
  icon,
  text,
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-xl px-4 py-3 transition
        ${
          isActive
            ? "bg-blue-600"
            : "hover:bg-slate-800"
        }`
      }
    >
      {icon}

      <span>{text}</span>

    </NavLink>
  );
}

export default SidebarItem;