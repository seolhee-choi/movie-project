import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { FC } from 'react';
import Header from './components/header/Header'
import Main from './pages/Main'
import MovieDetail from './pages/MovieDetail'
import SoundTrack from './pages/SoundTrack'


const App : FC = () => {
  return (
  <div className="App">
    <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/movieDetail" element={<MovieDetail />} />
            <Route path="/soundTrack" element={<SoundTrack />} />

        </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
