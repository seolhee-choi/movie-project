import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './Card.module.css';
import Slider from 'react-slick';
import { CardDTO } from '../types/card';
import { cleanTitle } from '../../utils/format';
import { useNavigate } from 'react-router-dom';
import { FC } from 'react';
interface Props {
    movies: CardDTO[];
    title: string;
}

interface ArrowProps {
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
}

const Card = ({movies, title} : Props) => {
    const navigate = useNavigate();
    const CustomPrevArrow:FC<ArrowProps> = (props) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{
                    ...style,
                    display: "block",
                    background: "silver",
                    border: "1px solid white",
                    borderRadius: "50%",
                    left: "-40px",
                    zIndex: 10
                }}
                onClick={onClick}
            />
        );
    };

    const CustomNextArrow:FC<ArrowProps> = (props) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{
                    ...style,
                    display: "block",
                    background: "silver",
                    border: "1px solid white",
                    borderRadius: "50%",
                    right: "-40px",
                    zIndex: 10
                }}
                onClick={onClick}
            />
        );
    };

    //Slider 세팅
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5, // 한 번에 보이는 개수
        slidesToScroll: 5, // 한 번에 넘어가는 개수
        arrows: true,
        draggable: true,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />
    };
    
    //상세 페이지 이동 함수
    const moveToDetail = (id:string, title:string, original_title:string, release_date:string, vote_average:number) => {
        navigate('/MovieDetail' , {
            state: {
                id : id,
                title : title,
                original_title : original_title,
                repRlsDate : release_date,
                vote_average : vote_average
            }
        });
    }

    const posterUrl = 'https://image.tmdb.org/t/p/original/';

    return(
        <div>
            <h1 className={styles['main-title']}>{title}</h1>
            <div className={styles['main-poster']}>
                <Slider {...settings}>
                    {movies.map((item) => (
                        <div key={item.id} className={`${styles['custom-slider-item']} slider-item`}>
                            <a href='' onClick={() =>
                                moveToDetail(item.id, item.title, item.original_title, item.release_date, item.vote_average
                                )}
                            >
                                <img
                                    src={posterUrl + item.poster_path}
                                    alt={cleanTitle(item.title)}
                                    className={`${styles['custom-slider-image']} slider-image`}
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