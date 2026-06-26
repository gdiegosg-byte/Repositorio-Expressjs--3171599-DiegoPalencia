import { z } from "zod";

/**
 * Categorías válidas para un producto de vending machine.
 */
export const productCategoryEnum = z.enum(["snack", "bebida", "dulce", "otro"], {
  errorMap: () => ({
    message: "category debe ser una de: snack, bebida, dulce, otro",
  }),
});

/**
 * Schema de creación de un producto.
 * - slotCode sigue el patrón de una fila (letra) + columna (número), ej: "A1", "B12".
 * - price debe ser positivo (no tiene sentido un producto gratis o negativo).
 * - stock por defecto en 0 si no se especifica.
 */
export const createItemSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio").trim(),
  slotCode: z
    .string()
    .regex(/^[A-Z]\d{1,2}$/, "slotCode debe tener el formato letra+número, ej: A1, B12")
    .trim(),
  price: z.number().positive("El precio debe ser mayor a 0"),
  stock: z.number().int().nonnegative("El stock no puede ser negativo").default(0),
  category: productCategoryEnum,
});

/**
 * Schema de actualización: todos los campos son opcionales,
 * pero si se envían deben cumplir las mismas reglas de validación.
 */
export const updateItemSchema = createItemSchema.partial();

/**
 * Schema para validar el parámetro :id en las rutas.
 * z.coerce.number() convierte el string del param a número antes de validar.
 */
export const idParamSchema = z.object({
  id: z.coerce.number().int().positive("El id debe ser un número entero positivo"),
});

export type CreateItemInput = z.infer<typeof createItemSchema>;
export type UpdateItemInput = z.infer<typeof updateItemSchema>;
