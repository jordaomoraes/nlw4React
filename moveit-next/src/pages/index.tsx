import Head from 'next/head'
import { ChallengeBox } from '../components/ChallengBox';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { GetServerSideProps } from 'next'

import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from '../components/Profile';
import { CountdownProvider } from '../contexts/CountdownContext';

import styles from '../styles/pages/Home.module.css'
import { ChallengesProvider } from '../contexts/ChallengesContext';

interface homeProps{
  level :number,
  currentExperince :number,
  challengeCompleted :number
}

export default function Home(props) {
  return (

    <ChallengesProvider
      level={props.level}
      currentExperince={props.currentExperince}
      challengeCompleted={props.challengeCompleted}>
      <div className={styles.container}>
        <Head>
          <title>Inicio | Move.it</title>
        </Head>
        <ExperienceBar />
        <section>
          <CountdownProvider>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </CountdownProvider>
        </section>
      </div>
    </ChallengesProvider>
  )
}

//funcao para pegar os Cookies
export const getServerSideProps: GetServerSideProps = async (ctx) => {
 
  const { level, currentExperince, challengeCompleted } = ctx.req.cookies;
  return {
    props: { 
      
      level :Number(level), 
      currentExperince :Number(currentExperince), 
      challengeCompleted :Number(challengeCompleted) }
  }

}