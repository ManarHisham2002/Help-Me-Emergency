import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './css/disease.css';
import Navbar from '../Navbar/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';
import Menu from '../Menu/Menu';
import Loading from '../Loading/Loading';
import InternetError from '../InternetError/InternetError';
import NoData from '../NoData/NoData';
import axios from 'axios';

const InfoDisease = () => {
    const [diseases, setDiseases] = useState({
        loading: true,
        dataDiseases: [],
        err: null,
    });

    const { diseaseId } = useParams();

    useEffect(() => {
        setDiseases({ ...diseases, loading: true });
        axios.get('http://localhost:4121/api/diseases/all').then((response) => {
            setDiseases({ ...diseases, dataDiseases: response.data, err: null, loading: false });
        }).catch((error) => {
            setDiseases({ ...diseases, loading: false, err: error.response.data.errors });
        });
    }, []);

    const diseaseDetails = diseases.dataDiseases.find(disease => disease.id === parseInt(diseaseId, 10));
    const [selectedVideo, setSelectedVideo] = useState(null);

    useEffect(() => {
        if (diseaseDetails) {
            setSelectedVideo(diseaseDetails.videos[0]);
        }
    }, [diseaseDetails]);

    useEffect(() => {
        const maxMenuHeight = 675;
        $('.menu').css({
            maxHeight: `${maxMenuHeight}px`,
            overflowY: 'auto',
        });
    }, []);

    const handleThumbClick = (video) => {
        setSelectedVideo(video);
    };

    return (
        <div>
            <Navbar activePage='/disease' />
            {diseases.loading ? (
                <Loading />
            ) : diseases.err ? (
                <InternetError />
            ) : (
                diseaseDetails ? (
                    <div id="video" className="our-videos section">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-11 col-sm-11 col-md-11">
                                    <div className="naccs">
                                        <div className="row">
                                            <div className="col-lg-8 col-sm-11 col-md-11">
                                                <ul className="nacc">
                                                    <li className="list active">
                                                        <div>
                                                            <div className="thumb">
                                                                {selectedVideo && (
                                                                    <iframe
                                                                        width="100%"
                                                                        height="auto"
                                                                        src={selectedVideo.url}
                                                                        title="YouTube video player"
                                                                        frameBorder="0"
                                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                        allowFullScreen
                                                                    ></iframe>
                                                                )}
                                                                <div className="overlay-effect">
                                                                    {selectedVideo && (
                                                                        <>
                                                                            <h4>{selectedVideo.title}</h4>
                                                                            <span><RatingStars rating={selectedVideo.rang} /></span>
                                                                        </>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-lg-4 col-sm-11 col-md-11">
                                                <div className="menu">
                                                    {diseaseDetails.videos.map((video, index) => (
                                                        <div
                                                            key={index}
                                                            className={video === selectedVideo ? 'active' : ''}
                                                            onClick={() => handleThumbClick(video)}
                                                        >
                                                            <div className="thumb">
                                                                <img src={diseaseDetails.imgSrc} alt={video.title} />
                                                                <div className="inner-content">
                                                                    <h4>{video.title}</h4>
                                                                    <span>{video === selectedVideo ? 'Currently Playing' : ''}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Menu />
                            </div>
                        </div>
                    </div>
                ) : (
                    <NoData message="No Disease Data Available" />
                )
            )}
        </div>
    );
};

const RatingStars = ({ rating }) => {
    const filledStars = Math.max(0, Math.min(5, Math.round(rating)));
    const emptyStars = 5 - filledStars;

    return (
        <div className="rating-stars">
            {[...Array(filledStars)].map((_, index) => (
                <FontAwesomeIcon key={index} icon={faStar} style={{ color: 'gold' }} />
            ))}
            {[...Array(emptyStars)].map((_, index) => (
                <FontAwesomeIcon key={filledStars + index} icon={faStar} style={{ color: 'gray' }} />
            ))}
        </div>
    );
};

export default InfoDisease;
