export function toInputDate(date: string): string {
  if (/^\d{2}-\d{2}-\d{4}$/.test(date)) {
    const [day, month, year] = date.split("-");
    return `${year}-${month}-${day}`;
  }
  return date;
}

export function fromInputDate(date: string): string {
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
  }
  return date;
}

export function formatDate(date: string): string {
  const input = toInputDate(date);
  const [year, month, day] = input.split("-");
  const value = new Date(Number(year), Number(month) - 1, Number(day));

  return value.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
