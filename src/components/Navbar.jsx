import { useEffect, useState } from "react";
import Icon from "./Icon";

const NAV_LINKS = [
  { label: "Beranda", href: "#beranda" },
  { label: "Tentang", href: "#tentang" },
  { label: "Layanan", href: "#layanan" },
  { label: "Program", href: "#program" },
  { label: "Galeri", href: "#galeri" },
  { label: "Pengurus", href: "#pengurus" },
  { label: "Kontak", href: "#kontak" }
];

export default function Navbar({ site }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 shadow-card backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <nav className="container-rw flex h-16 items-center justify-between sm:h-20">
          <a href="#beranda" className="flex items-center gap-2.5">
            <span className="leading-tight">
              <span
                className={`block text-base font-extrabold tracking-tight ${
                  scrolled ? "text-slate-900" : "text-white"
                }`}
              >
                {site?.name}
              </span>
              <span
                className={`block text-[11px] font-medium ${
                  scrolled ? "text-slate-500" : "text-ocean-100"
                }`}
              >
                {site?.subtitle?.replace("Kelurahan ", "")}
              </span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                    scrolled
                      ? "text-slate-600 hover:bg-ocean-50 hover:text-ocean-700"
                      : "text-white/90 hover:bg-white/15 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#kontak" className="btn-primary ml-2 !px-5 !py-2.5">
                Hubungi Kami
              </a>
            </li>
          </ul>

          <button
            type="button"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            onClick={() => setOpen((v) => !v)}
            className={`rounded-lg p-2 lg:hidden ${
              scrolled ? "text-slate-800" : "text-white"
            }`}
          >
            <Icon name={open ? "close" : "menu"} className="h-6 w-6" />
          </button>
        </nav>
      </header>

      {open && (
        <div
          aria-hidden="true"
          onClick={() => setOpen(false)}
          className="fixed inset-x-0 bottom-0 top-16 z-30 bg-slate-950/50 backdrop-blur-sm sm:top-20 lg:hidden"
        />
      )}

      <div
        className={`lg:hidden fixed inset-x-0 bottom-0 top-16 z-40 transform transition-transform duration-300 sm:top-20 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col bg-white px-6 py-8 shadow-2xl ring-1 ring-slate-200">
          <ul className="space-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-base font-semibold text-slate-700 transition-colors hover:bg-ocean-50 hover:text-ocean-700"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-auto">
            <a
              href="#kontak"
              onClick={() => setOpen(false)}
              className="btn-primary w-full"
            >
              Hubungi Kami
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
