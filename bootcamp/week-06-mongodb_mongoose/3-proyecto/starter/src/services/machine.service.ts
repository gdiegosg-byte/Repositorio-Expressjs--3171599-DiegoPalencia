// ============================================
// SERVICE: Machine (Máquina expendedora)
// Dominio: Empresa de Vending Machines
// ============================================

import * as repo from '../repositories/machine.repository';
import type { CreateMachineDto, UpdateMachineDto } from '../schemas/machine.schema';

export async function getAll(page: number, limit: number, search?: string) {
  return repo.findAll(page, limit, search);
}

export async function getById(id: string) {
  return repo.findById(id);
}

export async function createMachine(dto: CreateMachineDto) {
  return repo.create(dto);
}

export async function updateMachine(id: string, dto: UpdateMachineDto) {
  return repo.update(id, dto);
}

export async function deleteMachine(id: string) {
  return repo.remove(id);
}
