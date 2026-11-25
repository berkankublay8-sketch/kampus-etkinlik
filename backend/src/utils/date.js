export function parseDate(value) {
  if (value instanceof Date || value == null) return value;
  const match = typeof value === "string" && /^(\d{2})-(\d{2})-(\d{4})$/.exec(value);
  if (!match) return new Date(NaN);

  const [, day, month, year] = match.map(Number);
  const date = new Date(0);
  date.setUTCFullYear(year, month - 1, day);
  if (date.getUTCDate() !== day || date.getUTCMonth() !== month - 1 || date.getUTCFullYear() !== year) {
    return new Date(NaN);
  }
  return date;
}

export function formatDate(value) {
  if (!(value instanceof Date)) return value;
  const day = String(value.getUTCDate()).padStart(2, "0");
  const month = String(value.getUTCMonth() + 1).padStart(2, "0");
  const year = String(value.getUTCFullYear()).padStart(4, "0");
  return [day, month, year].join("-");
}

export function todayStart() {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  return today;
}
