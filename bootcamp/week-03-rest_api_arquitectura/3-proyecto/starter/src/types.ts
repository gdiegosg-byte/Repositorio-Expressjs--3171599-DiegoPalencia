// ============================================
// TYPES — Dominio: Vending Machines
// Diego Palencia 3171599
// ============================================

export interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: 'bebida' | 'snack' | 'dulce' | 'saludable';
  calories: number;
  machineId: string;
  active: boolean;
  createdAt: string;
}

export type CreateItemDto = Omit<Item, 'id' | 'createdAt'>;
export type UpdateItemDto = Partial<CreateItemDto>;

export interface SingleResponse<T> { data: T; }
export interface PaginatedResponse<T> { data: T[]; total: number; page: number; limit: number; }
export interface ErrorResponse { error: string; message: string; }
export interface PaginationParams { page: number; limit: number; }
