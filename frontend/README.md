https://kampus-etkinlik-lvmg.vercel.app

# Kampüs Etkinlikleri — Sprint 4

- `package.json`: Proje komutlarını ve bağımlılıklarını tanımlar.
- `package-lock.json`: `npm install` sonrasında paketlerin tam sürümlerini kilitler.
- `node_modules/`: İndirilen paketleri içerir; GitHub'a gönderilmez.
- `tsconfig*.json`: TypeScript derleyici ayarlarını içerir.
- `vite.config.ts`: Vite ve React eklentisi ayarlarını içerir.
- `index.html`: React uygulamasının bağlandığı tek HTML dosyasıdır.
- `src/main.tsx`: React'i başlatır ve `App` bileşenini `#root` içine çizer.
- `src/App.tsx`: Ana sayfa, etkinlikler, detay, ekle ve güncelle görünümlerini tek bileşende yönetir.
- `src/App.css`: Sprint 3'ten taşınan ve React görünümüne uyarlanan stilleri içerir.
- `src/index.css`: Bu sprintte boş bırakılmış genel stil dosyasıdır.
- `src/types/campus-event.ts`: `Category` ve `CampusEvent` TypeScript tiplerini tanımlar.
- `src/data/events.ts`: Tiplenmiş 6 etkinlik verisini içerir.
- `src/utils/filter-events.ts`: Arama, kategori filtreleme ve id ile etkinlik bulma saf fonksiyonlarını içerir.
- `public/afis.svg`: Detay sayfasında kullanılan statik afiş dosyasıdır.
