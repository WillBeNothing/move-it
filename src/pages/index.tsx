import Head from 'next/head';
import { GetServerSideProps } from 'next';

import ChallengeBox from '../components/ChallengeBox';
import CompletedChallengs from '../components/CompletedChallengs';
import CountDown from '../components/CountDown';
import ExperienceBar from '../components/ExperienceBar';
import Profile from '../components/Profile';
import { CountDownProvider } from '../contexts/CountDownContext';

import styles from '../styles/pages/Home.module.css';
import { ChallengeProvider } from '../contexts/ChallengesContext';

interface HomeProps {
  level: number,
  currentExperience: number,
  challengesCompleted: number,
}

function App(props: HomeProps) {
  const { level, currentExperience, challengesCompleted } = props;
  return (
    <ChallengeProvider
      level={level}
      currentExperience={currentExperience}
      challengesCompleted={challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Comienzo | move.it</title>
        </Head>

        <ExperienceBar />
        <CountDownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallengs />
              <CountDown />
            </div>
            <ChallengeBox />
            <div />
          </section>
        </CountDownProvider>

      </div>

    </ChallengeProvider>
  );
}

export default App;
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;
  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    },
  };
};
