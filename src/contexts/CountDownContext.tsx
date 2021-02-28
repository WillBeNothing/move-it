import {
  createContext, ReactNode, useContext, useEffect, useState,
} from 'react';
import { ChallengeContext } from './ChallengesContext';

interface CountDownData {
    isActive: boolean,
    hasFinished: boolean,
    minutes: number,
    seconds: number,
    startCountDown: () => void,
    resetCountDown: () => void,
}

interface CountDownProviderProps {
    children: ReactNode
}

export const CountDownContext = createContext({} as CountDownData);

export function CountDownProvider({ children }: CountDownProviderProps) {
  // eslint-disable-next-line no-undef
  let countdownTimeOut: NodeJS.Timeout;

  const { StartNewChallenge } = useContext(ChallengeContext);

  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountDown() {
    setIsActive(true);
  }

  function resetCountDown() {
    setIsActive(false);
    clearTimeout(countdownTimeOut);
    setTime(25 * 60);
    setHasFinished(false);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeOut = setTimeout(() => { setTime(time - 1); }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      StartNewChallenge();
    }
  }, [isActive, time]);

  return (
    <CountDownContext.Provider
      value={{
        isActive,
        hasFinished,
        minutes,
        seconds,
        startCountDown,
        resetCountDown,
      }}
    >
      {children}
    </CountDownContext.Provider>
  );
}
