import axios from 'axios';
import { FC, useState, useEffect } from 'react';
import { CardDTO } from './types/card';
import Card from './components/Card'

const BestMovie : FC = () => {
    const [ data, setData ] = useState<CardDTO[]>([]);

    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/movie/top_rated',
            params: {region: 'KR', language: 'ko-KR', page: '1'},
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${process.env.REACT_APP_TMDB_HEADER_KEY}`
            }
        };

        axios
            .request(options)
            .then(res => {
                setData(res.data.results);
            })
            .catch(err => console.error(err));

    },[])


    return(
        <Card movies={data} title="🏆 세기의 명작" />
    )
}

export default BestMovie