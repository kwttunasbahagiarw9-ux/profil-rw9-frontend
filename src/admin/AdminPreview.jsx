import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import About from "../components/About";
import VisiMisi from "../components/VisiMisi";
import Services from "../components/Services";
import Programs from "../components/Programs";
import Gallery from "../components/Gallery";
import Leadership from "../components/Leadership";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import ScrollTop from "../components/ScrollTop";
import Icon from "../components/Icon";
import { fetchContent, saveContent, clearToken, authHeaders } from "./api";
import { apiUrl } from "../api";
import { buttonClass, ArrayCard } from "./editors";
import Toast from "./Toast";
import {
  EditSection,
  EditModal,
  HeroFields,
  AboutFields,
  ContactFields,
  FooterFields,
  VisiMisiFields,
  SCHEMAS,
  NEW_ITEMS
} from "./sectionEditors";

const ALL_KEYS = ["site", "stats", "visi", "misi", "services", "programs", "gallery", "leadership", "faq"];

export default function AdminPreview() {
  const [sections, setSections] = useState(() => Object.fromEntries(ALL_KEYS.map((k) => [k, null])));
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState(null);
  const [username, setUsername] = useState("");
  const [modal, setModal] = useState(null);
  const [draft, setDraft] = useState(null);
  const [saving, setSaving] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);

  useEffect(() => {
    Promise.all(ALL_KEYS.map((k) => fetchContent(k).then((v) => [k, v])))
      .then((entries) => {
        setSections(Object.fromEntries(entries));
        setLoading(false);
      })
      .catch((err) => {
        setNotice({ type: "error", text: err.message });
        setLoading(false);
      });

    fetch(apiUrl("/api/admin/me"), { headers: authHeaders() })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => j && setUsername(j.username))
      .catch(() => {});
  }, []);

  const site = sections.site || {};

  function openEditor(editorKey, label, data) {
    setModal({ editorKey, label });
    setDraft(JSON.parse(JSON.stringify(data)));
    setNotice(null);
  }

  async function handleSave() {
    if (!modal) return;
    setSaving(true);
    try {
      if (modal.editorKey === "visimisi") {
        await saveContent("visi", draft.visi);
        await saveContent("misi", draft.misi);
        setSections((s) => ({ ...s, visi: draft.visi, misi: draft.misi }));
      } else {
        const endpoint = modal.editorKey.startsWith("site-") ? "site" : modal.editorKey;
        await saveContent(endpoint, draft);
        if (endpoint === "site") setSections((s) => ({ ...s, site: draft }));
        else setSections((s) => ({ ...s, [endpoint]: draft }));
      }
      setNotice({ type: "success", text: `Konten "${modal.label}" berhasil disimpan.` });
      setModal(null);
    } catch (err) {
      setNotice({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  }

  function renderEditor() {
    if (!modal) return null;
    switch (modal.editorKey) {
      case "site-hero":
        return <HeroFields value={draft} onChange={setDraft} />;
      case "site-about":
        return <AboutFields value={draft} onChange={setDraft} />;
      case "site-contact":
        return <ContactFields value={draft} onChange={setDraft} />;
      case "site-footer":
        return <FooterFields value={draft} onChange={setDraft} />;
      case "visimisi":
        return <VisiMisiFields value={draft} onChange={setDraft} />;
      default:
        return (
          <div>
            <p className="mb-3 text-sm font-semibold text-slate-500">
              ({Array.isArray(draft) ? draft.length : 0} item)
            </p>
            <ArrayCard
              label={modal.label}
              items={draft}
              schema={SCHEMAS[modal.editorKey]}
              newItem={NEW_ITEMS[modal.editorKey]}
              onChange={setDraft}
            />
          </div>
        );
    }
  }

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-100">
        <p className="text-sm font-semibold text-slate-400">Memuat konten...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="container-rw flex items-center justify-between gap-2 py-3 sm:gap-3 sm:py-4">
          <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-ocean-500 to-ocean-700 text-white shadow-soft sm:h-11 sm:w-11">
              <Icon name="admin" className="h-6 w-6" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-base font-extrabold text-slate-900">Panel Admin</p>
              <p className="truncate text-xs text-slate-500 sm:text-sm">
                {username ? `Masuk sebagai ${username}` : "Mode pratinjau — klik tombol Edit pada setiap bagian"}
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <a
              href="/"
              title="Lihat Situs"
              className={`${buttonClass.ghost} !px-2.5 !py-2 sm:!px-3 sm:!py-1.5`}
            >
              <Icon name="external" className="h-4 w-4" />
              <span className="hidden sm:inline">Lihat Situs</span>
            </a>
            <button
              type="button"
              className={`${buttonClass.danger} !px-2.5 !py-2 sm:!px-3.5 sm:!py-2`}
              onClick={() => setConfirmLogout(true)}
            >
              <Icon name="logout" className="h-4 w-4" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>
      </div>

      <main>
        <EditSection label="Beranda" onEdit={() => openEditor("site-hero", "Beranda", sections.site)}>
          <Hero site={site} />
        </EditSection>

        <EditSection label="Statistik" onEdit={() => openEditor("stats", "Statistik", sections.stats)}>
          <Stats stats={sections.stats || []} />
        </EditSection>

        <EditSection label="Tentang" onEdit={() => openEditor("site-about", "Tentang", sections.site)}>
          <About site={site} />
        </EditSection>

        <EditSection
          label="Visi & Misi"
          onEdit={() => openEditor("visimisi", "Visi & Misi", { visi: sections.visi, misi: sections.misi })}
        >
          <VisiMisi visi={sections.visi} misi={sections.misi} />
        </EditSection>

        <EditSection label="Layanan" onEdit={() => openEditor("services", "Layanan", sections.services)}>
          <Services services={sections.services || []} />
        </EditSection>

        <EditSection label="Program" onEdit={() => openEditor("programs", "Program", sections.programs)}>
          <Programs programs={sections.programs || []} />
        </EditSection>

        <EditSection label="Galeri" onEdit={() => openEditor("gallery", "Galeri", sections.gallery)}>
          <Gallery gallery={sections.gallery || []} />
        </EditSection>

        <EditSection label="Pengurus" onEdit={() => openEditor("leadership", "Pengurus", sections.leadership)}>
          <Leadership leadership={sections.leadership || []} />
        </EditSection>

        <EditSection
          label="FAQ"
          onEdit={() => openEditor("faq", "Pertanyaan & Jawaban (FAQ)", sections.faq)}
        >
          <FAQ faq={sections.faq || []} />
        </EditSection>

        <EditSection
          label="Kontak"
          onEdit={() => openEditor("site-contact", "Kontak & Media Sosial", sections.site)}
        >
          <Contact site={site} />
        </EditSection>
      </main>

      <EditSection label="Footer" onEdit={() => openEditor("site-footer", "Footer", sections.site)}>
        <Footer site={site} />
      </EditSection>

      <ScrollTop />

      {modal && (
        <EditModal
          title={modal.label}
          onClose={() => setModal(null)}
          onSave={handleSave}
          saving={saving}
        >
          {renderEditor()}
        </EditModal>
      )}

      <Toast notice={notice} onDismiss={() => setNotice(null)} />

      {confirmLogout && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="logout-confirm-title"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setConfirmLogout(false);
          }}
        >
          <div className="w-full max-w-sm animate-fade-up overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-slate-100">
            <div className="px-8 pt-8 text-center">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-ocean-50 to-cyan-100 text-ocean-600 ring-1 ring-ocean-100 shadow-soft">
                <Icon name="logout" className="h-7 w-7" />
              </span>
              <h3 id="logout-confirm-title" className="mt-5 text-lg font-extrabold text-slate-900">
                Keluar dari Panel Admin
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                Apakah Anda yakin ingin keluar dari mode admin? Perubahan yang belum disimpan
                akan hilang.
              </p>
            </div>
            <div className="mt-7 grid grid-cols-2 gap-3 border-t border-slate-100 px-8 py-6">
              <button
                type="button"
                className={`${buttonClass.ghost} !rounded-xl !py-2.5`}
                onClick={() => setConfirmLogout(false)}
              >
                Batal
              </button>
              <button
                type="button"
                className={`${buttonClass.primary} !rounded-xl !py-2.5`}
                onClick={() => {
                  clearToken();
                  window.location.href = "/admin";
                }}
              >
                <Icon name="logout" className="h-4 w-4" />
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}