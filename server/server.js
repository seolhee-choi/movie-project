require('dotenv').config();
const express = require('express')
const app = express()
const path = require('path')
const port = 8080

const cors = require('cors')
const SpotifyWebApi = require('spotify-web-api-node')
// const bodyParser = require('body-parser')-> express.json과 중복


app.use(express.json());
app.use(cors());
// app.use(bodyParser.json()) -> express.json과 중복



app.post('/refresh', (req,res) => {
    const refreshToken = req.body.refreshToken;
    const spotifyApi = new SpotifyWebApi({
        redirectUri : 'http://localhost:3000',
        clientId : process.env.SPOTIFY_CLIENT_ID,
        clientSecret : process.env.SPOTIFY_CLIENT_SECRET,
        refreshToken : refreshToken
    })

    spotifyApi
        .refreshAccessToken()
        .then((data) => {
            res.json({
                accessToken: data.body.access_token,
                expiresIn: data.body.expires_in,
            });
        })
        .catch((err) => {
            res.sendStatus(400);
            console.log('access token을 refresh할 수 없다', err);
        })
})

app.post('/login', (req,res) => {
    // console.log('Received body:', req.body); // 🔥 콘솔에 body 값 출력
    const code = req.body.code;
    // console.log('Received code:', code); // 🔥 콘솔에 code 값 출력

    if (!code) {
        return res.status(400).json({ error: 'Authorization code is missing' });
    }

    const spotifyApi = new SpotifyWebApi({
        // redirectUri : 'http://localhost:3000',
        redirectUri : 'http://localhost:3000/spotifyMusic',
        clientId : process.env.SPOTIFY_CLIENT_ID,
        clientSecret : process.env.SPOTIFY_CLIENT_SECRET
    })
    
    spotifyApi
        .authorizationCodeGrant(code)
        .then((data) => {
            res.json({
                accessToken: data.body.access_token,
                refreshToken: data.body.refresh_token,
                expiresIn: data.body.expires_in,
            });
        })
        .catch((err) => {
            // console.log('SPOTIFY API ERROR: ',err);
            res.sendStatus(400);
        })
    
})

//React의 build된 내용을 사용하겠다는 의미
app.use(express.static(path.join(__dirname, '../build')));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../build/index.html'))
})



//React Router를 쓰기 위한 선언
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../build/index.html'))
})

app.listen(port);