// ============================================
// MODELO: Location (Ubicación)
// Entidad secundaria — no referencia a otras entidades
// Dominio: Empresa de Vending Machines
// ============================================

import { Schema, model } from 'mongoose';

export interface ILocation {
  name: string;
  address: string;
  city: string;
}

const locationSchema = new Schema<ILocation>(
  {
    name: {
      type: String,
      required: [true, 'El nombre de la ubicación es requerido'],
      trim: true,
      maxlength: 100,
      unique: true,
    },
    address: {
      type: String,
      required: [true, 'La dirección es requerida'],
      trim: true,
      maxlength: 200,
    },
    city: {
      type: String,
      required: [true, 'La ciudad es requerida'],
      trim: true,
      maxlength: 100,
    },
  },
  { timestamps: true },
);

// 'Location' → colección 'locations'
export const Location = model<ILocation>('Location', locationSchema);
