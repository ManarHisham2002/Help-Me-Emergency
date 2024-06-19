import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';
import InternetError from '../InternetError/InternetError';
import NoData from '../NoData/NoData';

const EmergencyAdmin = () => {
    const [emergencies, setEmergencies] = useState({
        loading: true,
        dataEmergencies: [],
        err: null,
        reload: 0,
    });
    const navigate = useNavigate();

    useEffect(() => {
        setEmergencies({ ...emergencies, loading: true });
        axios.get('http://localhost:4121/api/emergency/all').then((response) => {
            setEmergencies({ ...emergencies, dataEmergencies: response.data, err: null, loading: false });
        }).catch((error) => {
            setEmergencies({ ...emergencies, loading: false, err: error.response.data.errors });
        })
    }, []);

    const handleCardClick = (id) => {
        navigate(`/emergencyAdmin/${id}`);
    };

    return (
        <>
            {emergencies.loading ? (
                <Loading />
            ) : emergencies.err ? (
                <InternetError />
            ) : emergencies.dataEmergencies && emergencies.dataEmergencies.length > 0 ? (
                <div className='container emergency'>
                    <div className='row'>
                        {emergencies.dataEmergencies.map((item) => (
                            <div className='col-12 col-sm-6 col-md-4 col-lg-3 mt-5' key={item.id} onClick={() => handleCardClick(item.id)}>
                                <div className='our-team'>
                                    <div className='picture'>
                                        <img className='img-fluid' src={item.imgMaster} alt={item.title} />
                                    </div>
                                    <div className='team-content'>
                                        <h3 className='name'>{item.title}</h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <NoData message='No Emergencies Available' />
            )}
        </>
    );
};

export default EmergencyAdmin;
