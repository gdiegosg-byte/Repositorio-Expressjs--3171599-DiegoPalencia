// ============================================
// CONTROLLER — Máquinas Expendedoras
// Dominio: Empresa de Vending Machines
// ============================================

import { Request, Response } from 'express';
import { machinesService } from '../services/machines.service';
import { asyncHandler } from '../lib/asyncHandler';

export const machinesController = {
  list: asyncHandler(async (req: Request, res: Response) => {
    const { status, page, limit } = req.query as unknown as {
      status?: string;
      page: number;
      limit: number;
    };
    const result = await machinesService.list({ status, page, limit });
    res.status(200).json(result);
  }),

  getById: asyncHandler(async (req: Request, res: Response) => {
    const machine = await machinesService.getById(req.params['id'] as string);
    res.status(200).json({ data: machine });
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    const machine = await machinesService.create(req.body);
    res.status(201).json({ data: machine });
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    const machine = await machinesService.update(req.params['id'] as string, req.body);
    res.status(200).json({ data: machine });
  }),

  remove: asyncHandler(async (req: Request, res: Response) => {
    await machinesService.remove(req.params['id'] as string);
    res.status(204).send();
  }),
};
