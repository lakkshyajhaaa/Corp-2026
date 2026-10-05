'use client';

import { useState } from 'react';
import { togglePassStatus } from './actions';
import styles from './page.module.css'; // Reusing admin page styles

type Registration = {
  id: string;
  name: string;
  email: string;
  rollNo: string;
  phone: string;
  gender: string;
  events: string;
  teamDetails?: string | null;
  status: string;
  createdAt: Date;
};

export default function RegistrationsTable({ registrations }: { registrations: Registration[] }) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [eventFilter, setEventFilter] = useState<string>('ALL');

  const handleToggle = async (id: string, currentStatus: string) => {
    setLoadingId(id);
    await togglePassStatus(id, currentStatus);
    setLoadingId(null);
  };

  const filteredRegistrations = registrations.filter(reg => {
    if (eventFilter === 'ALL') return true;
    try {
      const events = JSON.parse(reg.events || '[]');
      return events.includes(eventFilter);
    } catch {
      return false;
    }
  });

  return (
    <section className={styles.auditSection} style={{ marginTop: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 className={styles.sectionTitle} style={{ margin: 0 }}>Event Registrations</h2>
        <select 
          value={eventFilter} 
          onChange={(e) => setEventFilter(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '4px', backgroundColor: '#F3F8FF', color: '#0B1F4B', border: '1px solid #93B4EA' }}
        >
          <option value="ALL">All Events</option>
          <option value="hr_conclave">HR-Conclave</option>
          <option value="innoventia">Innoventia</option>
          <option value="corpeureka">CorpEureka</option>
        </select>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table className={styles.auditTable}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Email</th>
              <th>Roll No</th>
              <th>Events</th>
              <th>Team Size</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRegistrations.map(reg => {
              const eventList = JSON.parse(reg.events || '[]');
              const isRevoked = reg.status === 'REVOKED';
              
              let teamSize = 1;
              if (reg.teamDetails) {
                try {
                  const td = JSON.parse(reg.teamDetails);
                  if (td.mates) teamSize += td.mates.length;
                } catch {}
              }

              return (
                <tr key={reg.id} style={{ opacity: isRevoked ? 0.6 : 1 }}>
                  <td suppressHydrationWarning>{new Date(reg.createdAt).toLocaleDateString()}</td>
                  <td>{reg.name}</td>
                  <td>{reg.email}</td>
                  <td>{reg.rollNo}</td>
                  <td>{eventList.join(', ')}</td>
                  <td>{eventList.includes('corpeureka') ? teamSize : '-'}</td>
                  <td>
                    <span style={{ 
                      padding: '0.25rem 0.5rem', 
                      backgroundColor: isRevoked ? 'rgba(217,37,37,0.2)' : 'rgba(50,205,50,0.2)',
                      color: isRevoked ? '#d92525' : 'limegreen',
                      borderRadius: '4px',
                      fontWeight: 'bold',
                      fontSize: '0.8rem'
                    }}>
                      {reg.status}
                    </span>
                  </td>
                  <td>
                    <button 
                      onClick={() => {
                        if(confirm('Are you sure you want to revoke this pass? This will delete their registration.')) {
                          handleToggle(reg.id, reg.status);
                        }
                      }}
                      disabled={loadingId === reg.id}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#d92525',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: loadingId === reg.id ? 'wait' : 'pointer',
                        fontWeight: 'bold'
                      }}
                    >
                      {loadingId === reg.id ? '...' : 'Revoke Pass (Delete)'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filteredRegistrations.length === 0 && (
          <p className={styles.emptyState}>No event registrations match this filter.</p>
        )}
      </div>
    </section>
  );
}
