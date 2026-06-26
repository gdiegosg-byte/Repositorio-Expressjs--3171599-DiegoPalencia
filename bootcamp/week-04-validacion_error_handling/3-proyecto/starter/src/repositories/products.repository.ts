import { Product } from "../types";
import { CreateItemInput, UpdateItemInput } from "../schemas/product.schema";

/**
 * "Base de datos" en memoria. Se reinicia cada vez que se reinicia el servidor.
 */
let products: Product[] = [
  {
    id: 1,
    name: "Coca-Cola 350ml",
    slotCode: "A1",
    price: 2500,
    stock: 20,
    category: "bebida",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Papas Margarita",
    slotCode: "B3",
    price: 3200,
    stock: 15,
    category: "snack",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Chocolatina Jet",
    slotCode: "C2",
    price: 1800,
    stock: 30,
    category: "dulce",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

let nextId = 4;

/**
 * Devuelve todos los productos. La paginación se aplica en la capa de servicio.
 */
function findAll(): Product[] {
  return products;
}

function findById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}

function create(data: CreateItemInput): Product {
  const now = new Date().toISOString();
  const newProduct: Product = {
    id: nextId++,
    name: data.name,
    slotCode: data.slotCode,
    price: data.price,
    stock: data.stock ?? 0,
    category: data.category,
    createdAt: now,
    updatedAt: now,
  };
  products.push(newProduct);
  return newProduct;
}

function update(id: number, data: UpdateItemInput): Product | undefined {
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return undefined;

  const updated: Product = {
    ...products[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  products[index] = updated;
  return updated;
}

function remove(id: number): boolean {
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return false;
  products.splice(index, 1);
  return true;
}

export const productsRepository = {
  findAll,
  findById,
  create,
  update,
  remove,
};
