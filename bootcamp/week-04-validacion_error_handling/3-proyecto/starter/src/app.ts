import express, { Application } from "express";
import { morganMiddleware } from "./config/logger";
import productsRoutes from "./routes/products.routes";
import { notFound } from "./middlewares/notFound";
import { errorHandler } from "./middlewares/errorHandler";

const app: Application = express();

// 1. Middlewares globales
app.use(express.json());
app.use(morganMiddleware);

// 2. Rutas
app.use("/api/v1/items", productsRoutes);

// Endpoint simple de salud, útil para verificar que el servidor está vivo
app.get("/health", (_req, res) => {
  res.status(200).json({ success: true, message: "OK" });
});

// 3. Middleware 404 — debe ir DESPUÉS de las rutas
app.use(notFound);

// 4. Manejador de errores centralizado — siempre al final
app.use(errorHandler);

export default app;
