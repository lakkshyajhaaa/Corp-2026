import { prisma } from '@/lib/db';

export type RoundStatus = 'LOCKED' | 'OPEN' | 'CLOSED';

/**
 * Retrieves the competition state and standardizes it.
 */
export async function getCompetitionState() {
  const state = await prisma.competitionState.findFirst();
  return state?.currentState || 'NOT_STARTED';
}

/**
 * Determines if a team is authorized to access a specific round.
 * Validates against both the global round status and any specific RoundAccess exceptions.
 */
export async function isRoundAccessible(teamId: string, roundNumber: number): Promise<boolean> {
  const round = await prisma.round.findUnique({
    where: { number: roundNumber },
  });

  if (!round) return false;

  // Check for explicit team exception (e.g., admin reopened for this team)
  const exception = await prisma.roundAccess.findFirst({
    where: { teamId, roundId: round.id },
  });

  if (exception) {
    return exception.status === 'GRANTED';
  }

  // Fallback to global round status
  return round.status === 'OPEN';
}

/**
 * Safely fetches round details ONLY if the team is authorized.
 * If unauthorized, returns a locked representation to prevent data leakage.
 */
export async function getSafeRoundDetails(teamId: string, roundNumber: number) {
  const round = await prisma.round.findUnique({
    where: { number: roundNumber },
  });

  if (!round) {
    return null; // Round doesn't exist yet
  }

  const isAccessible = await isRoundAccessible(teamId, roundNumber);

  if (!isAccessible) {
    // SECURITY BOUNDARY: Do NOT return actual round data
    return {
      id: round.id,
      number: round.number,
      name: `Round 0${round.number}`,
      status: 'LOCKED',
      // No instructions, no content, no case materials
    };
  }

  // Authorized: return full data
  return round;
}

/**
 * Fetches all rounds with safe visibility masking for a team.
 */
export async function getSafeAllRounds(teamId: string) {
  const rounds = await prisma.round.findMany({
    orderBy: { number: 'asc' },
  });

  return Promise.all(
    rounds.map(async (round) => {
      const isAccessible = await isRoundAccessible(teamId, round.number);
      if (!isAccessible) {
        return {
          id: round.id,
          number: round.number,
          name: `Round 0${round.number}`,
          status: 'LOCKED',
        };
      }
      return round;
    })
  );
}
