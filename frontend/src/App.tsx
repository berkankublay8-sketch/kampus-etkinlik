import { useEffect, useState } from "react";
import "./App.css";

import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import EventDetail from "./components/events/EventDetail";
import EventFilter from "./components/events/EventFilter";
import EventList from "./components/events/EventList";
import EventForm from "./components/forms/EventForm";

import { events } from "./data/events";
import type { Category } from "./types/campus-event";
import type { PageName } from "./types/page";
import {
  filterByCategory,
  findEventById,
  searchEvents,
} from "./utils/filter-events";

function dateKey(date: string): string {
  return date.split("-").reverse().join("-");
}

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null): void {
    setPage(next);
    setSelectedId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const selected = selectedId
    ? findEventById(events, selectedId)
    : undefined;

  const title =
    page === "detail" && selected
      ? selected.title
      : page === "add"
        ? "Etkinlik Ekle"
        : page === "update"
          ? "Etkinlik Güncelle"
          : page === "events"
            ? "Tüm Etkinlikler"
            : "Kampüs Etkinlikleri";

  const text =
    page === "home"
      ? "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin."
      : page === "events"
        ? "Ekim ayında kampüste düzenlenen etkinlikler."
        : undefined;

  const current: PageName =
    page === "detail" || page === "update" ? "events" : page;

  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${title}`;
  }, [title]);

  const upcoming = [...events]
    .sort((a, b) => dateKey(a.date).localeCompare(dateKey(b.date)))
    .slice(0, 2);

  const filtered = filterByCategory(
    searchEvents(events, searchText),
    category,
  );

  const categories: Category[] = [
    ...new Set(events.map((event) => event.category)),
  ];

  return (
    <>
      <Header title={title} text={text} />
      <Navigation current={current} onNavigate={go} />

      <main>
        {page === "home" && (
          <>
            <section className="yaklasanlar" aria-labelledby="yaklasan-baslik">
              <h2 id="yaklasan-baslik">Yaklaşan 2 Etkinlik</h2>
              <EventList
                events={upcoming}
                onShowDetail={(id) => go("detail", id)}
              />
            </section>

            <p>
              <button type="button" onClick={() => go("events")}>
                Tüm etkinlikleri gör
              </button>
            </p>
          </>
        )}

        {page === "events" && (
          <section>
            <EventFilter
              searchText={searchText}
              category={category}
              categories={categories}
              onSearchChange={setSearchText}
              onCategoryChange={setCategory}
            />

            {filtered.length > 0 && (
              <p id="sonuc">{filtered.length} etkinlik listeleniyor.</p>
            )}

            <EventList
              events={filtered}
              onShowDetail={(id) => go("detail", id)}
              emptyText="Aramanıza uygun etkinlik bulunamadı."
            />
          </section>
        )}

        {page === "detail" && !selected && (
          <section className="form-hata">
            <h2>Etkinlik bulunamadı</h2>
            <p>Seçili etkinlik bulunamadı.</p>
            <button type="button" onClick={() => go("events")}>
              Listeye dön
            </button>
          </section>
        )}

        {page === "detail" && selected && (
          <EventDetail
            event={selected}
            onBack={() => go("events")}
            onEdit={(id) => go("update", id)}
          />
        )}

        {(page === "add" || page === "update") && (
          <EventForm onSubmit={() => window.scrollTo(0, 0)} />
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;
