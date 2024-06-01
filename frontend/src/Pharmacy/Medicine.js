import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../Loading/Loading';
import InternetError from '../InternetError/InternetError';
import NoData from '../NoData/NoData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronRight, faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons';

const Medicine = () => {
    const [medicines, setMedicines] = useState({
        loading: true,
        dataMedicines: [],
        err: null,
    });

    const [activeCategory, setActiveCategory] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const categoriesPerPage = 3;

    useEffect(() => {
        setMedicines(prevState => ({ ...prevState, loading: true }));
        axios.get('http://localhost:4121/api/medicine/all')
            .then((response) => {
                console.log(response);
                setMedicines(prevState => ({ ...prevState, dataMedicines: response.data, err: null, loading: false }));
                if (response.data.length > 0) {
                    setActiveCategory(response.data[0].category);
                }
            })
            .catch((error) => {
                setMedicines(prevState => ({ ...prevState, loading: false, err: error.message }));
            });
    }, []);

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    const getFilteredMedicines = () => {
        if (!activeCategory) return [];
        const categoryData = medicines.dataMedicines.find(cat => cat.category === activeCategory);
        return categoryData ? categoryData.medicine : [];
    };

    const displayedCategories = medicines.dataMedicines.slice(currentPage * categoriesPerPage, (currentPage + 1) * categoriesPerPage);

    return (
        <div className='col-lg-11 col-md-11 col-sm-11 mt-5 medicineContainer'>
            <div className="container">
                <div className="row">
                    {medicines.loading ? (
                        <Loading />
                    ) : medicines.err ? (
                        <InternetError />
                    ) : (
                        medicines.dataMedicines && medicines.dataMedicines.length > 0 ? (
                            <>
                                <div className="col-lg-11 col-md-11 col-sm-11">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-lg-5 col-md-5 col-sm-5">
                                                <div className="section-heading wow bounceIn">
                                                    <h1>Medicines</h1>
                                                    <div className="line-dec"></div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-sm-6">
                                                <div className="col-lg-12 col-md-12 col-sm-12 filters">
                                                    {currentPage > 0 && (
                                                        <FontAwesomeIcon icon={faCircleChevronLeft} className='filtersIcon' onClick={handlePreviousPage} />
                                                    )}
                                                    <ul>
                                                        {displayedCategories.map((item, index) => (
                                                            <li
                                                                key={index}
                                                                className={item.category === activeCategory ? 'active' : ''}
                                                                onClick={() => handleCategoryClick(item.category)}
                                                            >
                                                                {item.category}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                    {(currentPage + 1) * categoriesPerPage < medicines.dataMedicines.length && (
                                                        <FontAwesomeIcon icon={faCircleChevronRight} className='filtersIcon' onClick={handleNextPage} />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                        <div className="col-lg-11 col-md-11 col-sm-11  mb-5">
                                    <div className="row">
                                        {getFilteredMedicines().map((item, index) => (
                                            
                                            <div className="col-lg-4 col-md-6 col-sm-12 mt-5" key={index}>
                                                <div className="itemMedicine">
                                                    <div className="thumbMedicine">
                                                        <img src={item.img} alt={item.name} />
                                                    </div>
                                                    <div className="down-content">
                                                        <h4>{item.name}</h4>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <NoData message="No Medicine Data Available" />
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default Medicine;