/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/LevelUpModal.module.css';

// eslint-disable-next-line import/prefer-default-export
export function LevelUpModal() {
  const {
    level, closeLevelUpModal,
  } = useContext(ChallengeContext);
  return (
    <div className={styles.overlay}>
      <div className={styles.container} id="modal">
        <header>{level}</header>

        <strong>¡Enhorabuena!</strong>
        <p>Tú alcanzaste un nuevo nivel.</p>

        <button type="button" onClick={closeLevelUpModal}>
          <img src="icons/close.svg" alt="fechar" />
        </button>

        <div className={styles.share}>
          <a
            href={`https://twitter.com/intent/tweet?text=%C2%BFMira+lo+que+hice%3F%2C+%C2%A1llegu%C3%A9+al+nivel+${level}+en+move.it%21&via=WillBeLigma`}
            target="_blank"
            rel="noopener noreferrer"
          >
            ¡Compartir en twitter!

          </a>
        </div>
      </div>
      <div className={styles.shareToTwitter} />
    </div>
  );
}
