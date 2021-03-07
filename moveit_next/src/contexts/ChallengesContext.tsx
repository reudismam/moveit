import {createContext, useState, ReactNode, useEffect} from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface ChallengeProviderProps {
    children: ReactNode;
    newlevel: number;
    newcurrentExperience: number;
    newchallengesCompleted: number;
}

interface Challenge {
    type: "body" | "eye";
    description: string;
    amount: number;
}

interface ChallengeContextData {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    experienceToNextLevel: number;
    activeChallenge: Challenge,
    isLevelUpModalOpen,
    levelUp: ()=> void; 
    startNewChallenge: ()=> void;
    resetChallenge: ()=> void;
    completeChallenge: ()=> void;
    closeLevelUpModal: ()=> void;
}

export const ChallengesContext = createContext({} as ChallengeContextData);

export function ChallengeProvider({children, newlevel, newcurrentExperience, newchallengesCompleted}:ChallengeProviderProps) {
    const [level, setLevel] = useState(newlevel ?? 1);
    const [currentExperience, setCurrentExperience] = useState(newcurrentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(newchallengesCompleted ?? 0);
    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(()=>{
        Notification.requestPermission();
    },[]);

    useEffect(()=>{
        Cookies.set('level', `${level}`);
        Cookies.set('challengesCompleted', `${challengesCompleted}`);
        Cookies.set('currentExperience', `${currentExperience}`);
    }, [level, currentExperience]);
  
    const levelUp = ()=> {
      setLevel(level + 1);
      setIsLevelUpModalOpen(true);
    }

    const closeLevelUpModal = ()=> {
        setIsLevelUpModalOpen(false);
    }

    const startNewChallenge = ()=> {
        const challengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[challengeIndex];
        setActiveChallenge(challenge);
        new Audio("/notification.mp3").play();

        if (Notification.permission == "granted") {
            new Notification('Novo desafio', {
                body: `Valendo ${challenge.amount}xp!`
            });
        }
    }  
    
    const resetChallenge = ()=> {
        setActiveChallenge(null);
    }

    const completeChallenge = ()=> {
        if (!activeChallenge) {
            return;
        }

        const {amount} = activeChallenge;
        let finalExperience = currentExperience + amount;
        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

    return (
        <ChallengesContext.Provider value={
            {level, levelUp, 
            currentExperience,
            challengesCompleted,
            activeChallenge,
            experienceToNextLevel,
            isLevelUpModalOpen,
            startNewChallenge,
            resetChallenge,
            completeChallenge,
            closeLevelUpModal}}>
            {children}
            {isLevelUpModalOpen && <LevelUpModal />}
        </ChallengesContext.Provider>
    );
}