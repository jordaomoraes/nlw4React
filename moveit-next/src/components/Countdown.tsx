import { useState, useEffect } from 'react'
import styles from '../styles/components/Countdown.module.css'

export function Countdown() {

  const [time, setTime] = useState(25 * 60);
  const [active, setActive] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  // aqui divide a string, a função padstart será usada caso o numero seja menor que 10
  //assim ela vai colocar um 0 no inicio, ficando 09
  //mesma coisa para os segundos
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  function startCountdown() {

    setActive(true);


  }

  //o segundo parametro, no caso active indica que sempre que o valor de active mudar
  //ele vai executar o useEffect, no caso o comando que está dentro no {}, depois da =>
  useEffect(()=>{

    if(active && time >0){
       //aqui vai executar a função dentro de 1000 milesgundos 
       //vai reduzir o time, que é declarado em 25*60 em 1 segundo
      setTimeout(()=>{
        setTime(time - 1)
      },1000)
    }     
  },[active,time]) //executa quando muda o active e o time, ou seja sempre
  //que baixa 1 segundos, executa

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
      <button
        type="button"
        className={styles.countdownButton}
        onClick={startCountdown}>
        Iniciar um Ciclo
        </button>
    </div>
  )
}