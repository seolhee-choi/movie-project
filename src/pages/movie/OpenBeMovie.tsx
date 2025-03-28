import axios from 'axios';
import { FC, useState, useEffect } from 'react';
import { CardDTO } from '../types/card';
import Card from '../components/Card';

const OpenBeMovie : FC = () => {
    const [ data, setData ] = useState<CardDTO[]>([]);

    useEffect(() => {
        const options = {
            method: 'GET',
            // url: 'https://api.themoviedb.org/3/authentication',
            url: 'https://api.themoviedb.org/3/movie/upcoming',
            params: {region: 'KR', language: 'ko-KR', page: '2'},
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
        <Card movies={data} title='👀 개봉예정작' />
    )
}

export default OpenBeMovie