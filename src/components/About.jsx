import Icon from "./Icon";
import { mediaUrl } from "../api";

export default function About({ site }) {
  return (
    <section id="tentang" className="section-pad bg-white">
      <div className="container-rw grid items-center gap-12 lg:grid-cols-2">
        <div className="relative order-2 lg:order-1">
          <div className="grid grid-cols-2 gap-4">
            {(site.aboutImages?.length ? site.aboutImages : [
              "https://images.unsplash.com/photo-1500939455407-d8df4b49860b?auto=format&fit=crop&w=700&q=80",
              "https://images.unsplash.com/photo-1531214159280-079b95d72e39?auto=format&fit=crop&w=700&q=80",
              "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=700&q=80",
              "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=80"
            ]).slice(0, 4).map((src, i) => (
              <img
                key={i}
                src={mediaUrl(src)}
                alt={`Kegiatan warga RW 09 Tanjung Mas ${i + 1}`}
                className={`h-56 w-full rounded-2xl object-cover shadow-card sm:h-64 ${i % 2 === 0 ? "mt-8" : ""}`}
                loading="lazy"
              />
            ))}
          </div>
          <div className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-2xl bg-ocean-600 px-6 py-3 shadow-soft">
            <Icon name="users" className="h-6 w-6 text-cyan-200" />
            <div>
              <p className="text-xs text-cyan-100">{site.establishedLabel || "Tahun berdiri"}</p>
              <p className="text-sm font-extrabold text-white">
                {site.establishedValue || "Komunitas RW 09"}
              </p>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <span className="badge">
            <Icon name="wave" className="h-4 w-4" />
            Tentang Kami
          </span>
          <h2 className="section-title mt-4">
            {site.aboutTitle || "Kampung Pesisir dengan"} <span className="text-ocean-600">{site.aboutHeading || "Semangat Bahari"}</span>
          </h2>
          <p className="mt-5 leading-relaxed text-slate-600">{site.description}</p>
          <p className="mt-4 leading-relaxed text-slate-600">
            {site.aboutDescription ||
              "Kelurahan Tanjung Mas berbatasan dengan Laut Jawa di sebelah utara dan menjadi lokasi Pelabuhan Tanjung Emas — satu-satunya pelabuhan di Kota Semarang. Sebagian besar warga berprofesi sebagai nelayan, dan keseharian masyarakat diwarnai tradisi maritim seperti sedekah laut, pasar ikan, hingga pengolahan hasil laut."}
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {(site.taglineCards?.length ? site.taglineCards : [
              { icon: "wave", title: "Tradisi Bahari", text: "Budaya maritim nelayan yang dijaga lintas generasi." },
              { icon: "users", title: "Gotong Royong", text: "Kebersamaan warga dalam setiap kegiatan lingkungan." }
            ]).map((card) => (
              <div key={card.title} className="card">
                <div className="flex items-start gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ocean-100 text-ocean-700">
                    <Icon name={card.icon} className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-bold text-slate-900">{card.title}</h3>
                    <p className="mt-1 text-sm text-slate-500">{card.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
