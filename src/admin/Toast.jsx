import { useEffect, useRef } from "react";
import Icon from "../components/Icon";

const DURATION = 3500;

export default function Toast({ notice, onDismiss }) {
  const timer = useRef(null);

  useEffect(() => {
    if (!notice) return;
    clearTimeout(timer.current);
    timer.current = setTimeout(onDismiss, DURATION);
    return () => clearTimeout(timer.current);
  }, [notice, onDismiss]);

  if (!notice) return null;

  const isSuccess = notice.type === "success";

  return (
    <div className="fixed left-1/2 top-16 z-[200] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 animate-fade-up sm:left-auto sm:right-6 sm:top-20 sm:w-auto sm:min-w-80 sm:max-w-sm sm:translate-x-0">
      <div
        className={`flex items-start gap-3 rounded-2xl border px-4 py-3 shadow-2xl backdrop-blur ${
          isSuccess
            ? "border-emerald-100 bg-emerald-50/95 text-emerald-800"
            : "border-rose-100 bg-rose-50/95 text-rose-800"
        }`}
      >
        <span
          className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-white ${
            isSuccess ? "bg-emerald-500" : "bg-rose-500"
          }`}
        >
          <Icon name={isSuccess ? "check" : "close"} className="h-4 w-4" />
        </span>
        <p className="flex-1 text-sm font-bold leading-relaxed">{notice.text}</p>
        <button
          type="button"
          aria-label="Tutup notifikasi"
          onClick={onDismiss}
          className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-slate-400 transition-colors hover:bg-white/70 hover:text-slate-700"
        >
          &times;
        </button>
      </div>
    </div>
  );
}
