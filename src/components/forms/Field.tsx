import { clsx } from "clsx";

const baseInput =
  "w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted/70 focus:border-primary focus:ring-2 focus:ring-primary/20";

export function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  textarea,
  rows = 5,
  accept,
  className,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  textarea?: boolean;
  rows?: number;
  accept?: string;
  className?: string;
}) {
  return (
    <label className={clsx("block", className)}>
      <span className="mb-2 block text-sm font-medium text-foreground">
        {label}
        {required ? <span className="ml-1 text-primary">*</span> : null}
      </span>
      {textarea ? (
        <textarea name={name} rows={rows} required={required} placeholder={placeholder} className={baseInput} />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          placeholder={placeholder}
          accept={accept}
          className={clsx(baseInput, type === "file" && "file:mr-3 file:rounded-lg file:border-0 file:bg-primary/10 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-primary")}
        />
      )}
    </label>
  );
}
