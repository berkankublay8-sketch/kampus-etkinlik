import { useNavigate, useParams } from "react-router-dom";
import EventForm from "../components/forms/EventForm";
import { useEvents } from "../context/EventsContext";
import type { EventFormData } from "../types/campus-event";
import { findEventById } from "../utils/filter-events";
import { toInputDate } from "../utils/format-date";
import NotFoundPage from "./NotFoundPage";

function EditEventPage() {
  const { id } = useParams<{ id: string }>();
  const { events, updateEvent } = useEvents();
  const navigate = useNavigate();
  const event = findEventById(events, id ?? "");

  if (!event) return <NotFoundPage />;

  const initialData: EventFormData = {
    title: event.title,
    category: event.category,
    date: toInputDate(event.date),
    time: event.time,
    location: event.location,
    capacity: String(event.capacity),
    description: event.description,
  };

  return (
    <section>
      <EventForm
        key={event.id}
        initialData={initialData}
        submitText="Güncelle"
        onSubmit={(data) => {
          updateEvent(event.id, data);
          navigate("/admin");
        }}
      />
    </section>
  );
}

export default EditEventPage;
