'use client';

import { useEffect } from 'react';

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Admin Error Boundary Caught:', error);
  }, [error]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '400px',
      backgroundColor: 'var(--color-bg-secondary)',
      border: '1px dashed #dc2626',
      borderRadius: 'var(--radius-sm)',
      padding: '2rem',
      textAlign: 'center',
      marginTop: '2rem'
    }}>
      <h2 style={{ color: '#dc2626', marginBottom: '1rem' }}>SYSTEM FAULT</h2>
      <p style={{ color: 'var(--color-text-primary)', marginBottom: '2rem' }}>
        {error.message || 'An unhandled exception occurred in the control center.'}
      </p>
      <button
        onClick={() => reset()}
        style={{
          backgroundColor: 'rgba(220, 38, 38, 0.1)',
          color: '#dc2626',
          border: '1px solid rgba(220, 38, 38, 0.3)',
          padding: '0.75rem 1.5rem',
          borderRadius: 'var(--radius-sm)',
          cursor: 'pointer'
        }}
      >
        Force Refresh
      </button>
    </div>
  );
}
