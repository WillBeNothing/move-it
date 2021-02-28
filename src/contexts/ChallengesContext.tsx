/* eslint-disable no-restricted-properties */
/* eslint-disable import/prefer-default-export */
import {
  createContext, useState, ReactNode, useEffect,
} from 'react';
import Cookies from 'js-cookie';

import Challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface ChallengeProviderProps {
    children: ReactNode,
    level: number,
    currentExperience: number,
    challengesCompleted: number,
}

interface Challenge {
    type: 'body' | 'eye',
    description: string,
    amount: number,
}
interface ChallagesContextDatas {
    level: number,
    currentExperience: number,
    challengesCompleted: number,
    activeChallenge: Challenge,
    levelUp: () => void,
    resetFailed: () => void,
    StartNewChallenge: () => void,
    experienceToNextLevel: number,
    completeChallenge: () => void,
    closeLevelUpModal: () => void,

}

export const ChallengeContext = createContext({} as ChallagesContextDatas);

export function ChallengeProvider({ children, ...rest }: ChallengeProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const experienceToNextLevel = ((level + 1) * 4) ** 2;

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted]);

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  function StartNewChallenge() {
    const randomChallageIndex = Math.floor(Math.random() * Challenges.length);
    const challenge = Challenges[randomChallageIndex];

    setActiveChallenge(challenge);

    // eslint-disable-next-line no-new
    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      // eslint-disable-next-line no-new
      new Notification('¡Nuevo Desafío! 💪', {
        body: `Vale ${challenge.amount}xp`,
        icon: 'favicon.png',
        silent: true,
      });
    }
  }

  function resetFailed() {
    setActiveChallenge(null);
  }

  // eslint-disable-next-line consistent-return
  function completeChallenge() {
    if (!activeChallenge) return null;

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience -= experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }
  return (
    <ChallengeContext.Provider value={{
      level,
      currentExperience,
      challengesCompleted,
      activeChallenge,
      StartNewChallenge,
      experienceToNextLevel,
      resetFailed,
      levelUp,
      completeChallenge,
      closeLevelUpModal,
    }}
    >
      {children}
      {isLevelUpModalOpen && <LevelUpModal />}

    </ChallengeContext.Provider>
  );
}
