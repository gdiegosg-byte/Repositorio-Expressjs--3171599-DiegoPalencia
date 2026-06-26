/**
 * Error de aplicación con código de estado HTTP asociado.
 * isOperational distingue errores "esperados" (de negocio) de bugs reales,
 * lo que permite decidir qué tanto detalle exponer y qué tan grave loguearlo.
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(statusCode: number, message: string, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    // Mantiene el stack trace correcto apuntando a donde se lanzó el error
    Object.setPrototypeOf(this, AppError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}
