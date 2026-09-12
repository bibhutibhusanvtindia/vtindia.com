const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type FieldSpec = { max: number; required?: boolean; email?: boolean };

export function readField(form: FormData, key: string, spec: FieldSpec) {
  const raw = form.get(key);
  const value = typeof raw === "string" ? raw.trim() : "";

  if (!value) {
    return spec.required ? { error: `${key} is required` } : { value: "" };
  }
  if (value.length > spec.max) {
    return { error: `${key} is too long` };
  }
  if (spec.email && !EMAIL_RE.test(value)) {
    return { error: `${key} must be a valid email address` };
  }
  return { value };
}

export function collect(form: FormData, specs: Record<string, FieldSpec>) {
  const values: Record<string, string> = {};
  for (const [key, spec] of Object.entries(specs)) {
    const result = readField(form, key, spec);
    if ("error" in result && result.error) return { error: result.error };
    values[key] = result.value ?? "";
  }
  return { values };
}
