import { productsRepository } from "../repositories/products.repository";
import { AppError } from "../errors/AppError";
import { CreateItemInput, UpdateItemInput } from "../schemas/product.schema";
import { Product, PaginationMeta } from "../types";

interface PaginatedResult {
  data: Product[];
  meta: PaginationMeta;
}

/**
 * Lista productos con paginación.
 * page y limit ya llegan validados/normalizados desde el controlador.
 */
function listProducts(page: number, limit: number): PaginatedResult {
  const all = productsRepository.findAll();
  const total = all.length;
  const totalPages = Math.max(Math.ceil(total / limit), 1);

  const start = (page - 1) * limit;
  const data = all.slice(start, start + limit);

  return {
    data,
    meta: { page, limit, total, totalPages },
  };
}

/**
 * Busca un producto por id. Lanza 404 si no existe.
 */
function getProductById(id: number): Product {
  const product = productsRepository.findById(id);
  if (!product) {
    throw new AppError(404, `Producto con id ${id} no encontrado`);
  }
  return product;
}

function createProduct(data: CreateItemInput): Product {
  return productsRepository.create(data);
}

function updateProduct(id: number, data: UpdateItemInput): Product {
  // Reutilizamos getProductById para validar existencia (lanza 404 si aplica).
  getProductById(id);
  const updated = productsRepository.update(id, data);
  if (!updated) {
    throw new AppError(404, `Producto con id ${id} no encontrado`);
  }
  return updated;
}

function deleteProduct(id: number): void {
  const deleted = productsRepository.remove(id);
  if (!deleted) {
    throw new AppError(404, `Producto con id ${id} no encontrado`);
  }
}

export const productsService = {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
