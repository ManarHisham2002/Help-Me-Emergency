import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoIosArrowForward } from "react-icons/io";
import { Link } from 'react-router-dom';
import './css/emergency.css'
import Navbar from '../Navbar/Navbar';
import Menu from '../Menu/Menu';
import Loading from '../Loading/Loading';
import InternetError from '../InternetError/InternetError';
import NoData from '../NoData/NoData';
const Emergency = () => {
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
    return (
        <>
            <Navbar activePage='/emergency' />
            <div className="emergencyCard">
                <div className='container-fluid'>
                    <div className='row'>
                        <div className="centerEmergency">
                            <div className='container text-center'>
                                {emergencies.loading ? (
                                    <Loading />
                                ) : emergencies.err ? (
                                    <InternetError />
                                ) : (
                                    emergencies.dataEmergencies && emergencies.dataEmergencies.length > 0 ? (
                                        <div className='row'>
                                            {emergencies.dataEmergencies.map((Val, index) => (
                                                <div className="article-cardEmergency col-sm-6 col-md-4 col-lg-3" key={index}>
                                                    <Link to={`/emergency/${Val.id}`} className="content">
                                                        <p className="titleState">{Val.title}</p>
                                                        <IoIosArrowForward className="arrow-icon" />
                                                    </Link>
                                                    <img src={Val.imgMaster} alt={Val.title} />
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <NoData message="No Emergency Data Available" />
                                    )
                                )}
                            </div>
                        </div>
                        <Menu />
                    </div>
                </div>
            </div>
        </>
    );
};
export default Emergency;
