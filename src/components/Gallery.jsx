import { useState } from "react";
import Icon from "./Icon";
import { mediaUrl } from "../api";

export default function Gallery({ gallery }) {
  const [lightbox, setLightbox] = useState(null);
  const [page, setPage] = useState(0);

  const perPage = 9;
  const totalPages = Math.max(1, Math.ceil(gallery.length / perPage));
  const currentPage = Math.min(page, totalPages - 1);
  const visibleItems = gallery.slice(
    currentPage * perPage,
    currentPage * perPage + perPage
  );

  return (
    <section id="galeri" className="section-pad bg-white">
      <div className="container-rw">
        <div className="mx-auto max-w-2xl text-center">
          <span className="badge">
            <Icon name="wave" className="h-4 w-4" />
            Galeri Kegiatan
          </span>
          <h2 className="section-title mt-4">
            Momen <span className="text-ocean-600">Kebersamaan</span> Warga
          </h2>
          <p className="mt-4 text-slate-600">
            Dokumentasi kegiatan, suasana kampung, dan kehidupan masyarakat
            pesisir RW 09 Tanjung Mas.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setLightbox(item)}
              className="group relative h-64 overflow-hidden rounded-2xl shadow-card focus:outline-none focus:ring-4 focus:ring-ocean-300"
            >
              <img
                src={mediaUrl(item.image)}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 translate-y-4 p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-left text-sm font-bold text-white">
                  {item.title}
                </p>
              </div>
            </button>
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

      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={mediaUrl(lightbox.image)}
              alt={lightbox.title}
              className="max-h-[80vh] w-full rounded-2xl object-cover"
            />
            <p className="mt-4 text-center text-base font-semibold text-white">
              {lightbox.title}
            </p>
            <button
              type="button"
              aria-label="Tutup galeri"
              onClick={() => setLightbox(null)}
              className="absolute -top-3 -right-3 grid h-10 w-10 place-items-center rounded-full bg-white text-slate-800 shadow-card transition-colors hover:bg-ocean-600 hover:text-white"
            >
              <Icon name="close" className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
