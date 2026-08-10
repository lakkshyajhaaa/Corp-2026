import { getServerSession } from 'next-auth';
import { authOptions } from './auth';

export class AuthorizationError extends Error {
  constructor(message = 'Unauthorized') {
    super(message);
    this.name = 'AuthorizationError';
  }
}

/**
 * Ensures the request is coming from an authenticated user.
 * Returns the session user if valid, otherwise throws an AuthorizationError.
 */
export async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    throw new AuthorizationError('Authentication required');
  }
  return session.user;
}

/**
 * Ensures the request is coming from a user who belongs to a team.
 * Throws if the user has no teamId.
 */
export async function requireTeamAuth() {
  const user = await requireAuth();
  if (!user.teamId) {
    throw new AuthorizationError('You do not belong to a team');
  }
  return { user, teamId: user.teamId };
}

/**
 * Ensures the request is coming from an admin.
 */
export async function requireAdminAuth() {
  const user = await requireAuth();
  if (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN') {
    throw new AuthorizationError('Admin privileges required');
  }
  return user;
}
