import type { CampusEvent, Category } from "../types/campus-event";

export function searchEvents(list: CampusEvent[], text: string): CampusEvent[] {
  const q = text.trim();
  if (q === "") return list;

  return list.filter(
    (event) => event.title.includes(q) || event.description.includes(q),
  );
}

export function filterByCategory(
  list: CampusEvent[],
  category: Category | "",
): CampusEvent[] {
  if (category === "") return list;
  return list.filter((event) => event.category === category);
}

export function findEventById(
  list: CampusEvent[],
  id: string,
): CampusEvent | undefined {
  return list.find((event) => event.id === id);
}
