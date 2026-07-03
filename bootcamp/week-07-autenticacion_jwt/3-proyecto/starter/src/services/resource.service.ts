import { IResource } from '../models/resource.model';
import * as resourceRepository from '../repositories/resource.repository';
import { CreateResourceDto, UpdateResourceDto } from '../schemas/resource.schema';
import { AppError } from '../errors/AppError';

// ============================================
// SERVICIO DEL RECURSO PRINCIPAL — Máquina Expendedora
// ============================================
// Dominio: Empresa de Vending Machines
// Implementa la lógica de negocio del recurso.
// Llama al repositorio y aplica validaciones de dominio.
// ============================================

export async function getAll(): Promise<IResource[]> {
  // TODO: Llamar a resourceRepository.findAll()
  // Si tu dominio requiere filtros (ej. solo máquinas 'active'), agrégalos aquí
  throw new AppError(501, 'getAll no implementado');
}

export async function getById(id: string): Promise<IResource> {
  // TODO: Llamar a resourceRepository.findById(id)
  // Lanzar AppError(404, 'Máquina no encontrada') si el resultado es null
  throw new AppError(501, 'getById no implementado');
}

export async function create(
  dto: CreateResourceDto,
  _userId: string
): Promise<IResource> {
  // TODO: Llamar a resourceRepository.create(dto)
  // Si tu recurso guarda quién lo creó, pasa { ...dto, createdBy: _userId }
  // Aplica validaciones de negocio (ej. código único, estado válido)
  throw new AppError(501, 'create no implementado');
}

export async function update(
  id: string,
  dto: UpdateResourceDto
): Promise<IResource> {
  // TODO: Verificar que el recurso existe con getById(id)
  // Luego llamar a resourceRepository.updateById(id, dto)
  // Lanzar AppError(404, 'Máquina no encontrada') si no existe
  throw new AppError(501, 'update no implementado');
}

export async function remove(id: string): Promise<void> {
  // TODO: Llamar a resourceRepository.deleteById(id)
  // Lanzar AppError(404, 'Máquina no encontrada') si devolvió false (no existía)
  throw new AppError(501, 'remove no implementado');
}
