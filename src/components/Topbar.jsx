import { useLocation } from "react-router-dom";

const pageTitles = {
  "/dashboard": "Dashboard",
  "/books": "Books",
  "/orders": "Orders",
  "/settings": "Settings",
};

export default function Topbar() {
  const location = useLocation();
  const title = pageTitles[location.pathname] || "BookAdmin";

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
      <h1 className="text-lg font-semibold text-slate-800">{title}</h1>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
          <span className="text-indigo-600 text-xs font-bold">A</span>
        </div>
        <span className="text-sm font-medium text-slate-600">Admin</span>
      </div>
    </header>
  );
}
