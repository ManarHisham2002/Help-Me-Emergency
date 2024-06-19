import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Loading/Loading';
import InternetError from '../InternetError/InternetError';
import NoData from '../NoData/NoData';


const DiseaseAdmin = () => {
    const [diseases, setDiseases] = useState({
        loading: true,
        dataDiseases: [],
        err: null,
    });
    const navigate = useNavigate();
    useEffect(() => {
        setDiseases({ ...diseases, loading: true });
        axios.get('http://localhost:4121/api/diseases/all').then((response) => {
            setDiseases({ ...diseases, dataDiseases: response.data, err: null, loading: false });
        }).catch((error) => {
            setDiseases({ ...diseases, loading: false, err: error.response.data.errors });
        });
    }, []);
    const handleCardClick = (id) => {
        navigate(`/diseaseAdmin/${id}`);
    };
    return (
        <>
            {diseases.loading ? (
                <Loading />
            ) : diseases.err ? (
                <InternetError />
            ) : diseases.dataDiseases && diseases.dataDiseases.length > 0 ? (
                <div className='container Disease'>
                    <div className='row'>
                        {diseases.dataDiseases.map((item) => (
                            <div className='col-12 col-sm-6 col-md-4 col-lg-3 mt-5' key={item.id} onClick={() => handleCardClick(item.id)}>
                                <div className='our-team'>
                                    <div className='picture'>
                                        <img className='img-fluid' src={item.imgSrc} alt={item.name} />
                                    </div>
                                    <div className='team-content'>
                                        <h3 className='name'>{item.name}</h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <NoData message='No Diseases Available' />
            )}
        </>
    );
};

export default DiseaseAdmin;
