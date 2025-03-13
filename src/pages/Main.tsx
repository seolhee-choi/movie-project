import styles from '../css/Main.module.css';
import { FC } from 'react';
import BestMovie from './BestMovie';
import OpenBeMovie from './OpenBeMovie';
import BoxOfficeMovie from './BoxOfficeMovie';


const Main : FC = () => {
    return (
        <div className={styles["middle-content"]}>
            <BoxOfficeMovie />
            <OpenBeMovie />
            <BestMovie />
        </div>
    )
}

export default Main