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
        const query = req.query.q || 'movie soundtrack'; // 검색어 (영화 OST 제목)
        const params = {
            part: 'snippet',
            maxResult: 20,
            q: query,
            type: 'video',
            key: process.env.YOUTUBE_API_KEY,
            order: 'date'
        }
        
        const getUrl = (params) => {
            const queryString = new URLSearchParams(params).toString();
            return `https://www.googleapis.com/youtube/v3/search?${queryString}`;
        }

        let results = [];
        let url = getUrl(params);

        /* 첫 번째 fetch 요청 */
        const response = await fetch(url);
        const data = await response.json();
        results = data.items;


        /* 두 번째 fetch 요청 */
        if (data.nextPageToken) {
            const nextParams = { ...params, pageToken: data.nextPageToken};
            const nextUrl = getUrl(nextParams);
            const nextResponse = await fetch(nextUrl);
            const nextData = await nextResponse.json();

            results = [...results, ...nextData.items];
        }
        
        res.json(results);// 클라이언트로 결과 전달
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