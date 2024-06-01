import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoIosArrowForward } from "react-icons/io";
import { Link } from 'react-router-dom';
import './css/master.css';
import TapNavbar from '../TapNavbar/TapNavbar';
import Loading from '../Loading/Loading';
import InternetError from '../InternetError/InternetError';
import NoData from '../NoData/NoData';

const Master = () => {
    const [emergencies, setEmergencies] = useState({
        loading: true,
        dataEmergencies: [],
        err: null,
        reload: 0,
    });
    useEffect(() => {
        setEmergencies(prevState => ({ ...prevState, loading: true }));
        axios.get('http://localhost:4121/api/emergency/all')
            .then((response) => {
                setEmergencies(prevState => ({ ...prevState, dataEmergencies: response.data, err: null, loading: false }));
            })
            .catch((error) => {
                setEmergencies(prevState => ({ ...prevState, loading: false, err: error.message }));
            })
    }, []);
    return (
        <>
            <div className="row">
                <div className="col-lg-3 col-md-4 col-sm-6 leftSideMasterDescription">
                    <div className='mt-5 containerLogoMaster'>
                        <div className='leftSideLogoMaster'>
                            <img src={require('./img/logo.png')} alt='Help Me/Emergency' />
                        </div>
                    </div>
                    <div className='leftSideDescriptionParagraph'>
                        <span>Help Me/Emergency </span>
                        helps you treat emergency cases initially until the ambulance arrives.
                        You can guess your illness and treatment based on symptoms,
                        learn first aid and how to perform it, know information about diseases,
                        how to prevent them, and how to deal with those affected.
                        You can find out the pharmacies near you to facilitate ordering your medicine.
                    </div>
                </div>
                <div className="col-lg-9 col-md-8 col-sm-6 firstAid">
                    <div className='cardTitle'><span>First Aid </span></div>
                    <div className="row">
                        <div className="center">
                            {emergencies.loading ? (
                                <Loading />
                            ) : emergencies.err ? (
                                <InternetError />
                            ) : (
                                emergencies.dataEmergencies && emergencies.dataEmergencies.length > 0 ? (
                                    emergencies.dataEmergencies.map((Val, index) => (
                                        <div className="article-card col-lg-4 col-md-4 col-sm-6" key={index}>
                                            <Link to={`/master/${Val.id}`} className="content">
                                                <p className="titleState">{Val.title}</p>
                                                <IoIosArrowForward className="arrow-icon" />
                                            </Link>
                                            <img src={Val.imgMaster} alt={Val.title} />
                                        </div>
                                    ))
                                ) : (
                                    <NoData message="No Pharmacy Data Available" />
                                )
                            )}
                        </div>
                    </div>
                    <TapNavbar />
                </div>
            </div>
        </>
    );
}
export default Master;