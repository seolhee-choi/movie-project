import axios from 'axios';
import { FC, useState, useEffect } from 'react';
import { CardDTO } from '../types/card';
import Card from '../components/Card';

const BoxOfficeMovie : FC = () => {
    const [ data, setData ] = useState<CardDTO[]>([]);

    useEffect(() => {
        const options = {
            method: 'GET',
            // url: 'https://api.themoviedb.org/3/authentication',
            // url: 'https://api.themoviedb.org/3/movie/now_playing',
            url: 'https://api.themoviedb.org/3/trending/movie/day',
            // url: 'https://api.themoviedb.org/3/movie/popular',
            params: {region: 'KR', language: 'ko-KR'},
            headers: {
                accept: 'application/json',
                Authorization: `${process.env.REACT_APP_TMDB_HEADER_KEY}`
            }
        };

        axios
            .request(options)
            .then(res => {
                const result = res.data.results;
                const filteredResult = result.filter((item: any) => item.poster_path);

                if(filteredResult.length > 0) {
                    setData(filteredResult);
                }
            })
            .catch(err => console.error(err));

    },[])


    return(
        <Card movies={data} title='🎥 박스오피스 20' />
    )
}

export default BoxOfficeMovie