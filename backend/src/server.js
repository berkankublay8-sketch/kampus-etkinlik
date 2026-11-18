import "dotenv/config";
import app from "./app.js";
import { connectDatabase, disconnectDatabase } from "./config/database.js";

const PORT = process.env.PORT || 3000;
try {
  await connectDatabase();
} catch (error) {
  console.error(error.message);
  process.exit(1);
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
