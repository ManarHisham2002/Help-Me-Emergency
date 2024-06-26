import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faTimes } from '@fortawesome/free-solid-svg-icons';
import { fa1, fa2, fa3, fa4, fa5, fa6, fa7, fa8, fa9 } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../Navbar/Navbar';
import Menu from '../Menu/Menu';
import Loading from '../Loading/Loading';
import InternetError from '../InternetError/InternetError';
import NoData from '../NoData/NoData';
import axios from 'axios';

const VideoPopup = ({ videoUrl, onClose, selectedVideo }) => {
    return (
        <div className='video-popup-overlay col-xl-11 col-lg-11 col-md-11 col-sm-11 col-11'>
            <div className='video-popup'>
                <button className='close-btn' onClick={onClose}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <div className='video-container'>
                    {selectedVideo ? (
                        <iframe src={videoUrl} title='Video Popup' allowFullScreen></iframe>
                    ) : (
                        <NoData message="This Video isn't Available" />
                    )}
                </div>
            </div>
        </div>
    );
};

const InfoEmergency = () => {
    const [emergencies, setEmergencies] = useState({
        loading: true,
        dataEmergencies: [],
        err: null,
    });
    useEffect(() => {
        setEmergencies({ ...emergencies, loading: true });
        axios.get('http://localhost:4121/api/emergency/all').then((response) => {
            setEmergencies({ ...emergencies, dataEmergencies: response.data, err: null, loading: false });
        }).catch((error) => {
            setEmergencies({ ...emergencies, loading: false, err: error.response.data.errors });
        })
    }, []);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const openPopup = (videoUrl) => {
        setSelectedVideo(videoUrl);
    };
    const closePopup = () => {
        setSelectedVideo(null);
    };
    const { id } = useParams();
    const selectedItem = emergencies.dataEmergencies.find(master => master.id === parseInt(id, emergencies.dataEmergencies.length + 1));
    const iconComponents = [fa1, fa2, fa3, fa4, fa5, fa6, fa7, fa8, fa9];
    return (
        <>
            <Navbar activePage='/emergency' />
            {emergencies.loading ? (
                <Loading />
            ) : emergencies.err ? (
                <InternetError />
            ) : (
                selectedItem ? (
                    <div className='informationEmergency'>
                        <div className='container'>
                            <div className='row'>
                                        <div className='col-xl-11 col-lg-11 col-md-11 col-sm-11 col-11'>
                                    <div className='video-list'>
                                        <div className='video-item' onClick={() => openPopup(selectedItem.video)}>
                                            <button className='play-btn'>
                                                <FontAwesomeIcon icon={faPlay} className='icon' />
                                            </button>
                                        </div>
                                        {selectedVideo && (
                                            <VideoPopup videoUrl={selectedVideo} onClose={closePopup} selectedVideo={true}/>
                                        )}
                                    </div>
                                    <div id='product' className='block-5 space-between-blocks'>
                                        <div className='container'>
                                            <div className='col-lg-8 col-xl-7 mx-auto text-center mb-5'>
                                                <h1 className='highlight'>{selectedItem.title}</h1>
                                            </div>
                                            <div className='row align-items-center flex-column flex-lg-row px-2'>
                                                <div className='col-lg-4'>
                                                    {selectedItem.steps.slice(0, (selectedItem.steps.length / 2)).map((step, index) => (
                                                        <div key={index} className='card-2 d-flex flex-xl-row flex-lg-row flex-md-row flex-sm-row flex-row'>
                                                <div>
                                                    <span className='card-2__symbol mx-auto'>
                                                        <FontAwesomeIcon icon={iconComponents[step.num - 1]} className='emergencyStepsIcon' />
                                                    </span>
                                                </div>
                                                <div className='px-2'></div>
                                                <div>
                                                    <h3 className='card-2__title mb-2'>{step.title}</h3>
                                                </div>
                                            </div>
                                                    ))}
                                                </div>
                                                <div className='col-lg-4 my-5 text-center'>
                                                    <img src={selectedItem.imgSteps} alt={selectedItem.title} className='w-75' />
                                                </div>
                                                <div className='col-lg-4'>
                                                    {selectedItem.steps.slice((selectedItem.steps.length / 2)).map((step, index) => (
                                                        <div key={index} className='card-2 d-flex'>
                                                            <div>
                                                                <span className='card-2__symbol mx-auto'>
                                                                    <FontAwesomeIcon icon={iconComponents[step.num - 1]} className='my-icon' />
                                                                </span>
                                                            </div>
                                                            <div className='px-2'></div>
                                                            <div>
                                                                <h3 className='card-2__title mb-2'>{step.title}</h3>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div >
                                        </div>
                                    </div>
                                </div>
                                <Menu />
                            </div>
                        </div>
                    </div>
                ) : (
                    <NoData message='No Disease Data Available' />
                )
            )}
        </>
    );
};

export default InfoEmergency;
