import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import styles from './layout.module.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-ui' });
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'Prizmora 2026 | The Odyssey',
  description: 'Three days. Three voyages. One destination. Prizmora — a celebration of strategy, innovation and teamwork.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body>
        <div className={styles.appContainer}>
          <Header />
          <main className={styles.mainContent}>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
