import React, { useContext } from 'react';
import { ChallengesContext } from '../../contexts/ChallengesContext';
import styles from './experiencebar.module.css';

function ExperienceBar() {
    const { currentExperience, experienceToNextLevel  } = useContext(ChallengesContext);
    
    const percentNextLevel = Math.round(currentExperience * 100 / experienceToNextLevel);

    return (
        <header className={styles.experienceBar}>
            <span>0 xp</span>
            <div>
                <div style={{width: `${percentNextLevel}%`}}/> 
                <span className={styles.experienceBar} style={{left: `${percentNextLevel}%`}}>
                        {currentExperience} xp
                    </span>
            </div>
            <span>{experienceToNextLevel} xp</span>
        </header>
    );
}

export default ExperienceBar;