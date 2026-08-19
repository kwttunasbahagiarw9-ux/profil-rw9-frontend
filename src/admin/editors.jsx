import { useRef, useState } from "react";
import { uploadImage } from "./api";

export const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-ocean-500 focus:ring-2 focus:ring-ocean-200";

export const buttonClass = {
  primary:
    "inline-flex items-center justify-center gap-2 rounded-lg bg-ocean-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-ocean-700 disabled:cursor-not-allowed disabled:opacity-50",
  ghost:
    "inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50",
  danger:
    "inline-flex items-center justify-center gap-1 rounded-lg bg-rose-50 px-2.5 py-1.5 text-xs font-bold text-rose-600 transition-colors hover:bg-rose-100"
};

export function Label({ children }) {
  return (
    <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">
      {children}
    </label>
  );
}

export function Field({ label, children }) {
  return (
    <div>
      <Label>{label}</Label>
      {children}
    </div>
  );
}

export function TextInput({ value, onChange, placeholder, type = "text" }) {
  return (
    <input
      type={type}
      className={inputClass}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}

export function TextArea({ value, onChange, rows = 3, placeholder }) {
  return (
    <textarea
      className={`${inputClass} resize-y`}
      rows={rows}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}

export function TextList({ value, onChange }) {
  const text = Array.isArray(value) ? value.join("\n") : "";
  return (
    <textarea
      className={`${inputClass} resize-y font-mono`}
      rows={Math.max(3, (Array.isArray(value) ? value.length : 1) + 1)}
      value={text}
      onChange={(e) => onChange(e.target.value.split(/\r?\n/).filter((s) => s.trim() !== ""))}
      placeholder="Satu item per baris"
    />
  );
}

export function Checkbox({ value, onChange, label }) {
  return (
    <label className="flex items-center gap-2 text-sm font-semibold text-slate-600">
      <input
        type="checkbox"
        checked={Boolean(value)}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-slate-300 text-ocean-600 focus:ring-ocean-500"
      />
      {label}
    </label>
  );
}

const IMAGE_EXT = ["jpg", "jpeg", "png", "webp", "gif", "svg", "avif"];
const IMAGES_REGEX = new RegExp(`\\.(?:${IMAGE_EXT.join("|")})$`, "i");

export function ImagePicker({ value, onChange, label, aspect = "h-32" }) {
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  async function handleFile(file) {
    if (!file) return;
    if (!IMAGES_REGEX.test(file.name)) {
      setError("File harus berupa gambar (jpg, png, webp, gif, svg, avif)");
      return;
    }
    setError(null);
    setUploading(true);
    try {
      const url = await uploadImage(file);
      onChange(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      {label && <Label>{label}</Label>}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
        <div className="flex flex-col items-center gap-2">
          {value ? (
            <img
              src={value}
              alt="Pratinjau"
              className={`${aspect} w-40 rounded-lg border border-slate-200 object-cover`}
            />
          ) : (
            <div
              className={`${aspect} grid w-40 place-items-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-xs font-semibold text-slate-400`}
            >
              Belum ada gambar
            </div>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          <button type="button" className={buttonClass.ghost} onClick={() => fileRef.current?.click()}>
            {uploading ? "Mengunggah..." : "Upload"}
          </button>
        </div>
        <div className="flex-1">
          <label className="mb-1 block text-xs font-semibold text-slate-400">
            atau tempel URL gambar
          </label>
          <TextInput value={value ?? ""} onChange={onChange} placeholder="https://..." />
        </div>
      </div>
      {error && <p className="mt-1 text-xs font-semibold text-rose-600">{error}</p>}
    </div>
  );
}

export function ItemRow({ item, index, count, schema, onChange, onRemove, onMove }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-start gap-3">
        <MoveButtons index={index} count={count} onMove={onMove} />
        <div className="grid flex-1 gap-3">
          {schema.map((field) => (
            <div key={field.key}>
              {renderField(field, item[field.key], (value) =>
                onChange({ ...item, [field.key]: value })
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          title="Hapus item"
          onClick={onRemove}
          className={buttonClass.danger}
        >
          &times;
        </button>
      </div>
    </div>
  );
}

function renderField(field, value, onChange) {
  switch (field.type) {
    case "textarea":
      return (
        <>
          {field.label && <Label>{field.label}</Label>}
          <TextArea value={value} onChange={onChange} rows={field.rows || 3} placeholder={field.placeholder} />
        </>
      );
    case "textlist":
      return (
        <>
          {field.label && <Label>{field.label}</Label>}
          <TextList value={value} onChange={onChange} />
        </>
      );
    case "checkbox":
      return <Checkbox value={value} onChange={onChange} label={field.label} />;
    case "image":
      return <ImagePicker label={field.label} value={value} onChange={onChange} />;
    case "select":
      return (
        <>
          {field.label && <Label>{field.label}</Label>}
          <select
            className={inputClass}
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
          >
            {(field.options || []).map((opt) => (
              <option key={typeof opt === "string" ? opt : opt.value} value={typeof opt === "string" ? opt : opt.value}>
                {typeof opt === "string" ? opt : opt.label}
              </option>
            ))}
          </select>
        </>
      );
    default:
      return (
        <>
          {field.label && <Label>{field.label}</Label>}
          <TextInput type={field.type} value={value} onChange={onChange} placeholder={field.placeholder} />
        </>
      );
  }
}

export function ArrayCard({ label, items, schema, newItem, onChange }) {
  const list = Array.isArray(items) ? items : [];

  function update(index, item) {
    const next = [...list];
    next[index] = item;
    onChange(next);
  }

  function remove(index) {
    onChange(list.filter((_, i) => i !== index));
  }

  function add() {
    onChange([...list, { ...newItem }]);
  }

  function move(from, to) {
    const next = [...list];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(next);
  }

  const keyer = (item, i) => String(i);

  return (
    <div className="space-y-3">
      {label && <Label>{label}</Label>}
      {list.map((item, i) => (
        <ItemRow
          key={keyer(item, i)}
          item={item}
          index={i}
          count={list.length}
          schema={schema}
          onChange={(val) => update(i, val)}
          onRemove={() => remove(i)}
          onMove={move}
        />
      ))}
      <button type="button" className={buttonClass.ghost} onClick={add}>
        + Tambah item
      </button>
    </div>
  );
}

export function MoveButtons({ index, count, onMove }) {
  return (
    <div className="flex flex-col">
      <button
        type="button"
        title="Naikkan"
        disabled={index === 0}
        onClick={() => onMove(index, index - 1)}
        className="rounded px-1.5 py-0.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-30"
      >
        &uarr;
      </button>
      <button
        type="button"
        title="Turunkan"
        disabled={index === count - 1}
        onClick={() => onMove(index, index + 1)}
        className="rounded px-1.5 py-0.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-30"
      >
        &darr;
      </button>
    </div>
  );
}