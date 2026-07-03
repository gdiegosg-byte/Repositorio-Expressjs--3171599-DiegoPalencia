// ============================================
// PASO 5: Seed — Insertar datos de prueba en MongoDB
// ============================================
//
// El seed limpia la colección e inserta productos de ejemplo.
// Ejecutar con: pnpm seed
//
// Dominio: Empresa de Vending Machines — productos para máquinas expendedoras
//
// Descomenta las siguientes líneas (PASO 5):

import 'dotenv/config';
// import { connectDB, disconnectDB } from './lib/mongoose';
// import { Product } from './models/product.model';

// async function seed(): Promise<void> {
//   await connectDB();
//
//   // Limpiar colección existente
//   await Product.deleteMany({});
//   console.log('Collection cleared');
//
//   // Insertar productos de ejemplo
//   await Product.insertMany([
//     {
//       name: 'Papas Fritas Clásicas',
//       description: 'Papas fritas sabor original 150g',
//       price: 4500,
//       stock: 50,
//       sku: 'SNK-PAP-001',
//     },
//     {
//       name: 'Barra de Chocolate',
//       description: 'Barra de chocolate con leche 80g',
//       price: 5200,
//       stock: 40,
//       sku: 'SNK-CHO-001',
//     },
//     {
//       name: 'Agua Mineral',
//       description: 'Agua mineral sin gas 500ml',
//       price: 3200,
//       stock: 60,
//       sku: 'BEB-AGU-001',
//     },
//     {
//       name: 'Gaseosa Cola',
//       description: 'Gaseosa sabor cola 355ml',
//       price: 4800,
//       stock: 45,
//       sku: 'BEB-COL-001',
//     },
//     {
//       name: 'Sándwich Mixto',
//       description: 'Sándwich de jamón y queso 200g',
//       price: 8900,
//       stock: 20,
//       sku: 'COM-SAN-001',
//     },
//   ]);
//
//   console.log('Seed completed: 5 vending products inserted');
//   await disconnectDB();
// }

// seed().catch((err: unknown) => {
//   console.error('Seed failed:', err);
//   process.exit(1);
// });
