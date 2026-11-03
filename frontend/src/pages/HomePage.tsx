import { Link } from "react-router-dom";
import EventList from "../components/events/EventList";
import { useEvents } from "../context/EventsContext";
import { toInputDate } from "../utils/format-date";

function HomePage() {
  const { events } = useEvents();
  const upcoming = [...events]
    .sort((a, b) => toInputDate(a.date).localeCompare(toInputDate(b.date)))
    .slice(0, 2);

  return (
    <>
      <section className="yaklasanlar" aria-labelledby="yaklasan-baslik">
        <h2 id="yaklasan-baslik">Yaklaşan 2 Etkinlik</h2>
        <EventList events={upcoming} />
      </section>
      <p><Link className="button-link" to="/events">Tüm etkinlikleri gör</Link></p>
    </>
  );
}

export default HomePage;
