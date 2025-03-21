import {useEffect, useRef} from 'react';
import styles from './ScrollToTop.module.css'
const ScrollToTop = () => {
    // const topRef = useRef<HTMLDivElement>(null);
    //
    // useEffect(() => {
    //     if (topRef.current) {
    //         topRef.current.scrollIntoView({ behavior: 'smooth' });
    //     }
    // }, [])
    //
    // return(
    //     <div>
    //         <div
    //             ref={topRef}
    //             className={styles['scroll-top']}
    //         >
    //         </div>
    //         <button onClick={() => topRef.current?.scrollIntoView({ behavior: 'smooth'})}>
    //             상단으로 스크롤
    //         </button>
    //     </div>
    // )

    const scrollToTop = () => {
        // window.scrollTo({top:0, behavior: 'smooth'});
        document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });

        console.log('스크롤 실행됨');
    };

    return (
        <div className={styles['scroll-container']}>
            <button className={styles['scroll-button']} onClick={scrollToTop}>
                TOP
            </button>

        </div>
    );
};

export default ScrollToTop