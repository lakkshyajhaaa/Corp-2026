'use client';

import styles from './page.module.css';

export default function DesignLabPage() {
  return (
    <div className={styles.wrapper}>
      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={styles.brand}>
          <span className={styles.brandTitle}>CORPEUREKA</span>
          <span className={styles.brandSubtitle}>CASE COMPETITION</span>
        </div>
        <div className={styles.navLinks}>
          <a href="#" className={styles.activeLink}>HOME</a>
          <a href="#">OVERVIEW</a>
          <a href="#">CHALLENGE</a>
          <a href="#">TIMELINE</a>
          <a href="#">APPLY</a>
          <a href="#">CONTACT</a>
        </div>
      </nav>

      {/* Main Content Grid (replicating the image layout) */}
      <div className={styles.container}>
        
        {/* Left Column */}
        <div className={styles.leftColumn}>
          
          {/* Celestial Image Box */}
          <div className={styles.celestialBox}>
            <div className={styles.coordinatesLeft}>41° N | 28° E</div>
            <div className={styles.coordinatesRight}>27° N | 9° E</div>
            
            {/* SVG Constellation Background */}
            <svg className={styles.constellationSvg} viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(212, 175, 55, 1)" />
                  <stop offset="100%" stopColor="rgba(212, 175, 55, 0)" />
                </radialGradient>
              </defs>
              {/* Orbital Lines */}
              <circle cx="200" cy="400" r="350" fill="none" stroke="rgba(212, 175, 55, 0.2)" strokeWidth="1" />
              <circle cx="600" cy="-50" r="400" fill="none" stroke="rgba(212, 175, 55, 0.2)" strokeWidth="1" />
              <path d="M 0,200 Q 400,0 800,300" fill="none" stroke="rgba(212, 175, 55, 0.3)" strokeWidth="1" />
              <path d="M 100,400 Q 500,100 800,50" fill="none" stroke="rgba(212, 175, 55, 0.2)" strokeWidth="1" strokeDasharray="4 4" />
              
              {/* Stars & Nodes */}
              <circle cx="150" cy="120" r="2" fill="#fff" />
              <circle cx="250" cy="80" r="3" fill="url(#starGlow)" />
              <circle cx="350" cy="180" r="1.5" fill="#fff" />
              <circle cx="450" cy="250" r="4" fill="url(#starGlow)" />
              <circle cx="650" cy="150" r="2" fill="#fff" />
              
              {/* Constellation Lines */}
              <line x1="150" y1="120" x2="250" y2="80" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
              <line x1="250" y1="80" x2="350" y2="180" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
              <line x1="350" y1="180" x2="450" y2="250" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
              <line x1="450" y1="250" x2="650" y2="150" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
            </svg>
            
            <div className={styles.overlayGradient}></div>
            
            <h1 className={styles.heroRoman}>XXIV</h1>
          </div>

          <h2 className={styles.heroTitle}>THE ODYSSEY BEGINS. UNLOCK<br/>THE VOYAGE OF INNOVATION.</h2>
          
          <h3 className={styles.heroSubtitle}>UNLOCK THE VOYAGE OF INNOVATION.</h3>
          
          <p className={styles.heroDesc}>
            The elite global challenge in an exclusive competition up thread the most<br/>
            prestigious corporate case competition in navigation to a blending of ancient<br/>
            Mediterranean epic fields present an unlock the placement of innovation.
          </p>

          {/* Phase Grid */}
          <div className={styles.phaseGrid}>
            <div className={styles.phaseCard}>
              <div className={styles.phaseHeader}>
                <span className={styles.phaseLabel}>PHASE 01</span>
                <span className={styles.starIcon}>✦</span>
              </div>
              <div className={styles.phaseNumber}>01</div>
              <div className={styles.phaseTitle}>VOYAGE OPEN</div>
              <div className={styles.phaseDate}>SEPT &apos;24 - Registration</div>
            </div>
            
            <div className={styles.phaseCard}>
              <div className={styles.phaseHeader}>
                <span className={styles.phaseLabel}>PHASE 02</span>
                <span className={styles.starIcon}>✦</span>
              </div>
              <div className={styles.phaseNumber}>02</div>
              <div className={styles.phaseTitle}>STRATEGIC TRIALS</div>
              <div className={styles.phaseDate}>NOV &apos;24 - Challenge</div>
            </div>
            
            <div className={styles.phaseCard}>
              <div className={styles.phaseHeader}>
                <span className={styles.phaseLabel}>PHASE 03</span>
                <span className={styles.starIcon}>✦</span>
              </div>
              <div className={styles.phaseNumber}>03</div>
              <div className={styles.phaseTitle}>THE ORACLE<br/>PRESENTATION</div>
              <div className={styles.phaseDate}>NOV &apos;24 - Challenge</div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className={styles.rightColumn}>
          <div className={styles.rightTop}>
            <span className={styles.starIconLarge}>✦</span>
            <div className={styles.rightLabel}>CORPEUREKA / THE LEGACY</div>
            <h2 className={styles.rightTitle}>INNOVATE THE DEPTHS |<br/>NAVIGATE THE FUTURE</h2>
          </div>
          
          <div className={styles.rightMiddle}>
             <span className={styles.starIconLarge}>✦</span>
             <h3 className={styles.middleTitle}>CORPEUREKA / THE LEGACY</h3>
             <p className={styles.middleDesc}>
               Elegant subheadings with high-contrast nodes<br/>
               and exhibition, and strategy interface
             </p>
             <div className={styles.imageGrid}>
               <div className={styles.imageDark1}></div>
               <div className={styles.imageDark2}></div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
