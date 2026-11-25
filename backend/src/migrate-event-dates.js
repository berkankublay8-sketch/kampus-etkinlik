import "dotenv/config";
import { connectDatabase, disconnectDatabase } from "./config/database.js";
import { Event } from "./models/event-model.js";
import { parseDate } from "./utils/date.js";

try {
  await connectDatabase();
  const collection = Event.collection;
  const oldEvents = await collection.find({ date: { $type: "string" } }, { projection: { date: 1 } }).toArray();
  const updates = oldEvents.map(({ _id, date }) => {
    const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
    const parsed = parseDate(iso ? [iso[3], iso[2], iso[1]].join("-") : date);
    if (!Number.isFinite(parsed.getTime())) throw new Error("Geçersiz bir etkinlik tarihi bulundu.");
    return { updateOne: { filter: { _id, date }, update: { $set: { date: parsed } } } };
  });

  const converted = updates.length ? (await collection.bulkWrite(updates)).modifiedCount : 0;
  console.log(converted + " etkinliğin tarihi dönüştürüldü.");
} catch (error) {
  console.error("Tarih dönüştürme tamamlanamadı.", error.name);
  process.exitCode = 1;
} finally {
  await disconnectDatabase();
}
