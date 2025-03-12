import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../css/Main.module.css";
import Slider from "react-slick";
import {cleanTitle} from "../utils/format";

interface OpenData {
    id: string,
    title: string,
    poster_path: string,
    release_date: string
}
const OpenBeMovie : FC = () => {
    const navigate = useNavigate();
    const [ data, setData ] = useState<OpenData[]>([]);
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
    const moveToDetail = (id:string, title:string, release_date:string) => {
        navigate("/MovieDetail" , {
            state: {
                id : id,
                title : title,
                repRlsDate : release_date
            }
        });
    }

    useEffect(() => {
        const options = {
            method: 'GET',
            // url: 'https://api.themoviedb.org/3/authentication',
            url: 'https://api.themoviedb.org/3/movie/upcoming',
            params: {
                region: 'KR',
                language: 'ko-KR',
                page: '2'
            },
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_TMDB_HEADER_KEY}`
            }
        };

        axios
            .request(options)
            .then(res => {
                // console.log(res.data.results);
                setData(res.data.results);
            })
            .catch(err => console.error(err));

    },[])

    const posterUrl = 'https://image.tmdb.org/t/p/original/';

    return(
        <div>
            <h1 className={styles["main-title"]}>👀 개봉예정작</h1>
            <div className={styles["main-poster"]}>
                <Slider {...settings}>
                    {data.map((item) => (
                        <div key={item.id} className="slider-item">
                            {/*<p>{cleanTitle(item.title)}</p>*/}
                            <a href="" onClick={() => moveToDetail(item.id, item.title, item.release_date)}>
                                {/*<a href="" onClick={() => {}}>*/}
                                <img
                                    // src={matchingPost ? matchingPost.posters.split('|')[0] : firstStillImage}
                                    src={posterUrl + item.poster_path}
                                    alt={cleanTitle(item.title)}
                                    // className="slider-image"
                                    className={`${styles["custom-slider-image"]} slider-image`}
                                />
                            </a>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    )
}

export default OpenBeMovie