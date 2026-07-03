// ============================================
// APP — Configuración de Express
// Dominio: Empresa de Vending Machines
// ============================================

import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes';
import resourceRouter from './routes/resource.routes';
import { errorHandler } from './middlewares/errorHandler';
import { notFound } from './middlewares/notFound';

export const app = express();

app.use(express.json());
app.use(cookieParser());

// Rutas de autenticación
app.use('/api/v1/auth', authRouter);

// TODO: Cambia '/api/v1/machines' por la ruta plural de tu recurso.
// Ejemplo para Vending Machines:
//   app.use('/api/v1/machines', resourceRouter);
app.use('/api/v1/machines', resourceRouter);

// Middlewares de errores (siempre al final)
app.use(notFound);
app.use(errorHandler);
