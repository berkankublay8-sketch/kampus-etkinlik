import { createContext, useContext, useState, type ReactNode } from "react";
import { events as initialEvents } from "../data/events";
import type {
  CampusEvent,
  Category,
  EventFormData,
} from "../types/campus-event";
import { fromInputDate } from "../utils/format-date";

interface EventsContextValue {
  events: CampusEvent[];
  addEvent: (data: EventFormData) => void;
  updateEvent: (id: string, data: EventFormData) => void;
  deleteEvent: (id: string) => void;
}

const EventsContext = createContext<EventsContextValue | null>(null);

function toEvent(id: string, data: EventFormData): CampusEvent {
  return {
    id,
    title: data.title.trim(),
    category: data.category as Category,
    date: fromInputDate(data.date),
    time: data.time,
    location: data.location.trim(),
    capacity: Number(data.capacity),
    description: data.description.trim(),
  };
}

export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<CampusEvent[]>(initialEvents);

  function addEvent(data: EventFormData): void {
    setEvents((current) => [
      ...current,
      toEvent(`event-${Date.now()}`, data),
    ]);
  }

  function updateEvent(id: string, data: EventFormData): void {
    setEvents((current) =>
      current.map((event) =>
        event.id === id
          ? { ...toEvent(id, data), image: event.image }
          : event,
      ),
    );
  }

  function deleteEvent(id: string): void {
    setEvents((current) => current.filter((event) => event.id !== id));
  }

  return (
    <EventsContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents(): EventsContextValue {
  const value = useContext(EventsContext);
  if (value === null) {
    throw new Error("EventsProvider yok");
  }
  return value;
}
