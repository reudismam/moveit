import Head from 'next/head';
import {GetServerSideProps} from 'next';
import ChallengeBox from '../components/ChallengeBox';
import CompletedChallenges from '../components/CompletedChallenges';
import CountDown from '../components/CountDown';
import ExperienceBar from '../components/ExperienceBar';
import Profile from '../components/Profile';

import styles from '../styles/pages/index.module.css';
import { ChallengeProvider } from '../contexts/ChallengesContext';
import { CountDownContextProvider } from '../contexts/CountDownContext';

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home({
    level, currentExperience, challengesCompleted}: HomeProps) {
  return (
    <ChallengeProvider 
      newlevel={level}
      newcurrentExperience={currentExperience}
      newchallengesCompleted={challengesCompleted} >
        <CountDownContextProvider>
          <div className={styles.container}>
            <Head>
              <title>Início | move.it</title>
            </Head>
            
            <ExperienceBar />

            <section>
              <div>
                <Profile />
                <CompletedChallenges />
                <CountDown />
              </div>
              <div>
                <ChallengeBox />
              </div>
            </section>
          </div>
        </CountDownContextProvider>
    </ChallengeProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (context ) => {
  const {
        level, 
        currentExperience, 
        challengesCompleted
       }  = context.req.cookies;
  return (
    {
      props: {
        level: Number(level),
        currentExperience: Number(currentExperience),
        challengesCompleted: Number(challengesCompleted)
      }
    }
  );
}
