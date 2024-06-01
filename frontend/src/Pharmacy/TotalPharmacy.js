import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import Menu from '../Menu/Menu';
import Loading from '../Loading/Loading';
import InternetError from '../InternetError/InternetError';
import NoData from '../NoData/NoData';
import './css/pharmacy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faSearch, faPhoneVolume } from '@fortawesome/free-solid-svg-icons';
import Medicine from './Medicine';
import Pharmacy from './Pharmacy';
const TotalPharmacy = () => {
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
            })
    }, []);

    useEffect(() => {
        const filteredResult = pharmacies.dataPharmacies.filter(item =>
            item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.namePharmacy.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.phone.toLowerCase().includes(searchQuery.toLowerCase())
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

    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };
    const accordionItems = [
        {
            title: "Prescription medications or non-prescription medications",
            content: "Under the law, medications are divided into two categories: prescription medications and non-prescription medications. Medications that require a prescription - these are medications whose use is considered safe only under medical supervision - with a prescription from the provider."
        },
        {
            title: "Names of medicines",
            content: "Some knowledge of the names of medicines may help you understand the labels on the drug product. Every medicine has at least three names - chemical name and General name and trade name."
        },
        {
            title: "Drug groups",
            content: "Understanding the drug group to which a drug belongs is useful, as drugs are usually classified into therapeutic groups - that is, according to need."
        }
    ];
    return (
        <>
            <Navbar activePage='/pharmacy' />
            <div className='container-fluid'>
                <div className='row'>
                    <Pharmacy />
                    <div className='col-lg-11 col-md-11 col-sm-11 mt-5 drugInfo'>
                        <section className="faq-section section-padding">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-5 col-md-5 col-sm-5">
                                        <div className="section-heading wow bounceIn">
                                            <h1>Drug Info</h1>
                                            <div className="line-dec"></div>
                                        </div>
                                    </div>
                                    <div className="clearfix"></div>
                                    <div className="col-lg-5 col-12">
                                        <img src={require('./img/drugInfoPhoto.png')} className="img-fluid" alt="FAQs" />
                                    </div>
                                    <div className="col-lg-6 col-12 m-auto">
                                        <div className="accordion" id="accordionExample">
                                            {accordionItems.map((item, index) => (
                                                <div className="accordion-item" key={index}>
                                                    <h2 className="accordion-header" id={`heading${index}`}>
                                                        <button
                                                            className={`accordion-button ${activeIndex === index ? '' : 'collapsed'}`}
                                                            type="button"
                                                            onClick={() => toggleAccordion(index)}
                                                        >
                                                            {item.title}
                                                        </button>
                                                    </h2>
                                                    <div
                                                        id={`collapse${index}`}
                                                        className={`accordion-collapse collapse ${activeIndex === index ? 'show' : ''}`}
                                                        aria-labelledby={`heading${index}`}
                                                    >
                                                        <div className="accordion-body">
                                                            {item.content}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    <Medicine />
                    <Menu />
                </div>
            </div>
        </>
    );
};

export default TotalPharmacy;
