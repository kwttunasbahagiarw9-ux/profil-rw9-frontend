import { useState } from "react";
import Icon from "./Icon";
import { apiUrl } from "../api";

export default function Contact({ site }) {
  const [form, setForm] = useState({ name: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) {
      setStatus({ type: "error", text: "Mohon isi nama dan pesan Anda." });
      return;
    }
    setStatus(null);
    try {
      const res = await fetch(apiUrl("/api/messages"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name.trim(), message: form.message.trim() })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal mengirim pesan.");
      setStatus({
        type: "success",
        text: "Terima kasih! Pesan/saran Anda sudah kami terima dan akan diproses."
      });
      setForm({ name: "", message: "" });
    } catch (err) {
      setStatus({ type: "error", text: err.message || "Gagal mengirim pesan. Coba lagi." });
    }
  };

  const contact = site.contact || {};

  const contactCards = [
    {
      icon: "pin",
      title: "Alamat",
      lines: [contact.address].filter(Boolean)
    },
    {
      icon: "whatsapp",
      title: "WhatsApp",
      lines: [contact.whatsappLabel, contact.phone].filter(Boolean)
    },
    {
      icon: "mail",
      title: "Email",
      lines: [contact.email].filter(Boolean)
    },
    ];

  return (
    <section id="kontak" className="section-pad bg-slate-50">
      <div className="container-rw">
        <div className="mx-auto max-w-2xl text-center">
          <span className="badge">
            <Icon name="pin" className="h-4 w-4" />
            Hubungi Kami
          </span>
          <h2 className="section-title mt-4">
            Mari <span className="text-ocean-600">Bersama Membangun</span> RW 09
          </h2>
          <p className="mt-4 text-slate-600">
            Ada saran, kritik, atau ingin berpartisipasi dalam kegiatan warga?
            Silakan hubungi kami.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            {contactCards.map((card) => (
              <div key={card.title} className="card flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-ocean-100 text-ocean-700">
                  <Icon name={card.icon} className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-extrabold text-slate-900">
                    {card.title}
                  </h3>
                  {card.lines.map((line) => (
                    <p
                      key={line}
                      className="mt-0.5 text-sm text-slate-600"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
            <div className="card flex items-center gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-emerald-100 text-emerald-700">
                <Icon name="whatsapp" className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-extrabold text-slate-900">Media Sosial</h3>
                <div className="mt-2 flex gap-2">
                  {(site.socials || []).map((social) => (
                    <a
                      key={social.name}
                      href={social.url || "#kontak"}
                      aria-label={social.label || social.name}
                      className="grid h-9 w-9 place-items-center rounded-lg bg-slate-100 text-slate-600 transition-colors hover:bg-ocean-600 hover:text-white"
                    >
                      <Icon name={social.name} className="h-4.5 w-4.5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="card lg:col-span-3">
            <h3 className="text-xl font-extrabold text-slate-900">
              Kirim Pesan / Saran
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Pesan Anda akan dikirim langsung ke pengurus RW 09 melalui database.
            </p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-sm font-semibold text-slate-700"
                >
                  Nama Anda
                </label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Masukkan nama lengkap"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition-colors focus:border-ocean-500 focus:bg-white focus:ring-2 focus:ring-ocean-200"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-sm font-semibold text-slate-700"
                >
                  Pesan / Saran
                </label>
                <textarea
                  id="message"
                  rows="5"
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  placeholder="Tuliskan pesan, saran, atau pertanyaan Anda..."
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition-colors focus:border-ocean-500 focus:bg-white focus:ring-2 focus:ring-ocean-200"
                />
              </div>
              {status && (
                <p
                  className={`rounded-xl px-4 py-3 text-sm font-semibold ${
                    status.type === "success"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-rose-50 text-rose-600"
                  }`}
                >
                  {status.text}
                </p>
              )}
              <button type="submit" className="btn-primary w-full sm:w-auto">
                <Icon name="mail" className="h-4 w-4" />
                Kirim Pesan
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-3xl shadow-card ring-1 ring-slate-100">
          <iframe
            title="Peta lokasi RW 09 Tanjung Mas"
            src="https://www.google.com/maps?q=-6.9610886,110.4270548&output=embed"
            className="h-72 w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
