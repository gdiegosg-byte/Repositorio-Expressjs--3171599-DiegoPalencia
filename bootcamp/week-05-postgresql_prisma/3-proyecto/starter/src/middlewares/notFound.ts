// src/middlewares/notFound.ts — Captura cualquier ruta no registrada

import { NextFunction, Request, Response } from 'express';
import { NotFoundError } from '../errors/AppError';

export function notFound(req: Request, _res: Response, next: NextFunction): void {
  next(new NotFoundError(`Ruta no encontrada: ${req.method} ${req.originalUrl}`));
}
