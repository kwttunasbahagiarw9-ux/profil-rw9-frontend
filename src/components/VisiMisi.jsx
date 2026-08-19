import Icon from "./Icon";

export default function VisiMisi({ visi, misi }) {
  return (
    <section className="section-pad bg-slate-50">
      <div className="container-rw">
        <div className="mx-auto max-w-2xl text-center">
          <span className="badge">
            <Icon name="users" className="h-4 w-4" />
            Visi & Misi
          </span>
          <h2 className="section-title mt-4">
            Arah dan Cita-cita <span className="text-ocean-600">Kami</span>
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ocean-700 to-ocean-900 p-8 text-white shadow-soft sm:p-10">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
            <div className="pointer-events-none absolute -bottom-14 -left-8 h-48 w-48 rounded-full bg-cyan-400/20" />
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15">
              <Icon name="pin" className="h-6 w-6" />
            </span>
            <h3 className="mt-5 text-2xl font-extrabold">Visi Kami</h3>
            <p className="mt-4 leading-relaxed text-ocean-50">{visi}</p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-card ring-1 ring-slate-100 sm:p-10">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sand-100 text-sand-600">
              <Icon name="check" className="h-6 w-6" />
            </span>
            <h3 className="mt-5 text-2xl font-extrabold text-slate-900">
              Misi Kami
            </h3>
            <ul className="mt-4 space-y-3">
              {misi.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ocean-100 text-xs font-extrabold text-ocean-700">
                    {i + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-slate-600">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
