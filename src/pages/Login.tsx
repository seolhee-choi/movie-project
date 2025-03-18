import React, { FC } from 'react';
import { Container } from 'react-bootstrap';

const AUTH_URL = "https://accounts.spotify.com/authorize?" +
    "client_id=6b0e313758374c74a8a7a6aff1ff6124&response_type=code&redirect_uri=http://localhost:3000&" +
    "scope=streaming%20user-read-email%20user-read-private%20user-library-read%20" +
    "user-library-modify%20user-read-playback-state%20user-modify-playback-state";

const Login: FC = () => {
    return <Container className="d-flex justify-content-center align-items-center">
        <a className="btn btn-success btn-lg" href={AUTH_URL}>스포티파이 로그인</a>
    </Container>
};

export default Login;
