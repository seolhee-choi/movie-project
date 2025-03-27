import {useEffect, useRef, useState} from 'react';
import styles from './ScrollToTop.module.css'
import scrollTop from '../../top-circle-svgrepo-com.svg'
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

       console.log(window.scrollY);
       window.addEventListener("scroll", handleShowButton)
       return () => {
           window.removeEventListener("scroll", handleShowButton)
       }
   }, [])

    return (
        <div className={styles['scroll__container']}>
            {/*<button id='top' onClick={topButon} type='button'>*/}
            <button id='top' onClick={topButton} type='button'>
                <img src={scrollTop} alt='scrollToTop'/>
            </button>
        </div>
    );
};

export default ScrollToTop