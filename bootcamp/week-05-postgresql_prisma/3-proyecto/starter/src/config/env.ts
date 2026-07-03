// src/config/env.ts — Variables de entorno centralizadas

const PORT = Number(process.env['PORT']) || 3000;
const NODE_ENV = process.env['NODE_ENV'] ?? 'development';
const DATABASE_URL = process.env['DATABASE_URL'] ?? '';

if (!DATABASE_URL && NODE_ENV !== 'test') {
  // eslint-disable-next-line no-console
  console.warn('⚠️  DATABASE_URL no está definida en las variables de entorno');
}

export const env = { PORT, NODE_ENV, DATABASE_URL };
