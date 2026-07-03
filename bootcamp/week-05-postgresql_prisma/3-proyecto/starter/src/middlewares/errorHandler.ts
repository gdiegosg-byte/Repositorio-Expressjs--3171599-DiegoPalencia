// src/middlewares/errorHandler.ts — Manejo centralizado de errores

import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../errors/AppError';
import { logger } from '../config/logger';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof ZodError) {
    res.status(400).json({
      error: 'ValidationError',
      message: 'Los datos enviados no son válidos',
      details: err.issues.map((issue) => ({ path: issue.path.join('.'), message: issue.message })),
    });
    return;
  }

  if (err instanceof AppError) {
    if (!err.isOperational) {
      logger.error(err.message, { stack: err.stack, path: req.originalUrl });
    }
    res.status(err.statusCode).json({ error: err.name, message: err.message });
    return;
  }

  const message = err instanceof Error ? err.message : 'Error interno del servidor';
  logger.error(message, { path: req.originalUrl, method: req.method });
  res.status(500).json({ error: 'InternalServerError', message: 'Ocurrió un error inesperado' });
}
