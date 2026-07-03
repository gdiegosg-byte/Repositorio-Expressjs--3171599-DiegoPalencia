import mongoose, { Document, Schema } from 'mongoose';

// ============================================
// MODELO DEL RECURSO PRINCIPAL — Máquina Expendedora
// ============================================
// Dominio: Empresa de Vending Machines
//
// INSTRUCCIONES:
//
// 1. Cambia el nombre de este archivo al recurso real de tu dominio.
//    Ejemplo: machine.model.ts
//
// 2. Reemplaza la interfaz IResource con los campos de tu recurso.
//    Elimina los campos de ejemplo y agrega los propios.
//
// 3. Renombra el model al final: mongoose.model<IMachine>('Machine', machineSchema)
//
// 4. Actualiza las importaciones en repository, service, controller y routes.
// ============================================

// TODO: Reemplaza IResource con la interfaz real de tu recurso
// Ejemplo para Vending Machines:
//   export interface IMachine extends Document {
//     code: string;
//     model: string;
//     status: 'active' | 'maintenance' | 'inactive';
//     location: string;
//     createdBy: mongoose.Types.ObjectId;
//   }
export interface IResource extends Document {
  // TODO: Define los campos de tu recurso (ej: máquina expendedora)
  // code: string;
  // model: string;
  // status: 'active' | 'maintenance' | 'inactive';
  // createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// TODO: Define el schema de Mongoose con los campos correctos
const resourceSchema = new Schema<IResource>(
  {
    // TODO: Agrega los campos de tu máquina aquí
    // code: {
    //   type: String,
    //   required: [true, 'El código de la máquina es requerido'],
    //   unique: true,
    //   trim: true,
    // },
    // model: {
    //   type: String,
    //   required: [true, 'El modelo es requerido'],
    //   trim: true,
    // },
    // status: {
    //   type: String,
    //   enum: ['active', 'maintenance', 'inactive'],
    //   default: 'active',
    // },
    // createdBy: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'User',
    //   required: true,
    // },
  },
  { timestamps: true }
);

// TODO: Renombra 'Resource' por el nombre real de tu modelo (singular, PascalCase)
// Ejemplo: mongoose.model<IMachine>('Machine', machineSchema)
export const ResourceModel = mongoose.model<IResource>('Resource', resourceSchema);
