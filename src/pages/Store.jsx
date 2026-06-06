import { useState } from "react";

const BOOKS = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self Help",
    price: 1500,
    rating: 4.8,
    cover: "https://placehold.co/200x280/6366f1/ffffff?text=Atomic+Habits",
    description: "Tiny changes, remarkable results. A proven framework for improving every day.",
  },
  {
    id: 2,
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Fiction",
    price: 1200,
    rating: 4.7,
    cover: "https://placehold.co/200x280/f59e0b/ffffff?text=The+Alchemist",
    description: "A magical story about following your dreams and listening to your heart.",
  },
  {
    id: 3,
    title: "Deep Work",
    author: "Cal Newport",
    genre: "Productivity",
    price: 1800,
    rating: 4.6,
    cover: "https://placehold.co/200x280/10b981/ffffff?text=Deep+Work",
    description: "Rules for focused success in a distracted world. Master your concentration.",
  },
  {
    id: 4,
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    genre: "Finance",
    price: 1350,
    rating: 4.5,
    cover: "https://placehold.co/200x280/ef4444/ffffff?text=Rich+Dad",
    description: "What the rich teach their kids about money that the poor do not.",
  },
  {
    id: 5,
    title: "Things Fall Apart",
    author: "Chinua Achebe",
    genre: "Classic",
    price: 950,
    rating: 4.9,
    cover: "https://placehold.co/200x280/8b5cf6/ffffff?text=Things+Fall+Apart",
    description: "A timeless African classic exploring culture, identity and change.",
  },
  {
    id: 6,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    genre: "Finance",
    price: 1650,
    rating: 4.7,
    cover: "https://placehold.co/200x280/0ea5e9/ffffff?text=Psychology+of+Money",
    description: "Timeless lessons on wealth, greed, and happiness. A must-read.",
  },
  {
    id: 7,
    title: "Ikigai",
    author: "Héctor García",
    genre: "Self Help",
    price: 1100,
    rating: 4.4,
    cover: "https://placehold.co/200x280/f97316/ffffff?text=Ikigai",
    description: "The Japanese secret to a long and happy life. Find your purpose.",
  },
  {
    id: 8,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    genre: "History",
    price: 2000,
    rating: 4.8,
    cover: "https://placehold.co/200x280/64748b/ffffff?text=Sapiens",
    description: "A brief history of humankind. From the Stone Age to the modern era.",
  },
];

const GENRES = ["All", "Self Help", "Fiction", "Productivity", "Finance", "Classic", "History"];

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          className={`w-3.5 h-3.5 ${s <= Math.round(rating) ? "text-amber-400" : "text-slate-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs text-slate-400 ml-0.5">{rating}</span>
    </div>
  );
}

export default function Store() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeGenre, setActiveGenre] = useState("All");
  const [toast, setToast] = useState("");

  const addToCart = (book) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === book.id);
      if (exists) return prev.map((i) => i.id === book.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...book, qty: 1 }];
    });
    setToast(`"${book.title}" added to cart`);
    setTimeout(() => setToast(""), 2500);
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev.map((i) => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
    );
  };

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const filtered = activeGenre === "All" ? BOOKS : BOOKS.filter((b) => b.genre === activeGenre);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">

      {/* Toast */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 bg-slate-800 text-white text-sm px-4 py-3 rounded-xl shadow-lg">
          🛒 {toast}
        </div>
      )}

      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <span className="text-white text-sm font-bold">B</span>
            </div>
            <span className="text-slate-800 font-bold text-lg">BookStore</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/dashboard"
              className="text-xs text-slate-400 hover:text-indigo-600 font-medium transition"
            >
              Admin Panel →
            </a>
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Cart
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white">
        <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col items-center text-center">
          <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
            📚 Nigeria's Favourite Bookstore
          </span>
          <h1 className="text-4xl font-bold mb-3 leading-tight">
            Discover Your Next <br /> Great Read
          </h1>
          <p className="text-indigo-200 text-base max-w-md">
            Browse our handpicked collection of bestsellers, classics, and modern favourites — delivered to your door.
          </p>
          <div className="flex items-center gap-6 mt-8 text-sm">
            <div className="text-center">
              <p className="text-2xl font-bold">500+</p>
              <p className="text-indigo-300">Books</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <p className="text-2xl font-bold">12k+</p>
              <p className="text-indigo-300">Customers</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="text-center">
              <p className="text-2xl font-bold">4.8★</p>
              <p className="text-indigo-300">Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Genre Filter */}
        <div className="flex gap-2 flex-wrap mb-8">
          {GENRES.map((g) => (
            <button
              key={g}
              onClick={() => setActiveGenre(g)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                activeGenre === g
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((book) => {
            const inCart = cart.find((i) => i.id === book.id);
            return (
              <div
                key={book.id}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition"
              >
                <div className="relative">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-44 object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-white text-slate-600 text-xs font-semibold px-2 py-1 rounded-lg shadow-sm">
                    {book.genre}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-slate-800 text-sm leading-tight">{book.title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5 mb-2">{book.author}</p>
                  <StarRating rating={book.rating} />
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed line-clamp-2">
                    {book.description}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-indigo-600 font-bold text-base">
                      ₦{book.price.toLocaleString()}
                    </span>
                    <button
                      onClick={() => addToCart(book)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition ${
                        inCart
                          ? "bg-green-50 text-green-600 hover:bg-green-100"
                          : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                      }`}
                    >
                      {inCart ? `In Cart (${inCart.qty})` : "+ Add"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">B</span>
            </div>
            <span className="text-slate-700 font-semibold">BookStore</span>
          </div>
          <p className="text-sm text-slate-400">© 2025 BookStore Nigeria. All rights reserved.</p>
          <div className="flex gap-5 text-sm text-slate-400">
            <span className="cursor-pointer hover:text-slate-600 transition">About</span>
            <span className="cursor-pointer hover:text-slate-600 transition">Contact</span>
            <span className="cursor-pointer hover:text-slate-600 transition">Privacy</span>
          </div>
        </div>
      </footer>

      {/* Cart Sidebar */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setCartOpen(false)}
          />
          <div className="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-800">
                Your Cart {totalItems > 0 && <span className="text-indigo-600">({totalItems})</span>}
              </h2>
              <button
                onClick={() => setCartOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition text-slate-500"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <p className="text-4xl mb-3">🛒</p>
                  <p className="text-slate-500 text-sm font-medium">Your cart is empty</p>
                  <p className="text-slate-400 text-xs mt-1">Add some books to get started</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-3 bg-slate-50 rounded-xl p-3">
                    <img
                      src={item.cover}
                      alt={item.title}
                      className="w-12 h-16 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800 truncate">{item.title}</p>
                      <p className="text-xs text-slate-400">{item.author}</p>
                      <p className="text-sm font-bold text-indigo-600 mt-1">
                        ₦{(item.price * item.qty).toLocaleString()}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQty(item.id, -1)}
                          className="w-6 h-6 rounded-md bg-white border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-100 transition flex items-center justify-center"
                        >
                          −
                        </button>
                        <span className="text-sm font-semibold text-slate-700 w-4 text-center">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, 1)}
                          className="w-6 h-6 rounded-md bg-white border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-100 transition flex items-center justify-center"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-auto text-xs text-rose-400 hover:text-rose-600 transition font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="px-5 py-4 border-t border-slate-100 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Subtotal</span>
                  <span className="font-semibold text-slate-800">₦{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Delivery</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-base font-bold border-t border-slate-100 pt-3">
                  <span className="text-slate-800">Total</span>
                  <span className="text-indigo-600">₦{totalPrice.toLocaleString()}</span>
                </div>
                <button
                  onClick={() => alert("Order placed! (Demo — not connected to backend)")}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition text-sm"
                >
                  Place Order — ₦{totalPrice.toLocaleString()}
                </button>
                <p className="text-center text-xs text-slate-400">Demo store — no real payment</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}