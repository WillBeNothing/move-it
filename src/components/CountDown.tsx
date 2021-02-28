import { useContext } from 'react';
import { CountDownContext } from '../contexts/CountDownContext';
import styles from '../styles/components/CountDown.module.css';

export default function CountDown() {
  // eslint-disable-next-line no-undef

  const {
    minutes, seconds, hasFinished, isActive, startCountDown, resetCountDown,
  } = useContext(CountDownContext);

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  return (
    <div>
      <div className={styles.countdowncontainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>
      {hasFinished ? (
        <button
          type="button"
          disabled
          className={styles.countDownButton}
        >
          ¡Ciclo cerrado!
          <img src="icons/check_circle.svg" alt="completado" />
        </button>
      ) : (
        <>
          {isActive ? (
            <button
              type="button"
              className={`${styles.countDownButton} ${styles.countDownButtonActived}`}
              onClick={resetCountDown}
            >
              ¡Abandonar el ciclo!
            </button>
          ) : (
            <button
              type="button"
              className={`${styles.countDownButton} ${styles.countDownButtonDisabled}`}
              onClick={startCountDown}
            >
              ¡Iníciar un nuevo ciclo!
            </button>
          )}

        </>
      )}
    </div>
  );
}
