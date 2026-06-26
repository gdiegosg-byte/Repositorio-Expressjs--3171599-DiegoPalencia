import path from "path";
import winston from "winston";
import morgan from "morgan";

const isProduction = process.env.NODE_ENV === "production";

/**
 * Nivel de log: en desarrollo queremos ver hasta las peticiones HTTP (http),
 * en producción solo nos interesan advertencias y errores (warn).
 */
const level = isProduction ? "warn" : "http";

/**
 * Formato colorizado y legible para desarrollo.
 */
const developmentFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: "HH:mm:ss" }),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : "";
    return `[${timestamp}] ${level}: ${message}${metaStr}`;
  })
);

/**
 * Formato estructurado en JSON para producción (ideal para sistemas de
 * agregación de logs como ELK, Datadog, etc.).
 */
const productionFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

const transports: winston.transport[] = [new winston.transports.Console()];

// El transport de archivo solo se activa en producción, según lo requerido.
if (isProduction) {
  transports.push(
    new winston.transports.File({
      filename: path.join("logs", "error.log"),
      level: "error",
    })
  );
}

export const logger = winston.createLogger({
  level,
  format: isProduction ? productionFormat : developmentFormat,
  transports,
});

/**
 * Middleware de Morgan que redirige sus logs de acceso HTTP hacia Winston,
 * usando el nivel "http" para no mezclarse con logs de negocio.
 */
export const morganMiddleware = morgan(
  isProduction
    ? "combined"
    : ":method :url :status :res[content-length] - :response-time ms",
  {
    stream: {
      write: (message: string) => logger.http(message.trim()),
    },
  }
);
