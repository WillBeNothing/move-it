import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/CompletedChallengs.module.css';

export default function CompletedChallengs() {
  const { challengesCompleted } = useContext(ChallengeContext);
  return (
    <div className={styles.completedchallengscontainer}>
      <span>Desafíos completados: </span>
      <span>{String(challengesCompleted).padStart(2, '0')}</span>
    </div>
  );
}
