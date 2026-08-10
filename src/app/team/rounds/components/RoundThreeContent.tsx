'use client';

import { useState } from 'react';
import { submitCrisisWager } from '../actions';
import styles from './rounds.module.css';

export default function RoundThreeContent({ roundId }: { roundId: string }) {
  const [wagerAmount, setWagerAmount] = useState<number | ''>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (wagerAmount === '' || wagerAmount <= 0) {
      setMessage('Wager must be greater than zero.');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    // Generate a unique idempotency key for this exact transaction attempt
    const idempotencyKey = crypto.randomUUID();

    try {
      await submitCrisisWager(Number(wagerAmount), idempotencyKey);
      setMessage('WAGER LOCKED. Result pending administrator evaluation.');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage('Wager submission failed.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.alertBox}>
        WARNING: BLACK SWAN EVENT DETECTED. MARKET VOLATILITY AT MAXIMUM.
      </div>

      <div className={styles.wagerDashboard}>
        <div className={styles.marketTicker}>
          <h3>MARKET SHOCK INDEX</h3>
          <p>-42.8%</p>
        </div>
        <div className={styles.marketTicker}>
          <h3>RISK MULTIPLIER</h3>
          <p>3.5x</p>
        </div>
      </div>

      <div className={styles.contentBlock}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="wager" className={styles.label}>
            INPUT CAPITAL WAGER (MAX: 100)
          </label>
          <input
            type="number"
            id="wager"
            value={wagerAmount}
            onChange={(e) => setWagerAmount(e.target.value === '' ? '' : parseInt(e.target.value))}
            className={styles.wagerInput}
            min="0"
            max="100"
            disabled={isSubmitting}
            required
          />
          <button 
            type="submit" 
            disabled={isSubmitting || !wagerAmount}
            className={`btn-primary ${styles.submitBtn}`}
          >
            {isSubmitting ? 'PROCESSING WAGER...' : 'EXECUTE WAGER'}
          </button>
        </form>

        {message && (
          <div className={styles.messageBox}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
