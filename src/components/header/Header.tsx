import {FC, useState} from 'react';
import styles from './Header.module.css';

interface HeaderProps {
    setSearchQuery: (query: string) => void;
}

const Header : FC<HeaderProps> = ({ setSearchQuery }) => {
    const [search, setSearch] = useState('');

    const handleSearch = (search:string) => {
        if (!search) return;
        console.log("입력하고 엔터침!");
        setSearchQuery(search);
    };


    return (
        <header className={styles.header}>
            <div className={styles.logo}> Movie & Music </div>
            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    <li><a href='/'>movies</a></li>
                    {/*<li><a href='/spotifyMusic'>Music</a></li>*/}
                    <li><a href='/youtube'>youtube</a></li>
                </ul>
            </nav>
            <input  className={styles['search-input']}
                    type='search'
                    placeholder='영화 검색'
                    value={search}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch(search);
                        }
                    }}
                    onChange={e => setSearch(e.target.value)}
            />
        </header>
    )
}

export default Header