import { useState } from "react";
import { apiLogin } from "./api";
import { inputClass, buttonClass } from "./editors";
import Icon from "../components/Icon";

export default function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await apiLogin(username.trim(), password);
      window.location.href = "/admin/dashboard";
      onLogin?.(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-ocean-950 via-ocean-800 to-ocean-600 px-4">
      <div className="w-full max-w-md animate-fade-up overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-white/10">
        <div className="flex flex-col items-center px-8 pt-10 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-ocean-500 to-ocean-700 text-white shadow-soft">
            <Icon name="admin" className="h-8 w-8" />
          </span>
          <h1 className="mt-5 text-xl font-extrabold text-slate-900">Panel Admin</h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            Kelola konten website RW 09 Tanjung Mas
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-7 space-y-4 px-8 pb-8">
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">
              Username
            </label>
            <input
              className={inputClass}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              autoFocus
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">
              Password
            </label>
            <input
              type="password"
              className={inputClass}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
          </div>

          {error && (
            <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`${buttonClass.primary} !rounded-xl !py-2.5 w-full`}
          >
            {loading ? "Memeriksa..." : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
}