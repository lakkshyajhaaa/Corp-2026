'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './page.module.css';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError('Invalid credentials. Please verify your access details.');
        setIsLoading(false);
      } else {
        let destination = searchParams.get('from');
        if (!destination || destination === '/team') {
          destination = email.toLowerCase() === 'test@test.com' ? '/_sys_admin_7789' : '/team';
        }
        router.push(destination);
        router.refresh();
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <div className={styles.header}>
          <div className={styles.brand}>CORPEUREKA</div>
          <h1 className={styles.title}>Secure Access</h1>
          <p className={styles.subtitle}>Enter your credentials to access the competition platform.</p>
        </div>

        {error && (
          <div className={styles.errorAlert}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Team Identity (Email)</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
              autoComplete="email"
              disabled={isLoading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Access Key (Password)</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
              autoComplete="current-password"
              disabled={isLoading}
            />
          </div>

          <button 
            type="submit" 
            className={`btn-primary ${styles.submitBtn}`}
            disabled={isLoading}
          >
            {isLoading ? 'AUTHENTICATING...' : 'ACCESS PORTAL'}
          </button>
        </form>

        <div className={styles.footer}>
          <p>This system is monitored. Unauthorized access is strictly prohibited.</p>
        </div>
      </div>
    </div>
  );
}
