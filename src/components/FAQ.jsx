import { useState } from "react";
import Icon from "./Icon";

export default function FAQ({ faq }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section-pad bg-white">
      <div className="container-rw grid gap-12 lg:grid-cols-2">
        <div>
          <span className="badge">
            <Icon name="heart" className="h-4 w-4" />
            Tanya Jawab
          </span>
          <h2 className="section-title mt-4">
            Pertanyaan yang <span className="text-ocean-600">Sering Diajukan</span>
          </h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            Temukan jawaban atas pertanyaan umum seputar layanan dan kegiatan di
            RW 09 Tanjung Mas. Jika belum terjawab, jangan ragu untuk menghubungi
            pengurus RW.
          </p>
          <div className="mt-6 rounded-2xl bg-gradient-to-br from-ocean-50 to-cyan-50 p-6 ring-1 ring-ocean-100">
            <p className="text-sm leading-relaxed text-slate-700">
              <strong className="text-ocean-800">Butuh bantuan langsung?</strong>{" "}
              Silakan hubungi kami melalui halaman kontak.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {faq.map((item, i) => {
            const open = openIndex === i;
            return (
              <div
                key={i}
                className={`overflow-hidden rounded-2xl ring-1 transition-all ${
                  open
                    ? "bg-ocean-50 ring-ocean-200"
                    : "bg-white ring-slate-100"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm font-bold text-slate-900 sm:text-base">
                    {item.q}
                  </span>
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                      open
                        ? "rotate-180 bg-ocean-600 text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <Icon name="chevronDown" className="h-4 w-4" />
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
