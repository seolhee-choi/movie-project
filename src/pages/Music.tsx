import {FC, useEffect, useState} from 'react';
import {TrackDTO} from './types/track';
import SpotifyWebApi from 'spotify-web-api-js';
import UseAuth from './music/UseAuth';
import Player from './music/Player'
import TrackSearchResult from './components/TrackSearchResult';
import {CardDTO} from "./types/card";
// import {play} from 'react-spotify-web-playback';
interface SpotifyProps {
    code : string | null
}

const spotifyApi = new SpotifyWebApi();

const Music: FC<SpotifyProps> = ({code}) => {
    const [ search, setSearch ] = useState('');
    const [ searchResult, setSearchResult ] = useState<TrackDTO[]>([]);
    const [ playingTrack, setPlayingTrack ] = useState<TrackDTO>();
    const accessToken = UseAuth(code);

    const chooseTrack = (track: TrackDTO) => {
        setPlayingTrack(track);
        setSearch('');
    }


    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
        console.log('accessToken: ',accessToken)
    }, [accessToken])
    // console.log(searchResult);


    useEffect(() => {
        if (!search) return setSearchResult([]);
        if (!accessToken) return;

        // const cancelRequest = { canceled: false};
        let cancel = false;

        spotifyApi.searchTracks(search)
            .then(res => {
                const tracks = res.tracks?.items ?? [];

                if (cancel) return;

                setSearchResult(tracks.map(track => {

                    const smallestAlbumImage = track.album.images.reduce(
                        (smallest, image) => {
                            // if(image.height < smallest.height){
                            if (image.height && smallest.height && image.height < smallest.height) {
                                return image;
                            }
                            return smallest;
                        },
                        track.album.images[0]
                    )

                    return {
                        artist: track.artists[0].name,
                        title: track.name,
                        uri : track.uri,
                        albumUrl: smallestAlbumImage.url
                    }
                }))
            })
        return () => {
            cancel = true;
        }
    }, [search, accessToken]);

    return (
        <div>
            <input
                type='search'
                placeholder='노래/아티스트 검색'
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <div className='flex-grow-1 my-2'>
                {searchResult.map(track => (
                    <TrackSearchResult track={track} key={track.uri} chooseTrack={chooseTrack}/>
                ))}
            </div>
            <div>
                <Player accessToken={accessToken ?? null} trackUri={playingTrack?.uri ?? null}/>
            </div>
        </div>
    )

}
export default Music