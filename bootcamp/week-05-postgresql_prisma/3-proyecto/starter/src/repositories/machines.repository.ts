// ============================================
// REPOSITORY — Máquinas Expendedoras
// Dominio: Empresa de Vending Machines
// ============================================

import { Prisma, VendingMachine } from '@prisma/client';
import { prisma } from '../config/prisma';

interface FindAllOptions {
  status?: string;
  page: number;
  limit: number;
}

export const machinesRepository = {
  async findAll({ status, page, limit }: FindAllOptions): Promise<{ data: VendingMachine[]; total: number }> {
    const where: Prisma.VendingMachineWhereInput = status ? { status: status as Prisma.VendingMachineWhereInput['status'] } : {};

    const [data, total] = await Promise.all([
      prisma.vendingMachine.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.vendingMachine.count({ where }),
    ]);

    return { data, total };
  },

  async findById(id: string): Promise<VendingMachine | null> {
    return prisma.vendingMachine.findUnique({ where: { id } });
  },

  async findByCode(code: string): Promise<VendingMachine | null> {
    return prisma.vendingMachine.findUnique({ where: { code } });
  },

  async create(input: Prisma.VendingMachineCreateInput): Promise<VendingMachine> {
    return prisma.vendingMachine.create({ data: input });
  },

  async update(id: string, input: Prisma.VendingMachineUpdateInput): Promise<VendingMachine> {
    return prisma.vendingMachine.update({ where: { id }, data: input });
  },

  async delete(id: string): Promise<void> {
    await prisma.vendingMachine.delete({ where: { id } });
  },
};
