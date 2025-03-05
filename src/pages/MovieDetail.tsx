import {FC, useEffect, useState} from 'react';
import { useLocation } from "react-router-dom";
import axios from "axios";
import { cleanTitle } from "../utils/format";

interface Detail {
    genre : string;
    plots : {
        plot : {plotText : string}[];
    };
    posters : string;
}

const MovieDetail:FC = () => {
const location = useLocation();
const { id, title, repRlsDate } = location.state || {}; //state에서 id가져오기
const [detail, setDetail] = useState<Detail | null>(null);


    useEffect(() => {
        axios.get(
            `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?` +
            `collection=kmdb_new2&ServiceKey=${process.env.REACT_APP_KMDB_API_KEY}` +
            `&detail=Y&query=${encodeURIComponent(cleanTitle(title))}` +
            `&DOCID=`+id+`&releaseDts=`+repRlsDate.replace(/-/g, "")
        )
            .then(response => {
                setDetail(response.data.Data[0].Result[0]);
            })
            .catch(error => {
                console.error(error);
            })
    }, []);

    //여기에 선언해야 렌더링할 때도 사용 가능
    //detail?이런식의 문법은 detail이 null일 수도 있어서 옵셔널 체이닝 사용
    const firstPoster = detail?.posters?.split('|')[0] || "";

    return (
        <div>
            { detail ? (
                <div>
                    {firstPoster && <img src={firstPoster} alt="포스터"/>}
                    <h3> {cleanTitle(title)} </h3>
                        <p>{detail.genre}</p>
                        <p>{repRlsDate}</p>

                        <p>{detail?.plots?.plot?.[0]?.plotText || "줄거리 없음"}</p>
                </div>
            ) : (
             <p>Loading...</p>
            )}

        </div>
    )
}

export default MovieDetail