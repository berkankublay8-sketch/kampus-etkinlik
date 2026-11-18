import "dotenv/config";
import app from "./app.js";
import { connectDatabase, disconnectDatabase } from "./config/db.js";

const PORT = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI?.trim();

if (mongoUri) {
  try {
    await connectDatabase(mongoUri);
  } catch {
    console.error("MongoDB bağlantısı kurulamadı. MONGODB_URI, DNS ve Atlas erişimini kontrol edin.");
    process.exit(1);
  }
}

const server = app.listen(PORT, () => {
  console.log(`API: http://localhost:${PORT}`);
});

server.once("error", async (error) => {
  console.error("API başlatılamadı.", error.code ?? "");
  process.exitCode = 1;
  await disconnectDatabase();
});

function shutdown() {
  server.close(async () => {
    await disconnectDatabase();
  });
}

process.once("SIGINT", shutdown);
process.once("SIGTERM", shutdown);
