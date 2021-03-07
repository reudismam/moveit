import { useState, useEffect, useContext } from 'react';
import { isatty } from 'tty';
import { ChallengesContext } from '../../contexts/ChallengesContext';
import { CountDownContext } from '../../contexts/CountDownContext';
import styles from './styles.module.css';

const CountDown = ()=> {
    const { 
            isFinished, 
            isActive,
            minuteLeft,
            minuteRight,
            secondLeft,
            secondRight,
            resetCountDown,
            startCountDown
          } = useContext(CountDownContext);

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>
                        {minuteLeft}
                    </span>
                    <span> 
                        {minuteRight}
                    </span>
                </div>
                <span>:</span>
                <div>
                    <span>
                        {secondLeft}
                    </span>
                    <span> 
                        {secondRight}
                    </span>
                </div>
            </div>

            { isFinished ? (
                <button
                    disabled
                    className={styles.startCountDownButton}
                    >  
                    Ciclo encerrado
                </button>
            ):
            (
                <>
                {isActive ? (
                <button 
                    type="button" 
                    className={`${styles.startCountDownButton} ${styles.startCountDownButtonActive}`}
                    onClick={resetCountDown}
                    >
                    Parar ciclo
                </button>
                ) :
                (
                <button 
                    type="button" 
                    className={styles.startCountDownButton}
                    onClick={startCountDown}
                    >
                    Iniciar um ciclo
                </button>
                )
            }
                </>
            )
            }    
        </div>
    );
}

export default CountDown;