# Kampüs Etkinlik API — Sprint 9

Etkinlikler MongoDB'deki `events` koleksiyonunda saklanır. API'de etkinlik tarihi `GG-AA-YYYY`, MongoDB'de BSON Date olarak tutulur. `createdAt` ve `updatedAt` zaman damgaları ISO biçimindedir.

## Kurulum ve çalıştırma

```powershell
cd backend
npm install
```

İlk kurulumda `.env.example` dosyasını `.env` olarak kopyalayın. Mevcut `.env` varsa kopyalamayın. Atlas için kendi `MONGODB_URI` değerinizi yalnızca yerel `.env` dosyasında saklayın. Ortamdan verilen `MONGODB_URI` önceliklidir.

Sprint 8 veritabanını kullanmaya devam ediyorsanız, sunucuyu başlatmadan önce `npm run migrate:dates` çalıştırın. Bu komut eski metin tarihlerini dönüştürür ve mevcut kayıtları, kimlikleri ve tarih değerlerini korur.

**Yalnızca örnek veriyle sıfırlamak istediğiniz veritabanında** `npm run seed` çalıştırın. Komut, seçili veritabanının etkinliklerini temizleyip geçmiş ve gelecek tarihli altı örnek etkinlik ekler. Sunucuyu `npm run dev` ile başlatın.

## API sözleşmesi

Hata yanıtları `{ "error": { "message": "..." } }` biçimindedir. Geçersiz veya bulunmayan etkinlik kimliği `404` döner.

| İstek | Başarı | İstemci hatası |
| --- | --- | --- |
| `GET /health` | 200, hizmet durumu ve öğrenci numarası | — |
| `GET /events` | 200, tarihe göre sıralı etkinlikler | — |
| `GET /events?search=atölye&category=Atölye` | 200, başlık araması ve kategori filtresi birlikte uygulanır | — |
| `GET /events/upcoming` | 200, bugün ve sonrasındaki etkinlikler, tarih ve saat sırasıyla | — |
| `GET /events/:id` | 200, tek etkinlik | 404 |
| `POST /events` | 201, kaydedilen etkinlik | 400 |
| `PATCH /events/:id` | 200, güncellenmiş etkinlik | 400, 404 |
| `DELETE /events/:id` | 204, boş yanıt gövdesi | 404 |

`PATCH` yalnızca gönderilen etkinlik alanlarını değiştirir. Boş gövde, geçersiz alan değeri veya korunan alanları değiştirme girişimi `400` döndürür.

## Postman ve Newman

`requests/kampus-api.json` dosyasını Postman'e aktarın ve yerelde çalışan backend ile koleksiyonu sırayla çalıştırın. Koleksiyon kimlikleri otomatik alır. Güncelleme ve silme istekleri çalıştırma sırasında oluşturulan test etkinliğine uygulanır.

```powershell
newman run https://webdersi.vercel.app/test.json
```

Beklenen sonuç 18 istek, 45 doğrulama ve sıfır hata. `requests/run-results.json` doğrulama çıktısını içerir.
