// ============================================
// PASO 3: Seed con categorías y productos de vending
// ============================================
//
// IMPORTANTE: Las categorías deben insertarse ANTES que los productos,
// porque los productos necesitan los _id de las categorías.
//
// Dominio: Empresa de Vending Machines
//
// Descomenta las siguientes líneas (PASO 3):

import 'dotenv/config';
// import { connectDB, disconnectDB } from './lib/mongoose';
// import { Category } from './models/category.model';
// import { Product } from './models/product.model';

// async function seed(): Promise<void> {
//   await connectDB();
//
//   // Limpiar colecciones (orden inverso al de inserción)
//   await Product.deleteMany({});
//   await Category.deleteMany({});
//   console.log('Collections cleared');
//
//   // Paso A: Insertar categorías primero y capturar sus _id
//   const [snacks, bebidas, comidas] = await Category.insertMany([
//     { name: 'Snacks' },
//     { name: 'Bebidas' },
//     { name: 'Comidas' },
//   ]);
//   console.log('Categories inserted');
//
//   // Paso B: Insertar productos referenciando los _id de las categorías
//   await Product.insertMany([
//     {
//       name: 'Papas Fritas Clásicas',
//       description: 'Papas fritas sabor original 150g',
//       price: 4500,
//       stock: 50,
//       sku: 'SNK-PAP-001',
//       category: snacks._id,
//     },
//     {
//       name: 'Barra de Chocolate',
//       description: 'Barra de chocolate con leche 80g',
//       price: 5200,
//       stock: 40,
//       sku: 'SNK-CHO-001',
//       category: snacks._id,
//     },
//     {
//       name: 'Gaseosa Cola',
//       description: 'Gaseosa sabor cola 355ml',
//       price: 4800,
//       stock: 45,
//       sku: 'BEB-COL-001',
//       category: bebidas._id,
//     },
//     {
//       name: 'Sándwich Mixto',
//       description: 'Sándwich de jamón y queso 200g',
//       price: 8900,
//       stock: 20,
//       sku: 'COM-SAN-001',
//       category: comidas._id,
//     },
//   ]);
//   console.log('Seed completed: 3 categories + 4 vending products inserted');
//
//   await disconnectDB();
// }

// seed().catch((err: unknown) => {
//   console.error('Seed failed:', err);
//   process.exit(1);
// });
