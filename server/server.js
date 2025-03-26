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

app.get('/api/youtube', async (req, res) => {
    try {
        console.log(req.query)
        const query = req.query.q || 'movie soundtrack'; // 검색어 (영화 OST 제목)
        const params = {
            part: 'snippet',
            maxResult: 10,
            q: query,
            type: 'video',
            key: process.env.YOUTUBE_API_KEY
        }

        const queryString = new URLSearchParams(params).toString();
        const url = `https://www.googleapis.com/youtube/v3/search?${queryString}`;

        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data from YouTube API');
    }
});


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