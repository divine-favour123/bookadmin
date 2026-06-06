import { useEffect, useState } from "react";
import { supabase } from "../libs/supabase";
import StatCard from "../components/StatCard";

const STATUS_COLORS = {
  pending: "bg-amber-100 text-amber-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-indigo-100 text-indigo-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function Dashboard() {   // ✅ added parentheses
  const [stats, setStats] = useState({ books: 0, orders: 0, revenue: 0, delivered: 0 });
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [{ count: booksCount }, { data: orders }] = await Promise.all([
        supabase.from("books").select("*", { count: "exact", head: true }),
        supabase.from("orders").select("*").order("created_at", { ascending: false }),
      ]);

      const revenue = orders?.reduce((sum, o) => sum + (o.total || 0), 0) || 0;
      const delivered = orders?.filter((o) => o.status === "delivered").length || 0;

      setStats({ books: booksCount || 0, orders: orders?.length || 0, revenue, delivered });
      setRecent(orders?.slice(0, 6) || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <p className="text-slate-400 text-sm">Loading...</p>;

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Total Books" value={stats.books} sub="In inventory" color="indigo" />
        <StatCard title="Total Orders" value={stats.orders} sub="All time" color="amber" />
        <StatCard
          title="Revenue"
          value={`₦${stats.revenue.toLocaleString()}`}
          sub="All orders"
          color="green"
        />
        <StatCard title="Delivered" value={stats.delivered} sub="Completed" color="rose" />
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-700">Recent Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide">
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Book</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recent.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4 font-medium text-slate-800">{order.customer_name}</td>
                  <td className="px-6 py-4 text-slate-500">{order.book_title}</td>
                  <td className="px-6 py-4 text-slate-700 font-medium">
                    ₦{order.total?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                        STATUS_COLORS[order.status] || "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}