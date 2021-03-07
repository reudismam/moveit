import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountDownContext {
    time:  number;
    isFinished: boolean;
    isActive: boolean;
    minuteLeft: number;
    minuteRight: number;
    secondLeft: number;
    secondRight: number;
    setTime: (time: number) => void;
    setIsFinished: (finished) => void;
    setIsActive: (active) => void;
    startCountDown: () => void;
    resetCountDown: () => void;
}

interface CountDownProviderProps {
    children: ReactNode;
}

let CountDownTimeout: NodeJS.Timeout

export const CountDownContext = createContext({} as CountDownContext);


export const CountDownContextProvider = ({children}: CountDownProviderProps) => {
    const {startNewChallenge} = useContext(ChallengesContext);
    const [time, setTime] = useState(0.1 * 60);
    const [isFinished, setIsFinished] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const minuteLeft = Math.floor(minutes/10);
    const minuteRight = minutes % 10;

    const secondLeft = Math.floor(seconds/10);
    const secondRight = seconds % 10;

    const startCountDown = () => {
        setIsActive(true);
    }

    const resetCountDown = () => {
        clearTimeout(CountDownTimeout);
        setIsActive(false);
        setTime(0.1 * 60);
        setIsFinished(false);
    }

    useEffect(()=> {
        if (isActive && time > 0) {
            CountDownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        }
        else if(isActive && time === 0){
            setIsFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time])

    return (
        <CountDownContext.Provider value={
            {
                time,
                isFinished,
                isActive,
                minuteLeft,
                minuteRight,
                secondLeft,
                secondRight,
                setTime,
                setIsFinished,
                setIsActive,
                startCountDown,
                resetCountDown
            }
        }>
            {children}
        </CountDownContext.Provider>
    );
} 