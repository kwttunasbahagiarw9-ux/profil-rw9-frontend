import { useState } from "react";
import Icon from "./Icon";

const ICON_STYLES = {
  document: { bg: "bg-ocean-100", text: "text-ocean-700" },
  health: { bg: "bg-rose-100", text: "text-rose-600" },
  shield: { bg: "bg-emerald-100", text: "text-emerald-700" },
  shop: { bg: "bg-amber-100", text: "text-amber-600" },
  leaf: { bg: "bg-lime-100", text: "text-lime-700" },
  heart: { bg: "bg-pink-100", text: "text-pink-600" }
};

export default function Services({ services }) {
  const [page, setPage] = useState(0);

  const perPage = 9;
  const totalPages = Math.max(1, Math.ceil(services.length / perPage));
  const currentPage = Math.min(page, totalPages - 1);
  const visibleServices = services.slice(
    currentPage * perPage,
    currentPage * perPage + perPage
  );
  return (
    <section id="layanan" className="section-pad bg-white">
      <div className="container-rw">
        <div className="mx-auto max-w-2xl text-center">
          <span className="badge">
            <Icon name="shield" className="h-4 w-4" />
            Layanan Warga
          </span>
          <h2 className="section-title mt-4">
            Layanan & <span className="text-ocean-600">Pemberdayaan</span> Warga
          </h2>
          <p className="mt-4 text-slate-600">
            Berbagai layanan dan program disediakan untuk mendukung kesejahteraan
            warga RW 09 Tanjung Mas.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleServices.map((service) => {
            const style = ICON_STYLES[service.icon] || ICON_STYLES.document;
            return (
              <div key={service.id} className="card group">
                <div className="flex items-center justify-between">
                  <span
                    className={`grid h-13 w-13 place-items-center rounded-2xl p-3.5 ${style.bg} ${style.text} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon name={service.icon} className="h-7 w-7" />
                  </span>
                  <Icon
                    name="arrowRight"
                    className="h-5 w-5 text-slate-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-ocean-500"
                  />
                </div>
                <h3 className="mt-5 text-lg font-extrabold text-slate-900">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {service.description}
                </p>
                <ul className="mt-4 space-y-2 border-t border-slate-100 pt-4">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-slate-600"
                    >
                      <Icon
                        name="check"
                        className="h-4 w-4 shrink-0 text-ocean-500"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            <button
              type="button"
              aria-label="Halaman sebelumnya"
              disabled={currentPage === 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-600 transition-colors hover:border-ocean-500 hover:text-ocean-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Icon name="chevronLeft" className="h-5 w-5" />
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPage(i)}
                aria-label={`Halaman ${i + 1}`}
                aria-current={i === currentPage ? "page" : undefined}
                className={`grid h-10 w-10 place-items-center rounded-xl text-sm font-bold transition-colors ${
                  i === currentPage
                    ? "bg-ocean-600 text-white shadow-card"
                    : "border border-slate-200 text-slate-600 hover:border-ocean-500 hover:text-ocean-600"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              type="button"
              aria-label="Halaman berikutnya"
              disabled={currentPage === totalPages - 1}
              onClick={() =>
                setPage((p) => Math.min(totalPages - 1, p + 1))
              }
              className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 text-slate-600 transition-colors hover:border-ocean-500 hover:text-ocean-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Icon name="chevronRight" className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
