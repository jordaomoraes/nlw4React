import { Children, createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {
 
  minutes :number,
  seconds:number,
  hasFinished :boolean,
  isActive :boolean,
  startCountdown : () => void,
  resetCountdown : () => void,
}

interface CountdownProvideProps {
  children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData)


export function CountdownProvider({ children }: CountdownProvideProps) {

  let countdownTimeout: NodeJS.Timeout;


  const { startNewChallenge } = useContext(ChallengesContext)

  const [time, setTime] = useState(0.1 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {

    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(0.1 * 60);
    setHasFinished(false);

  }

  //o segundo parametro, no caso active indica que sempre que o valor de active mudar
  //ele vai executar o useEffect, no caso o comando que está dentro no {}, depois da =>
  useEffect(() => {

    if (isActive && time > 0) {
      //aqui vai executar a função dentro de 1000 milesgundos 
      //vai reduzir o time, que é declarado em 25*60 em 1 segundo
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    } else if (isActive && time == 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]) //executa quando muda o active e o time, ou seja sempre
  //que baixa 1 segundos, executa


  return (

    <CountdownContext.Provider value={{

      minutes,
      seconds,
      hasFinished,
      isActive,
      startCountdown,
      resetCountdown,


    }}>

      {children}

    </CountdownContext.Provider>
  )


}