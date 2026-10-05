'use client';

import { useState } from 'react';
import PageHero from '@/components/PageHero';
import { Icon } from '@/components/icons';
import styles from '@/components/forms.module.css';


const EVENTS = [
  { id: 'innoventia', title: 'INNOVENTIA', icon: <Icon.Bulb />, desc: 'A bustling marketplace of ideas, startups, and uncharted territories. Present your innovative concepts and compete for seed funding and mentorship.' },
  { id: 'hr_conclave', title: 'HR CONCLAVE', icon: <Icon.People />, desc: 'Elite human capital management guiding the way. Participate in intricate case studies, panel discussions, and advanced HR strategy simulations.' },
  { id: 'corpeureka', title: 'CORPEUREKA', icon: <Icon.Bolt />, desc: 'The climax. An intense overnight strategic simulation. Navigate complex business scenarios under pressure and emerge as the ultimate corporate strategist.' }
];

import { submitRegistration } from '@/app/actions/register';

export default function RegisterPage() {
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rollNo: '',
    phone: '',
    gender: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [teamName, setTeamName] = useState('');
  const [teamMates, setTeamMates] = useState<{ name: string; email: string; phone: string }[]>([]);

  const addTeammate = () => {
    if (teamMates.length < 3) {
      setTeamMates([...teamMates, { name: '', email: '', phone: '' }]);
    }
  };

  const removeTeammate = (index: number) => {
    setTeamMates(teamMates.filter((_, i) => i !== index));
  };

  const handleTeammateChange = (index: number, field: keyof typeof teamMates[0], value: string) => {
    const newMates = [...teamMates];
    newMates[index][field] = value;
    setTeamMates(newMates);
  };

  const toggleEvent = (id: string) => {
    setSelectedEvents(prev => 
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    if (selectedEvents.length === 0) {
      setErrorMsg('Please select at least one event.');
      setIsSubmitting(false);
      return;
    }

    if (selectedEvents.includes('corpeureka') && !teamName.trim()) {
      setErrorMsg('Team Name is required for CorpEureka.');
      setIsSubmitting(false);
      return;
    }

    const payload: Parameters<typeof submitRegistration>[0] = {
      ...formData,
      events: selectedEvents
    };

    if (selectedEvents.includes('corpeureka')) {
      payload.teamDetails = JSON.stringify({
        teamName,
        mates: teamMates
      });
    }

    const result = await submitRegistration(payload);

    if (result.success) {
      setSuccessMsg('Registration successful! We will contact you soon.');
      setFormData({ name: '', email: '', rollNo: '', phone: '', gender: '' });
      setSelectedEvents([]);
      setTeamName('');
      setTeamMates([]);
    } else {
      setErrorMsg(result.error || 'Registration failed.');
    }
    
    setIsSubmitting(false);
  };

  const field = (label: string, input: React.ReactNode) => (
    <div className="o-field"><label className="o-label">{label}</label>{input}</div>
  );

  return (
    <>
      <PageHero eyebrow="Join the crew" title="REGISTER" lead="Pick your voyages, tell us who you are, and we will hold your seat." compact />
      <div className="o-container">
        <div className={styles.wrap}>
          <form onSubmit={handleSubmit} className={styles.panel}>

            <div className={styles.section}>
              <div className={styles.step}><span className={styles.stepN}>1</span><h3>Choose your voyages</h3></div>
              <div className={styles.events}>
                {EVENTS.map((event) => {
                  const on = selectedEvents.includes(event.id);
                  return (
                    <button type="button" key={event.id} onClick={() => toggleEvent(event.id)} aria-pressed={on} className={`${styles.event} ${on ? styles.on : ''}`}>
                      <span className={styles.tick}><Icon.Check /></span>
                      <span className={styles.eIcon}>{event.icon}</span>
                      <h4>{event.title}</h4>
                      <p>{event.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.step}><span className={styles.stepN}>2</span><h3>Your details</h3></div>
              <div className={styles.fields}>
                {field('Full name', <input className="o-input" type="text" name="name" required value={formData.name} onChange={handleInputChange} />)}
                {field('Email ID', <input className="o-input" type="email" name="email" required value={formData.email} onChange={handleInputChange} />)}
                {field('Roll no', <input className="o-input" type="text" name="rollNo" required value={formData.rollNo} onChange={handleInputChange} />)}
                {field('Phone number', <input className="o-input" type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} />)}
                {field('Gender', (
                  <select className="o-input" name="gender" required value={formData.gender} onChange={handleInputChange}>
                    <option value="" disabled>Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                ))}
              </div>
            </div>

            {selectedEvents.includes('corpeureka') && (
              <div className={styles.section}>
                <div className={styles.step}><span className={styles.stepN}>3</span><h3>Your CorpEureka crew</h3></div>
                <div className={styles.team}>
                  <p className={styles.note}>
                    CorpEureka is a team event and you are registering as Team Leader. You can add up to 3 teammates (max team size is 4).
                    If you register with fewer than 4 members, you will be matched with random teammates on the spot.
                  </p>
                  <div style={{ maxWidth: 420 }}>
                    {field('Team name', <input className="o-input" type="text" required value={teamName} onChange={(e) => setTeamName(e.target.value)} />)}
                  </div>

                  {teamMates.map((mate, index) => (
                    <div key={index} className={styles.mate}>
                      <button type="button" className={styles.remove} onClick={() => removeTeammate(index)}>Remove</button>
                      <h4>Teammate {index + 1}</h4>
                      <div className={styles.fields}>
                        <input className="o-input" type="text" placeholder="Full name" required value={mate.name} onChange={e => handleTeammateChange(index, 'name', e.target.value)} />
                        <input className="o-input" type="email" placeholder="Email" required value={mate.email} onChange={e => handleTeammateChange(index, 'email', e.target.value)} />
                        <input className="o-input" type="tel" placeholder="Phone" required value={mate.phone} onChange={e => handleTeammateChange(index, 'phone', e.target.value)} />
                      </div>
                    </div>
                  ))}

                  {teamMates.length < 3 && (
                    <button type="button" onClick={addTeammate} className="o-btn o-btn--ghost" style={{ marginTop: '1.4rem' }}>
                      <Icon.Plus /> Add teammate
                    </button>
                  )}
                </div>
              </div>
            )}

            {errorMsg && <div className={`${styles.msg} ${styles.err}`}>{errorMsg}</div>}
            {successMsg && <div className={`${styles.msg} ${styles.ok}`}>{successMsg}</div>}

            <div className={styles.submitRow}>
              <p className={styles.summary}>
                {selectedEvents.length === 0 ? 'No voyages selected yet.' : <>Sailing on <b>{selectedEvents.length}</b> voyage{selectedEvents.length > 1 ? 's' : ''}.</>}
              </p>
              <button type="submit" disabled={isSubmitting} className="o-btn o-btn--primary" style={{ padding: '1.1rem 2.6rem' }}>
                {isSubmitting ? 'Submitting…' : 'Submit registration'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
