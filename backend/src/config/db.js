import { setServers } from "node:dns";
import mongoose from "mongoose";

export async function connectDatabase(uri) {
  const dnsServers = process.env.MONGODB_DNS_SERVERS?.trim();
  if (uri.startsWith("mongodb+srv://") && dnsServers) {
    setServers(dnsServers.split(",").map((server) => server.trim()));
  }

  await mongoose.connect(uri, { serverSelectionTimeoutMS: 10_000 });
  console.log("MongoDB bağlantısı başarılı.");
}

export function disconnectDatabase() {
  return mongoose.disconnect();
}
