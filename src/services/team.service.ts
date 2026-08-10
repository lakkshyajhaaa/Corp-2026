import { prisma } from '@/lib/db';
import { getAuthoritativePoints, getAuthoritativeFinances } from './ledger.service';

/**
 * Safely fetches a team's profile along with their authoritative points and finances.
 */
export async function getSafeTeamProfile(teamId: string) {
  const team = await prisma.team.findUnique({
    where: { id: teamId },
    include: {
      cluster: true,
      members: {
        include: { user: { select: { email: true } } }
      }
    }
  });

  if (!team) return null;

  const points = await getAuthoritativePoints(teamId);
  const finances = await getAuthoritativeFinances(teamId);

  return {
    id: team.id,
    name: team.name,
    cluster: {
      id: team.cluster.id,
      name: team.cluster.name,
    },
    members: team.members.map(m => ({
      id: m.id,
      role: m.role,
      email: m.user.email,
    })),
    points,
    finances,
  };
}

/**
 * Safely fetches cluster information. Only reveals publicly allowed team information.
 * It prevents a team from seeing other teams' private financial or point data unless rules allow.
 */
export async function getSafeClusterDetails(clusterId: string, requestorTeamId: string) {
  const cluster = await prisma.cluster.findUnique({
    where: { id: clusterId },
    include: {
      teams: {
        select: {
          id: true,
          name: true,
          // Explicitly NOT selecting private data like ledgers, submissions, etc.
        }
      }
    }
  });

  if (!cluster) return null;

  // We check if requestor is part of this cluster. If not, they might be blocked entirely,
  // depending on competition rules. Assuming they are allowed to see their own cluster:
  const isMemberOfCluster = cluster.teams.some(t => t.id === requestorTeamId);
  if (!isMemberOfCluster) {
    throw new Error('Unauthorized cluster access');
  }

  // Fetch pending relationships (mergers, acquisitions) related to this cluster
  const relationships = await prisma.teamRelationship.findMany({
    where: {
      OR: [
        { sourceTeamId: { in: cluster.teams.map(t => t.id) } },
        { targetTeamId: { in: cluster.teams.map(t => t.id) } },
      ],
      status: 'PENDING'
    },
    include: {
      sourceTeam: { select: { id: true, name: true } },
      targetTeam: { select: { id: true, name: true } }
    }
  });

  return {
    id: cluster.id,
    name: cluster.name,
    teams: cluster.teams,
    activeRelationships: relationships,
  };
}
