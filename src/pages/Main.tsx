import styles from '../css/Main.module.css';
import { FC } from 'react';
import BestMovie from './movie/BestMovie';
import OpenBeMovie from './movie/OpenBeMovie';
import BoxOfficeMovie from './movie/BoxOfficeMovie';
import SearchMovieResult from './movie/SearchMovieResult';

interface MainProps {
    searchQuery: string;
}
const Main : FC<MainProps> = ({searchQuery}) => {
    return (
        <div className={styles['middle-content']}>
            {searchQuery ? (
                <SearchMovieResult searchQuery={searchQuery}/>
            ) : (
                <>
                    <BoxOfficeMovie />
                    <OpenBeMovie />
                    <BestMovie />
                </>
            )}
        </div>
    );
};

export default Main