import app from "./app";
import { logger } from "./config/logger";

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  logger.info(`🚀 Vending Machines API corriendo en http://localhost:${PORT}`);
  logger.info(`Entorno: ${process.env.NODE_ENV ?? "development"}`);
});
