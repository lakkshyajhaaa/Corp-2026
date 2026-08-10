'use client';

import { useEffect } from 'react';

export default function TeamError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In a real production app, log this to an error tracking service
    console.error('Team Error Boundary Caught:', error);
  }, [error]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '400px',
      backgroundColor: 'var(--color-bg-secondary)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-sm)',
      padding: '2rem',
      textAlign: 'center',
      marginTop: '2rem'
    }}>
      <h2 style={{ color: 'var(--color-accent-gold)', marginBottom: '1rem' }}>Access Violation</h2>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        {error.message || 'The server rejected this request or encountered an unexpected failure.'}
      </p>
      <button
        onClick={() => reset()}
        style={{
          backgroundColor: 'transparent',
          color: 'var(--color-text-primary)',
          border: '1px solid var(--color-border)',
          padding: '0.75rem 1.5rem',
          borderRadius: 'var(--radius-sm)',
          cursor: 'pointer'
        }}
      >
        Attempt Reconnection
      </button>
    </div>
  );
}
