// ============================================
// PROCESSOR — Filtra y calcula estadísticas
// ============================================

import type { VendingProduct, ItemSummary } from './types.js';

export function filterByCategory(
  items: VendingProduct[],
  categoryFilter: string | null
): VendingProduct[] {
  if (categoryFilter === null) return items;

  const filtered = items.filter(
    (item) => item.category.toLowerCase() === categoryFilter.toLowerCase()
  );

  if (filtered.length === 0) {
    const available = Array.from(new Set(items.map((i) => i.category))).join(', ');
    throw new Error(
      `Categoría "${categoryFilter}" no encontrada. Categorías disponibles: ${available}`
    );
  }

  return filtered;
}

export function calculateSummary(items: VendingProduct[]): ItemSummary {
  const total = items.length;
  const active = items.filter((i) => i.active).length;
  const inactive = items.filter((i) => !i.active).length;

  const totalPrice = items.reduce((sum, i) => sum + i.price, 0);
  const averagePrice = parseFloat((totalPrice / total).toFixed(2));

  const sorted = [...items].sort((a, b) => b.price - a.price);
  const mostExpensive = sorted[0];
  const cheapest = sorted[sorted.length - 1];

  const categories = Array.from(new Set(items.map((i) => i.category)));

  return { total, active, inactive, averagePrice, mostExpensive, cheapest, categories };
}
