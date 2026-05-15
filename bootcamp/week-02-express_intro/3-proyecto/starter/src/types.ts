// ============================================
// TYPES: Interfaz del recurso principal
// Dominio: Vending Machines — Diego Palencia 3171599
// ============================================

export interface Item {
  id: number;
  name: string;          // Nombre del producto (ej: "Coca-Cola 350ml")
  description: string;   // Descripción del producto
  price: number;         // Precio en COP
  stock: number;         // Unidades disponibles
  category: 'bebida' | 'snack' | 'dulce' | 'saludable';
  calories: number;      // Calorías por porción
  machineId: string;     // ID de la máquina (ej: "VM-001")
}

// DTO usado para crear un nuevo item (sin id, se genera automáticamente)
export type CreateItemDto = Omit<Item, 'id'>;

// DTO para actualización (todos los campos editables)
export type UpdateItemDto = Partial<CreateItemDto>;
