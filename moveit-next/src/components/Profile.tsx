import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';


export function Profile() {

  const { level } = useContext(ChallengesContext);
  return (
    <div className={styles.profileContainer}>
      <img
        src="https://avatars.githubusercontent.com/u/62813340?s=460&u=15aa490979a82df0277ad00fbe36b42947b3d10e&v=4 "
        alt="Avatar"
      />
      <div>
        <strong> Guilherme Jordão</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </div>

  )
}