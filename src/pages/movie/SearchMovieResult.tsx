import axios from 'axios';
import { FC, useState, useEffect } from 'react';
import { CardDTO } from '../types/card';
import Card from '../components/Card'

interface SearchMovieResultProps {
    searchQuery: string;
}
const SearchMovieResult : FC<SearchMovieResultProps> = ({searchQuery}) => {
    const [ data, setData ] = useState<CardDTO[]>([]);
    const [ cnt, setCnt ] = useState('');

    useEffect(() => {
        if (!searchQuery) return;

        const fetchMovies = async () => {
            try {
                const res = await axios.get("https://api.themoviedb.org/3/search/movie", {
                    params: {
                        query: searchQuery,
                        language: "ko-KR",
                    },
                    headers: {
                        accept: "application/json",
                        Authorization: `${process.env.REACT_APP_TMDB_HEADER_KEY}`,
                    },
                });

                const result = res.data.results.filter((item: any) => item.poster_path);
                setData(result.length > 0 ? result : []);
                setCnt(res.data.total_results);
            } catch (err) {
                console.error("영화 검색 API 요청 오류:", err);
            }
        };

        fetchMovies();
    }, [searchQuery]);


    return(
        // <Card movies={data} title='영화 검색결과' />
        <Card movies={data} title={`검색결과 총 ${cnt} 건`} />
    )
}

export default SearchMovieResult