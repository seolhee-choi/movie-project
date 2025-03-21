import { FC } from 'react';
import styles from './Header.module.css';
import logo from '../../logo.svg';

const Header : FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <a href='/'>
                    <img src={logo} alt='Logo' />
                </a>
            </div>
            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    <li><a href='/'>Movies</a></li>
                    <li><a href='/spotifyMusic'>Music</a></li>
                    <li><a href='#submenu3'>Submenu 3</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header