import type { Item, CreateItemDto, UpdateItemDto } from './types.js';

// Store en memoria — simula una base de datos sin persistencia
// Dominio: Vending Machines — Diego Palencia 3171599
const items: Item[] = [
  {
    id: 1,
    name: 'Coca-Cola 350ml',
    description: 'Bebida gaseosa clásica, fría y refrescante.',
    price: 3500,
    stock: 12,
    category: 'bebida',
    calories: 140,
    machineId: 'VM-001',
  },
  {
    id: 2,
    name: 'Snickers',
    description: 'Barra de chocolate con maní, caramelo y nougat.',
    price: 2800,
    stock: 8,
    category: 'dulce',
    calories: 250,
    machineId: 'VM-001',
  },
  {
    id: 3,
    name: 'Agua Cristal 600ml',
    description: 'Agua purificada sin gas. Hidratación pura.',
    price: 2000,
    stock: 20,
    category: 'saludable',
    calories: 0,
    machineId: 'VM-002',
  },
];
let nextId = 4;

export function getAll(): Item[] {
  return items;
}

export function getById(id: number): Item | undefined {
  return items.find((item) => item.id === id);
}

export function create(data: CreateItemDto): Item {
  const newItem: Item = { id: nextId++, ...data };
  items.push(newItem);
  return newItem;
}

export function update(id: number, data: UpdateItemDto): Item | undefined {
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return undefined;
  items[index] = { ...items[index], ...data };
  return items[index];
}

export function remove(id: number): boolean {
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return false;
  items.splice(index, 1);
  return true;
}
