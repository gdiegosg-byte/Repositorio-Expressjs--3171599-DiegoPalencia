// ============================================
// CONTROLLER: Location (Ubicación)
// Dominio: Empresa de Vending Machines
// ============================================

import { Request, Response, NextFunction } from 'express';
import * as service from '../services/location.service';
import {
  createLocationSchema,
  updateLocationSchema,
} from '../schemas/location.schema';
import { objectIdSchema } from '../schemas/machine.schema';

export async function getAll(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const items = await service.getAll();
    res.json(items);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = objectIdSchema.parse(req.params['id']);
    const item = await service.getById(id);
    res.json(item);
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const dto = createLocationSchema.parse(req.body);
    const item = await service.createLocation(dto);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = objectIdSchema.parse(req.params['id']);
    const dto = updateLocationSchema.parse(req.body);
    const item = await service.updateLocation(id, dto);
    res.json(item);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = objectIdSchema.parse(req.params['id']);
    await service.deleteLocation(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
