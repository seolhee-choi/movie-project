import React, { FC } from 'react';
import styles from '../../css/Youtube.module.css';

interface PlayerModalProps {
    video: any;
    onClose: () => void;
}

const PlayerModal: FC<PlayerModalProps> = ({ video, onClose }) => {
    if (!video) return null;

    const youtubeUrl = 'https://www.youtube.com/embed/';
    const youtubeOption = '?autoplay=1';


    return(
        <div className={styles['modal-overlay']} onClick={onClose}>
            <div className={styles['modal-content']} onClick={(e) => e.stopPropagation()}>
                <button className={styles['close-button']} onClick={onClose}>X</button>
                <iframe
                    src={youtubeUrl + `${video}` + youtubeOption}
                    width="560"
                    height="315"
                    title='Youtube video player'
                    frameBorder='0'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    )
};

export default PlayerModal;
