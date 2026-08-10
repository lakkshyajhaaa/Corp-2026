'use server';

import { requireTeamAuth } from '@/lib/security';
import { isRoundAccessible } from '@/services/round.service';
import { prisma } from '@/lib/db';
import { getAuthoritativePoints } from '@/services/ledger.service';
import { revalidatePath } from 'next/cache';

/**
 * Submits text-based content for Round 1 (The Case).
 */
export async function submitRoundOne(content: string) {
  const { teamId, user } = await requireTeamAuth();
  const isAccessible = await isRoundAccessible(teamId, 1);

  if (!isAccessible) {
    throw new Error('Unauthorized: Round 1 is not accessible.');
  }

  const round = await prisma.round.findUnique({ where: { number: 1 } });
  if (!round) throw new Error('Round 1 not initialized');

  await prisma.$transaction(async (tx) => {
    // Upsert submission
    const existing = await tx.submission.findFirst({
      where: { teamId, roundId: round.id },
    });

    if (existing) {
      await tx.submission.update({
        where: { id: existing.id },
        data: { content, timestamp: new Date() },
      });
    } else {
      await tx.submission.create({
        data: { teamId, roundId: round.id, content },
      });
    }

    // Audit log
    await tx.auditLog.create({
      data: {
        userId: user.id,
        action: 'SUBMIT_ROUND_1',
        resource: 'Submission',
        payload: JSON.stringify({ roundId: round.id }),
      },
    });
  });

  revalidatePath('/team/rounds/1');
  return { success: true };
}

/**
 * Processes the high-stakes crisis wager for Round 3.
 * Enforces strict transactional isolation and idempotency.
 */
export async function submitCrisisWager(amount: number, idempotencyKey: string) {
  const { teamId, user } = await requireTeamAuth();
  
  // 1. Ensure amount is valid
  if (amount <= 0 || !Number.isInteger(amount)) {
    throw new Error('Wager must be a positive integer.');
  }

  // 2. Ensure Round 3 is accessible
  const isAccessible = await isRoundAccessible(teamId, 3);
  if (!isAccessible) {
    throw new Error('Unauthorized: Round 3 is not accessible.');
  }

  const round = await prisma.round.findUnique({ where: { number: 3 } });
  if (!round) throw new Error('Round 3 not initialized');

  // 3. Process Transaction
  await prisma.$transaction(async (tx) => {
    // Check idempotency (prevent double submissions from network retries)
    const existingWager = await tx.wager.findUnique({
      where: { idempotencyKey },
    });

    if (existingWager) return; // Already processed

    // Ensure team hasn't already wagered
    const previousWager = await tx.wager.findFirst({
      where: { teamId, roundId: round.id },
    });

    if (previousWager) {
      throw new Error('Wager has already been placed and is immutable.');
    }

    // Fetch authoritative points securely inside the transaction
    const latestLedger = await tx.pointLedger.findFirst({
      where: { teamId },
      orderBy: { createdAt: 'desc' },
    });
    
    const currentPoints = latestLedger?.balanceAfter ?? 0;

    if (amount > currentPoints) {
      throw new Error('Wager exceeds available points.');
    }

    // Create the wager
    const wager = await tx.wager.create({
      data: {
        teamId,
        roundId: round.id,
        amount,
        status: 'PENDING',
        idempotencyKey,
      },
    });

    // Write to the immutable point ledger (deducting the wager amount)
    const newBalance = currentPoints - amount;
    await tx.pointLedger.create({
      data: {
        teamId,
        delta: -amount,
        balanceAfter: newBalance,
        reason: 'Round 3 Crisis Wager Placed',
        referenceType: 'WAGER',
        referenceId: wager.id,
      },
    });

    // Audit Log
    await tx.auditLog.create({
      data: {
        userId: user.id,
        action: 'PLACE_WAGER',
        resource: 'Wager',
        payload: JSON.stringify({ wagerId: wager.id, amount, previousBalance: currentPoints }),
      },
    });
  });

  revalidatePath('/team/rounds/3');
  return { success: true };
}
