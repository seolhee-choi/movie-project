import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from "../../css/Main.module.css";
import Slider from "react-slick";
import {cleanTitle} from "../../utils/format";

interface MovieInfo {
    movieCd : string;
    movieNm : string;
    repGenreNm : string;
    openDt : string;
    // companys : {companyNm : string} [];
    prdtYear : string;
}
interface UpcomingMovieInfo {
    Query: string;
    KMAQuery: string;
    TotalCount: number;
    Data: DataItem[]; // DataItem 배열을 포함
}
interface DataItem {
    CollName: string;
    TotalCount: number;
    Count: number;
    Result: MovieDetailInfo[]; // 여기서 Movie 배열을 포함
}
interface MovieDetailInfo {
    DOCID : string;
    posters : string;
    title : string;
    repRlsDate : string;
    stlls : string;
}

const UpcomingMovie : FC = () => {
    const [upcomingMovies, setUpcomingMovies] = useState<MovieInfo[]>([]);
    const [upcomingDetail, setUpcomingDetail] = useState<UpcomingMovieInfo[]>([]);
    const thisYear = new Date().getFullYear();
    const thisMonth = new Date().getMonth()+1;
    const navigate = useNavigate();

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5, // 한 번에 보이는 개수
        slidesToScroll: 5, // 한 번에 넘어가는 개수
        arrows: true,
        draggable: true,
    };
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

    useEffect(() => {
        const fetchMovies = async () => {
            try{
                //1. 첫 번째 api 호출
                const response = await axios.get(
                    `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?` +
                        `key=${process.env.REACT_APP_KOBIS_API_KEY}&itemPerPage=20&openStartDt=`+ thisYear
                );

                //2. 받은 데이터 필터링
                const upcomingData : MovieInfo[] = response.data.movieListResult.movieList;
                const filteredData = upcomingData
                                    .filter(movie => !movie.repGenreNm?.includes('에로'))
                                    .map(movie => ({
                                        ...movie,
                                        prdtYear: movie.prdtYear || "알 수 없음"
                                    }));

                //3. 상태 업데이트(필터링된 영화 리스트)
                setUpcomingMovies(filteredData);

                //4. 두 번째 api 호출
                const response2 = await Promise.all(
                  filteredData.map((item: MovieInfo) => {
                      // const companyName = item.companys && item.companys.length > 0 ? item.companys[0].companyNm : "";
                      //   console.log(item);
                      //   console.log("prdtYear" + item.prdtYear);
                      return axios.get(
                      `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?` +
                          `collection=kmdb_new2&ServiceKey=${process.env.REACT_APP_KMDB_API_KEY}&listCount=20` +
                          // `&detail=Y&query=${encodeURIComponent(cleanTitle(item.movieNm))}&company=${encodeURIComponent(cleanTitle(companyName))}`
                          `&detail=Y&query=${encodeURIComponent(cleanTitle(item.movieNm))}&createDts=`+item.prdtYear
                      );
                  })
                );

                //5. 두 번째 api에서 받은 데이터 가공 후 상태 업데이트
                const result = response2.map(res => res.data);
                setUpcomingDetail(result);

            } catch (error) {
                console.log("ERROR 발생 " + error);
            }
        };

        //비동기 함수 실행
        fetchMovies();
    }, []);


    return(
        <div>
            <h1 className={styles["main-title"]}>🎥 {thisYear}년 개봉 예정작</h1>
            <div className={styles["main-poster"]}>
                <Slider {...settings}>
                    {upcomingDetail
                        ?.map((detail) =>
                            detail.Data?.map((dataItem) =>
                                dataItem.Result?.map((movie) => {
                                    const matchingPost = dataItem.Result.find((detail) => detail.title === movie.title);
                                    // const firstStillImage = movie.stlls?.split('|')[0] || "";
                                    const firstStillImage = movie.stlls?.split('|')[0];

                                    return (
                                        <div key={movie.DOCID} className="slider-item">
                                            <p>{cleanTitle(movie.title)}</p>
                                            <a href="" onClick={() => moveToDetail(movie.DOCID, movie.title, movie.repRlsDate)}>
                                                {matchingPost && (
                                                    <img
                                                        // src={matchingPost ? matchingPost.posters.split('|')[0] : firstStillImage}
                                                        src={firstStillImage ? firstStillImage : matchingPost.posters.split('|')[0]}
                                                        alt={cleanTitle(movie.title)}
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
        </div>
    )
}

export default UpcomingMovie