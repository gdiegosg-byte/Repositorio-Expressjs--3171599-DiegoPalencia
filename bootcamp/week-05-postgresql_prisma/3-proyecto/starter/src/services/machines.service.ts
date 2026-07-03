// ============================================
// SERVICE — Máquinas Expendedoras
// Dominio: Empresa de Vending Machines
// ============================================

import { machinesRepository } from '../repositories/machines.repository';
import { ConflictError, NotFoundError } from '../errors/AppError';
import { CreateMachineInput, UpdateMachineInput } from '../schemas/machines.schema';

interface ListParams {
  status?: string;
  page: number;
  limit: number;
}

export const machinesService = {
  async list(params: ListParams) {
    const { data, total } = await machinesRepository.findAll(params);
    return {
      data,
      meta: {
        total,
        page: params.page,
        limit: params.limit,
        totalPages: Math.ceil(total / params.limit),
      },
    };
  },

  async getById(id: string) {
    const machine = await machinesRepository.findById(id);
    if (!machine) {
      throw new NotFoundError(`No se encontró la máquina con id "${id}"`);
    }
    return machine;
  },

  async create(input: CreateMachineInput) {
    const existing = await machinesRepository.findByCode(input.code);
    if (existing) {
      throw new ConflictError(`Ya existe una máquina registrada con el código "${input.code}"`);
    }
    return machinesRepository.create(input);
  },

  async update(id: string, input: UpdateMachineInput) {
    await this.getById(id);

    if (input.code) {
      const existing = await machinesRepository.findByCode(input.code);
      if (existing && existing.id !== id) {
        throw new ConflictError(`Ya existe una máquina registrada con el código "${input.code}"`);
      }
    }

    return machinesRepository.update(id, input);
  },

  async remove(id: string) {
    await this.getById(id);
    await machinesRepository.delete(id);
  },
};
