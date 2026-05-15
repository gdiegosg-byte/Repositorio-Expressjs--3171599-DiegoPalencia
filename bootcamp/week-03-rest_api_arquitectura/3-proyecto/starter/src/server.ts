// ============================================
// SERVER — Entry point
// Dominio: Vending Machines — Diego Palencia 3171599
// ============================================
import app from './app';

const PORT = parseInt(process.env['PORT'] ?? '3000', 10);

app.listen(PORT, () => {
  console.log(`🏪 Vending Machines API corriendo en http://localhost:${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/health`);
  console.log(`   Items:  http://localhost:${PORT}/api/v1/items`);
});
