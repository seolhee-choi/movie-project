import React, { FC, useEffect, useState } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

interface PlayerProps {
    //TODO
    //accessToken은 이미 Music.tsx에서 없는 경우 return값이 안오게 했는데도,
    //에러가 발생해서 null값으로도 타입설정함 - 확인필요
    accessToken: string | null;
    trackUri: string | null;
}
const Player: FC<PlayerProps> = ({ accessToken, trackUri }) => {
  const [play, setPlay] = useState<boolean>(false);

  useEffect(() => {
    setPlay(true);
  }, [trackUri]);

  if (!accessToken) return null;

  return (
    <SpotifyPlayer
      token={accessToken}
      showSaveIcon
      callback={(state) => {
        if (!state.isPlaying) {
          setPlay(false);
        }
      }}
      play={play}
      uris={trackUri ?? []}
    />
  );
};

export default Player;
