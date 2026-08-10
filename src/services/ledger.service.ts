import { prisma } from '@/lib/db';

/**
 * Calculates the authoritative current points for a team.
 * This reads the most recent balanceAfter from the PointLedger.
 */
export async function getAuthoritativePoints(teamId: string): Promise<number> {
  const latestLedgerEntry = await prisma.pointLedger.findFirst({
    where: { teamId },
    orderBy: { createdAt: 'desc' },
  });

  return latestLedgerEntry?.balanceAfter ?? 0;
}

/**
 * Calculates the authoritative current finances for a team.
 * This reads the most recent balanceAfter from the FinancialLedger.
 */
export async function getAuthoritativeFinances(teamId: string): Promise<number> {
  const latestLedgerEntry = await prisma.financialLedger.findFirst({
    where: { teamId },
    orderBy: { createdAt: 'desc' },
  });

  return latestLedgerEntry?.balanceAfter ?? 0;
}

/**
 * Retrieves the full point history for a team.
 */
export async function getPointHistory(teamId: string) {
  return prisma.pointLedger.findMany({
    where: { teamId },
    orderBy: { createdAt: 'asc' },
  });
}

/**
 * Retrieves the full financial history for a team.
 */
export async function getFinancialHistory(teamId: string) {
  return prisma.financialLedger.findMany({
    where: { teamId },
    orderBy: { createdAt: 'asc' },
  });
}
