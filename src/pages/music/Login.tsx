import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

const AUTH_URL = 'https://accounts.spotify.com/authorize?' +
    // 'client_id=6b0e313758374c74a8a7a6aff1ff6124&response_type=code&redirect_uri=http://localhost:3000&' +
    'client_id=6b0e313758374c74a8a7a6aff1ff6124&response_type=code&redirect_uri=http://localhost:3000/spotifyMusic&' +
    'scope=streaming%20user-read-email%20user-read-private%20user-library-read%20' +
    'user-library-modify%20user-read-playback-state%20user-modify-playback-state';

const Login = () => {
    const navigate = useNavigate();
    const [ code, setCode ] = useState('');
    console.log('code 값 확인:', code); // 🚀 code 값이 제대로 들어오는지 확인


    useEffect(() => {
        const urlCode = new URLSearchParams(window.location.search).get('code');
        if (urlCode && !code) {
            sessionStorage.setItem('spotifyCode', urlCode);
            setCode(urlCode);
            // navigate('/spotifyMusic');
        }
    }, [code]);

    useEffect(() => {
        if (code) {
            navigate('/spotifyMusic'); // `code`가 설정되었을 때만 navigate
        }
    }, [code, navigate]); // `code`가 변경되면 리디렉션 발생

    // return <Container className='d-flex justify-content-center align-items-center'>
    //     <a className='btn btn-success btn-lg' href={AUTH_URL}>스포티파이 로그인</a>
    // </Container>
    return (
        <div>
            <a className='btn btn-success btn-lg' href={AUTH_URL}>스포티파이 로그인</a>
        </div>
    )

};

export default Login;
