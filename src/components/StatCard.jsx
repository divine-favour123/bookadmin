export default function StatCard({ title, value, sub, color = "indigo" }) {
  const colors = {
    indigo: "bg-indigo-50 text-indigo-600",
    green: "bg-green-50 text-green-600",
    amber: "bg-amber-50 text-amber-600",
    rose: "bg-rose-50 text-rose-600",
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
      <p className="text-sm text-slate-500 font-medium">{title}</p>
      <p className="text-3xl font-bold text-slate-800 mt-2">{value}</p>
      <span className={`inline-block mt-3 text-xs font-semibold px-2.5 py-1 rounded-full ${colors[color]}`}>
        {sub}
      </span>
    </div>
  );
}