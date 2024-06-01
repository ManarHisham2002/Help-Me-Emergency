import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/master.css';
import { useParams } from 'react-router-dom';
import TapNavbar from '../TapNavbar/TapNavbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fa1 , fa2, fa3, fa4, fa5, fa6, fa7, fa8, fa9 } from '@fortawesome/free-solid-svg-icons';
import NoData from '../NoData/NoData';
import InternetError from '../InternetError/InternetError';

function InfoMaster() {
    const [emergencies, setEmergencies] = useState({
        loading: true,
        dataEmergencies: [],
        err: null,
        reload: 0,
    });
    useEffect(() => {
        setEmergencies({ ...emergencies, loading: true });
        axios.get('http://localhost:4121/api/emergency/all').then((response) => {
            setEmergencies({ ...emergencies, dataEmergencies: response.data, err: null, loading: false });
        }).catch((error) => {
            setEmergencies({ ...emergencies, loading: false, err: error.response.data.errors });
        })
    }, []);
    const { id } = useParams();
    const itemId = parseInt(id, emergencies.dataEmergencies.length);
    if (isNaN(itemId)) {
        return <NoData message="No Emergency Data Available" />;
    }
    const selectedItem = emergencies.dataEmergencies.find(master => master.id === itemId);
    const iconComponents = [fa1, fa2, fa3, fa4, fa5, fa6, fa7, fa8, fa9];
    return (
        <>
            {selectedItem ? (
                <>
                    <div id="product" className="block-5 space-between-blocks">
                        <div className="container">
                            <div className="col-lg-8 col-xl-7 mx-auto text-center mb-5">
                                <h1 className="highlight">{selectedItem.title}</h1>
                            </div>
                            <div className="row align-items-center flex-column-reverse flex-lg-row px-2">
                                <div className="col-lg-4">
                                    {selectedItem.steps.slice(0, (selectedItem.steps.length / 2)).map((step, index) => (
                                        <div key={index} className="card-2 d-flex flex-row flex-lg-row-reverse">
                                            <div>
                                                <span className="card-2__symbol mx-auto">
                                                    <FontAwesomeIcon icon={iconComponents[step.num - 1]} className="emergencyStepsIcon"/>
                                                </span>
                                            </div>
                                            <div className="px-2"></div>
                                            <div>
                                                <h3 className="card-2__title mb-2">{step.title}</h3>
                                                <p className="card-2__paragraph">{step.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="col-lg-4 my-5 text-center">
                                    <img src={selectedItem.imgSteps} alt={selectedItem.title} className="w-75" />
                                </div>
                                <div className="col-lg-4">
                                    {selectedItem.steps.slice((selectedItem.steps.length / 2)).map((step, index) => (
                                        <div key={index} className="card-2 d-flex">
                                            <div>
                                                <span className="card-2__symbol mx-auto">
                                                    <FontAwesomeIcon icon={iconComponents[step.num - 1]} className="my-icon" />
                                                </span>
                                            </div>
                                            <div className="px-2"></div>
                                            <div>
                                                <h3 className="card-2__title mb-2">{step.title}</h3>
                                                <p className="card-2__paragraph">{step.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div >
                        </div>
                    </div>
                    <TapNavbar />
                </>
            ) : (<InternetError />)}
        </>
    );
}

export default InfoMaster;