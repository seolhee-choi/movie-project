import axios from 'axios';
import styles from '../css/MovieDetail.module.css';
import { FC, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { cleanTitle, replaceDate } from '../utils/format';

interface KMDBProps {
    title : string,
    genre : string,
    plots : {
        plot : {plotText : string}[]
    },
    posters : string,
    vods : {
        vod : {vodUrl : string}[]
    },
    repRlsDate : string,
    directors : {
        director : {directorNm : string}[]
    },
    actors : {
        actor : {actorNm : string}[]
    }
}
interface YoutubeData {
    key: string
}

interface TMDBProps {
    id: string,
    title : string,
    genres : Category[],
    overview: string,
    release_date : string,
    poster_path: string,
}
interface Category {
    id: number;
    name: string;
}
interface CASTProps {
    name: string
}

const TotalDetail : FC = () => {
    const location = useLocation();
    const [ kmdbData, setKmdbData ] = useState<KMDBProps | null >(null);
    const [ tmdbData, setTmdbData ] = useState<TMDBProps | null>(null);
    const [ youtube, setYoutube ] = useState<YoutubeData[]>([]);
    const [ cast , setCast ] = useState<CASTProps[]>([]);
    const [ loading, setLoading ] = useState(true);
    const { id, title, original_title, repRlsDate, vote_average } = location.state || {}; //메인화면에서 포스터 클릭시 해당값 들고오기

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const kmdbMovieResponse = await axios.get(`https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2`, {
                    params: {
                        ServiceKey: `${process.env.REACT_APP_KMDB_API_KEY}`,
                        detail: 'Y',
                        query: cleanTitle(original_title),
                        title: cleanTitle(title),
                        releaseDts: replaceDate(repRlsDate)
                    }
                })

                // KMDB API 호출시 결과값이 없으면, TMDB API 호출 및 데이터 저장
                if (kmdbMovieResponse.data.TotalCount === 0) {
                    const tmdbMovieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
                        params: {
                            api_key: `${process.env.REACT_APP_TMDB_API_KEY}`,
                            language: 'ko-KR',
                        },
                        headers: {
                            accept: 'application/json',
                            Authorization: `${process.env.REACT_APP_TMDB_HEADER_KEY}`
                        }
                    })
                    setTmdbData(tmdbMovieResponse.data);

                    // 두 번째 API 호출
                    const youtubeResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos`, {
                        params: {
                            api_key: `${process.env.REACT_APP_TMDB_API_KEY}`,
                            language: 'ko-KR',
                        }
                    });
                    setYoutube(youtubeResponse.data.results ? youtubeResponse.data.results : null);

                    // 세 번째 API 호출
                    const castResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
                        params: { language: 'ko-KR' },
                        headers: {
                            accept: 'application/json',
                            Authorization: `${process.env.REACT_APP_TMDB_HEADER_KEY}`
                        }
                    });
                    console.log(castResponse.data.cast);
                    setCast(castResponse.data.cast);


                } else {
                    setKmdbData(kmdbMovieResponse.data.Data[0].Result[0]);
                }
            } catch(error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchMovieDetails();
    },[])


    const youtubeUrl = 'https://www.youtube.com/embed/';
    const youtubeOption = '?autoplay=1';
    const posterUrl = 'https://image.tmdb.org/t/p/original/';
    const firstPoster = kmdbData?.posters?.split('|')[0] || "";
    const videoSrc = kmdbData?.vods.vod[0].vodUrl.replace("trailerPlayPop?pFileNm=", "play/");

    if (loading) {
        return <span className={styles["loader"]}></span>
    }

    return (
        <div>
            <div className={styles["detail"]}>
                <div className={styles["area"]}>
                    {tmdbData ? (
                        <>
                            {youtube.length > 0  ? (
                                    <iframe
                                        id="youtube"
                                        width="100%"
                                        height="100%"
                                        src={youtubeUrl + youtube[0].key + youtubeOption}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                            ) : (
                                <img className={styles["img-preview"]} src={posterUrl + tmdbData?.poster_path} />
                            )}
                            <div className={styles["detail-text"]}>
                                <h1> {cleanTitle(tmdbData.title)} </h1>
                                <p className={styles["genre"]}>
                                장르 :
                                    {tmdbData.genres ? (
                                      tmdbData.genres.map((genre: {name : string}) => genre.name).join(", ")
                                    ) : (
                                        "장르 정보 없음🫢"
                                    )}
                                </p>
                                <p>개봉일 : {tmdbData.release_date}</p>
                                <p>평점 : {vote_average}</p>
                                <p>출연진 : {cast.map((actor) => actor.name).join(",")}</p>
                                <p className={styles["overview"]}>{tmdbData.overview || "줄거리 정보 없음🫢"}</p>
                            </div>
                        </>
                    ) : (
                        <>
                            {videoSrc ? (
                                // <video className={styles["video-preview"]} autoPlay loop muted playsInline preload="auto">
                                <video className={styles["video"]} autoPlay loop muted playsInline preload="auto">
                                    <source src={videoSrc} type="video/mp4" />
                                </video>
                            ) : (
                                <img className={styles["img-preview"]} src={firstPoster} alt="포스터" />
                            )}
                            <div className={styles["detail-text"]}>
                                <h1> {cleanTitle(kmdbData?.title || "제목 없음🫢")} </h1>
                                <p>장르 : {kmdbData?.genre || "장르 정보 없음🫢"}</p>
                                <p>개봉일 : {repRlsDate}</p>
                                <p>평점 : {vote_average}</p>
                                <p>출연진 : {kmdbData?.actors?.actor?.map(actor => actor.actorNm).join(', ')}</p>
                                <p>{kmdbData?.plots?.plot?.[0]?.plotText || "줄거리 없음🫢"}</p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TotalDetail