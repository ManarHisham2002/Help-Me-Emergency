import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';
import InternetError from '../InternetError/InternetError';
import NoData from '../NoData/NoData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fa1, fa2, fa3, fa4, fa5, fa6, fa7, fa8, fa9 } from '@fortawesome/free-solid-svg-icons';


const InfoEmergencyAdmin = () => {
    const { id } = useParams(); // Get the id from the route parameters
    const [emergencies, setEmergencies] = useState({
        loading: true,
        dataEmergencies: [],
        err: null,
    });

    const [editing, setEditing] = useState(false); // State to manage if we are in editing mode
    const [formData, setFormData] = useState({
        title: '',
        imgMaster: '',
        imgSteps: '',
        video: '',
        steps: []
    });
    useEffect(() => {
        setEmergencies({ ...emergencies, loading: true });
        axios.get('http://localhost:4121/api/emergency/all').then((response) => {
            setEmergencies({ loading: false, dataEmergencies: response.data, err: null });
        }).catch((error) => {
            setEmergencies({ loading: false, dataEmergencies: [], err: error.response ? error.response.data.errors : 'Network Error' });
        });
    }, []);

    const selectedItem = emergencies.dataEmergencies.find(master => master.id === parseInt(id, emergencies.dataEmergencies.length + 1));

    const iconComponents = [fa1, fa2, fa3, fa4, fa5, fa6, fa7, fa8, fa9];

    const handleUpdateClick = () => {
        if (selectedItem) {
            setFormData({
                title: selectedItem.title,
                imgMaster: selectedItem.imgMaster,
                imgSteps: selectedItem.imgSteps,
                video: selectedItem.video,
                steps: selectedItem.steps
            });
            setEditing(true);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleStepChange = (index, e) => {
        const { name, value } = e.target;
        const newSteps = formData.steps.map((step, i) => {
            if (i === index) {
                return { ...step, [name]: value };
            }
            return step;
        });
        setFormData({
            ...formData,
            steps: newSteps
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:4121/api/emergency/${id}`, formData)
            .then((response) => {
                setEditing(false);
                setEmergencies({
                    ...emergencies,
                    dataEmergencies: emergencies.dataEmergencies.map((emergency) =>
                        emergency.id === parseInt(id) ? response.data : emergency
                    )
                });
            })
            .catch((error) => {
                console.error('There was an error updating the emergency!', error);
                alert('There was an error updating the emergency! Please try again.');
            });
    };

    return (
        <div className='infoCardAdmin'>
            {emergencies.loading ? (
                <Loading />
            ) : emergencies.err ? (
                <InternetError />
            ) : (
                selectedItem ? (
                    editing ? (
                        <form onSubmit={handleFormSubmit} className='profile-card'>
                            <header>
                                <input type='text' name='title' value={formData.title} onChange={handleChange} />
                                <input type='text' name='imgMaster' value={formData.imgMaster} onChange={handleChange} />
                            </header>
                            <div className='blog-container'>
                                <div className='blog-card'>
                                    <div className='meta'>
                                        <div className='photo'>
                                            <input type='text' name='imgSteps' value={formData.imgSteps} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className='description'>
                                        <h2>First Aid Video: <input type='text' name='video' value={formData.video} onChange={handleChange} /></h2>
                                        <h2>First Aid Steps</h2>
                                        {formData.steps.map((step, index) => (
                                            <div key={index}>
                                                <div className='iconDetailsAdmin'>
                                                    <FontAwesomeIcon icon={iconComponents[step.num - 1]} />
                                                </div>
                                                <input type='text' name='title' value={step.title} onChange={(e) => handleStepChange(index, e)} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <button type='submit' className='btnUpdateAdmin'>Save</button>
                        </form>
                    ) : (
                        <div className='profile-card'>
                            <header>
                                <img src={selectedItem.imgMaster} alt={selectedItem.title} />
                                <h1>{selectedItem.title}</h1>
                            </header>
                            <div className='blog-container'>
                                <div className='blog-card'>
                                    <div className='meta'>
                                        <div className='photo'>
                                            <img src={selectedItem.imgSteps} alt={selectedItem.title} />
                                        </div>
                                    </div>
                                    <div className='description'>
                                        <h2>First Aid Video: <h3>{selectedItem.video}</h3></h2>
                                        <h2>First Aid Steps</h2>
                                        {selectedItem.steps.map((step, index) => (
                                            <div key={index}>
                                                <div className='iconDetailsAdmin'>
                                                    <FontAwesomeIcon icon={iconComponents[step.num - 1]} />
                                                </div>
                                                <h3>{step.title}</h3>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <button onClick={handleUpdateClick} className='btnUpdateAdmin'>Update</button>
                        </div>
                    )
                ) : (
                    <NoData message='No Emergencies Available' />
                )
            )}
        </div>
    );
};

export default InfoEmergencyAdmin;
