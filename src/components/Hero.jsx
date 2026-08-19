import Icon from "./Icon";
import { mediaUrl } from "../api";

export default function Hero({ site }) {
  return (
    <section
      id="beranda"
      className="relative overflow-hidden bg-gradient-to-br from-ocean-950 via-ocean-800 to-ocean-600 pt-28 pb-20 sm:pt-36 sm:pb-28"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.25) 0, transparent 40%), radial-gradient(circle at 80% 70%, rgba(34,211,238,0.4) 0, transparent 45%)"
        }}
      />
      <svg
        className="absolute bottom-0 left-0 h-24 w-full text-white"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        fill="currentColor"
      >
        <path d="M0,64 C240,96 480,120 720,100 C960,80 1200,32 1440,64 L1440,120 L0,120 Z" />
      </svg>

      <div className="container-rw relative grid items-center gap-12 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <span className="badge !bg-white/10 !text-ocean-100 !ring-white/20 animate-fade-up">
            <Icon name="pin" className="h-4 w-4" />
            {site.subtitle || "Kelurahan Tanjung Mas, Semarang Utara"}
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl animate-fade-up">
            Selamat Datang di{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-sky-200 bg-clip-text text-transparent">
              {site.name || "RW 09 Tanjung Mas"}
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ocean-100 sm:text-lg lg:mx-0 animate-fade-up">
            {site.tagline}. Semangat gotong royong warga pesisir yang terus
            berbenah, mulai dari kesehatan, lingkungan, ekonomi, hingga
            ketahanan pangan.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start animate-fade-up">
            <a href="#tentang" className="btn-primary w-full sm:w-auto">
              Jelajahi Profil
              <Icon name="arrowRight" className="h-4 w-4" />
            </a>
            <a href="#layanan" className="btn-outline w-full sm:w-auto">
              Layanan Warga
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="animate-float">
            <div className="relative overflow-hidden rounded-3xl border-4 border-white/20 shadow-2xl">
              <img
                src={mediaUrl(site.hero?.image) || "https://images.unsplash.com/photo-1498028658436-4b07a4d1fba4?auto=format&fit=crop&w=900&q=80"}
                alt={site.hero?.caption || "Suasana pesisir Tanjung Mas"}
                className="h-72 w-full object-cover sm:h-96"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-sm font-semibold text-white">
                  {site.hero?.caption || "Kehidupan masyarakat pesisir Tanjung Mas"}
                </p>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-6 -left-4 hidden rounded-2xl bg-white p-4 shadow-soft sm:block">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-sand-100 text-sand-600">
                <Icon name="heart" className="h-6 w-6" />
              </span>
              <div>
                <p className="text-sm font-extrabold text-slate-900">
                  Gotong Royong
                </p>
                <p className="text-xs text-slate-500">Kebersamaan warga pesisir</p>
              </div>
            </div>
          </div>
          <div className="absolute -right-4 top-8 hidden rounded-2xl bg-white p-4 shadow-soft sm:block">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-ocean-100 text-ocean-600">
                <Icon name="leaf" className="h-6 w-6" />
              </span>
              <div>
                <p className="text-sm font-extrabold text-slate-900">
                  Hijau & Sehat
                </p>
                <p className="text-xs text-slate-500">Urban farming</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
