import { useContext } from 'react';
import styles from '../styles/components/Countdown.module.css'
import { CountdownContext } from '../contexts/CountdownContext';




export function Countdown() {

  const {
    minutes,
    seconds,
    isActive,
    hasFinished,
    resetCountdown,
    startCountdown } =
    useContext(CountdownContext)

  // aqui divide a string, a função padstart será usada caso o numero seja menor que 10
  //assim ela vai colocar um 0 no inicio, ficando 09
  //mesma coisa para os segundos
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');



  return (

    <div>
      <div className={styles.countdownContainer}>
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
          disabled
          className={styles.countdownButton}
        >
          Ciclo Encerrado
        </button>
      ) : (
          <>
            {isActive ? (
              <button
                type="button"
                className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                onClick={resetCountdown}>
                Abandonar Ciclo
              </button>
            ) : (
                <button
                  type="button"
                  className={styles.countdownButton}
                  onClick={startCountdown}>
                  Iniciar um Ciclo
                </button>
              )}
          </>
        )}

    </div>

  )
}