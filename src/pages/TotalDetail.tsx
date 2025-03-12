import { FC, useState, useEffect } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import styles from "../css/MovieDetail.module.css";
import Slider from "react-slick";
import {cleanTitle, replaceDate} from "../utils/format";

interface MovieData {
    title : string,
    genre : string,
    plots : {
        plot : {plotText : string}[]
    },
    posters : string,
    vods : {
        vod : {vodUrl : string}[]
    },
    repRlsDate : string
}
interface VideoData {
    key: string
}

interface DetailMovieProps {
    id: string,
    title : string,
    overview: string,
    release_date : string,
    poster_path: string
}
const TotalDetail : FC = () => {
    const location = useLocation();
    // const [ kmdbData, setKmdbData ] = useState<MovieData[]>([]);
    const [ kmdbData, setKmdbData ] = useState<MovieData | null >(null);
    const [ tmdbData, setTmdbData ] = useState<DetailMovieProps | null>(null);
    const [ video, setVideo ] = useState<VideoData[]>([]);
    const { id, title, repRlsDate } = location.state || {}; //state에서 id가져오기

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const kmdbMovieResponse = await axios.get(`https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2`, {
                    params: {
                        ServiceKey: `${process.env.REACT_APP_KMDB_API_KEY}`,
                        detail: 'Y',
                        query: cleanTitle(title),
                        // DOCID: id,
                        releaseDts: replaceDate(repRlsDate)
                    }
                })

                if (kmdbMovieResponse.data.TotalCount === 0) {
                    const tmdbMovieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
                        params: {
                            api_key: `${process.env.REACT_APP_TMDB_API_KEY}`,
                            language: 'ko-KR',
                        },
                        headers: {
                            accept: 'application/json',
                            Authorization: `Bearer ${process.env.REACT_APP_TMDB_HEADER_KEY}`
                        }
                    })
                    setTmdbData(tmdbMovieResponse.data);

                    // 두 번째 API 호출
                    const videoResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos`, {
                        params: {
                            api_key: `${process.env.REACT_APP_TMDB_API_KEY}`,
                            language: 'ko-KR',
                        }
                    });
                    // 최종 데이터 저장
                    setVideo(videoResponse.data.results ? videoResponse.data.results : null);
                } else {
                    setKmdbData(kmdbMovieResponse.data.Data[0].Result[0]);
                }

            } catch(error) {
                console.error(error);
            }
        };
        fetchMovieDetails();
    },[])


    // const videoUrl = 'https://www.youtube.com/watch?v=';
    const videoUrl = 'https://www.youtube.com/embed/';
    const videoOption = '?autoplay=1';
    const posterUrl = 'https://image.tmdb.org/t/p/original/';
    const firstPoster = kmdbData?.posters?.split('|')[0] || "";
    const videoSrc = kmdbData?.vods.vod[0].vodUrl.replace("trailerPlayPop?pFileNm=", "play/");

    return (
        <div>
            <div className={styles["detail"]}>
                {tmdbData ? (
                    <>
                        {video.length > 0  ? (
                            // video.map((item, index) => (
                                <iframe
                                    // key={index}
                                    width="50%"
                                    height="auto"
                                    src={videoUrl + video[0].key + videoOption}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            // ))
                        ) : (
                            <img className={styles["img-preview"]} src={posterUrl + tmdbData?.poster_path} />
                        )}
                        <div className={styles["detail-text"]}>
                            <h1> {cleanTitle(tmdbData.title)} </h1>
                            <p>개봉일 : {tmdbData.release_date}</p>
                            <p>{tmdbData.overview}</p>
                        </div>
                    </>
                ) : (
                    <>
                        {videoSrc ? (
                            <video className={styles["video-preview"]} autoPlay loop muted playsInline preload="auto">
                                <source src={videoSrc} type="video/mp4" />
                            </video>
                        ) : (
                            <img className={styles["img-preview"]} src={firstPoster} alt="포스터" />
                        )}
                        <div className={styles["detail-text"]}>
                            <h1> {cleanTitle(kmdbData?.title || "제목 없음")} </h1>
                            <p>장르 : {kmdbData?.genre || "장르 정보 없음"}</p>
                            <p>개봉일 : {repRlsDate}</p>
                            <p>{kmdbData?.plots?.plot?.[0]?.plotText || "줄거리 없음🫢"}</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default TotalDetail