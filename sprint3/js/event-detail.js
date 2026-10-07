import { events } from "./data.js";

const container = document.querySelector("#detay");

const id = new URLSearchParams(location.search).get("id");

const event = events.find((e) => e.id === id);

function tarihDuzenle(tarih) {
  const [gun, ay, yil] = tarih.split("-");

  const tarihNesnesi = new Date(
    Number(yil),
    Number(ay) - 1,
    Number(gun)
  );

  return tarihNesnesi.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}

if (!event) {
  document.title = "Etkinlik Bulunamadı | Kampüs Etkinlikleri";

  container.innerHTML = `
    <section class="etkinlik-kunye">
      <h2>Etkinlik bulunamadı</h2>

      <p>
        Aradığınız etkinlik bulunamadı veya geçersiz bir bağlantı kullandınız.
      </p>

      <p>
        <a href="etkinlikler.html">
          ← Listeye dön
        </a>
      </p>
    </section>
  `;
} else {
  document.title = `${event.title} | Kampüs Etkinlikleri`;

  container.innerHTML = `
    <div class="detay-grid">

      <figure>
        <img
          src="afis.svg"
          alt="${event.title} etkinlik afişi"
        >

        <figcaption>
          ${event.title}
        </figcaption>
      </figure>

      <section class="etkinlik-kunye">

        <h2>${event.title}</h2>

        <dl>

          <dt>Tarih</dt>
          <dd>${tarihDuzenle(event.date)}</dd>

          <dt>Saat</dt>
          <dd>${event.time}</dd>

          <dt>Yer</dt>
          <dd>${event.location}</dd>

          <dt>Kategori</dt>
          <dd>${event.category}</dd>

          <dt>Kontenjan</dt>
          <dd>${event.capacity}</dd>

        </dl>

        <h3>Açıklama</h3>

        <p>
          ${event.description}
        </p>

        <p>
          <a href="etkinlikler.html">
            ← Listeye dön
          </a>
        </p>

        <p>
          <a href="etkinlik-guncelle.html?id=${event.id}">
            Bu etkinliği güncelle
          </a>
        </p>

      </section>

    </div>
  `;
}