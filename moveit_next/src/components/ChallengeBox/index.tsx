import { useContext } from 'react';
import { ChallengesContext } from '../../contexts/ChallengesContext';
import { CountDownContext } from '../../contexts/CountDownContext';
import styles from './styles.module.css';

const ChallengeBox = ()=> {
    const {activeChallenge, resetChallenge, completeChallenge} = useContext(ChallengesContext)
    const {resetCountDown} = useContext(CountDownContext);

    const handleChallengeCompleted = () => {
        completeChallenge();
        resetCountDown();
    }

    const handleChallengeFailed = () => {
        resetChallenge();
        resetCountDown();
    }

    return (
        <div className={styles.challengeBoxContainer}>
            {activeChallenge ? 
            (
                <div className={styles.challengeActive}>
                    <header>Ganhe {activeChallenge.amount} xp</header>

                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} />
                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>

                    <footer>
                        <button 
                            type="button"
                            className={styles.challengeFailedButton}
                            onClick={handleChallengeFailed}
                            >Falhei</button>
                        <button 
                            type="button"
                            onClick={handleChallengeCompleted}
                            className={styles.challengeCompletedButton}
                            >Completo</button>
                    </footer>
                </div>
            ) :
            (
                <div className={styles.challengeNotActive }>
                    <strong>Finalize um ciclo para receber um desafio</strong>
                    <p>
                    <img src="icons/level-up.svg" alt="level up" />
                    Avance de level completando desasfios
                    </p>
                </div>
            )
            }
        </div>
    );
}

export default ChallengeBox;