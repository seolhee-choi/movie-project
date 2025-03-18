import React, { createContext, useEffect, useState, ReactNode } from "react";

interface SpotifyContextType {
    accessToken : string | null
    tracks: any[]
}

export const SpotifyContext = createContext<SpotifyContextType | undefined>(undefined);
const SpotifyProvider = ({ children } : {children: ReactNode}) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [tracks, setTracks] = useState<any[]>([]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.hash.substring(1));
        const token = params.get("access_token");

        if (token) {
            setAccessToken(token);
            // window.history.pushState({},null, "/");
        } else {
            fetchToken();
        }
    }, []);

    const fetchToken = async () => {
        try {
            const response = await fetch("http://localhost:8080/login");
            const data = await response.json();
            setAccessToken(data.access_token);
        } catch (error) {
            console.log("Error fetching token: ", error);
        }
    }

    useEffect(() => {
        if (!accessToken) return;

        const fetchTracks = async () => {
            try {
                const response = await fetch("https://api.spotify.com/v1/me/top/tracks", {
                    headers: { Authorization: `Bearer ${accessToken}`}
                });
                const data = await response.json();
                setTracks(data.items || []);
            } catch (error) {
                console.error("Error fetching tracks: ",error);
            }
        };

        fetchTracks();
    }, [accessToken]);

    return (
        <SpotifyContext.Provider value={{ accessToken, tracks}} >
            {children}
        </SpotifyContext.Provider>
    );
};

export default SpotifyContext;
