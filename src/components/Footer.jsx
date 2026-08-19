import Icon from "./Icon";

export default function Footer({ site }) {
  const year = new Date().getFullYear();
  const contact = {
    address:
      "RW 09, Kelurahan Tanjung Mas, Kecamatan Semarang Utara, Kota Semarang, Jawa Tengah 50144",
    phone: "(024) 3560341",
    email: "kelurahantanjungmas@gmail.com",
    ...(site.contact || {})
  };

  return (
    <footer className="bg-ocean-950 text-ocean-100">
      <div className="container-rw py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-base font-extrabold text-white">
                RW 09 Tanjung Mas
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ocean-200/80">
              Kampung pesisir di Kelurahan Tanjung Mas, Semarang Utara, yang
              terus berbenah demi kesejahteraan warganya.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-widest text-white">
              Navigasi
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                ["Beranda", "#beranda"],
                ["Tentang", "#tentang"],
                ["Layanan", "#layanan"],
                ["Program", "#program"],
                ["Galeri", "#galeri"],
                ["Pengurus", "#pengurus"]
              ].map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="transition-colors hover:text-cyan-300"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-widest text-white">
              Layanan
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                "Administrasi kependudukan",
                "Posyandu & kesehatan",
                "Ronda & keamanan",
                "Pemberdayaan UMKM",
                "Kebersihan lingkungan",
                "Kegiatan sosial budaya"
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Icon name="check" className="h-4 w-4 shrink-0 text-cyan-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-widest text-white">
              Kontak
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Icon name="pin" className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" />
                <span>{contact.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Icon name="phone" className="h-5 w-5 shrink-0 text-cyan-400" />
                <span>{contact.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Icon name="mail" className="h-5 w-5 shrink-0 text-cyan-400" />
                <span className="break-all">{contact.email}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-rw flex flex-col items-center justify-between gap-3 py-6 text-center text-xs text-ocean-300/70 sm:flex-row sm:text-left">
          <p>
            © {year} RW 09 Tanjung Mas, Kelurahan Tanjung Mas, Kecamatan
            Semarang Utara, Kota Semarang.
          </p>
        </div>
      </div>
    </footer>
  );
}
