import Icon from "./Icon";

const AVATAR_COLORS = [
  "bg-ocean-600",
  "bg-sand-500",
  "bg-emerald-600",
  "bg-rose-500",
  "bg-indigo-500",
  "bg-cyan-600",
  "bg-amber-500",
  "bg-teal-600"
];

export default function Leadership({ leadership }) {
  return (
    <section id="pengurus" className="section-pad bg-slate-50">
      <div className="container-rw">
        <div className="mx-auto max-w-2xl text-center">
          <span className="badge">
            <Icon name="users" className="h-4 w-4" />
            Struktur Pengurus
          </span>
          <h2 className="section-title mt-4">
            Pengurus <span className="text-ocean-600">RW 09</span> Tanjung Mas
          </h2>
          <p className="mt-4 text-slate-600">
            Pengurus RW yang berkomitmen melayani dan memperjuangkan kepentingan
            warga.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {leadership.map((person, i) => (
            <div
              key={person.name}
              className="card group text-center"
            >
              <div
                className={`mx-auto grid h-16 w-16 place-items-center rounded-2xl text-lg font-extrabold text-white shadow-soft transition-transform duration-300 group-hover:-translate-y-1 sm:h-20 sm:w-20 sm:text-xl ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}
              >
                {person.initials}
              </div>
              <h3 className="mt-4 text-sm font-extrabold text-slate-900 sm:text-base">
                {person.name}
              </h3>
              <p className="mt-1 text-xs font-semibold text-ocean-600 sm:text-sm">
                {person.role}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
