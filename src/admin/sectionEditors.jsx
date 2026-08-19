import Icon from "../components/Icon";
import {
  Field,
  TextInput,
  TextArea,
  TextList,
  ImagePicker,
  ArrayCard,
  buttonClass
} from "./editors";

export const ICON_OPTIONS = [
  "document",
  "health",
  "shield",
  "shop",
  "leaf",
  "heart",
  "wave",
  "users",
  "pin",
  "whatsapp"
];

export const SCHEMAS = {
  stats: [
    { key: "label", label: "Label" },
    { key: "value", label: "Nilai" },
    { key: "unit", label: "Tampilkan tanpa tanda '+'", type: "checkbox" }
  ],
  services: [
    { key: "id", label: "ID" },
    { key: "icon", label: "Ikon", type: "select", options: ICON_OPTIONS },
    { key: "title", label: "Judul" },
    { key: "description", label: "Deskripsi", type: "textarea" },
    { key: "features", label: "Fitur (satu per baris)", type: "textlist" }
  ],
  programs: [
    { key: "id", label: "ID" },
    { key: "category", label: "Kategori" },
    { key: "title", label: "Judul" },
    { key: "description", label: "Deskripsi", type: "textarea" },
    { key: "image", label: "Gambar", type: "image" }
  ],
  gallery: [
    { key: "id", label: "ID" },
    { key: "title", label: "Judul" },
    { key: "image", label: "Gambar", type: "image" }
  ],
  leadership: [
    { key: "name", label: "Nama" },
    { key: "role", label: "Jabatan" },
    { key: "initials", label: "Inisial (avatar)" }
  ],
  faq: [
    { key: "q", label: "Pertanyaan" },
    { key: "a", label: "Jawaban", type: "textarea" }
  ]
};

export const NEW_ITEMS = {
  stats: { label: "", value: 0 },
  services: { id: "", icon: "document", title: "", description: "", features: [] },
  programs: { id: "", category: "", title: "", description: "", image: "" },
  gallery: { id: "", title: "", image: "" },
  leadership: { name: "", role: "", initials: "" },
  faq: { q: "", a: "" }
};

export function EditSection({ label, onEdit, children }) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onEdit}
        title={`Edit: ${label}`}
        className="absolute right-3 top-3 z-20 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-ocean-700 shadow-lg ring-1 ring-slate-200 backdrop-blur transition-colors hover:bg-ocean-600 hover:text-white sm:right-5 sm:top-5"
      >
        <Icon name="edit" className="h-4 w-4" />
        Edit
      </button>
      {children}
    </div>
  );
}

export function EditModal({ title, onClose, onSave, saving, children }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
          <h3 className="text-base font-extrabold text-slate-900 sm:text-lg">
            Edit: {title}
          </h3>
          <button
            type="button"
            aria-label="Tutup"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-lg text-lg text-slate-500 transition-colors hover:bg-slate-100"
          >
            &times;
          </button>
        </div>
        <div className="max-h-[calc(90vh-8.5rem)] space-y-6 overflow-y-auto px-5 py-5 sm:px-6">
          {children}
        </div>
        <div className="flex items-center justify-end gap-2 border-t border-slate-100 px-5 py-4 sm:px-6">
          <button type="button" className={buttonClass.ghost} onClick={onClose}>
            Batal
          </button>
          <button
            type="button"
            className={buttonClass.primary}
            disabled={saving}
            onClick={onSave}
          >
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function HeroFields({ value, onChange }) {
  const set = (k, v) => onChange({ ...value, [k]: v });
  const setHero = (k, v) => onChange({ ...value, hero: { ...(value.hero || {}), [k]: v } });
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nama / Branding">
          <TextInput value={value.name} onChange={(v) => set("name", v)} />
        </Field>
        <Field label="Subjudul / Lokasi">
          <TextInput value={value.subtitle} onChange={(v) => set("subtitle", v)} />
        </Field>
      </div>
      <Field label="Tagline">
        <TextArea value={value.tagline} onChange={(v) => set("tagline", v)} rows={2} />
      </Field>
      <ImagePicker label="Gambar utama beranda" value={value.hero?.image} onChange={(v) => setHero("image", v)} />
      <Field label="Keterangan gambar">
        <TextInput value={value.hero?.caption} onChange={(v) => setHero("caption", v)} />
      </Field>
    </div>
  );
}

export function AboutFields({ value, onChange }) {
  const set = (k, v) => onChange({ ...value, [k]: v });
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Judul">
          <TextInput value={value.aboutTitle} onChange={(v) => set("aboutTitle", v)} />
        </Field>
        <Field label="Kata bergradasi biru di judul">
          <TextInput value={value.aboutHeading} onChange={(v) => set("aboutHeading", v)} />
        </Field>
      </div>
      <Field label="Deskripsi paragraf 1">
        <TextArea value={value.description} onChange={(v) => set("description", v)} rows={3} />
      </Field>
      <Field label="Deskripsi paragraf 2">
        <TextArea value={value.aboutDescription} onChange={(v) => set("aboutDescription", v)} rows={3} />
      </Field>
      <Field label="Gambar galeri (maks 4)">
        <div className="grid gap-4 sm:grid-cols-2">
          {[0, 1, 2, 3].map((i) => (
            <ImagePicker
              key={i}
              label={`Gambar ${i + 1}`}
              value={value.aboutImages?.[i]}
              onChange={(v) => {
                const arr = [...(value.aboutImages || [])];
                arr[i] = v;
                set("aboutImages", arr);
              }}
              aspect="h-24"
            />
          ))}
        </div>
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Label kotak (mis. Tahun berdiri)">
          <TextInput value={value.establishedLabel} onChange={(v) => set("establishedLabel", v)} />
        </Field>
        <Field label="Isi kotak (mis. Komunitas RW 09)">
          <TextInput value={value.establishedValue} onChange={(v) => set("establishedValue", v)} />
        </Field>
      </div>
      <ArrayCard
        label="Kartu singkat"
        items={value.taglineCards}
        schema={[
          { key: "icon", label: "Ikon", type: "select", options: ICON_OPTIONS },
          { key: "title", label: "Judul" },
          { key: "text", label: "Deskripsi" }
        ]}
        newItem={{ icon: "wave", title: "", text: "" }}
        onChange={(v) => set("taglineCards", v)}
      />
    </div>
  );
}

export function ContactFields({ value, onChange }) {
  const set = (k, v) => onChange({ ...value, [k]: v });
  const setContact = (k, v) => onChange({ ...value, contact: { ...(value.contact || {}), [k]: v } });
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Field label="Nama / Branding">
            <TextInput value={value.name} onChange={(v) => set("name", v)} />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Alamat">
            <TextArea value={value.contact?.address} onChange={(v) => setContact("address", v)} rows={2} />
          </Field>
        </div>
        <Field label="Telepon">
          <TextInput value={value.contact?.phone} onChange={(v) => setContact("phone", v)} />
        </Field>
        <Field label="Nomor WhatsApp (format 628xx)">
          <TextInput value={value.contact?.waNumber} onChange={(v) => setContact("waNumber", v)} />
        </Field>
        <Field label="Label WhatsApp">
          <TextInput value={value.contact?.whatsappLabel} onChange={(v) => setContact("whatsappLabel", v)} />
        </Field>
        <Field label="Email">
          <TextInput value={value.contact?.email} onChange={(v) => setContact("email", v)} />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Jam Kerja">
            <TextInput value={value.contact?.hours} onChange={(v) => setContact("hours", v)} />
          </Field>
        </div>
      </div>
      <ArrayCard
        label="Media sosial"
        items={value.socials}
        schema={[
          { key: "name", label: "Ikon", type: "select", options: ["facebook", "instagram", "youtube", "whatsapp"] },
          { key: "label", label: "Label" },
          { key: "url", label: "URL" }
        ]}
        newItem={{ name: "facebook", label: "", url: "" }}
        onChange={(v) => set("socials", v)}
      />
    </div>
  );
}

export function VisiMisiFields({ value, onChange }) {
  return (
    <div className="space-y-4">
      <Field label="Visi">
        <TextArea value={value.visi} onChange={(v) => onChange({ ...value, visi: v })} rows={4} />
      </Field>
      <Field label="Misi (satu per baris)">
        <TextList value={value.misi} onChange={(v) => onChange({ ...value, misi: v })} />
      </Field>
    </div>
  );
}