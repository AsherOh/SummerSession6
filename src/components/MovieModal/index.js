import React, { useState, useEffect, useRef } from "react";
import "./MovieModal.css";

const movieTrailer = require('movie-trailer');

function MovieModal({
    backdrop_path,
    title,
    overview,
    name,
    release_date,
    first_air_date,
    vote_average,
    setModalOpen
}) {
    // 모달 바깥 창 클릭시 닫기
    const outSection = useRef();
    const handleCloseModal = (e) => {
        if (e.target === outSection.current) setModalOpen(false);
    };
    // useEffect(() => {
    //     window.addEventListener("click", handleCloseModal);
    //     return () => {
    //         window.addEventListener("click", handleCloseModal);
    //     };
    // }, []);

    const [tailerId, setTailerId] = useState("");
    useEffect(() => {
        if (tailerId) {
            setTailerId("");
        } else {
            movieTrailer(title || name || "")
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTailerId(urlParams.get("v"));
                })
                .catch((e) => console.log(e))
        }
    }, []);

    return (
        <div className="presentation">
            <div className='wrapper-modal' ref={outSection} onClick={handleCloseModal}>
                <div className='modal'>
                    <span
                        className='modal-close'
                        onClick={() => setModalOpen(false)}
                    >
                        X
                    </span>

                    {tailerId ?
                        <iframe
                            width={"100%"}
                            height={"315"}
                            src={`https://www.youtube.com/embed/${tailerId}?autoplay=1`}>
                        </iframe>
                        : <img
                            className='modal__poster-img'
                            src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
                            alt="modal__poster-img"
                        />
                    }
                    <div className='modal__content'>
                        <p className='modal__details'>
                            <span className='modal__user_perc'>
                                100% for you
                            </span>
                            {release_date ? release_date : first_air_date}
                        </p>
                        <h2 className='modal__title'>{title ? title : name}</h2>
                        <p className='modal__overview'>평점 : {vote_average}</p>
                        <p className='modal__overview'>{overview}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieModal;