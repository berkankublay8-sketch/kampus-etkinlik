import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import { formatDate } from "../utils/format-date";

function AdminPage() {
  const { events, deleteEvent } = useEvents();

  function handleDelete(id: string, title: string): void {
    if (window.confirm(`${title} silinsin mi?`)) {
      deleteEvent(id);
    }
  }

  return (
    <section>
      <p className="admin-yeni">
        <Link className="button-link" to="/admin/new">
          + Yeni etkinlik
        </Link>
      </p>

      <table className="tablo">
        <thead>
          <tr>
            <th>Etkinlik</th>
            <th>Tarih</th>
            <th>Kategori</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td data-baslik="Etkinlik">{event.title}</td>
              <td data-baslik="Tarih">{formatDate(event.date)}</td>
              <td data-baslik="Kategori">{event.category}</td>
              <td className="islemler" data-baslik="İşlemler">
                <Link
                  className="button-link button-kucuk"
                  to={`/admin/${event.id}/edit`}
                >
                  Düzenle
                </Link>
                <button
                  className="button-sil button-kucuk"
                  type="button"
                  onClick={() => handleDelete(event.id, event.title)}
                >
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default AdminPage;
