import { Router } from 'express';
import * as resourceController from '../controllers/resource.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

// ============================================
// RUTAS DEL RECURSO PRINCIPAL — Máquinas Expendedoras
// ============================================
// Dominio: Empresa de Vending Machines
// Todas las rutas están protegidas con authMiddleware.
// Adapta la ruta base en app.ts al nombre plural de tu recurso.
// ============================================

const router = Router();

// Todas las rutas de este router requieren autenticación
router.use(authMiddleware);

// TODO: Definir las 5 rutas CRUD del recurso

// GET /api/v1/machines — listar todas las máquinas
router.get('/', resourceController.getAll);

// GET /api/v1/machines/:id — obtener una máquina por ID
router.get('/:id', resourceController.getById);

// POST /api/v1/machines — crear una nueva máquina
router.post('/', resourceController.create);

// PATCH /api/v1/machines/:id — actualizar parcialmente
router.patch('/:id', resourceController.update);

// DELETE /api/v1/machines/:id — eliminar
router.delete('/:id', resourceController.remove);

export default router;
