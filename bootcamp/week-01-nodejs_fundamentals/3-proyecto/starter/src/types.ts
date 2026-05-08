// ============================================
// TIPOS — Dominio: Vending Machines
// ============================================

export interface VendingProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  active: boolean;
  machineId: string;
}

export interface ItemSummary {
  total: number;
  active: number;
  inactive: number;
  averagePrice: number;
  mostExpensive: VendingProduct;
  cheapest: VendingProduct;
  categories: string[];
}

export interface Report {
  generatedAt: string;
  appliedFilter: string | null;
  summary: ItemSummary;
  items: VendingProduct[];
}
