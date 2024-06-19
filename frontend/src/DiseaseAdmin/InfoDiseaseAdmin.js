import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';
import InternetError from '../InternetError/InternetError';
import NoData from '../NoData/NoData';

const InfoDiseaseAdmin = () => {
    const [diseases, setDiseases] = useState({
        loading: true,
        dataDiseases: [],
        err: null,
    });

    const { id } = useParams();

    useEffect(() => {
        setDiseases({ ...diseases, loading: true });
        axios.get('http://localhost:4121/api/diseases/all').then((response) => {
            setDiseases({ ...diseases, dataDiseases: response.data, err: null, loading: false });
        }).catch((error) => {
            setDiseases({ ...diseases, loading: false, err: error.response.data.errors });
        });
    }, []);

    const diseaseDetails = diseases.dataDiseases.find(disease => disease.id === parseInt(id, diseases.dataDiseases.length + 1));
    return (
        <div className='infoCardAdmin'>
            {diseases.loading ? (
                <Loading />
            ) : diseases.err ? (
                <InternetError />
            ) : (
                diseaseDetails ? (
                    <div className='profile-card'>
                        {/* <header>
                            <img src={diseaseDetails.imgSrc} alt={diseaseDetails.name} />
                            <h1>{diseaseDetails.name}</h1>
                        </header> */}
                        <div className='blog-container'>
                            <div className='blog-card'>
                                <div className='meta'>
                                    <div className='photo'>
                                        <img src={diseaseDetails.imgSrc} alt={diseaseDetails.name} />
                                    </div>
                                </div>
                                <div className='description'>
                                    <h2>Category: <h3>{diseaseDetails.name}</h3></h2>
                                    <h2>Information of Disease</h2>
                                    {diseaseDetails.videos.map((item, index) => (
                                        <div key={index}>
                                            <h2>Video {index + 1}:</h2>
                                            <h2>Title: <h3>{item.title}</h3></h2>
                                            <h2>Evaluation: <h3>{item.rang}</h3></h2>
                                            <div className='d-block'>
                                                <h2>Link: <h3>{item.url}</h3></h2>
                                            </div>
                                        </div>
                                    ))}
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

export default InfoDiseaseAdmin;
