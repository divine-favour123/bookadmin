import { useEffect, useState } from "react";
import { supabase } from "../libs/supabase";

const STATUSES = ["all", "pending", "processing", "shipped", "delivered", "cancelled"];

const STATUS_COLORS = {
  pending: "bg-amber-100 text-amber-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-indigo-100 text-indigo-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");

  const fetchOrders = async () => {
    const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    setOrders(data || []);
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleStatusChange = async (id, status) => {
    await supabase.from("orders").update({ status }).eq("id", id);
    fetchOrders();
  };

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="space-y-5">
      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition ${
              filter === s
                ? "bg-indigo-600 text-white"
                : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide bg-slate-50">
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Book</th>
              <th className="px-6 py-3">Qty</th>
              <th className="px-6 py-3">Total</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map((o) => (
              <tr key={o.id} className="hover:bg-slate-50 transition">
                <td className="px-6 py-4 font-medium text-slate-800">{o.customer_name}</td>
                <td className="px-6 py-4 text-slate-400">{o.customer_email}</td>
                <td className="px-6 py-4 text-slate-600">{o.book_title}</td>
                <td className="px-6 py-4 text-slate-500">{o.quantity}</td>
                <td className="px-6 py-4 font-medium text-slate-700">₦{o.total?.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <select
                    value={o.status}
                    onChange={(e) => handleStatusChange(o.id, e.target.value)}
                    className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border-0 cursor-pointer outline-none ${
                      STATUS_COLORS[o.status] || "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {STATUSES.filter((s) => s !== "all").map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4 text-slate-400">
                  {new Date(o.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="text-center text-slate-400 py-10 text-sm">No orders found.</p>
        )}
      </div>
    </div>
  );
}