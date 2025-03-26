import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import  {FC} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './components/header/Header'
import Footer from './components/footer/Footer';
import Main from './pages/Main'
import TotalDetail from './pages/movie/TotalDetail';
import ScrollToTop from './pages/components/ScrollToTop';
import Music from './pages/Music';
import Login from './pages/music/Login';
import Youtube from './pages/youtube/Youtube';


// const code = new URLSearchParams(window.location.search).get('code');
const savedCode = sessionStorage.getItem('spotifyCode');
const App : FC = () => {

    return (
        <div className='App'>
            <Header />
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Main />} />
                    <Route path='/movieDetail' element={<TotalDetail />} />
                    <Route
                        path='/spotifyMusic'
                        element={savedCode ? <Music code={savedCode} /> :  <Login />}
                    />
                    <Route
                        path='/youtube'
                        element={<Youtube />}
                    />
                </Routes>
            </BrowserRouter>
            <ScrollToTop />
            <Footer />
        </div>
    );
}

export default App;
