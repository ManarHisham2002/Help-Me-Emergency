import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../Loading/Loading';
import InternetError from '../InternetError/InternetError';
import NoData from '../NoData/NoData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronRight, faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons';

const Medicine = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const categoriesPerPage = 3;

    const [medicines, setMedicines] = useState({
        loading: true,
        dataMedicines: [],
        err: null,
    });

    useEffect(() => {
        setMedicines(prevState => ({ ...prevState, loading: true }));
        axios.get('http://localhost:4121/api/medicine/all')
            .then((response) => {
                console.log(response);
                setMedicines(prevState => ({ ...prevState, dataMedicines: response.data, err: null, loading: false }));
            })
            .catch((error) => {
                setMedicines(prevState => ({ ...prevState, loading: false, err: error.message }));
            });
    }, []);

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    return (
        <div className='col-lg-11 col-md-11 col-sm-11 mt-5 medicineContainer'>
            <div className='container'>
                <div className='row'>
                    {medicines.loading ? (
                        <Loading />
                    ) : medicines.err ? (
                        <InternetError />
                    ) : (
                        medicines.dataMedicines && medicines.dataMedicines.length > 0 ? (
                            <>
                                <div className='col-xl-11 col-lg-11 col-md-11 col-sm-11 col-11'>
                                    <div className='container'>
                                        <div className='row'>
                                            <div className='col-xl-5 col-lg-5 col-md-5 col-sm-5 col-5'>
                                                <div className='section-heading wow bounceIn'>
                                                    <h1>Medicines</h1>
                                                    <div className='line-dec'></div>
                                                </div>
                                            </div>
                                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6'>
                                                <div className='col-xl-11 col-lg-11 col-md-11 col-sm-11 col-11 filters'>
                                                    {currentPage > 0 && (
                                                        <FontAwesomeIcon icon={faCircleChevronLeft} className='filtersIcon' onClick={handlePreviousPage} />
                                                    )}
                                                    <ul>
                                                        {medicines.dataMedicines.map((item, index) => (
                                                            <li key={index}>
                                                                {item.category}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                    {(currentPage + 1) * categoriesPerPage < medicines.dataMedicines.length + 1 && (
                                                        <FontAwesomeIcon icon={faCircleChevronRight} className='filtersIcon' onClick={handleNextPage} />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-xl-11 col-lg-11 col-md-11 col-sm-11 col-11 mb-5'>
                                    <div className='row'>
                                        {medicines.dataMedicines.map((item, index) => (
                                            <div className='col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 mt-5' key={index}>
                                                <div className='itemMedicine'>
                                                    <div className='thumbMedicine'>
                                                        <img src={item.img} alt={item.name} />
                                                    </div>
                                                    <div className='down-content'>
                                                        <h4>{item.name}</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <NoData message='No Medicine Data Available' />
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default Medicine;
