'use client';

import { useState } from 'react';
import PageHero from '@/components/PageHero';
import styles from '@/components/forms.module.css';
import { submitStartupRegistration } from '@/app/actions/startup-register';


export default function StartupRegistrationPage() {
  const [formData, setFormData] = useState({
    startupName: '',
    founderName: '',
    email: '',
    phone: '',
    description: '',
    stage: '',
    pitchDeck: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    const result = await submitStartupRegistration(formData);

    if (result.success) {
      setSuccessMsg('Startup Registration successful! We will contact you soon.');
      setFormData({
        startupName: '',
        founderName: '',
        email: '',
        phone: '',
        description: '',
        stage: '',
        pitchDeck: ''
      });
    } else {
      setErrorMsg(result.error || 'Registration failed.');
    }
    
    setIsSubmitting(false);
  };

  const field = (label: string, input: React.ReactNode, full = false) => (
    <div className={`o-field ${full ? styles.full : ''}`}><label className="o-label">{label}</label>{input}</div>
  );
  const words = formData.description.trim() ? formData.description.trim().split(/\s+/).length : 0;

  return (
    <>
      <PageHero eyebrow="Innoventia · Startup Fair" title="PITCH YOUR STARTUP" lead="Present your concept, gain seed funding and access elite mentorship." compact />
      <div className="o-container" style={{ maxWidth: 1000 }}>
        <div className={styles.wrap}>
          <form onSubmit={handleSubmit} className={styles.panel}>
            <div className={styles.section}>
              <div className={styles.step}><span className={styles.stepN}>1</span><h3>About the venture</h3></div>
              <div className={styles.fields}>
                {field('Startup name', <input className="o-input" type="text" name="startupName" required value={formData.startupName} onChange={handleInputChange} />)}
                {field('Founder / representative name', <input className="o-input" type="text" name="founderName" required value={formData.founderName} onChange={handleInputChange} />)}
                {field('Email ID', <input className="o-input" type="email" name="email" required value={formData.email} onChange={handleInputChange} />)}
                {field('Phone number', <input className="o-input" type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} />)}
                {field('Funding stage', (
                  <select className="o-input" name="stage" required value={formData.stage} onChange={handleInputChange}>
                    <option value="" disabled>Select stage</option>
                    <option value="Idea Phase">Idea Phase</option>
                    <option value="Prototype/MVP">Prototype / MVP</option>
                    <option value="Pre-seed">Pre-seed</option>
                    <option value="Seed">Seed</option>
                    <option value="Series A or beyond">Series A or beyond</option>
                  </select>
                ))}
                {field('Pitch deck link (optional)', <input className="o-input" type="text" name="pitchDeck" placeholder="https://" value={formData.pitchDeck} onChange={handleInputChange} />)}
              </div>
            </div>

            <div className={styles.section}>
              <div className={styles.step}><span className={styles.stepN}>2</span><h3>The big idea</h3></div>
              <div className={styles.fields}>
                {field(`Startup description (100–300 words) · ${words} words`, <textarea className="o-input" name="description" required rows={7} value={formData.description} onChange={handleInputChange} />, true)}
              </div>
            </div>

            {errorMsg && <div className={`${styles.msg} ${styles.err}`}>{errorMsg}</div>}
            {successMsg && <div className={`${styles.msg} ${styles.ok}`}>{successMsg}</div>}

            <div className={styles.submitRow}>
              <p className={styles.summary}>We will contact you after reviewing your application.</p>
              <button type="submit" disabled={isSubmitting} className="o-btn o-btn--primary" style={{ padding: '1.1rem 2.6rem' }}>
                {isSubmitting ? 'Submitting…' : 'Submit application'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
