import {useEffect, useState} from 'react';
import axios from 'axios'
const UseAuth = (code:string | null) => {
    const [ accessToken, setAccessToken ] = useState();
    const [ refreshToken, setRefreshToken ] = useState();
    const [ expiresIn, setExpiresIn ] = useState<number>();

    useEffect(() => {
        if (!code) return;

        axios
            .post('http://localhost:8080/login', {code})
            .then(res => {
                setAccessToken(res.data.accessToken);
                setRefreshToken(res.data.refreshToken);
                // setExpiresIn(61);
                setExpiresIn(res.data.expiresIn);
                window.history.pushState({}, '', '/spotifyMusic');
            })
            .catch((err) => {
                // window.location.href = '/'
                console.error(err);
            })
    }, [code])

    useEffect(() => {
        if (!refreshToken || !expiresIn) return;
        // const timeout = setTimeout(() => {
        const interval = setInterval(() => {

        axios
            .post('http://localhost:8080/refresh', {refreshToken})
            .then(res => {
                setAccessToken(res.data.accessToken);
                // setExpiresIn(61);
                setExpiresIn(res.data.expiresIn);
            })
            .catch((err) => {
            // window.location.href = '/'
                console.error(err);
            })
        }, (expiresIn - 60) * 1000)

        // return () => clearTimeout(timeout);
        return () => clearInterval(interval);
    }, [refreshToken, expiresIn])

    return accessToken;
};

export default UseAuth;
