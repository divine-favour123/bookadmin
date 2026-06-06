export default function Settings() {
  return (
    <div className="max-w-lg space-y-6">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h3 className="text-base font-semibold text-slate-800 mb-4">Account Info</h3>
        <div>
          <label className="text-sm font-medium text-slate-600 block mb-1">Admin Name</label>
          <p className="px-4 py-3 bg-slate-50 rounded-xl text-sm text-slate-700 border border-slate-200">
            BookAdmin
          </p>
        </div>
        <div className="mt-4">
          <label className="text-sm font-medium text-slate-600 block mb-1">Role</label>
          <p className="px-4 py-3 bg-slate-50 rounded-xl text-sm text-slate-700 border border-slate-200">
            Super Administrator
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h3 className="text-base font-semibold text-slate-800 mb-2">About</h3>
        <p className="text-sm text-slate-500">
          BookAdmin v1.0 — A portfolio project demonstrating full-stack admin panel development using React, Tailwind CSS, and Supabase.
        </p>
      </div>
    </div>
  );
}
