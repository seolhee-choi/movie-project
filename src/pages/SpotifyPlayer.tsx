import React, { useContext, useEffect, useState } from 'react';
import SpotifyContext from '../context/SpotifyContext'

const SpotifyPlayer = () => {
    const spotifyContext = useContext(SpotifyContext);
    const accessToken = spotifyContext?.accessToken;
    const tracks = spotifyContext?.tracks || [];

    const [player, setPlayer] = useState<any>(null);
    const [deviceId, setDeviceId] = useState<string | null>(null);

    useEffect(() => {
        if (!accessToken) return;

        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            // window.onSpotifyWebPlaybackSDKReady = () => {
            //     const spotifyPlayer = new window.Spo
            // }
        }
    })
}
export default SpotifyPlayer