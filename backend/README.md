# Kampüs Etkinlikleri — Sprint 7 Express REST API

**Geliştirici:** Berkan Kublay  
**Öğrenci numarası:** 2321032015

Bu klasör, mevcut React/Vite `frontend/` uygulamasından bağımsız çalışan Express REST API sunucusudur. Sprint 7 kapsamında veri RAM'deki altı etkinlikten okunur; bu sprintte MongoDB, gerçek kimlik doğrulama veya Vercel backend dağıtımı yoktur.

## Kurulum ve çalıştırma

Repo kökünden:

```bash
cd backend
npm install
npm run dev
```

Sunucu: **http://localhost:3000**. Üretim benzeri başlatma için `npm start` kullanılabilir.

Ortam değişkenleri: `.env.example` dosyasını `.env` olarak kopyalayın. `PORT=3000` varsayılandır. `server.js` ortamdan `process.env.PORT` okur; yoksa 3000 portunu kullanır. Gerçek `.env` ile `node_modules/` GitHub'a gönderilmez.

## REST sözleşmesi

| Metot | Endpoint | Amaç | Başarı | Hata |
| --- | --- | --- | --- | --- |
| GET | `/health` | Sunucu durumu, ISO zaman, öğrenci numarası | 200 | — |
| GET | `/events` | Altı etkinliği listeler; `?category=Atölye` filtreler | 200 | — |
| GET | `/events/:id` | ID ile tek etkinlik döndürür | 200 | 404 |
| POST | `/events` | Belleğe yeni etkinlik ekler | 201 | 400 |
| PATCH | `/events/:id` | Sprint 9 kapsamı | — | — |
| DELETE | `/events/:id` | Sprint 9 kapsamı | — | — |

**404 örneği:**

```json
{ "error": { "message": "Event not found" } }
```

**400 örneği:**

```json
{ "error": { "message": "title, category and date are required" } }
```

POST için `title`, `category`, `date` zorunludur. `capacity` sayıya dönüştürülür (geçersizse `0`); `time`, `location`, `description` isteğe bağlıdır.

### Örnek POST gövdesi

```json
{
  "title": "Git Atölyesi",
  "category": "Atölye",
  "date": "2026-12-01",
  "capacity": 30,
  "time": "14:00",
  "location": "Bilgisayar Laboratuvarı 1",
  "description": "Git ve GitHub ile ilk adımlar."
}
```

**Önemli:** Etkinlikler RAM'de tutulur; POST ile eklenen kayıtlar sunucu yeniden başlatılınca kaybolur. Backend veri kümesi Sprint 7'nin özgünlük şartına göre uyarlanmıştır; mevcut frontend bu sprintte henüz backend'den veri çekmez (bağlantı Sprint 8).

## Postman: teslimdeki 6 istek

`requests/kampus-api.json` dosyasını Postman'da **Import** ile açın. Collection adı **Kampüs API**, isteklerin adresi `http://localhost:3000` ile başlar.

| # | İstek | Beklenen |
| --- | --- | --- |
| 1 | GET `/health` | 200, `status: ok`, `student: 2321032015` |
| 2 | GET `/events` | 200, altı etkinlik |
| 3 | GET `/events/event-2` | 200, `id: event-2` |
| 4 | GET `/events/yok` | 404, `error.message` |
| 5 | POST `/events` (tam JSON) | 201, yeni `event-...` |
| 6 | POST `/events` (yalnız `title`) | 400, `error.message` |

Beşinci istek belleğe yeni bir kayıt ekler. Böylece aynı oturumda GET `/events` daha sonra **7 kayıt** döndürebilir; sunucuyu yeniden başlatınca altı kayıt geri gelir.

## Dosya yapısı

```text
backend/
  src/
    app.js
    server.js
    routes/event-routes.js
    controllers/event-controller.js
    data/events.js
  requests/kampus-api.json
  .env.example
  .gitignore
  package.json
  package-lock.json
  README.md
```

`.env` yerel olarak vardır ama Git tarafından yok sayılır. `node_modules` da Git'e dahil edilmez.
