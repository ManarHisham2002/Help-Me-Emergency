import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';
import InternetError from '../InternetError/InternetError';
import NoData from '../NoData/NoData';

const InfoPatient = () => {
    const { id } = useParams();
    const [patients, setPatients] = useState({
        loading: true,
        dataPatients: [],
        err: null,
    });

    useEffect(() => {
        setPatients({ ...patients, loading: true });
        axios.get('http://localhost:4121/api/patient/all')
            .then((response) => {
                setPatients({ ...patients, dataPatients: response.data, err: null, loading: false });
            })
            .catch((error) => {
                setPatients({ ...patients, loading: false, err: error.response.data.errors });
            });
    }, []);

    const selectedItem = patients.dataPatients.find(patient => patient.id === parseInt(id, patients.dataPatients.length + 1));
    return (
        <div className='infoCardAdmin'>
            {patients.loading ? (
                <Loading />
            ) : patients.err ? (
                <InternetError />
            ) : (
                selectedItem ? (
                        <div className='profile-card'>
                            <header>
                                <img src={selectedItem.photo} alt={selectedItem.name} />
                                <h1>{selectedItem.name}</h1>
                                <h3>{selectedItem.email}</h3>
                            </header>
                            <div className='blog-container'>
                                <div className='blog-card'>
                                    {/* <div className='meta'>
                                        <div className='photo'>
                                            <img src={selectedItem.imgSteps} alt={selectedItem.title} />
                                        </div>
                                    </div> */}
                                    <div className='description'>
                                        <h2>Gender: <h3>{selectedItem.gender}</h3></h2>
                                        <h2>Phone: <h3>{selectedItem.phone}</h3></h2>
                                        <h2>Admin: <h3>{selectedItem.isAdmin}</h3></h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                ) : (
                    <NoData message='No Patient Available' />
                )
            )}
        </div>
    );
};

export default InfoPatient;
