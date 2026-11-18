# Kampüs Etkinlik API — Sprint 7

Express ile hazırlanmış Kampüs Etkinlikleri REST API sunucusudur. Sprint 8 hazırlığı için Mongoose bağlantısı eklenmiştir.

## Çalıştırma

Repo kökünden:

```bash
cd backend
npm ci
cp .env.example .env
```

Atlas bağlantısını kullanmak için `.env` dosyasında `MONGODB_URI` örneğini kendi bağlantı adresinizle değiştirin. Yerel MongoDB için `mongodb://127.0.0.1:27017/kampus` kullanılabilir. Sprint 7'yi veritabanı olmadan çalıştırmak için `MONGODB_URI` satırını kaldırın.

```bash
npm run dev
```

Sunucu varsayılan olarak `http://localhost:3000` adresinde çalışır. `MONGODB_URI` tanımlıysa API, Mongoose bağlantısı kurulduktan sonra istek kabul eder. Bağlantı kurulamazsa sunucu hata koduyla kapanır ve bağlantı adresini günlük çıktısına yazmaz.

Atlas adresi için DNS, SRV kaydını çözemiyorsa `.env` dosyasında isteğe bağlı `MONGODB_DNS_SERVERS=1.1.1.1` ayarını kullanabilirsiniz. Bu ayar yalnızca Node.js sürecine uygulanır.

Gerçek bağlantı adresini yalnızca Git'in yok saydığı `.env` dosyasında veya ortam değişkeninde saklayın. `.env.example` yer tutucular içerir.

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