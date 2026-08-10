import { requireTeamAuth } from '@/lib/security';
import { getSafeRoundDetails } from '@/services/round.service';
import { notFound, redirect } from 'next/navigation';
import styles from './page.module.css';

// Import round-specific components (We will create these next)
import RoundOneContent from './components/RoundOneContent';
import RoundTwoContent from './components/RoundTwoContent';
import RoundThreeContent from './components/RoundThreeContent';
import RoundFourContent from './components/RoundFourContent';

export default async function RoundPage({ params }: { params: { id: string } }) {
  const { teamId } = await requireTeamAuth();
  const roundNumber = parseInt(params.id, 10);

  if (isNaN(roundNumber) || roundNumber < 1 || roundNumber > 4) {
    notFound();
  }

  const roundDetails = await getSafeRoundDetails(teamId, roundNumber);

  if (!roundDetails) {
    notFound(); // Round not initialized in DB yet
  }

  // SECURITY: Check the status returned by our secure service
  if (roundDetails.status === 'LOCKED') {
    return (
      <div className={styles.lockedContainer}>
        <div className={styles.lockIcon}>◬</div>
        <h1>Stage Secured</h1>
        <p>You do not have clearance to access this stage yet.</p>
      </div>
    );
  }

  // If accessible, render the correct component
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.eyebrow}>Stage 0{roundNumber}</div>
        <h1 className={styles.title}>{roundDetails.name}</h1>
      </header>

      <div className={styles.content}>
        {roundNumber === 1 && <RoundOneContent roundId={roundDetails.id} />}
        {roundNumber === 2 && <RoundTwoContent roundId={roundDetails.id} />}
        {roundNumber === 3 && <RoundThreeContent roundId={roundDetails.id} />}
        {roundNumber === 4 && <RoundFourContent roundId={roundDetails.id} />}
      </div>
    </div>
  );
}
