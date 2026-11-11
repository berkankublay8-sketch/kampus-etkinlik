# Kampüs Etkinlik API — Sprint 7

Express ile hazırlanmış Kampüs Etkinlikleri REST API sunucusudur.

## Çalıştırma

Repo kökünden:

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Sunucu varsayılan olarak şu adreste çalışır:

```text
http://localhost:3000
```

`.env` dosyası:

```text
PORT=3000
```

`.env` ve `node_modules` GitHub'a gönderilmez.

## REST Sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
| --- | --- | --- | --- | --- | --- |
| GET | `/health` | Sunucu durumu | 200 | — | Bu sprint |
| GET | `/events` | Listeyi getir | 200 | — | Bu sprint |
| GET | `/events/:id` | Tek etkinlik | 200 | 404 | Bu sprint |
| POST | `/events` | Yeni etkinlik | 201 | 400 | Bu sprint |
| PATCH | `/events/:id` | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | `/events/:id` | Sil | 204 | 404 | Sprint 9 |

## Hata Biçimi

Bütün hatalar aynı biçimde döner:

```json
{
  "error": {
    "message": "Event not found"
  }
}
```

Eksik POST verisinde örnek hata:

```json
{
  "error": {
    "message": "title, category and date are required"
  }
}
```

## Postman Collection

Teslimde kullanılan 6 istek:

1. `GET /health`
2. `GET /events`
3. `GET /events/event-2`
4. `GET /events/yok`
5. `POST /events` — geçerli body, `201 Created`
6. `POST /events` — eksik body, `400 Bad Request`

Postman collection dosyası:

```text
backend/requests/kampus-api.json
```

Etkinlik verileri bellekte tutulur. Sunucu yeniden başlatıldığında başlangıçtaki 6 etkinlik tekrar yüklenir.