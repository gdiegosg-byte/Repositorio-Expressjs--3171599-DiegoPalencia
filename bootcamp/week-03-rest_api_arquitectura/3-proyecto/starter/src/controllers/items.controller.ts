// ============================================
// CONTROLLER — Interfaz HTTP
// Dominio: Vending Machines — Diego Palencia 3171599
// ============================================
import { Request, Response, NextFunction } from 'express';
import * as service from '../services/items.service';
import { CreateItemDto, UpdateItemDto, ErrorResponse } from '../types';

export async function getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = Math.max(1, parseInt(req.query['page'] as string) || 1);
    const limit = Math.max(1, parseInt(req.query['limit'] as string) || 10);
    const result = await service.findAll({ page, limit });
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = parseInt(req.params['id'] as string);
    const item = await service.findById(id);
    if (!item) {
      const response: ErrorResponse = { error: 'Not Found', message: `Item ${id} not found` };
      res.status(404).json(response);
      return;
    }
    res.json({ data: item });
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const dto = req.body as CreateItemDto;
    const item = await service.create(dto);
    res.status(201).json({ data: item });
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = parseInt(req.params['id'] as string);
    const dto = req.body as UpdateItemDto;
    const updated = await service.update(id, dto);
    if (!updated) {
      const response: ErrorResponse = { error: 'Not Found', message: `Item ${id} not found` };
      res.status(404).json(response);
      return;
    }
    res.json({ data: updated });
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const id = parseInt(req.params['id'] as string);
    const deleted = await service.remove(id);
    if (!deleted) {
      const response: ErrorResponse = { error: 'Not Found', message: `Item ${id} not found` };
      res.status(404).json(response);
      return;
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
