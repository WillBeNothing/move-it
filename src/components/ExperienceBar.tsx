import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css';

export default function ExperienceBar() {
  const {
    currentExperience,
    experienceToNextLevel,
  } = useContext(ChallengeContext);

  const currentXP = Math.round((currentExperience * 100) / experienceToNextLevel);
  return (
    <header className={styles.experienceBar}>
      <span>
        00 XP
      </span>
      <div>
        <div style={{ width: `${currentXP}%` }} />
        <span className={styles.currentExperience} style={{ left: `${currentXP}%` }}>
          {' '}
          {String(currentExperience).padStart(2, '0')}
          {' '}
          XP
          {' '}
        </span>
      </div>
      <span>
        {experienceToNextLevel}
        {' '}
        XP
      </span>
    </header>
  );
}
