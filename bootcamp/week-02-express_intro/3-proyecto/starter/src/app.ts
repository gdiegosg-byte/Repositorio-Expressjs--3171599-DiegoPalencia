import express from 'express';
import type { Application, Request, Response, NextFunction } from 'express';
import { itemsRouter } from './routes/items.routes.js';

// Dominio: Vending Machines — Diego Palencia 3171599

export function createApp(): Application {
  const app = express();

  // 1. Parseo de body JSON
  app.use(express.json());

  // 2. Logger de peticiones
  app.use((req: Request, _res: Response, next: NextFunction) => {
    const now = new Date().toISOString();
    console.log(`[${now}] ${req.method} ${req.url}`);
    next();
  });

  // 3. Health check
  app.get('/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', dominio: 'vending-machines' });
  });

  // 4. Rutas del recurso principal
  app.use('/api/v1/items', itemsRouter);

  // 5. Handler 404
  app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: 'Route not found' });
  });

  // 6. Error handler global
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message ?? 'Internal server error' });
  });

  return app;
}
