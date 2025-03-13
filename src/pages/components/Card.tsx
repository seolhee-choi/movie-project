import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import styles from '../../css/Main.module.css';
import styles from './Card.module.css';
import Slider from 'react-slick';
import { CardDTO } from '../types/card';
import { cleanTitle } from '../../utils/format';
import { useNavigate } from 'react-router-dom';
interface Props {
    movies: CardDTO[];
    title: string;
}

const Card = ({movies, title} : Props) => {
    const navigate = useNavigate();

    //Slider 세팅
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
    const moveToDetail = (id:string, original_title:string, release_date:string) => {
        navigate("/MovieDetail" , {
            state: {
                id : id,
                original_title : original_title,
                repRlsDate : release_date
            }
        });
    }

    const posterUrl = 'https://image.tmdb.org/t/p/original/';

    return(
        <div>
            <h1 className={styles["main-title"]}>{title}</h1>
            <div className={styles["main-poster"]}>
                <Slider {...settings}>
                    {movies.map((item) => (
                        <div key={item.id} className={`${styles["custom-slider-item"]} slider-item`}>
                            <a href="" onClick={() => moveToDetail(item.id, item.original_title, item.release_date)}>
                                <img
                                    src={posterUrl + item.poster_path}
                                    alt={cleanTitle(item.title)}
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

export default Card