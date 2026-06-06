import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import Orders from "./pages/Orders";
import Settings from "./pages/Settings";
import Store from "./pages/Store";              // ← ADD THIS LINE
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

function Layout({ children }) {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/store" element={<Store />} />         {/* ← ADD THIS LINE */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/books" element={<Layout><Books /></Layout>} />
        <Route path="/orders" element={<Layout><Orders /></Layout>} />
        <Route path="/settings" element={<Layout><Settings /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}
