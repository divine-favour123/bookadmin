import { NavLink } from "react-router-dom";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: "⊞" },
  { to: "/books", label: "Books", icon: "📚" },
  { to: "/orders", label: "Orders", icon: "🛒" },
  { to: "/settings", label: "Settings", icon: "⚙" },
];

export default function Sidebar() {
  return (
    <aside className="w-60 bg-white border-r border-slate-200 flex flex-col shadow-sm">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <span className="text-white text-sm font-bold">B</span>
          </div>
          <span className="text-slate-800 font-semibold text-lg">BookAdmin</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 mb-3">
          Main Menu
        </p>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`
            }
          >
            <span className="text-base">{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom tag */}
      <div className="px-5 py-4 border-t border-slate-100">
        <p className="text-xs text-slate-400">BookAdmin v1.0</p>
      </div>
    </aside>
  );
}
