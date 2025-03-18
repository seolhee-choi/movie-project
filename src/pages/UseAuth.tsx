import React, {useEffect, useState} from 'react';
import axios from 'axios'
const UseAuth = (code:string | null) => {
    const [ accessToken, setAccessToken ] = useState();
    const [ refreshToken, setRefreshToken ] = useState();
    const [ expiresIn, setExpiresIn ] = useState();

    useEffect(() => {
        if (!code) return;

        axios
            .post('http://localhost:8080/login', {code})
            .then(res => {
                setAccessToken(res.data.accessToken);
                setRefreshToken(res.data.refreshToken);
                setExpiresIn(res.data.expiresIn);
                window.history.pushState({}, '', '/');
            })
            .catch((err) => {
                // window.location.href = "/"
                console.error(err);
                alert('로그인 실패!!!')
            })
    }, [code])

    useEffect(() => {
        axios
            .post('http://localhost:8080/refresh', {refreshToken})
            .then(res => {
                setAccessToken(res.data.accessToken);
                setExpiresIn(res.data.expiresIn);
            })
            .catch((err) => {
            // window.location.href = "/"
                console.error(err);
                alert('리프레쉬 실패!!!')
        })
    }, [refreshToken, expiresIn])
    return accessToken;
};

export default UseAuth;
