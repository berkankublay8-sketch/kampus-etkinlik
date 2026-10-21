export function formatDate(date: string): string {
  const [day, month, year] = date.split("-");

  const value = new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
  );

  return value.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
