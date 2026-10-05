import { requireAdminAuth } from '@/lib/security';
import { prisma } from '@/lib/db';
import { adjustTeamPoints, updateTeamStatus } from '../actions';
import { getAuthoritativePoints } from '@/services/ledger.service';
import styles from './page.module.css';

export default async function AdminTeamsPage() {
  await requireAdminAuth();

  let teamsWithPoints: Array<{ id: string; name: string; status: string; cluster: { name: string }; points: number }> = [];

  try {
    const teams = await prisma.team.findMany({
      include: {
        cluster: true,
      },
      orderBy: {
        name: 'asc'
      }
    });

    teamsWithPoints = await Promise.all(
      teams.map(async (team) => {
        const points = await getAuthoritativePoints(team.id);
        return { ...team, points };
      })
    );
  } catch (error) {
    console.warn('Database connection error in AdminTeamsPage:', error);
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Company & Entity Ledgers</h1>
        <p className={styles.subtitle}>Direct database access to manage, approve, or reject companies and teams.</p>
      </header>

      <div className={styles.tableContainer}>
        <table className={styles.teamsTable}>
          <thead>
            <tr>
              <th>Company / Team Name</th>
              <th>Cluster</th>
              <th>Status</th>
              <th>Approval Actions</th>
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
                <td>
                  <span className={`${styles.statusBadge} ${styles[team.status.toLowerCase()]}`}>
                    {team.status}
                  </span>
                </td>
                <td>
                  <div className={styles.actionGroup}>
                    {team.status !== 'APPROVED' && (
                      <form action={async () => {
                        'use server';
                        await updateTeamStatus(team.id, 'APPROVED');
                      }}>
                        <button type="submit" className={`${styles.actionBtn} ${styles.approveBtn}`}>
                          Approve
                        </button>
                      </form>
                    )}
                    {team.status !== 'REJECTED' && (
                      <form action={async () => {
                        'use server';
                        await updateTeamStatus(team.id, 'REJECTED');
                      }}>
                        <button type="submit" className={`${styles.actionBtn} ${styles.rejectBtn}`}>
                          Reject
                        </button>
                      </form>
                    )}
                  </div>
                </td>
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
