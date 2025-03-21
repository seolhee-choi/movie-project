import styles from '../css/Main.module.css';
import { FC } from 'react';
import BestMovie from './movie/BestMovie';
import OpenBeMovie from './movie/OpenBeMovie';
import BoxOfficeMovie from './movie/BoxOfficeMovie';


const Main : FC = () => {
    return (
        <div className={styles['middle-content']}>
            <BoxOfficeMovie />
            <OpenBeMovie />
            <BestMovie />
        </div>
    )
}

export default Main