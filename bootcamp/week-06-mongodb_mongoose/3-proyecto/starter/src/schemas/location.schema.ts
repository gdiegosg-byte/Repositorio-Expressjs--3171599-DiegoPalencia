// ============================================
// SCHEMA ZOD: Location (Ubicación)
// Dominio: Empresa de Vending Machines
// ============================================

import { z } from 'zod';

export const createLocationSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').max(100),
  address: z.string().min(1, 'La dirección es requerida').max(200),
  city: z.string().min(1, 'La ciudad es requerida').max(100),
});

export const updateLocationSchema = createLocationSchema.partial();

export type CreateLocationDto = z.infer<typeof createLocationSchema>;
export type UpdateLocationDto = z.infer<typeof updateLocationSchema>;
