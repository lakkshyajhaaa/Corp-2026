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

  revalidatePath('/_sys_admin_7789/rounds');
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

  revalidatePath('/_sys_admin_7789');
  revalidatePath(`/team`); // Will revalidate for the team when they next load
}

/**
 * Updates a company/team status (APPROVED, REJECTED, PENDING).
 */
export async function updateTeamStatus(teamId: string, status: 'APPROVED' | 'REJECTED' | 'PENDING') {
  const admin = await requireAdminAuth();

  await prisma.$transaction(async (tx) => {
    await tx.team.update({
      where: { id: teamId },
      data: { status },
    });

    await tx.auditLog.create({
      data: {
        userId: admin.id,
        action: 'UPDATE_TEAM_STATUS',
        resource: 'Team',
        payload: JSON.stringify({ teamId, status }),
      },
    });
  });

  revalidatePath('/_sys_admin_7789');
  revalidatePath('/_sys_admin_7789/teams');
}

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Revokes a student's event registration pass by removing it from the database
 * and sending them an email notification.
 */
export async function togglePassStatus(id: string, currentStatus: string) {
  const admin = await requireAdminAuth();

  try {
    const registration = await prisma.eventRegistration.findUnique({ where: { id } });
    if (!registration) throw new Error('Registration not found');

    await prisma.$transaction(async (tx) => {
      await tx.eventRegistration.delete({
        where: { id },
      });

      if (admin.id !== 'admin-env-user') {
        await tx.auditLog.create({
          data: {
            userId: admin.id,
            action: 'REVOKE_PASS_AND_DELETE',
            resource: 'EventRegistration',
            payload: JSON.stringify({ id, email: registration.email }),
          },
        });
      }
    });

    if (process.env.RESEND_API_KEY) {
      const contactFooter = `
        <hr style="margin-top: 30px; border: none; border-top: 1px solid #eee;" />
        <p style="color: #666; font-size: 14px;">
          <strong>Questions? Contact Us:</strong><br />
          Email: gkalra_be25@thapar.edu<br />
          Phone: +91-9671454725
        </p>
      `;

      await resend.emails.send({
        from: 'Prizmora <updates@gandmarao.saasforlife.co.in>', 
        to: [registration.email],
        subject: 'Event Registration Revoked',
        html: `<p>Hi ${registration.name},</p><p>We regret to inform you that your event pass has been revoked and your registration has been cancelled.</p>${contactFooter}`,
      });
    }

    revalidatePath('/_sys_admin_7789');
    return { success: true };
  } catch (error) {
    console.error('Error revoking pass:', error);
    return { success: false, error: 'Failed to revoke pass.' };
  }
}
