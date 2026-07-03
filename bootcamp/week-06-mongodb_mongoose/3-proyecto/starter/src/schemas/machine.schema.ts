// ============================================
// SCHEMA ZOD: Machine (Máquina expendedora)
// Incluye referencia a Location
// Dominio: Empresa de Vending Machines
// ============================================

import { z } from 'zod';

// ObjectId: 24 caracteres hexadecimales
const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const objectIdSchema = z.string().regex(objectIdRegex, 'ID inválido');

export const createMachineSchema = z.object({
  code: z.string().min(1, 'El código es requerido').max(30),
  model: z.string().min(1, 'El modelo es requerido').max(100),
  status: z.enum(['active', 'maintenance', 'inactive']).optional().default('active'),
  location: z.string().regex(objectIdRegex, 'ID de ubicación inválido'),
});

export const updateMachineSchema = createMachineSchema.partial();

export type CreateMachineDto = z.infer<typeof createMachineSchema>;
export type UpdateMachineDto = z.infer<typeof updateMachineSchema>;
