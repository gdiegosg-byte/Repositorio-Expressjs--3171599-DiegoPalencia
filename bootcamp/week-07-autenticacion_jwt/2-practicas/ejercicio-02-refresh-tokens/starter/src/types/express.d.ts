// ============================================
// TYPES: Extensión de Express Request
// Dominio: Empresa de Vending Machines
// ============================================

import { JwtPayload } from '../utils/jwt';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
