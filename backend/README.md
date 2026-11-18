# Kampüs Etkinlik API — Sprint 8

Etkinlikler MongoDB'deki `events` koleksiyonunda saklanır.

## Kurulum ve çalıştırma

```powershell
cd backend
npm install
Copy-Item .env.example .env
npm run seed
npm run dev
```

`.env` zaten varsa kopyalama adımını atlayın. Örnek dosya yerel MongoDB'ye bağlanır. Atlas kullanırken kendi `MONGODB_URI` değerinizi `.env` içinde tutun ve adresin veritabanı bölümünde `kampus` kullanın. Ortamdan verilen `MONGODB_URI` önceliklidir. Atlas SRV sorgusu bu makinenin DNS'iyle çözülemiyorsa isteğe bağlı `MONGODB_DNS_SERVERS` kullanılabilir.

**Seed, seçili veritabanının `events` koleksiyonunu temizleyip altı örnek kayıt ekler.** Örnek veriyle sıfırlamak istediğiniz veritabanında çalıştırın. Tekrar çalıştırdığınızda koleksiyonda yine altı örnek kalır.

| İstek | Beklenen sonuç |
| --- | --- |
| `GET /health` | 200, `status`, `time` ve öğrenci numarası |
| `GET /events` | 200, tarihe göre sıralı liste. İsteğe bağlı `category` filtresi |
| `GET /events/:id` | 200 veya 404. Kimlik liste yanıtındaki MongoDB `_id` alanıdır |
| `POST /events` | 201, `_id`, `createdAt` ve `updatedAt`. Şema doğrulama hatası 400 |

## Postman ve kalıcılık

`requests/kampus-api.json` dosyasını Postman'e aktarın. Altı örnek kaydı yükledikten sonra koleksiyonu sırayla çalıştırın. Liste isteği, detay isteğinin kullanacağı `eventId` değerini otomatik alır.

Başarılı POST'un döndürdüğü `_id` değerini saklayın. Sunucuyu durdurup tekrar başlatın ve seed'i tekrar çalıştırmadan `GET /events/:id` ile aynı etkinliği bulun. Listede yedi kayıt görünür.
