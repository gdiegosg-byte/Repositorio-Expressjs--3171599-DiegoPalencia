// Rutas del recurso principal: productos de vending machines
// Dominio: Vending Machines — Diego Palencia 3171599

import { Router } from 'express';
import type { Request, Response } from 'express';
import * as store from '../store.js';
import type { CreateItemDto, UpdateItemDto } from '../types.js';

export const itemsRouter = Router();

// GET /api/v1/items — obtener todos los productos
itemsRouter.get('/', (_req: Request, res: Response) => {
  res.json(store.getAll());
});

// GET /api/v1/items/:id — obtener un producto por id
itemsRouter.get('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const item = store.getById(id);
  if (!item) {
    res.status(404).json({ error: `Producto con id ${id} no encontrado` });
    return;
  }
  res.json(item);
});

// POST /api/v1/items — crear un nuevo producto
itemsRouter.post('/', (req: Request, res: Response) => {
  const data = req.body as CreateItemDto;
  if (!data.name || !data.price || !data.machineId) {
    res.status(400).json({ error: 'Campos requeridos: name, price, machineId' });
    return;
  }
  const newItem = store.create(data);
  res.status(201).json(newItem);
});

// PUT /api/v1/items/:id — actualizar un producto
itemsRouter.put('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const data = req.body as UpdateItemDto;
  const updated = store.update(id, data);
  if (!updated) {
    res.status(404).json({ error: `Producto con id ${id} no encontrado` });
    return;
  }
  res.json(updated);
});

// DELETE /api/v1/items/:id — eliminar un producto
itemsRouter.delete('/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const deleted = store.remove(id);
  if (!deleted) {
    res.status(404).json({ error: `Producto con id ${id} no encontrado` });
    return;
  }
  res.status(204).send();
});
