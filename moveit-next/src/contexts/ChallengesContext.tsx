import { createContext, useState, ReactNode } from 'react';
import { Interface } from 'readline';

import challenges from '../../challenges.json';


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
}

interface ChallengesProvideProps {
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);


export function ChallengesProvider({ children }: ChallengesProvideProps) {

    const [level, setLevel] = useState(1)
    const [currentExperince, setCurrentExperience] = useState(0);
    const [challengeCompleted, setChallengeCompleted] = useState(0);

    const [activeChallenge, setActiveChallenge] = useState(null);
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    function levelUp() {
        setLevel(level + 1)
    }
    function startNewChallenge() {
        const raadomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[raadomChallengeIndex];

        setActiveChallenge(challenge)
    }
    function resetChallenge() {
        setActiveChallenge(null)
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

            }}>
            {children}
        </ChallengesContext.Provider>

    )
}