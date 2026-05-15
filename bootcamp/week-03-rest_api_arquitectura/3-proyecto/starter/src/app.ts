// ============================================
// APP — Configuración Express
// Dominio: Vending Machines — Diego Palencia 3171599
// ============================================
import express from 'express';
import { itemsRouter } from './routes/items.routes';
import { ErrorResponse } from './types';

const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', week: '03', project: 'vending-machines-api' });
});

app.use('/api/v1/items', itemsRouter);

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.message);
  const response: ErrorResponse = {
    error: 'Internal Server Error',
    message: err.message,
  };
  res.status(500).json(response);
});

export default app;
