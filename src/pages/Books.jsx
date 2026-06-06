import { useEffect, useState } from "react";
import { supabase } from "../libs/supabase";

const EMPTY = { title: "", author: "", genre: "", price: "", stock: "" };

export default function Books() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchBooks = async () => {
    const { data } = await supabase.from("books").select("*").order("created_at", { ascending: false });
    setBooks(data || []);
  };

  useEffect(() => { fetchBooks(); }, []);

  const openAdd = () => { setForm(EMPTY); setEditId(null); setShowModal(true); };
  const openEdit = (book) => {
    setForm({ title: book.title, author: book.author, genre: book.genre || "", price: book.price, stock: book.stock });
    setEditId(book.id);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.author || !form.price) return alert("Title, author and price are required.");
    setLoading(true);
    const payload = { ...form, price: parseFloat(form.price), stock: parseInt(form.stock) || 0 };
    if (editId) {
      await supabase.from("books").update(payload).eq("id", editId);
    } else {
      await supabase.from("books").insert([payload]);
    }
    setLoading(false);
    setShowModal(false);
    fetchBooks();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this book?")) return;
    await supabase.from("books").delete().eq("id", id);
    fetchBooks();
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">{books.length} books in inventory</p>
        <button
          onClick={openAdd}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition"
        >
          + Add Book
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide bg-slate-50">
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Author</th>
              <th className="px-6 py-3">Genre</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Stock</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {books.map((b) => (
              <tr key={b.id} className="hover:bg-slate-50 transition">
                <td className="px-6 py-4 font-medium text-slate-800">{b.title}</td>
                <td className="px-6 py-4 text-slate-500">{b.author}</td>
                <td className="px-6 py-4 text-slate-400">{b.genre || "—"}</td>
                <td className="px-6 py-4 text-slate-700 font-medium">₦{b.price?.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${b.stock < 10 ? "bg-rose-50 text-rose-600" : "bg-green-50 text-green-600"}`}>
                    {b.stock}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(b)} className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium transition">Edit</button>
                    <button onClick={() => handleDelete(b.id)} className="text-xs px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 font-medium transition">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-5">
              {editId ? "Edit Book" : "Add Book"}
            </h3>
            <div className="space-y-4">
              {[
                { label: "Title", key: "title", placeholder: "e.g. Atomic Habits" },
                { label: "Author", key: "author", placeholder: "e.g. James Clear" },
                { label: "Genre", key: "genre", placeholder: "e.g. Self Help" },
                { label: "Price (₦)", key: "price", placeholder: "e.g. 1500", type: "number" },
                { label: "Stock", key: "stock", placeholder: "e.g. 50", type: "number" },
              ].map(({ label, key, placeholder, type = "text" }) => (
                <div key={key}>
                  <label className="text-sm font-medium text-slate-700 block mb-1">{label}</label>
                  <input
                    type={type}
                    value={form[key]}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    placeholder={placeholder}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition disabled:opacity-60"
              >
                {loading ? "Saving..." : "Save Book"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
