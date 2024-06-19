import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/disease.css';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Menu from '../Menu/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Loading from '../Loading/Loading';
import InternetError from '../InternetError/InternetError';
import NoData from '../NoData/NoData';

const Disease = () => {
    const [diseases, setDiseases] = useState({
        loading: true,
        dataDiseases: [],
        err: null,
        reload: 0,
    });

    const [diseasesToShow, setDiseasesToShow] = useState(8);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        setDiseases({ ...diseases, loading: true });
        axios.get('http://localhost:4121/api/diseases/all').then((response) => {
            setDiseases({ ...diseases, dataDiseases: response.data, err: null, loading: false });
            setFilteredData(response.data);
        }).catch((error) => {
            setDiseases({ ...diseases, loading: false, err: error.response.data.errors });
        });
    }, []);

    const totalDiseases = searchQuery ? filteredData.length : diseases.dataDiseases.length;

    const handleMoreDiseases = () => {
        setDiseasesToShow((prevDiseases) => Math.min(prevDiseases + 4, totalDiseases));
    };

    const handleLessDiseases = () => {
        setDiseasesToShow((prevDiseases) => Math.max(prevDiseases - 4, 4));
    };

    const showMoreButton = diseasesToShow < totalDiseases;
    const showLessButton = diseasesToShow > 8;

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query) {
            const filteredResult = diseases.dataDiseases.filter(item =>
                item.name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredData(filteredResult);
        } else {
            setFilteredData(diseases.dataDiseases);
        }
    };

    const dataToDisplay = searchQuery ? filteredData : diseases.dataDiseases;

    return (
        <>
            <Navbar activePage='/disease' />
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-xl-11 col-lg-11 col-md-11 col-sm-11 col-11 diseasePage mt-5'>
                        <div className='disease'>
                            <div className='container text-center'>
                                {diseases.loading ? (
                                    <Loading />
                                ) : diseases.err ? (
                                    <InternetError />
                                ) : (
                                    <>
                                        <div className='row'>
                                            <div className='col-xl-11 col-lg-11 col-md-11 col-sm-11 col-11 searchField '>
                                                <input
                                                    type='text'
                                                    placeholder='Disease'
                                                    value={searchQuery}
                                                    onChange={handleSearch}
                                                />
                                                <FontAwesomeIcon icon={faSearch} className='fa-search-disease' />
                                            </div>
                                        </div>
                                        {dataToDisplay && dataToDisplay.length > 0 ? (
                                            <div className='row'>
                                                {dataToDisplay.slice(0, diseasesToShow).map((Val, index) => (
                                                    <div className='col-6 col-sm-6 col-md-4 col-lg-3 col-xl-3 w-sm-auto' key={index}>
                                                        <div className='box mb-3'>
                                                            <Link to={`/disease/${Val.id}`} data-disease={Val.name}>
                                                                <img src={Val.imgSrc} className='img-fluid' alt={Val.name} />
                                                                <div className='overlay-text-disease'>
                                                                    <p>{Val.name}</p>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                ))}
                                                <div className='d-flex justify-content-md-end justify-content-sm-center mb-5'>
                                                    {showMoreButton && (
                                                        <button type='button' className='btn rounded-pill main-btn mx-1' onClick={handleMoreDiseases}>
                                                            More
                                                        </button>
                                                    )}
                                                    {showLessButton && (
                                                        <button type='button' className='btn rounded-pill main-btn mx-1 ms-md-auto' onClick={handleLessDiseases}>
                                                            Less
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <NoData message={`${searchQuery} isn't Found`} />
                                        )}
                                    </>
                                )
                                }
                            </div>
                        </div>
                    </div>
                    <Menu />
                </div>
            </div>
        </>
    );
};

export default Disease;
