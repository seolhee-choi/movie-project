import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "../css/Main.module.css";
import Slider from "react-slick";

const UpcomingMovie = () => {
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const thisYear = new Date().getFullYear();

    useEffect(() => {
        axios.get(
            `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?` +
            `key=${process.env.REACT_APP_KOBIS_API_KEY}&openStartDt=`+ thisYear +
            `&itemPerPage=20`
            )
            .then(response => {
                console.log("과연 data는? "+response.data);
                setUpcomingMovies(response.data);
            })
            .catch((error) => console.log(error))
    })


    return(
        <div>
            {/*<h1 className={styles["main-title"]}>🎥개봉 예정작</h1>*/}
            {/*<div className={styles["main-poster"]}>*/}
            {/*    <Slider {...settings}>*/}
            {/*        {posts*/}
            {/*            ?.map((post) =>*/}
            {/*                post.Data?.map((dataItem) =>*/}
            {/*                    dataItem.Result?.map((movie) => {*/}
            {/*                        const matchingPost = dataItem.Result.find((detail) => detail.title === movie.title);*/}

            {/*                        return (*/}
            {/*                            <div key={movie.DOCID} className="slider-item">*/}
            {/*                                <a href="" onClick={() => moveToDetail(movie.DOCID, movie.title, movie.repRlsDate)}>*/}
            {/*                                    {matchingPost && (*/}
            {/*                                        <img*/}
            {/*                                            src={matchingPost.posters.split('|')[0]}*/}
            {/*                                            alt={movie.title}*/}
            {/*                                            className="slider-image"*/}
            {/*                                        />*/}
            {/*                                    )}*/}
            {/*                                </a>*/}
            {/*                            </div>*/}
            {/*                        );*/}
            {/*                    })*/}
            {/*                )*/}
            {/*            )*/}
            {/*            .flat(2)}*/}
            {/*    </Slider>*/}
            {/*</div>*/}
        </div>
    )
}

export default UpcomingMovie