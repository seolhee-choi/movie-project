import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../src/css/Main.module.css'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//api 응답 정의
interface Movie {
    movieCd : string;
    movieNm : string;
    openDt : string;
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
    // Result: Movie[]; // 여기서 Movie 배열을 포함
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
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5, // 한 번에 보이는 개수
        slidesToScroll: 1, // 한 번에 넘어가는 개수
        arrows: true,
        draggable: true,
    };
    const navigate = useNavigate();
    const [data, setData] = useState<Movie[]>([]);
    const [posts, setPosts] = useState<Post[]>([]);



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
        axios.get('http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json' +
            // `?key=${process.env.REACT_APP_KOBIS_API_KEY}&targetDt=20250201`)
            `?key=${process.env.REACT_APP_KOBIS_API_KEY}&targetDt=20250101`)
            .then(response1 => {
                const boxOfficeList = response1.data.boxOfficeResult.dailyBoxOfficeList;
                setData(boxOfficeList);

                return Promise.all(
                    boxOfficeList.map((item : Movie) =>
                        axios.get(`https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?` +
                                `collection=kmdb_new2&ServiceKey=${process.env.REACT_APP_KMDB_API_KEY}` +
                                `&detail=Y&query=${encodeURIComponent(item.movieNm)}&releaseDts=`+item.openDt.replace(/-/g, "")
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
                <h1>박스오피스 Top 10 🍿</h1>
                <Slider {...settings}>
                    {posts
                        .map((post) =>
                            post.Data.map((dataItem) =>
                                dataItem.Result.map((movie) => {
                                    const matchingPost = dataItem.Result.find((detail) => detail.title === movie.title);

                                    return (
                                        <div key={movie.DOCID} className="slider-item">
                                            <a href="" onClick={() => moveToDetail(movie.DOCID, movie.title, movie.repRlsDate)}>
                                                {matchingPost && (
                                                    <img
                                                        src={matchingPost.posters.split('|')[0]}
                                                        alt={movie.title}
                                                        className="slider-image"
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
                <h1>장르별 Top 10 🎥</h1>
            </div>
        )
}

export default Main