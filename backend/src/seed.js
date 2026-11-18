import "dotenv/config";
import { connectDatabase, disconnectDatabase } from "./config/database.js";
import { seedEvents } from "./data/seed-events.js";
import { Event } from "./models/event-model.js";

try {
  await connectDatabase();
  // Örnek veriyi doğrulamadan mevcut koleksiyonu temizleme.
  await Promise.all(seedEvents.map((event) => new Event(event).validate()));
  await Event.deleteMany({});
  const created = await Event.insertMany(seedEvents);
  console.log(`${created.length} etkinlik eklendi`);
} catch (error) {
  console.error("Seed tamamlanamadı.", error.name);
  process.exitCode = 1;
} finally {
  await disconnectDatabase();
}
