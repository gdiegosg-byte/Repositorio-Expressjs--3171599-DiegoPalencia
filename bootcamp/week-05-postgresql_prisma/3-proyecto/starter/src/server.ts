// ============================================
// SERVER — Punto de entrada
// Dominio: Empresa de Vending Machines
// ============================================

import { app } from './app';
import { logger } from './config/logger';
import { prisma } from './config/prisma';

const PORT = Number(process.env['PORT']) || 3000;

const server = app.listen(PORT, () => {
  logger.info(`🚀 Server running on http://localhost:${PORT}`);
  logger.info(`📘 Environment: ${process.env['NODE_ENV'] ?? 'development'}`);
});

async function shutdown(signal: string): Promise<void> {
  logger.info(`${signal} recibido, cerrando servidor...`);
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}

process.on('SIGTERM', () => void shutdown('SIGTERM'));
process.on('SIGINT', () => void shutdown('SIGINT'));
