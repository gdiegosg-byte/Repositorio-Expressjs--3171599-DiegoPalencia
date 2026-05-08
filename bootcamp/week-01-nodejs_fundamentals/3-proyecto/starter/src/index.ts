// ============================================
// ENTRY POINT — Orquesta todo el flujo
// ============================================

import { readItems } from './reader.js';
import { filterByCategory, calculateSummary } from './processor.js';
import { writeReport } from './writer.js';
import type { Report } from './types.js';

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const categoryIndex = args.indexOf('--category');
  const categoryFilter: string | null =
    categoryIndex !== -1 ? args[categoryIndex + 1] : null;

  try {
    const items = await readItems();
    const filtered = filterByCategory(items, categoryFilter);
    const summary = calculateSummary(filtered);

    const report: Report = {
      generatedAt: new Date().toISOString(),
      appliedFilter: categoryFilter,
      summary,
      items: filtered,
    };

    console.log('\n📊 Resumen de Productos Vending:');
    console.log(`  Total productos : ${summary.total}`);
    console.log(`  Activos         : ${summary.active}`);
    console.log(`  Inactivos       : ${summary.inactive}`);
    console.log(`  Precio promedio : $${summary.averagePrice}`);
    console.log(`  Más caro        : ${summary.mostExpensive.name} ($${summary.mostExpensive.price})`);
    console.log(`  Más barato      : ${summary.cheapest.name} ($${summary.cheapest.price})`);
    console.log(`  Categorías      : ${summary.categories.join(', ')}`);

    await writeReport(report);
  } catch (err) {
    console.error(`\n❌ Error: ${(err as Error).message}`);
    process.exit(1);
  }
}

main();
