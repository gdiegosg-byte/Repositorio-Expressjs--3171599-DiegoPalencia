import { createApp } from './app.js';

// Dominio: Vending Machines — Diego Palencia 3171599

const PORT = process.env.PORT ?? '3000';
const app = createApp();

const server = app.listen(Number(PORT), () => {
  console.log(`🏪 Vending Machines API corriendo en http://localhost:${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/health`);
  console.log(`   Items:  http://localhost:${PORT}/api/v1/items`);
});

// Graceful shutdown
function shutdown(signal: string): void {
  console.log(`\n${signal} recibido — cerrando servidor...`);
  server.close(() => {
    console.log('Servidor cerrado correctamente.');
    process.exit(0);
  });
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
