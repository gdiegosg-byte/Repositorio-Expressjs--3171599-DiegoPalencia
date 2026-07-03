// ============================================
// SEED — Insertar datos de prueba
// Dominio: Empresa de Vending Machines
// ============================================
//
// Paso A: Insertar Locations (ubicaciones) → obtener _id
// Paso B: Insertar Machines (máquinas) con location: location._id

import 'dotenv/config';
import { connectDB, disconnectDB } from './lib/mongoose';
import { Location } from './models/location.model';
import { Machine } from './models/machine.model';

async function seed(): Promise<void> {
  await connectDB();

  // Limpiar colecciones (orden inverso: machines primero, luego locations)
  await Machine.deleteMany({});
  await Location.deleteMany({});
  console.log('Collections cleared');

  // Paso A — Insertar ubicaciones y capturar _id
  const [oficinaCentral, centroComercial, universidad] = await Location.insertMany([
    { name: 'Oficina Central', address: 'Calle 100 #15-20', city: 'Bogotá' },
    { name: 'Centro Comercial Santafé', address: 'Av. Boyacá #100-30', city: 'Bogotá' },
    { name: 'Universidad Nacional', address: 'Cra 30 #45-03', city: 'Bogotá' },
  ]);
  console.log('Locations inserted');

  // Paso B — Insertar máquinas referenciando las ubicaciones
  await Machine.insertMany([
    {
      code: 'VM-001',
      model: 'Snack Master 3000',
      status: 'active',
      location: oficinaCentral._id,
    },
    {
      code: 'VM-002',
      model: 'Bebidas Frías X1',
      status: 'active',
      location: oficinaCentral._id,
    },
    {
      code: 'VM-003',
      model: 'Snack Master 3000',
      status: 'maintenance',
      location: centroComercial._id,
    },
    {
      code: 'VM-004',
      model: 'Café Express Pro',
      status: 'active',
      location: universidad._id,
    },
    {
      code: 'VM-005',
      model: 'Bebidas Frías X1',
      status: 'inactive',
      location: universidad._id,
    },
  ]);
  console.log('Machines inserted');

  console.log('Seed completed successfully');
  await disconnectDB();
}

seed().catch((err: unknown) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
