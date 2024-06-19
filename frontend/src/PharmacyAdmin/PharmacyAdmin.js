import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../Loading/Loading';
import InternetError from '../InternetError/InternetError';
import NoData from '../NoData/NoData';


const PharmacyAdmin = () => {
    const [pharmacies, setPharmacies] = useState({
        loading: true,
        dataPharmacies: [],
        err: null,
    });

    useEffect(() => {
        setPharmacies(prevState => ({ ...prevState, loading: true }));
        axios.get('http://localhost:4121/pharmacy/all')
            .then((response) => {
                setPharmacies(prevState => ({ ...prevState, dataPharmacies: response.data, err: null, loading: false }));
            })
            .catch((error) => {
                setPharmacies(prevState => ({ ...prevState, loading: false, err: error.message }));
            });
    }, []);

    return (
        <>
            {pharmacies.loading ? (
                <Loading />
            ) : pharmacies.err ? (
                <InternetError />
            ) : pharmacies.dataPharmacies && pharmacies.dataPharmacies.length > 0 ? (
                <div className='container Disease'>
                    <div className='row'>
                        {pharmacies.dataPharmacies.map((item) => (
                            <div className='col-12 col-sm-6 col-md-4 col-lg-3   mt-5' key={item.id}>
                                <div className='our-team'>
                                    <div className='picture'>
                                        <img className='img-fluid' src={require('./img/pharmacyPhoto.jpg')} alt={item.name} />
                                    </div>
                                    <div className='team-content'>
                                        <h3 className='name'>{item.name}</h3>
                                        <h4 className='title'>{item.phone}</h4>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <NoData message='No Pharmacies Available' />
            )}
        </>
    );
};

export default PharmacyAdmin;
