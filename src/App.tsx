import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FC, useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header'
import Footer from './components/footer/Footer';
import Main from './pages/Main'
import SpotifyContext from './context/SpotifyContext'
import TotalDetail from './pages/TotalDetail';
import ScrollToTop from './pages/components/ScrollToTop';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const code = new URLSearchParams(window.location.search).get('code');
const App : FC = () => {

    return (
        // <SpotifyContext>
        <div className="App">
            {code ? <Dashboard code={code} /> : <Login />}
            <Header />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/movieDetail" element={<TotalDetail />} />
                    {/*<Route path="/spotifyPlayer" element={<SpotifyPlayer />} />*/}
                </Routes>
            </BrowserRouter>
            <ScrollToTop />
            <Footer />
        </div>
        // </SpotifyContext>
    );
}

export default App;
