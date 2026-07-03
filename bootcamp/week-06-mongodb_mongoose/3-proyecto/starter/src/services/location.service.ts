// ============================================
// SERVICE: Location (Ubicación)
// Dominio: Empresa de Vending Machines
// ============================================

import * as repo from '../repositories/location.repository';
import type { CreateLocationDto, UpdateLocationDto } from '../schemas/location.schema';

export async function getAll() {
  return repo.findAll();
}

export async function getById(id: string) {
  return repo.findById(id);
}

export async function createLocation(dto: CreateLocationDto) {
  return repo.create(dto);
}

export async function updateLocation(id: string, dto: UpdateLocationDto) {
  return repo.update(id, dto);
}

export async function deleteLocation(id: string) {
  return repo.remove(id);
}
