'use server';

import { requireAdminAuth } from '@/lib/security';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

/**
 * Toggles a round's global status.
 */
export async function toggleRoundStatus(roundId: string, newStatus: 'OPEN' | 'LOCKED' | 'CLOSED') {
  const admin = await requireAdminAuth();

  await prisma.$transaction(async (tx) => {
    const round = await tx.round.update({
      where: { id: roundId },
      data: { status: newStatus },
    });

    // If opening a round, update the global competition state
    if (newStatus === 'OPEN') {
      const state = await tx.competitionState.findFirst();
      if (state) {
        await tx.competitionState.update({
          where: { id: state.id },
          data: { currentState: `ROUND_${round.number}_ACTIVE` },
        });
      } else {
        await tx.competitionState.create({
          data: { currentState: `ROUND_${round.number}_ACTIVE` },
        });
      }
    }

    await tx.auditLog.create({
      data: {
        userId: admin.id,
        action: 'UPDATE_ROUND_STATUS',
        resource: 'Round',
        payload: JSON.stringify({ roundId, newStatus }),
      },
    });
  });

  revalidatePath('/admin/rounds');
  revalidatePath('/team/journey'); // Revalidate for teams
}

/**
 * Manually adjusts a team's points (e.g., penalties, manual bonuses).
 */
export async function adjustTeamPoints(teamId: string, delta: number, reason: string) {
  const admin = await requireAdminAuth();

  if (!reason || reason.trim().length === 0) {
    throw new Error('A valid reason is required for manual ledger adjustments.');
  }

  await prisma.$transaction(async (tx) => {
    const latestLedger = await tx.pointLedger.findFirst({
      where: { teamId },
      orderBy: { createdAt: 'desc' },
    });
    
    const currentPoints = latestLedger?.balanceAfter ?? 0;
    const newBalance = currentPoints + delta;

    await tx.pointLedger.create({
      data: {
        teamId,
        delta,
        balanceAfter: newBalance,
        reason: `ADMIN OVERRIDE: ${reason}`,
        referenceType: 'MANUAL',
      },
    });

    await tx.auditLog.create({
      data: {
        userId: admin.id,
        action: 'MANUAL_POINT_ADJUSTMENT',
        resource: 'PointLedger',
        payload: JSON.stringify({ teamId, delta, reason }),
      },
    });
  });

  revalidatePath('/admin');
  revalidatePath(`/team`); // Will revalidate for the team when they next load
}
