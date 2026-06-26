/**
 * Categorías permitidas para los productos de las máquinas de vending.
 */
export type ProductCategory = "snack" | "bebida" | "dulce" | "otro";

/**
 * Entidad principal del dominio: un producto disponible en una vending machine.
 */
export interface Product {
  id: number;
  name: string;
  slotCode: string; // Código del slot dentro de la máquina, ej: "A1"
  price: number;
  stock: number;
  category: ProductCategory;
  createdAt: string;
  updatedAt: string;
}

/**
 * Forma estándar de respuesta exitosa de la API.
 */
export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  meta?: PaginationMeta;
}

/**
 * Forma estándar de respuesta de error de la API.
 */
export interface ApiErrorResponse {
  success: false;
  message: string;
  issues?: unknown;
}

/**
 * Metadata de paginación devuelta en los listados.
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
