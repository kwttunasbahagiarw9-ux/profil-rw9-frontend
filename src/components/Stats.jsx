import { useEffect, useRef, useState } from "react";

export default function Stats({ stats }) {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative z-10 -mt-10 px-5 sm:px-8 lg:px-10"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 rounded-3xl bg-white p-6 shadow-card ring-1 ring-slate-100 sm:gap-6 sm:p-8 lg:grid-cols-4">
        {stats.map((stat) => {
          const numeric = typeof stat.value === "number";
          return (
            <div
              key={stat.label}
              className="rounded-2xl bg-gradient-to-b from-ocean-50 to-white p-5 text-center ring-1 ring-ocean-100"
            >
              <p className="text-3xl font-extrabold text-ocean-700 sm:text-4xl">
                {numeric && started ? (
                  <CountUp target={stat.value} />
                ) : (
                  stat.value
                )}
                {stat.unit ? "" : "+"}
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:text-sm">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function CountUp({ target }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  return value.toLocaleString("id-ID");
}
