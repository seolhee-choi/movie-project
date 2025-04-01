import {useEffect, useRef, useState} from 'react';
import styles from './ScrollToTop.module.css'
// import scrollTop from '../../top-circle-svgrepo-com.svg'
import scrollTop from '../../scroll-up.png'
const ScrollToTop = () => {
   const [showButton, setShowButton] = useState(false);

   const topButton = () => {
       window.scroll({
           top: 0,
           behavior: 'smooth'
       })
   }

   useEffect(() => {
       const handleShowButton = () => {
           if (window.scrollY > 500) {
               setShowButton(true)
           } else {
               setShowButton(false)
           }
       }

       window.addEventListener("scroll", handleShowButton)
       return () => {
           window.removeEventListener("scroll", handleShowButton)
       }
   }, [])

    return (
        <div className={styles['scroll__container']}>
            {/*<button id='top' onClick={topButton} type='button'>*/}
            <div className={styles['top']} onClick={topButton}>
                <img src={scrollTop} alt='scrollToTop'/>
            </div>
            {/*</button>*/}
        </div>
    );
};

export default ScrollToTop