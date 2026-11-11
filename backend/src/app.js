import express from "express";
import cors from "cors";
import eventRoutes from "./routes/event-routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Sprint 7: Sunucu calisiyor mu?
app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString(),
    student: "2321032015",
  });
});

app.use("/events", eventRoutes);

// Eslesmeyen adreslerin hepsine ortak hata bicimi.
app.use((_req, res) => {
  return res.status(404).json({
    error: { message: "Route not found" },
  });
});

export default app;
