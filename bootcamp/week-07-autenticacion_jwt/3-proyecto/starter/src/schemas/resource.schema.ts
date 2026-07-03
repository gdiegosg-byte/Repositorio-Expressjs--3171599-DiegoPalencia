import { z } from 'zod';

// ============================================
// SCHEMA DEL RECURSO PRINCIPAL — Máquina Expendedora
// ============================================
// Dominio: Empresa de Vending Machines
// Adapta este schema al recurso de tu dominio asignado.
//
// Ejemplos:
// - Máquina expendedora: código, modelo, estado, ubicación
// ============================================

// TODO: Define el schema de creación para tu recurso
// Ejemplo mínimo (adáptalo a tu dominio):
export const createResourceSchema = z.object({
  // TODO: Reemplaza estos campos por los de tu recurso real
  // code: z.string().min(2, 'El código debe tener al menos 2 caracteres').max(30),
  // model: z.string().min(2, 'El modelo debe tener al menos 2 caracteres'),
  // status: z.enum(['active', 'maintenance', 'inactive']).optional().default('active'),
});

// TODO: Define el schema de actualización (todos los campos opcionales)
// Usa .partial() para hacer todos los campos opcionales
export const updateResourceSchema = createResourceSchema.partial();

export type CreateResourceDto = z.infer<typeof createResourceSchema>;
export type UpdateResourceDto = z.infer<typeof updateResourceSchema>;
