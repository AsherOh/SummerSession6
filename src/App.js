import './App.css';
import Banner from './components/Banner';
import Nav from './components/Nav';
import Row from './components/Row';
import requests from './api/requests';
import Footer from './components/Footer';
import { Route, Outlet, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import SearchPage from './pages/SearchPage';

const Layout = () => {
    return (
        <div>
            <Nav />

            <Outlet />

            <Footer />
        </div>
    );
}

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<MainPage />}></Route>
                    <Route path=':movieId' element={<DetailPage />}></Route>
                    <Route path='search' element={<SearchPage />}></Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
