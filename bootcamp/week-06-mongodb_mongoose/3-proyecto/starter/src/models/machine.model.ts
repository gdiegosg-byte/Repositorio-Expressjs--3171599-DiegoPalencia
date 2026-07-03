// ============================================
// MODELO: Machine (Máquina expendedora)
// Entidad principal — referencia a Location (Ubicación)
// Dominio: Empresa de Vending Machines
// ============================================

import { Schema, model, Types } from 'mongoose';

export type MachineStatus = 'active' | 'maintenance' | 'inactive';

export interface IMachine {
  code: string;
  model: string;
  status: MachineStatus;
  location: Types.ObjectId;
}

const machineSchema = new Schema<IMachine>(
  {
    code: {
      type: String,
      required: [true, 'El código de la máquina es requerido'],
      trim: true,
      maxlength: 30,
      unique: true,
    },
    model: {
      type: String,
      required: [true, 'El modelo es requerido'],
      trim: true,
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ['active', 'maintenance', 'inactive'],
      default: 'active',
    },
    location: {
      type: Schema.Types.ObjectId,
      ref: 'Location',
      required: [true, 'La ubicación es requerida'],
    },
  },
  { timestamps: true },
);

// 'Machine' → colección 'machines'
export const Machine = model<IMachine>('Machine', machineSchema);
