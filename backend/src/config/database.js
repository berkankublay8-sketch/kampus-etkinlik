import { setServers } from "node:dns";
import mongoose from "mongoose";

export async function connectDatabase() {
  const uri = process.env.MONGODB_URI?.trim();
  if (!uri) {
    throw new Error("MONGODB_URI tanımlı değil.");
  }

  const isAtlas = uri.startsWith("mongodb+srv://");
  const dnsServers = process.env.MONGODB_DNS_SERVERS?.trim();
  try {
    if (isAtlas && dnsServers) {
      setServers(dnsServers.split(",").map((server) => server.trim()));
    }
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 10_000 });
  } catch {
    throw new Error("MongoDB bağlantısı kurulamadı. MONGODB_URI, DNS ve ağ erişimini kontrol edin.");
  }

  const { host, name } = mongoose.connection;
  console.log(`MongoDB bağlandı (${isAtlas ? "Atlas" : "yerel"}): ${host}/${name}`);
}

export function disconnectDatabase() {
  return mongoose.disconnect();
}
