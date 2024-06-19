import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const UserProfile = ({ onClose }) => {
    const [patients, setPatients] = useState({
        loading: true,
        dataPatients: {},
        err: null,
    });

    const [historyUser, setHistoryUser] = useState({
        loading: false,
        diseases: [],
        allergies: [],
        surgeries: [],
        err: null,
    });

    const patientId = JSON.parse(localStorage.getItem("patient"))?._id;

    const fetchPatientData = async () => {
        try {
            setPatients({ loading: true, dataPatients: {}, err: null });
            const response = await axios.get(`http://localhost:4121/api/patient/${patientId}`);
            setPatients({ loading: false, dataPatients: response.data, err: null });
        } catch (error) {
            setPatients({ loading: false, dataPatients: {}, err: error.response?.data?.errors });
        }
    };

    const fetchHistoryData = async () => {
        try {
            setHistoryUser({ loading: true, diseases: [], allergies: [], surgeries: [], err: null });
            const response = await axios.get(`http://localhost:4121/history/${patientId}`);
            setHistoryUser({ loading: false, diseases: response.data.diseases, allergies: response.data.allergies, surgeries: response.data.surgeries, err: null });
        } catch (error) {
            setHistoryUser({ loading: false, diseases: [], allergies: [], surgeries: [], err: error.response?.data?.errors });
        }
    };

    useEffect(() => {
        fetchPatientData();
        fetchHistoryData();
    }, [patientId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPatients(prevState => ({
            ...prevState,
            dataPatients: {
                ...prevState.dataPatients,
                [name]: value
            }
        }));
    };

    const handleCheckboxChange = (type, value) => {
        setHistoryUser(prevState => {
            const updatedType = prevState[type].includes(value)
                ? prevState[type].filter(item => item !== value)
                : [...prevState[type], value];

            return { ...prevState, [type]: updatedType };
        });
    };

    const handleUpdate = async () => {
        try {
            await axios.patch(`http://localhost:4121/api/patient/${patientId}`, patients.dataPatients);
            await axios.put(`http://localhost:4121/history/${patientId}`, {
                diseases: historyUser.diseases,
                allergies: historyUser.allergies,
                surgeries: historyUser.surgeries,
            });
            alert('Updated successfully!');
            onClose();
        } catch (error) {
            console.error('Failed to update:', error);
            alert('Failed to update. Please try again.');
        }
    };

    return (
        <div className='popup'>
            <FontAwesomeIcon icon={faTimes} className='closePopup' onClick={onClose} />
            <div className='content'>
                <div className='userImg'>
                    <label htmlFor='fileInput'>
                        <img src={patients.dataPatients.img} alt={patients.dataPatients.name} />
                    </label>
                    <input
                        type='file'
                        id='fileInput'
                        accept='image/*'
                        style={{ display: 'none' }}
                    />
                </div>
                <p className='userName'>{patients.dataPatients.name}</p>
                <p className='userEmail'>{patients.dataPatients.email}</p>
                <div className='row inputContainer'>
                    <div className='col-lg-3 inputbox'>
                        <input type='text' name='name' placeholder='Name' value={patients.dataPatients.name} onChange={handleInputChange} />
                    </div>
                    <div className='col-lg-3 inputbox'>
                        <input type='text' name='email' placeholder='Email' value={patients.dataPatients.email} onChange={handleInputChange} />
                    </div>
                    <div className='col-lg-3 inputbox'>
                        <input type='text' name='gender' placeholder='Gender' value={patients.dataPatients.gender} onChange={handleInputChange} />
                    </div>
                    <div className='col-lg-3 inputbox'>
                        <input type='text' name='phone' placeholder='Phone' value={patients.dataPatients.phone} onChange={handleInputChange} />
                    </div>
                </div>
                <div className='row categories'>
                    <div className='col-lg-3 w-auto'>
                        <div className='col-lg-12 checkboxTitle'>
                            Chronic Diseases
                        </div>
                        <div className='col-lg-12 contientCheckbox'>
                            {['Cardiovascular Diseases', 'Respiratory System Diseases', 'Cancer', 'Diabetes', 'Epilepsy and Seizures', 'Kidney Disease', 'Blood Thinning Disease'].map((disease, index) => (
                                <label key={index} htmlFor={`chronic-${index}`} className="checkbox">
                                    <input
                                        className="checkbox__input"
                                        type="checkbox"
                                        id={`chronic-${index}`}
                                        checked={historyUser.diseases?.includes(disease)}
                                        onChange={() => handleCheckboxChange('diseases', disease)}
                                    />
                                    <svg className="checkbox__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22">
                                        <rect width="21" height="21" x="1" y="1" fill="#FFF" stroke="#04557d" rx="4" />
                                        <path className="tick" stroke="#FC8500" fill="none" strokeLinecap="round" strokeWidth="4" d="M4 10l5 5 9-9" />
                                    </svg>
                                    <span className="checkbox__label">{disease}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className='col-lg-3 w-auto'>
                        <div className='col-lg-12 checkboxTitle'>
                            Allergy
                        </div>
                        <div className='col-lg-12 contientCheckbox'>
                            {['Drug Allergy', 'Food Allergy', 'Eczema', 'Urticaria', 'Contact Dermatitis'].map((allergy, index) => (
                                <label key={index} htmlFor={`allergy-${index}`} className="checkbox">
                                    <input
                                        className="checkbox__input"
                                        type="checkbox"
                                        id={`allergy-${index}`}
                                        checked={historyUser.allergies?.includes(allergy)}
                                        onChange={() => handleCheckboxChange('allergies', allergy)}
                                    />
                                    <svg className="checkbox__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22">
                                        <rect width="21" height="21" x="1" y="1" fill="#FFF" stroke="#04557d" rx="4" />
                                        <path className="tick" stroke="#FC8500" fill="none" strokeLinecap="round" strokeWidth="4" d="M4 10l5 5 9-9" />
                                    </svg>
                                    <span className="checkbox__label">{allergy}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className='col-lg-3 w-auto'>
                        <div className='col-lg-12 checkboxTitle'>
                            Open Surgery
                        </div>
                        <div className='col-lg-12 contientCheckbox'>
                            {['Cholecystectomy', 'Nephrectomy', 'Tumor Removal', 'Tonsillectomy'].map((surgery, index) => (
                                <label key={index} htmlFor={`surgery-${index}`} className="checkbox">
                                    <input
                                        className="checkbox__input"
                                        type="checkbox"
                                        id={`surgery-${index}`}
                                        checked={historyUser.surgeries?.includes(surgery)}
                                        onChange={() => handleCheckboxChange('surgeries', surgery)}
                                    />
                                    <svg className="checkbox__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22">
                                        <rect width="21" height="21" x="1" y="1" fill="#FFF" stroke="#04557d" rx="4" />
                                        <path className="tick" stroke="#FC8500" fill="none" strokeLinecap="round" strokeWidth="4" d="M4 10l5 5 9-9" />
                                    </svg>
                                    <span className="checkbox__label">{surgery}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className='col-lg-3 w-auto'>
                        <div className='col-lg-12 checkboxTitle'>
                            Minimally Invasive Surgery
                        </div>
                        <div className='col-lg-12 contientCheckbox'>
                            {['Laparoscopy', 'Endoscopy', 'Cystoscopy', 'Hysteroscopy', 'Laser Surgery'].map((surgery, index) => (
                                <label key={index} htmlFor={`minimally-invasive-surgery-${index}`} className="checkbox">
                                    <input
                                        className="checkbox__input"
                                        type="checkbox"
                                        id={`minimally-invasive-surgery-${index}`}
                                        checked={historyUser.surgeries?.includes(surgery)}
                                        onChange={() => handleCheckboxChange('surgeries', surgery)}
                                    />
                                    <svg className="checkbox__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22">
                                        <rect width="21" height="21" x="1" y="1" fill="#FFF" stroke="#04557d" rx="4" />
                                        <path className="tick" stroke="#FC8500" fill="none" strokeLinecap="round" strokeWidth="4" d="M4 10l5 5 9-9" />
                                    </svg>
                                    <span className="checkbox__label">{surgery}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
                <button className='btnUpdate' onClick={handleUpdate}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Update
                </button>
            </div>
        </div>
    );
};

export default UserProfile;
