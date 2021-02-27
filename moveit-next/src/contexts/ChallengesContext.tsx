import { createContext, useState, ReactNode, useEffect } from 'react';
import { Interface } from 'readline';
import Cookies from 'js-cookie';
 
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';


interface challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}
interface ChallengesContextData {
    level: number;
    currentExperince: number;
    challengeCompleted: number;
    experienceToNextLevel: number;
    activeChallenge: challenge;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    fechaModal:()=>void;
}

interface ChallengesProvideProps {
    children: ReactNode;
    level :number,
    currentExperince :number,
    challengeCompleted :number
}



export const ChallengesContext = createContext({} as ChallengesContextData);


export function ChallengesProvider({ children, ...rest }: ChallengesProvideProps) {

    const [level, setLevel] = useState(rest.level ?? 1)
    const [currentExperince, setCurrentExperience] = useState( rest.currentExperince ?? 0);
    const [challengeCompleted, setChallengeCompleted] = useState(rest.challengeCompleted ?? 0);


    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelUpModalOpen , setIsLevelUpModalOpen] = useState(false)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    //aqui é onde vai salvas os cookies
    useEffect(()=>{
        Cookies.set('level', String(level));
        Cookies.set('currentExperince', String(currentExperince));
        Cookies.set('challengeCompleted', String(challengeCompleted));
    },[level, currentExperince,challengeCompleted])

function fechaModal(){
    setIsLevelUpModalOpen(false)

}
   


    function levelUp() {
        setLevel(level + 1)
        setIsLevelUpModalOpen(true)
    }
    function startNewChallenge() {
        const raadomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[raadomChallengeIndex];

        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play();

        if(Notification.permission === 'granted'){
                new Notification('Novo Desafio!', {
                    body : `Valendo ${challenge.amount}xp!`
                })
        }
    }
    function resetChallenge() {
        setActiveChallenge(null)
    }

    function completeChallenge() {

        if (!activeChallenge) {

            return;
        }
        //pega o valor do activeChallange, é a experiencia
        const { amount } = activeChallenge;
        // LET quer dizer, let it change, que isso pode mudar
        let finalExperience = currentExperince + amount;

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }
        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengeCompleted(challengeCompleted + 1);

    }
    return (
        <ChallengesContext.Provider
            value={{
                level,
                currentExperince,
                experienceToNextLevel,
                challengeCompleted,
                activeChallenge,
                levelUp,
                startNewChallenge,
                resetChallenge,
                completeChallenge,
                fechaModal

            }}>
            {children}


                {isLevelUpModalOpen && <LevelUpModal /> }
            
        </ChallengesContext.Provider>

    )
}