import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

/**
 * Se registra DESPUÉS de todas las rutas y ANTES del errorHandler.
 * Captura cualquier petición a una ruta que no existe y la convierte
 * en un AppError 404, que luego maneja errorHandler de forma uniforme
 * (respuesta JSON, no el HTML por defecto de Express).
 */
export function notFound(req: Request, _res: Response, next: NextFunction) {
  const error = new AppError(404, `Ruta no encontrada: ${req.method} ${req.originalUrl}`);
  next(error);
}
