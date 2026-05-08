// ============================================
// READER — Lee el archivo de datos JSON
// ============================================

import { readFile } from 'fs/promises';
import { join } from 'path';
import type { VendingProduct } from './types.js';

export async function readItems(): Promise<VendingProduct[]> {
  const filePath = join(import.meta.dirname, '..', 'data', 'products.json');
  try {
    const raw = await readFile(filePath, 'utf-8');
    return JSON.parse(raw) as VendingProduct[];
  } catch (err) {
    throw new Error(
      `No se pudo leer el archivo de productos: ${(err as Error).message}`
    );
  }
}
