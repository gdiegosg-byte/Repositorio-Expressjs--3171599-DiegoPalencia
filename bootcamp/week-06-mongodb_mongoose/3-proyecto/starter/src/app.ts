// ============================================
// app.ts — Configuración de Express
// Dominio: Empresa de Vending Machines
// ============================================

import express from 'express';
import locationsRouter from './routes/locations.routes';
import machinesRouter from './routes/machines.routes';
import { errorHandler } from './middlewares/errorHandler';
import { notFound } from './middlewares/notFound';

export const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/v1/locations', locationsRouter);
app.use('/api/v1/machines', machinesRouter);

app.use(notFound);
app.use(errorHandler);
