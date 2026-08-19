import { useState } from "react";
import Icon from "./Icon";
import { mediaUrl } from "../api";

export default function Programs({ programs }) {
  const [page, setPage] = useState(0);

  const perPage = 9;
  const totalPages = Math.max(1, Math.ceil(programs.length / perPage));
  const currentPage = Math.min(page, totalPages - 1);
  const visiblePrograms = programs.slice(
    currentPage * perPage,
    currentPage * perPage + perPage
  );
  return (
    <section id="program" className="section-pad bg-slate-50">
      <div className="container-rw">
        <div className="mx-auto max-w-2xl text-center">
          <span className="badge">
            <Icon name="leaf" className="h-4 w-4" />
            Program Unggulan
          </span>
          <h2 className="section-title mt-4">
            Program & <span className="text-ocean-600">Kegiatan</span> RW 09
          </h2>
          <p className="mt-4 text-slate-600">
            Kegiatan unggulan yang melibatkan seluruh elemen warga demi
            kemajuan kampung pesisir.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visiblePrograms.map((program) => (
            <article
              key={program.id}
              className="group overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={mediaUrl(program.image)}
                  alt={program.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-ocean-700 backdrop-blur">
                  {program.category}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-extrabold text-slate-900">
                  {program.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {program.description}
                </p>
                <a
                  href="#kontak"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-ocean-600 transition-colors hover:text-ocean-800"
                >
                  Ikut serta
                  <Icon name="arrowRight" className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
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
