# 🚀 Proyecto Semanal — Procesador de Datos con Node.js

## 🎯 Objetivo

Herramienta CLI que lee productos de vending machines desde un archivo JSON, los procesa aplicando filtros y transformaciones, y genera un reporte — todo con **Node.js + TypeScript + async/await**.

---

## 🏛️ Dominio: Vending Machines

**Recurso principal:** `VendingProduct`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | string | Identificador único |
| `name` | string | Nombre del producto |
| `category` | string | bebidas, snacks, lacteos, dulces |
| `price` | number | Precio en pesos colombianos |
| `stock` | number | Unidades disponibles |
| `active` | boolean | Disponible en máquina |
| `machineId` | string | ID de la máquina (A1, B3...) |

---

## 🧪 Cómo correr el proyecto

```bash
cd 3-proyecto/starter
pnpm install
pnpm dev                          # todos los productos
pnpm dev -- --category bebidas    # filtrar por categoría
pnpm dev -- --category snacks
```

---

## ✅ Requisitos Funcionales

1. Leer `data/products.json` con `fs/promises`
2. Mostrar resumen: total, activos, precio promedio, más caro/barato
3. Filtrar por categoría con `--category`
4. Guardar reporte en `output/report.json`
5. Manejo de errores: archivo no encontrado, categoría inexistente

---

## 📊 Criterios de Evaluación

| Criterio | Peso |
|----------|------|
| Lee y parsea `products.json` correctamente | 20% |
| Calcula el resumen (total, promedio, extremos) | 20% |
| Filtra por categoría con `--category` | 20% |
| Escribe `output/report.json` correctamente | 20% |
| Manejo de errores | 10% |
| TypeScript estricto — `pnpm build` sin errores | 10% |
