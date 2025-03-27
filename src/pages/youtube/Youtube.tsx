import React, {FC, useEffect, useState} from 'react';
import axios from 'axios';
import styles from '../../css/Youtube.module.css';
import {cleanTitle} from '../../utils/format';
import PlayerModal from './PlayerModal';

interface Video {
    id : {
        videoId : string
    };
}
const Youtube: FC = () => {
    const [search, setSearch] = useState('');
    const [result, setResult] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState('' );

    const openModal = (video:Video) => {
        setSelectedVideo(video.id.videoId);
    }
    const closeModal = () => setSelectedVideo('');

    // useEffect(() => {
    const handleSearch = () => {
        if (!search) return;

        axios
            .get('http://localhost:8080/api/youtube', {
                params: {q : search +' ost' }
            })
            .then(res => {
                console.log('결과값은? ',res.data.items);
                // setResult(res.data.items[0].id.videoId);
                // setResult(res.data.items);
                setResult(res.data);
            })
            .catch((err) => {
                console.error(err);
            })
    };
    // }, [search])


    return(
        <div className={styles['container']}>
            <div className={styles['search-container']}>
                <input
                    className={styles['search-input']}
                    type='search'
                    placeholder='OST 검색'
                    value={search}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch();
                        }
                    }}
                    onChange={e => setSearch(e.target.value)}
                />
                <button className={styles['search-button']} onClick={handleSearch}>검색</button>
            </div>
            <div className={styles['results-container']}>
                {result.map((video:any) => (
                    <div key={video.id.videoId} className={styles['result-item']} onClick={() => openModal(video)}>
                        <img
                            src={video.snippet.thumbnails.medium.url}
                            alt={video.snippet.title}
                            className={styles['result-thumbnail']}
                        />
                        <div className={styles['result-info']}>
                            <h3>{cleanTitle(video.snippet.title)}</h3>
                            <p>{video.snippet.description}</p>
                            <p>업로드일자 : {video.snippet.publishedAt
                                ? new Date(video.snippet.publishedAt.replace('Z', '')).toLocaleDateString()
                                : '날짜 없음'}
                            </p>
                        </div>
                    </div>
                ))}

                {selectedVideo && <PlayerModal video={selectedVideo} onClose={() => setSelectedVideo('')} />}
            </div>
        </div>
    )
};

export default Youtube;
