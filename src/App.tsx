import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { FC } from 'react';
import Header from './components/header/Header'
import Footer from './components/footer/Footer';
import Main from './pages/Main'
import MovieDetail from './pages/old/MovieDetail'
import DetailMovie from './pages/DetailMovie'
import SoundTrack from './pages/SoundTrack'
import BoxOfficeMovie from "./pages/BoxOfficeMovie";
import TotalDetail from "./pages/TotalDetail";


const App : FC = () => {
  return (
  <div className="App">
    <Header />
        <BrowserRouter>
            <Routes>
                {/*<Route path="/" element={<Main />} />*/}
                <Route path="/" element={<BoxOfficeMovie />} />
                {/*<Route path="/movieDetail" element={<MovieDetail />} />*/}
                {/*<Route path="/movieDetail" element={<DetailMovie />} />*/}
                <Route path="/movieDetail" element={<TotalDetail />} />
                <Route path="/soundTrack" element={<SoundTrack />} />
            </Routes>
        </BrowserRouter>
    <Footer />
  </div>
  );
}

export default App;
