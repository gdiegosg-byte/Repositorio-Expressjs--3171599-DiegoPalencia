// ============================================
// REPOSITORY: Location (Ubicación)
// Dominio: Empresa de Vending Machines
// ============================================

import { MongoServerError } from 'mongodb';
import mongoose from 'mongoose';
import { Location } from '../models/location.model';
import { AppError } from '../errors/AppError';
import type { CreateLocationDto, UpdateLocationDto } from '../schemas/location.schema';

export async function findAll(): Promise<unknown[]> {
  return Location.find().sort({ name: 1 }).lean();
}

export async function findById(id: string): Promise<unknown> {
  try {
    const location = await Location.findById(id).lean();
    if (!location) throw new AppError(404, 'Ubicación no encontrada');
    return location;
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, 'ID inválido');
    }
    throw err;
  }
}

export async function create(dto: CreateLocationDto): Promise<unknown> {
  try {
    const location = await Location.create(dto);
    return location.toJSON();
  } catch (err) {
    if (err instanceof MongoServerError && err.code === 11000) {
      throw new AppError(409, 'Ya existe una ubicación con ese nombre');
    }
    throw err;
  }
}

export async function update(id: string, dto: UpdateLocationDto): Promise<unknown> {
  try {
    const location = await Location.findByIdAndUpdate(id, dto, {
      new: true,
      runValidators: true,
    }).lean();
    if (!location) throw new AppError(404, 'Ubicación no encontrada');
    return location;
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, 'ID inválido');
    }
    if (err instanceof MongoServerError && err.code === 11000) {
      throw new AppError(409, 'Ya existe una ubicación con ese nombre');
    }
    throw err;
  }
}

export async function remove(id: string): Promise<void> {
  try {
    const location = await Location.findByIdAndDelete(id);
    if (!location) throw new AppError(404, 'Ubicación no encontrada');
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      throw new AppError(400, 'ID inválido');
    }
    throw err;
  }
}
