import React, { FC } from 'react';
import {TrackDTO} from '../../pages/types/track';

interface TrackSearchResultProps {
    track : TrackDTO,
    chooseTrack : (track : TrackDTO) => void;
}

// const TrackSearchResult: FC<{track:TrackDTO}> = ({ track , chooseTrack }) => {
const TrackSearchResult: FC<TrackSearchResultProps> = ({ track , chooseTrack }) => {

    const handlePlay = () => {
        chooseTrack(track)
    }

    return(
        <div className='d-flex m-2 align-items-center'
             style={{cursor: 'pointer'}}
             onClick={handlePlay}
        >
            <img src={track.albumUrl} style={{height: '64px', width: '64px'}} />
            <div className='ml-3'>
                <div>{track.title}</div>
                <div className='text-muted'>{track.artist}</div>
            </div>
        </div>
    )
};

export default TrackSearchResult;