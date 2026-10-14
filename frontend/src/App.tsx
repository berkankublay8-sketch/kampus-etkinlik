import { useEffect, useState } from "react";

import "./App.css";

import { events } from "./data/events";

import type {
  CampusEvent,
  Category,
} from "./types/campus-event";

import {
  filterByCategory,
  findEventById,
  searchEvents,
} from "./utils/filter-events";


type PageName =
  | "home"
  | "events"
  | "detail"
  | "add"
  | "update";


type MenuItem = {
  page: PageName;
  label: string;
};


const menuItems: MenuItem[] = [
  {
    page: "home",
    label: "Ana Sayfa",
  },
  {
    page: "events",
    label: "Etkinlikler",
  },
  {
    page: "add",
    label: "Ekle",
  },
];


function dateKey(date: string): string {
  const [day, month, year] = date.split("-");

  return `${year}-${month}-${day}`;
}


function formatDate(date: string): string {
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


function App() {
  const [page, setPage] =
    useState<PageName>("home");

  const [selectedId, setSelectedId] =
    useState<string | null>(null);

  const [searchText, setSearchText] =
    useState("");

  const [category, setCategory] =
    useState<Category | "">("");


  function go(
    next: PageName,
    id: string | null = null,
  ): void {
    setPage(next);
    setSelectedId(id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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


  useEffect(() => {
    document.title =
      `Kampüs Etkinlikleri — ${title}`;
  }, [title]);


  const upcoming = [...events]
    .sort((a, b) =>
      dateKey(a.date).localeCompare(
        dateKey(b.date),
      ),
    )
    .slice(0, 2);


  const filtered = filterByCategory(
    searchEvents(events, searchText),
    category,
  );


  const categories: Category[] = [
    ...new Set(
      events.map(
        (event) => event.category,
      ),
    ),
  ];


  function handleCategoryChange(
    value: string,
  ): void {
    if (value === "") {
      setCategory("");
      return;
    }

    setCategory(value as Category);
  }


  function renderCard(
    event: CampusEvent,
  ) {
    return (
      <article
        className="etkinlik-kart"
        key={event.id}
      >
        <h3>
          {event.title}
        </h3>

        <p>
          {event.category}
        </p>

        <p>
          Tarih: {formatDate(event.date)},{" "}
          {event.time}
        </p>

        <p>
          Yer: {event.location}
        </p>

        <p>
          Kontenjan: {event.capacity} kişi
        </p>

        <p>
          {event.description}
        </p>

        <a
          href="#detail"
          onClick={(e) => {
            e.preventDefault();

            go("detail", event.id);
          }}
        >
          Detayları gör
        </a>
      </article>
    );
  }


  const activeMenuPage: PageName =
    page === "detail" ||
    page === "update"
      ? "events"
      : page;


  return (
    <>

      <header>

        <h1>
          {title}
        </h1>

        {page === "home" && (
          <p>
            Fakültedeki seminer, atölye ve söyleşileri
            tek yerden takip edin.
          </p>
        )}

        {page === "events" && (
          <p>
            Ekim ayında kampüste düzenlenen etkinlikler.
          </p>
        )}

        <nav
          className="menu"
          aria-label="Ana menü"
        >
          {menuItems.map((item) => (
            <a
              key={item.page}
              href={`#${item.page}`}
              aria-current={
                activeMenuPage === item.page
                  ? "page"
                  : undefined
              }
              onClick={(e) => {
                e.preventDefault();
                go(item.page);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

      </header>


      <main>

        {/* ANA SAYFA */}

        {page === "home" && (
          <>

            <section
              aria-labelledby="yaklasan-baslik"
            >
              <h2 id="yaklasan-baslik">
                Yaklaşan 2 Etkinlik
              </h2>

              <div className="yaklasan-grid">
                {upcoming.map(renderCard)}
              </div>
            </section>


            <p>
              <button
                type="button"
                onClick={() => go("events")}
              >
                Tüm etkinlikleri gör
              </button>
            </p>

          </>
        )}


        {/* ETKİNLİKLER SAYFASI */}

        {page === "events" && (
          <section>

            <form
              className="filtre"
              onSubmit={(e) =>
                e.preventDefault()
              }
            >
              <label htmlFor="arama">
                Etkinlik ara
              </label>

              <input
                id="arama"
                type="search"
                value={searchText}
                placeholder="Örn. atölye, kariyer"
                onChange={(e) =>
                  setSearchText(
                    e.target.value,
                  )
                }
              />


              <label
                htmlFor="kategori-filtre"
              >
                Kategori
              </label>

              <select
                id="kategori-filtre"
                value={category}
                onChange={(e) =>
                  handleCategoryChange(
                    e.target.value,
                  )
                }
              >
                <option value="">
                  Tümü
                </option>

                {categories.map((item) => (
                  <option
                    value={item}
                    key={item}
                  >
                    {item}
                  </option>
                ))}
              </select>

            </form>


            <p id="sonuc">
              {filtered.length === 0
                ? "Aramanıza uygun etkinlik bulunamadı."
                : `${filtered.length} etkinlik listeleniyor.`}
            </p>


            <div className="etkinlik-grid">
              {filtered.map(renderCard)}
            </div>

          </section>
        )}


        {/* DETAY BULUNAMADI */}

        {page === "detail" &&
          !selected && (
            <section className="form-hata">

              <h2>
                Etkinlik bulunamadı
              </h2>

              <p>
                Seçili etkinlik bulunamadı.
              </p>

              <button
                type="button"
                onClick={() =>
                  go("events")
                }
              >
                Listeye dön
              </button>

            </section>
          )}


        {/* DETAY SAYFASI */}

        {page === "detail" &&
          selected && (
            <>

              <div className="detay-grid">

                {selected.image && (
                  <figure>

                    <img
                      src={selected.image}
                      alt={`${selected.title} etkinlik afişi`}
                    />

                    <figcaption>
                      {selected.title} afişi
                    </figcaption>

                  </figure>
                )}


                <section className="etkinlik-kunye">

                  <h2>
                    Etkinlik Künyesi
                  </h2>

                  <dl>

                    <dt>
                      Tarih
                    </dt>

                    <dd>
                      {formatDate(
                        selected.date,
                      )}
                      , {selected.time}
                    </dd>


                    <dt>
                      Yer
                    </dt>

                    <dd>
                      {selected.location}
                    </dd>


                    <dt>
                      Kategori
                    </dt>

                    <dd>
                      {selected.category}
                    </dd>


                    <dt>
                      Kontenjan
                    </dt>

                    <dd>
                      {selected.capacity} kişi
                    </dd>

                  </dl>

                </section>

              </div>


              <section>

                <h2>
                  Açıklama
                </h2>

                <p>
                  {selected.description}
                </p>


                <div className="form-butonlari">

                  <button
                    type="button"
                    onClick={() =>
                      go("events")
                    }
                  >
                    ← Listeye dön
                  </button>


                  <button
                    type="button"
                    onClick={() =>
                      go(
                        "update",
                        selected.id,
                      )
                    }
                  >
                    Bu etkinliği güncelle
                  </button>

                </div>

              </section>

            </>
          )}


        {/* EKLE / GÜNCELLE */}

        {(page === "add" ||
          page === "update") && (
          <section>

            <p>
              Bu sprintte form sadece görünür;
              kayıt yapılmaz.
            </p>


            <form
              className="etkinlik-formu"
              onSubmit={(e) =>
                e.preventDefault()
              }
            >

              <label htmlFor="title">
                Etkinlik Adı
              </label>

              <input
                id="title"
                name="title"
                type="text"
                maxLength={80}
                placeholder="Örn. Kariyer Günleri 2026"
              />


              <label htmlFor="category">
                Kategori
              </label>

              <select
                id="category"
                name="category"
                defaultValue=""
              >
                <option value="">
                  Seçiniz
                </option>

                <option value="Seminer">
                  Seminer
                </option>

                <option value="Atölye">
                  Atölye
                </option>

                <option value="Söyleşi">
                  Söyleşi
                </option>

                <option value="Yarışma">
                  Yarışma
                </option>
              </select>


              <label htmlFor="date">
                Tarih
              </label>

              <input
                id="date"
                name="date"
                type="date"
              />


              <label htmlFor="time">
                Saat
              </label>

              <input
                id="time"
                name="time"
                type="time"
              />


              <label htmlFor="location">
                Yer
              </label>

              <input
                id="location"
                name="location"
                type="text"
                placeholder="Örn. A Blok Konferans Salonu"
              />


              <label htmlFor="capacity">
                Kontenjan
              </label>

              <input
                id="capacity"
                name="capacity"
                type="number"
                min={1}
                max={1000}
              />


              <label htmlFor="description">
                Açıklama
              </label>

              <textarea
                id="description"
                name="description"
                rows={5}
              />


              <div className="form-butonlari">

                <button type="submit">
                  {page === "add"
                    ? "Kaydet"
                    : "Güncelle"}
                </button>

              </div>

            </form>

          </section>
        )}

      </main>


      <footer>

        <p>
          Berkan Kublay · 2321032015 · 2026
        </p>

      </footer>

    </>
  );
}


export default App;