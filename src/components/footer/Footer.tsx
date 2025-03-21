import { FC } from 'react';
import styles from './Footer.module.css';
import logo from '../../logo.svg';


const Footer : FC = () => {
    return (
        <footer id='footer' className={styles.footer}>
            <div className={styles.logo}>
                <a href='/'>
                    <img src={logo} alt='Logo' />
                </a>
            </div>
            <div className='box_in'>
                <p>Copyright (c) 2011. Korean Film Council. All rights reserved</p>
                <p>이용시간: 09:00 ~ 18:00(평일)</p>
                <p>E-mail: csheeee38@gmail.com </p>
            </div>
        </footer>

    )

}

export default Footer