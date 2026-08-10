'use client';

import { useState } from 'react';
import { submitRoundOne } from '../actions';
import styles from './rounds.module.css';

export default function RoundOneContent({ roundId }: { roundId: string }) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      await submitRoundOne(content);
      setMessage('Analysis submitted successfully. Recorded in immutable log.');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage('Submission failed.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.intro}>
        <p>Analyze the Innoventia startup pitches. Submit your detailed strategic evaluation below. This submission is immutable.</p>
      </div>

      <div className={styles.contentBlock}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="analysis" className={styles.label}>
            Strategic Analysis Report
          </label>
          <textarea
            id="analysis"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={styles.textarea}
            placeholder="ENTER ANALYSIS HERE..."
            disabled={isSubmitting}
            required
          />
          <button 
            type="submit" 
            disabled={isSubmitting || !content.trim()}
            className={`btn-primary ${styles.submitBtn}`}
          >
            {isSubmitting ? 'PROCESSING...' : 'SUBMIT REPORT'}
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
