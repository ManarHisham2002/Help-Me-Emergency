import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../Loading/Loading';
import InternetError from '../InternetError/InternetError';
import NoData from '../NoData/NoData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faSearch, faPhoneVolume } from '@fortawesome/free-solid-svg-icons';

const Pharmacy = () => {
    const [pharmacyToShow, setPharmacyToShow] = useState(4);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
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

    useEffect(() => {
        const filteredResult = pharmacies.dataPharmacies.filter(item =>
            item.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.namePharmacy?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.phone?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(filteredResult);
    }, [searchQuery, pharmacies.dataPharmacies]);

    const handleMorePharmacy = () => {
        setPharmacyToShow(prev => Math.min(prev + 4, pharmacies.dataPharmacies.length));
    };

    const handleLessPharmacy = () => {
        setPharmacyToShow(prev => Math.max(prev - 4, 4));
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className='col-lg-11 col-md-11 col-sm-11 pharmacyContainer'>
            <div className='container text-center'>
                <div className='row'>
                    {pharmacies.loading ? (
                        <Loading />
                    ) : pharmacies.err ? (
                        <InternetError />
                    ) : (
                        pharmacies.dataPharmacies && pharmacies.dataPharmacies.length > 0 ? (
                            <div className="col-lg-12 col-md-12 col-sm-12 infoPharmacy section">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                            <div className="section-heading wow bounceIn">
                                                <h1>Pharmacies</h1>
                                                <div className="line-dec"></div>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12 col-sm-12 searchField ">
                                            <input
                                                type="text"
                                                placeholder="Pharmacy"
                                                value={searchQuery}
                                                onChange={handleSearch}
                                            />
                                            <FontAwesomeIcon icon={faSearch} className="ms-auto" />
                                        </div>
                                        <div className="row col-lg-12 col-md-12 col-sm-12">
                                            {filteredData && filteredData.length > 0 ? (
                                                filteredData.slice(0, pharmacyToShow).map((item, index) => (
                                                    <div key={index} className="col-lg-3 col-md-4 col-sm-6">
                                                        <div className="item wow bounceInUp" data-wow-duration="1s" data-wow-delay="0.3s">
                                                            <div className="hidden-content">
                                                                <h4>{item.name}</h4>
                                                                <p><FontAwesomeIcon icon={faLocationDot} className='icon' />{item.location}</p>
                                                                <p><FontAwesomeIcon icon={faPhoneVolume} className='icon' />{item.phone}</p>
                                                            </div>
                                                            <div className="showed-content">
                                                                <img src={require('./img/pharmacyPhoto.jpg')} alt="" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))) : (
                                                <NoData message={`${searchQuery} isn't Found`} />
                                            )}
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-md-end justify-content-sm-center'>
                                        {pharmacyToShow < pharmacies.dataPharmacies.length && (
                                            <button type='button' className='btn rounded-pill main-btn mx-1' onClick={handleMorePharmacy}>
                                                More
                                            </button>
                                        )}
                                        {pharmacyToShow > 4 && (
                                            <button type='button' className='btn rounded-pill main-btn mx-1 ms-md-auto' onClick={handleLessPharmacy}>
                                                Less
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <NoData message="No Pharmacy Data Available" />
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default Pharmacy;
