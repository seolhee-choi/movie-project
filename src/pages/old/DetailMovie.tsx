import { FC, useState, useEffect } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
import styles from '../../css/Main.module.css';
import Slider from 'react-slick';
import {cleanTitle} from '../../utils/format';

interface OpenData {
    title : string,
    overview: string
}
interface VideoData {
    key: string
}

interface DetailMovieProps {
    id: string,
    movieTitle : string,
    openDate : string,
    fallbackData : any
}
// const DetailMovie : FC = () => {
const DetailMovie = ({id, movieTitle, openDate, fallbackData} : DetailMovieProps) => {
    // const location = useLocation();
    const [ data, setData ] = useState<OpenData | null>(null);
    const [ video, setVideo ] = useState<VideoData[]>([]);
    // const { id, title, repRlsDate } = location.state || {}; //state에서 id가져오기

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
                    params: {
                        api_key: `${process.env.REACT_APP_TMDB_API_KEY}`,
                        language: 'ko-KR',
                    },
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${process.env.REACT_APP_TMDB_HEADER_KEY}`
                    }
                })
                setData(movieResponse.data);

                // 두 번째 API 호출
                const videoResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos`, {
                    params: {
                        api_key: `${process.env.REACT_APP_TMDB_API_KEY}`,
                        language: 'ko-KR',
                    }
                });
                // 최종 데이터 저장
                setVideo(videoResponse.data.results ? videoResponse.data.results : null);
                } catch(error) {
                    console.error(error);
                }
        };
        fetchMovieDetails();
    },[])


    // const videoUrl = 'https://www.youtube.com/watch?v=';
    const videoUrl = 'https://www.youtube.com/embed/';
    const videoOption = "?autoplay=1";
    return (
        <div>
            {data && video && video.length > 0 && (
                <div className={styles["detail"]}>
                    {/*{video.map((item, index) => (*/}
                    {video.length > 0 && (
                        <iframe
                            width="50%"
                            height="auto"
                            src={videoUrl + video[0].key + videoOption}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    )}
                    {/*))}*/}
                    <div className={styles["detail-text"]}>
                        <h1> {cleanTitle(data.title)} </h1>
                        {/*<p>개봉일 : {repRlsDate}</p>*/}
                        <p>개봉일 : {openDate}</p>
                        <p>{data.overview}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DetailMovie