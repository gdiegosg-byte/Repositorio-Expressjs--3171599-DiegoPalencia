import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AppError } from "../errors/AppError";
import { logger } from "../config/logger";

/**
 * Manejador de errores centralizado. Debe registrarse al final, después
 * de todas las rutas y del middleware notFound.
 *
 * IMPORTANTE: Express solo reconoce un middleware como "error handler"
 * si tiene exactamente 4 parámetros (err, req, res, next), aunque `next`
 * no se use dentro del cuerpo.
 */
export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  // 1. Errores de validación de Zod que no se capturaron con safeParse
  if (err instanceof ZodError) {
    logger.warn(`ZodError en ${req.method} ${req.originalUrl}: datos inválidos`);
    return res.status(400).json({
      success: false,
      message: "Datos inválidos",
      issues: err.issues,
    });
  }

  // 2. Errores de negocio esperados (AppError)
  if (err instanceof AppError) {
    logger.warn(
      `AppError ${err.statusCode} en ${req.method} ${req.originalUrl}: ${err.message}`
    );
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // 3. Cualquier otro error no controlado -> 500
  logger.error(`Error no controlado en ${req.method} ${req.originalUrl}: ${err.message}`, {
    stack: err.stack,
  });

  return res.status(500).json({
    success: false,
    message: "Error interno del servidor",
  });
}
