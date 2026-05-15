// ============================================
// REPOSITORY — Capa de acceso a datos
// Dominio: Vending Machines — Diego Palencia 3171599
// ============================================
import { Item, CreateItemDto, UpdateItemDto } from '../types';

const store: Item[] = [
  { id: 1, name: 'Coca-Cola 350ml', description: 'Bebida gaseosa clásica, fría y refrescante.', price: 3500, stock: 12, category: 'bebida', calories: 140, machineId: 'VM-001', active: true, createdAt: '2026-01-10T08:00:00.000Z' },
  { id: 2, name: 'Chitos', description: 'Snack de maíz con sabor a queso. Crujiente y adictivo.', price: 1800, stock: 20, category: 'snack', calories: 160, machineId: 'VM-001', active: true, createdAt: '2026-01-10T08:05:00.000Z' },
  { id: 3, name: 'Agua Cristal 600ml', description: 'Agua purificada sin gas. Hidratación pura.', price: 2000, stock: 25, category: 'saludable', calories: 0, machineId: 'VM-002', active: true, createdAt: '2026-01-10T08:10:00.000Z' },
  { id: 4, name: 'Snickers', description: 'Barra de chocolate con maní, caramelo y nougat.', price: 2800, stock: 8, category: 'dulce', calories: 250, machineId: 'VM-002', active: true, createdAt: '2026-01-10T08:15:00.000Z' },
  { id: 5, name: 'Red Bull 250ml', description: 'Bebida energizante. Te da alas.', price: 6500, stock: 6, category: 'bebida', calories: 110, machineId: 'VM-003', active: true, createdAt: '2026-01-10T08:20:00.000Z' },
];
let nextId = 6;

export async function findAll(): Promise<Item[]> {
  return [...store];
}

export async function findById(id: number): Promise<Item | undefined> {
  const item = store.find((i) => i.id === id);
  return item ? { ...item } : undefined;
}

export async function create(dto: CreateItemDto): Promise<Item> {
  const item: Item = { id: nextId++, ...dto, createdAt: new Date().toISOString() };
  store.push(item);
  return { ...item };
}

export async function update(id: number, dto: UpdateItemDto): Promise<Item | undefined> {
  const index = store.findIndex((i) => i.id === id);
  if (index === -1) return undefined;
  store[index] = { ...store[index]!, ...dto };
  return { ...store[index]! };
}

export async function remove(id: number): Promise<boolean> {
  const index = store.findIndex((i) => i.id === id);
  if (index === -1) return false;
  store.splice(index, 1);
  return true;
}
