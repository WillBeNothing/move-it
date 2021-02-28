import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export default function Profile() {
  const { level } = useContext(ChallengeContext);
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/William4823.png" alt="William" />
      <div>
        <strong>William Lima</strong>
        <p>
          <img src="icons/level.svg" alt="level" />
          Nivel
          {' '}
          {level}
        </p>
      </div>
    </div>
  );
}
