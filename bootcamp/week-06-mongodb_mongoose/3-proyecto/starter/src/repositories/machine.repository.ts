// ============================================
// REPOSITORY: Machine (Máquina expendedora)
// Incluye paginación, búsqueda y populate('location')
// Dominio: Empresa de Vending Machines
// ============================================

import { MongoServerError } from 'mongodb';
import mongoose from 'mongoose';
import { Machine } from '../models/machine.model';
import { AppError } from '../errors/AppError';
import type { CreateMachineDto, UpdateMachineDto } from '../schemas/machine.schema';

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}

export async function findAll(
  page: number,
  limit: number,
  search?: string,
): Promise<PaginatedResult<unknown>> {
  const skip = (page - 1) * limit;
  const filter = search ? { code: { $regex: search, $options: 'i' } } : {};

  const [data, total] = await Promise.all([
    Machine.find(filter)
      .populate('location')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Machine.countDocuments(filter),
  ]);

  return { data, total, page, totalPages: Math.ceil(total / limit) };
}

export async function findById(id: string): Promise<unknown> {
  try {
    const machine = await Machine.findById(id).populate('location').lean();
    if (!machine) throw new AppError(404, 'Máquina no encontrada');
    return machine;
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, 'ID inválido');
    }
    throw err;
  }
}

export async function create(dto: CreateMachineDto): Promise<unknown> {
  try {
    const machine = await Machine.create(dto);
    return machine.toJSON();
  } catch (err) {
    if (err instanceof MongoServerError && err.code === 11000) {
      throw new AppError(409, 'Ya existe una máquina con ese código');
    }
    throw err;
  }
}

export async function update(id: string, dto: UpdateMachineDto): Promise<unknown> {
  try {
    const machine = await Machine.findByIdAndUpdate(id, dto, {
      new: true,
      runValidators: true,
    })
      .populate('location')
      .lean();
    if (!machine) throw new AppError(404, 'Máquina no encontrada');
    return machine;
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, 'ID inválido');
    }
    if (err instanceof MongoServerError && err.code === 11000) {
      throw new AppError(409, 'Ya existe una máquina con ese código');
    }
    throw err;
  }
}

export async function remove(id: string): Promise<void> {
  try {
    const machine = await Machine.findByIdAndDelete(id);
    if (!machine) throw new AppError(404, 'Máquina no encontrada');
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, 'ID inválido');
    }
    throw err;
  }
}
