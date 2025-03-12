import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from '../css/Main.module.css'
import Slider from 'react-slick';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cleanTitle } from '../utils/format';
import axios from 'axios';
import UpcomingMovie from './old/UpcomingMovie';
import BestMovie from './BestMovie';
import OpenBeMovie from "./OpenBeMovie";
import BoxOfficeMovie from "./BoxOfficeMovie";
//api 응답 정의
interface Movie {
    movieCd : string;
    movieNm : string;
    openDt : string;
    DOCID : string;
}
interface Post {
    Query: string;
    KMAQuery: string;
    TotalCount: number;
    Data: DataItem[]; // DataItem 배열을 포함
}
interface DataItem {
    CollName: string;
    TotalCount: number;
    Count: number;
    Result: Detail[]; // 여기서 Movie 배열을 포함
}

interface Detail {
    DOCID : string;
    posters : string;
    title : string;
    repRlsDate : string;
}

//컴포넌트 Props 타입 정의
interface MainProps {
    posts : Movie[];
    moveToDetail : (id:string) => void;
}

const Main : FC = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<Movie[]>([]);
    const [posts, setPosts] = useState<Post[]>([]);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5, // 한 번에 보이는 개수
        slidesToScroll: 5, // 한 번에 넘어가는 개수
        arrows: true,
        draggable: true,
    };

    //빌보드 조회일자 설정
    const today = new Date();
    today.setDate(today.getDate() - 1);

    const formattedDate =
        today.getFullYear().toString() +
        (today.getMonth() + 1).toString().padStart(2, "0") +
        today.getDate().toString().padStart(2, "0");


    //상세 페이지 이동 함수
    const moveToDetail = (DOCID:string, title:string, repRlsDate:string) => {
        navigate("/MovieDetail" , {
            state: {
                id : DOCID,
                title : title,
                repRlsDate : repRlsDate
            }
        });
    }

    // 영화 정보 API호출
    useEffect(() => {
        axios.get(`http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json` +
            `?key=${process.env.REACT_APP_KOBIS_API_KEY}&targetDt=`+formattedDate)
            .then(response1 => {
                const boxOfficeList = response1.data.boxOfficeResult.dailyBoxOfficeList;
                // setData(boxOfficeList);

                return Promise.all(
                    boxOfficeList
                        .map((item : Movie) =>
                        axios.get(`https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?` +
                                `collection=kmdb_new2&ServiceKey=${process.env.REACT_APP_KMDB_API_KEY}` +
                                `&detail=Y&query=${encodeURIComponent(cleanTitle(item.movieNm))}&releaseDts=`+item.openDt.replace(/-/g, "")
                        )
                    )
                );
            })
            .then(response2 => {
                const results = response2.map(res => res.data);
                setPosts(results);
            })
            .catch (error => console.error("API호출 중 오류 발생", error));
    }, []);


    return (
        <div>
            <BoxOfficeMovie />
            <h1 className={styles["main-title"]}>🍿 박스오피스 Top 10</h1>
            <div className={styles["main-poster"]}>
                <Slider {...settings}>
                    {posts
                        ?.map((post) =>
                            post.Data?.map((dataItem) =>
                                dataItem.Result?.map((movie) => {
                                    const matchingPost = dataItem.Result.find((detail) => detail.title === movie.title);

                                    return (
                                        <div key={movie.DOCID} className="slider-item">
                                            <a href="" onClick={() => moveToDetail(movie.DOCID, movie.title, movie.repRlsDate)}>
                                                {matchingPost && (
                                                    <img
                                                        src={matchingPost.posters.split('|')[0]}
                                                        alt={movie.title}
                                                        // className="slider-image"
                                                        className={`${styles["custom-slider-image"]} slider-image`}
                                                    />
                                                )}
                                            </a>
                                        </div>
                                    );
                                })
                            )
                        )
                        .flat(2)}
                </Slider>
            </div>
            {/*<UpcomingMovie />*/}
            <OpenBeMovie />
            <BestMovie />
        </div>
    )
}

export default Main