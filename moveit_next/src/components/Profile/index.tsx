import styles from './profile.module.css';
import {useContext} from 'react';
import { ChallengesContext } from '../../contexts/ChallengesContext';

const Profile = () => {
    const {level} = useContext(ChallengesContext);
    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/reudismam.png" alt="Foto de Reudismam"/>
            <div>
                <strong>Diego Fernandes</strong>
                <p>
                    <img src="icons/level.svg" alt="Level "/>
                    Level {level}
                </p>
            </div>
        </div>
    );
}

export default Profile;