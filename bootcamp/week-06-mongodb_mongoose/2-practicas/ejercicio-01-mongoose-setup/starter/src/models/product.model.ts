// ============================================
// PASO 1: Schema y Model de Producto
// ============================================
// PASO 1: Schema y Model de Producto de Vending
// ============================================
//
// Mongoose permite definir la estructura del documento usando Schema.
// La interfaz TypeScript define los tipos de los campos.
// El Model es la clase que usamos para hacer queries a la colección.
//
// Dominio: Empresa de Vending Machines — productos para máquinas expendedoras
//
// Descomenta las siguientes líneas (PASO 1 — interfaz y schema):
// interface IProduct {
//   name: string;
//   description?: string;
//   price: number;
//   stock: number;
//   sku: string;
//   active: boolean;
// }
// 
// const productSchema = new Schema<IProduct>(
//   {
//     name: {
//       type: String,
//       required: [true, 'El nombre del producto es requerido'],
//       trim: true,
//       maxlength: [100, 'El nombre no puede superar 100 caracteres'],
//     },
//     description: {
//       type: String,
//       maxlength: 500,
//     },
//     price: {
//       type: Number,
//       required: [true, 'El precio es requerido'],
//       min: [0, 'El precio no puede ser negativo'],
//     },
//     stock: {
//       type: Number,
//       default: 0,
//       min: 0,
//     },
//     sku: {
//       type: String,
//       required: [true, 'El SKU es requerido'],
//       unique: true,           // índice UNIQUE — violación lanza error 11000
//       uppercase: true,        // transforma a mayúsculas antes de guardar
//       trim: true,
//     },
//     active: {
//       type: Boolean,
//       default: true,
//     },
//   },
//   {
//     timestamps: true,         // añade createdAt y updatedAt automáticamente
//   },
// );
// 
// // 'Product' (singular) → colección 'products' (plural, lowercase)
// // Representa un producto/snack vendido en máquinas expendedoras
// export const Product = model<IProduct>('Product', productSchema);
