import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengesContext';
import { CountDownContext } from '../contexts/CountDownContext';
import styles from '../styles/components/ChallengeBox.module.css';

export default function ChallengeBox() {
  const { activeChallenge, resetFailed, completeChallenge } = useContext(ChallengeContext);
  const { resetCountDown } = useContext(CountDownContext);
  function handleChallengeSucceeded() {
    completeChallenge();
    resetCountDown();
  }

  function handleChallengeFailed() {
    resetFailed();
    resetCountDown();
  }
  return (
    <div className={styles.challengeBoxContainer}>
      { activeChallenge ? (
        <div className={styles.challengeActived}>
          <header>
            Gana
            {' '}
            {activeChallenge.amount }
          </header>

          <main>
            <img src={`icons/${activeChallenge.type}.svg`} alt="cuerpo" />
            <strong>¡Nuevo Desafío!</strong>
            <p>{activeChallenge.description}</p>
          </main>
          <footer>
            <button
              type="button"
              className={styles.challengeFailedButton}
              onClick={handleChallengeFailed}
            >
              Fallido

            </button>
            <button
              type="button"
              className={styles.challengeSucceededButton}
              onClick={handleChallengeSucceeded}
            >
              Éxito

            </button>
          </footer>
        </div>

      ) : (

        <div className={styles.challengeNotActived}>
          <strong>¡Acabe un ciclo para recibir un nuevo desafíos por hacer!</strong>
          <p>
            <img src="icons/level-up.svg" alt="level=up" />
            Sube de nivel completando desafíos
          </p>
        </div>
      )}
    </div>
  );
}
