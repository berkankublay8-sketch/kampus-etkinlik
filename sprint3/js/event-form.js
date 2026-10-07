import { events } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const mesaj = document.querySelector("#form-mesaj");

let guncellenecekEtkinlik = null;


/* data.js tarihini input type="date" biçimine çevirir
   12-10-2026 -> 2026-10-12
*/
function inputTarihi(tarih) {
  const [gun, ay, yil] = tarih.split("-");

  return `${yil}-${ay}-${gun}`;
}


/* GÜNCELLEME MODU */

if (form.dataset.mode === "guncelle") {

  const id = new URLSearchParams(location.search).get("id");

  guncellenecekEtkinlik = events.find(
    (event) => event.id === id
  );

  if (!guncellenecekEtkinlik) {

    form.outerHTML = `
      <section class="form-hata">

        <h3>
          Güncellenecek etkinlik bulunamadı
        </h3>

        <p>
          Geçerli bir etkinlik bağlantısı kullanmalısınız.
        </p>

        <p>
          <a href="etkinlikler.html">
            Etkinliklere git
          </a>
        </p>

      </section>
    `;

  } else {

    form.elements.ad.value =
      guncellenecekEtkinlik.title;

    form.elements.kategori.value =
      guncellenecekEtkinlik.category;

    form.elements.tarih.value =
      inputTarihi(guncellenecekEtkinlik.date);

    form.elements.saat.value =
      guncellenecekEtkinlik.time;

    form.elements.yer.value =
      guncellenecekEtkinlik.location;

    form.elements.kontenjan.value =
      guncellenecekEtkinlik.capacity;

    form.elements.aciklama.value =
      guncellenecekEtkinlik.description;
  }
}


/* FORM GÖNDERME */

if (form.isConnected) {

  form.addEventListener("submit", (e) => {

    e.preventDefault();

    const fd = new FormData(form);

    const data = {
      title: fd.get("ad").trim(),
      category: fd.get("kategori"),
      date: fd.get("tarih"),
      time: fd.get("saat"),
      location: fd.get("yer").trim(),
      capacity: fd.get("kontenjan"),
      description: fd.get("aciklama").trim()
    };


    /* HATALARI TOPLA */

    const errors = {};

    if (data.title.length < 3) {
      errors.ad =
        "En az 3 karakter olmalı.";
    }

    if (data.category === "") {
      errors.kategori =
        "Kategori seçmelisiniz.";
    }

    if (data.date === "") {
      errors.tarih =
        "Tarih boş bırakılamaz.";
    }

    if (data.time === "") {
      errors.saat =
        "Saat boş bırakılamaz.";
    }

    if (data.location === "") {
      errors.yer =
        "Yer boş bırakılamaz.";
    }

    if (data.capacity !== "") {

      const capacityNumber =
        Number(data.capacity);

      if (
        capacityNumber < 1 ||
        capacityNumber > 1000
      ) {

        errors.kontenjan =
          "Kontenjan 1 ile 1000 arasında olmalı.";
      }
    }


    /* ESKİ HATALARI TEMİZLE */

    const alanlar = [
      "ad",
      "kategori",
      "tarih",
      "saat",
      "yer",
      "kontenjan",
      "aciklama"
    ];

    alanlar.forEach((alanAdi) => {

      const alan =
        document.querySelector(`#${alanAdi}`);

      const hataAlani =
        document.querySelector(
          `#${alanAdi}-hata`
        );

      hataAlani.textContent = "";

      alan.removeAttribute(
        "aria-invalid"
      );
    });


    /* YENİ HATALARI GÖSTER */

    Object.keys(errors).forEach(
      (alanAdi) => {

        const alan =
          document.querySelector(
            `#${alanAdi}`
          );

        const hataAlani =
          document.querySelector(
            `#${alanAdi}-hata`
          );

        hataAlani.textContent =
          errors[alanAdi];

        alan.setAttribute(
          "aria-invalid",
          "true"
        );
      }
    );


    /* HATA VARSA DUR */

    if (Object.keys(errors).length > 0) {

      mesaj.textContent =
        "Formda hatalı alanlar var.";

      mesaj.className =
        "form-hata";

      return;
    }


    /* BAŞARILI NESNE */

    const sonucData = {
      title: data.title,
      category: data.category,
      date: data.date,
      time: data.time,
      location: data.location,
      capacity:
        data.capacity === ""
          ? null
          : Number(data.capacity),
      description: data.description
    };


    /* GÜNCELLEMEYSE ID'Yİ KORU */

    if (
      form.dataset.mode === "guncelle" &&
      guncellenecekEtkinlik
    ) {

      sonucData.id =
        guncellenecekEtkinlik.id;
    }


    mesaj.className =
      "form-basari";


    if (form.dataset.mode === "guncelle") {

      mesaj.innerHTML = `
        <p>
          Etkinlik başarıyla güncellendi.
        </p>

        <pre>${JSON.stringify(
          sonucData,
          null,
          2
        )}</pre>
      `;

    } else {

      mesaj.innerHTML = `
        <p>
          Etkinlik bilgileri başarıyla doğrulandı.
        </p>

        <pre>${JSON.stringify(
          sonucData,
          null,
          2
        )}</pre>
      `;
    }

  });
}