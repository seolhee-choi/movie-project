import './App.css';
import { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header'
import Footer from './components/footer/Footer';
import Main from './pages/Main'
import SoundTrack from './pages/SoundTrack'
import TotalDetail from './pages/TotalDetail';
import ScrollToTop from './pages/components/ScrollToTop';


const App : FC = () => {
  return (
  <div className="App">
    <Header />
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/movieDetail" element={<TotalDetail />} />
                <Route path="/soundTrack" element={<SoundTrack />} />
            </Routes>
        </BrowserRouter>
      <ScrollToTop />
    <Footer />
  </div>
  );
}

export default App;
