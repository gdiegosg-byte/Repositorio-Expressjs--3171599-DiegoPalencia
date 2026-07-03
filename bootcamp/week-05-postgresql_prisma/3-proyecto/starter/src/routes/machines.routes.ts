// ============================================
// ROUTES — Máquinas Expendedoras
// Dominio: Empresa de Vending Machines
// ============================================

import { Router } from 'express';
import { machinesController } from '../controllers/machines.controller';
import { validate } from '../middlewares/validate';
import {
  createMachineSchema,
  listMachinesSchema,
  machineIdSchema,
  updateMachineSchema,
} from '../schemas/machines.schema';

const router = Router();

router.get('/', validate(listMachinesSchema), machinesController.list);
router.get('/:id', validate(machineIdSchema), machinesController.getById);
router.post('/', validate(createMachineSchema), machinesController.create);
router.patch('/:id', validate(updateMachineSchema), machinesController.update);
router.delete('/:id', validate(machineIdSchema), machinesController.remove);

export default router;
