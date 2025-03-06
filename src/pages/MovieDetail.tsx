import {FC, useEffect, useState} from 'react';
import { useLocation } from "react-router-dom";
import axios from "axios";
import { cleanTitle } from "../utils/format";
import styles from '../css/MovieDetail.module.css'
interface Detail {
    genre : string;
    plots : {
        plot : {plotText : string}[];
    };
    posters : string;
    vods : {
        vod : {vodUrl : string}[];
    }
}

const MovieDetail:FC = () => {
const location = useLocation();
const { id, title, repRlsDate } = location.state || {}; //state에서 id가져오기
const [detail, setDetail] = useState<Detail | null>(null);
const [videoSrc, setVideoSrc] = useState<string | null>(null);

    useEffect(() => {
        axios.get(
            `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?` +
                `collection=kmdb_new2&ServiceKey=${process.env.REACT_APP_KMDB_API_KEY}` +
                `&detail=Y&query=${encodeURIComponent(cleanTitle(title))}` +
                `&DOCID=`+id+`&releaseDts=`+repRlsDate.replace(/-/g, "")
            )
            .then(response => {
                // console.log("🎬 영화 데이터 응답:", response.data);
                setDetail(response.data.Data[0].Result[0]);
            })
            .catch(error => { console.error(error); })
    }, [id, title, repRlsDate]);

    useEffect(() => {
        if (detail?.vods?.vod[0]) {
            // console.log("🎞️ 업데이트된 video URL:", detail.vods.vod[0].vodUrl);
            setVideoSrc(detail.vods.vod[0].vodUrl);
        }
    }, [detail]);

    //여기에 선언해야 렌더링할 때도 사용 가능
    //detail?이런식의 문법은 detail이 null일 수도 있어서 옵셔널 체이닝 사용
    const firstPoster = detail?.posters?.split('|')[0] || "";
    const videoUrl = videoSrc?.replace("trailerPlayPop?pFileNm=", "play/");

    return (
        <div>
            { detail ? (
                <div className={styles["detail"]}>
                    {videoSrc?(
                        <video className={styles["video-preview"]} autoPlay loop muted playsInline>
                            <source src={videoUrl} type="video/mp4"/>
                        </video>
                    ) : (
                        <img className={styles["img-preview"]} src={firstPoster} alt="포스터"/>
                    )}
                    <div className={styles["detail-text"]}>
                        <h1> {cleanTitle(title)} </h1>
                        <p>장르 : {detail.genre}</p>
                        <p>개봉일 : {repRlsDate}</p>
                        <p>{detail?.plots?.plot?.[0]?.plotText || "줄거리 없음🫢"}</p>
                    </div>
                </div>
            ) : (
             <p>Loading...</p>
            )}

        </div>
    )
}

export default MovieDetail