import "./Row.css";
import React, { useState, useEffect } from 'react';
import axios from "../api/axios";
import MovieModal from './MovieModal/index';
// swiper //
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar, A11y, Mousewheel } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function Row({ title, id, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [movieSelected, setMovieSelected] = useState({});

    useEffect(() => {
        fetchMovieData();
    }, [fetchUrl]);

    const fetchMovieData = async () => {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);
    };

    const handleClick = (movie) => {
        setModalOpen(true);
        setMovieSelected(movie);
    }

    const BASE_URL = "https://image.tmdb.org/t/p/original/"

    return (
        <section className="row">
            <h2>{title}</h2>
            {/* 슬라이더 */}
            <Swiper
                modules={[Navigation, Scrollbar, A11y, Mousewheel]}
                className="slider"
                // slidesPerView={7}
                navigation={true}
                speed={100}
                mousewheel={{
                    forceToAxis: true,
                }}
                breakpoints={{
                    1378: {
                        slidesPerView: 6,
                        slidesPerGroup: 6,
                    },
                    998: {
                        slidesPerView: 5,
                        slidesPerGroup: 5,
                    },
                    625: {
                        slidesPerView: 4,
                        slidesPerGroup: 4,
                    },
                    0: {
                        slidesPerView: 3,
                        slidesPerGroup: 3,
                    },
                }}

            >
                {/* <div className="slider">
                <div className="slider__arrow-left">
                    <span className="arrow">
                        {"<"}
                    </span>
                </div> */}
                {/* 영화 여러 개를 key 값을 이용해 반복문 돌리기 */}

                <div id={id} className="row__posters">
                    {movies.map((movie) => (
                        <SwiperSlide>
                            <img
                                key={movie.id}
                                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                                src={`${BASE_URL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                                loading="lazy"
                                alt={movie.name}
                                onClick={() => handleClick(movie)}
                            />
                        </SwiperSlide>
                    ))}
                </div>

                {/* <div className="slider__arrow-right">
                    <span className="arrow">
                        {">"}
                    </span>
                </div>
            </div> */}
            </Swiper>
            {/* 모달 넣기 */}
            {
                modalOpen && (
                    <MovieModal
                        {...movieSelected}
                        setModalOpen={setModalOpen}
                    />
                )
            }
        </section >
    )
}

export default Row;