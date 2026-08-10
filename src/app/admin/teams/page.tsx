import { requireAdminAuth } from '@/lib/security';
import { prisma } from '@/lib/db';
import { adjustTeamPoints } from '../actions';
import { getAuthoritativePoints } from '@/services/ledger.service';
import styles from './page.module.css';

export default async function AdminTeamsPage() {
  await requireAdminAuth();

  const teams = await prisma.team.findMany({
    include: {
      cluster: true,
    },
    orderBy: {
      name: 'asc'
    }
  });

  // Fetch points for all teams
  const teamsWithPoints = await Promise.all(
    teams.map(async (team) => {
      const points = await getAuthoritativePoints(team.id);
      return { ...team, points };
    })
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Entity Ledgers</h1>
        <p className={styles.subtitle}>Direct database access to all team records and points.</p>
      </header>

      <div className={styles.tableContainer}>
        <table className={styles.teamsTable}>
          <thead>
            <tr>
              <th>Team Name</th>
              <th>Cluster</th>
              <th>Current Points</th>
              <th>Manual Adjustment</th>
            </tr>
          </thead>
          <tbody>
            {teamsWithPoints.map((team) => (
              <tr key={team.id}>
                <td>
                  <div className={styles.teamName}>{team.name}</div>
                  <div className={styles.teamId}>{team.id}</div>
                </td>
                <td>{team.cluster.name}</td>
                <td className={styles.pointsCell}>{team.points}</td>
                <td>
                  <form className={styles.adjustmentForm} action={async (formData) => {
                    'use server';
                    const delta = parseInt(formData.get('delta') as string, 10);
                    const reason = formData.get('reason') as string;
                    if (!isNaN(delta)) {
                      await adjustTeamPoints(team.id, delta, reason);
                    }
                  }}>
                    <input 
                      type="number" 
                      name="delta" 
                      placeholder="e.g. 10 or -5" 
                      required 
                      className={styles.numInput} 
                    />
                    <input 
                      type="text" 
                      name="reason" 
                      placeholder="Reason (Audit Log)" 
                      required 
                      className={styles.textInput} 
                    />
                    <button type="submit" className={styles.adjustBtn}>Apply</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
