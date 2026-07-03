// ============================================
// SCHEMA — Máquinas Expendedoras
// Dominio: Empresa de Vending Machines
// ============================================

import { z } from 'zod';

export const machineStatusEnum = z.enum(['ACTIVE', 'MAINTENANCE', 'INACTIVE', 'OUT_OF_SERVICE']);

export const createMachineSchema = z.object({
  body: z.object({
    code: z.string().min(3, 'El código debe tener al menos 3 caracteres').max(20),
    location: z.string().min(3, 'La ubicación es obligatoria'),
    capacity: z.number().int().positive('La capacidad debe ser un número positivo'),
    status: machineStatusEnum.optional().default('ACTIVE'),
    isRefrigerated: z.boolean().optional().default(false),
  }),
});

export const updateMachineSchema = z.object({
  params: z.object({ id: z.string().uuid('ID inválido') }),
  body: z
    .object({
      code: z.string().min(3).max(20).optional(),
      location: z.string().min(3).optional(),
      capacity: z.number().int().positive().optional(),
      status: machineStatusEnum.optional(),
      isRefrigerated: z.boolean().optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: 'Debes enviar al menos un campo para actualizar',
    }),
});

export const machineIdSchema = z.object({
  params: z.object({ id: z.string().uuid('ID inválido') }),
});

export const listMachinesSchema = z.object({
  query: z.object({
    status: machineStatusEnum.optional(),
    page: z.coerce.number().int().positive().optional().default(1),
    limit: z.coerce.number().int().positive().max(100).optional().default(20),
  }),
});

export type CreateMachineInput = z.infer<typeof createMachineSchema>['body'];
export type UpdateMachineInput = z.infer<typeof updateMachineSchema>['body'];
