import { events } from "./data.js";

const list = document.querySelector("#etkinlik-listesi");

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

function createCard(event) {
  return `
    <article class="etkinlik-kart">
      <h3>${event.title}</h3>

      <p>${event.category}</p>

      <p>
        <time datetime="${event.date}">
          ${tarihDuzenle(event.date)}
        </time>
      </p>

      <p>${event.location}</p>

      <a href="etkinlik-detay.html?id=${event.id}">
        Detay →
      </a>
    </article>
  `;
}

function render(dizi) {
  list.innerHTML = dizi
    .map(createCard)
    .join("");
}

/* ANA SAYFA */
if (list.dataset.limit) {

  const yaklasan = [...events]
    .sort((a, b) => {
      const [gunA, ayA, yilA] = a.date.split("-");
      const [gunB, ayB, yilB] = b.date.split("-");

      const tarihA = `${yilA}-${ayA}-${gunA}`;
      const tarihB = `${yilB}-${ayB}-${gunB}`;

      return tarihA.localeCompare(tarihB);
    })
    .slice(0, Number(list.dataset.limit));

  render(yaklasan);

}

/* ETKİNLİKLER SAYFASI */
else {

  const filtreFormu = document.querySelector("#filtre-formu");
  const arama = document.querySelector("#arama");
  const kategoriFiltre = document.querySelector("#kategori-filtre");
  const sonucSatiri = document.querySelector("#sonuc");

  const kategoriler = [...new Set(
    events.map((event) => event.category)
  )];

  kategoriler.forEach((kategori) => {
    const option = document.createElement("option");

    option.value = kategori;
    option.textContent = kategori;

    kategoriFiltre.appendChild(option);
  });

  function filtrele() {

    const aranan = arama.value
      .trim()
      .toLocaleLowerCase("tr-TR");

    const secilenKategori = kategoriFiltre.value;

    const sonuc = events.filter((event) => {

      const aranacakMetin = `
        ${event.title}
        ${event.category}
        ${event.location}
        ${event.description}
      `.toLocaleLowerCase("tr-TR");

      const metinUyuyor =
        aranacakMetin.includes(aranan);

      const kategoriUyuyor =
        secilenKategori === "" ||
        event.category === secilenKategori;

      return metinUyuyor && kategoriUyuyor;
    });

    render(sonuc);

    if (sonuc.length === 0) {

      sonucSatiri.textContent =
        "Aramanıza uygun etkinlik bulunamadı.";

    } else {

      sonucSatiri.textContent =
        `${sonuc.length} etkinlik listeleniyor.`;

    }
  }

  filtreFormu.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  arama.addEventListener("input", filtrele);

  kategoriFiltre.addEventListener("change", filtrele);

  filtrele();
}