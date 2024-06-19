import React, { useState } from 'react';
import './css/signUp.css';
import Avatar from './img/avatar-man-profile-user-3-svgrepo-com(1).svg';
import About from './img/online-medical-consultation-male-svgrepo-com.svg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import { IoInformation } from 'react-icons/io5';
import { FaAllergies } from 'react-icons/fa';
import { PiStethoscopeBold } from 'react-icons/pi';
import { GiScalpel } from 'react-icons/gi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

const SignUp = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const navigate = useNavigate();
    const steps = [
        { step: 1, icon: IoInformation, label: 'Information' },
        { step: 2, icon: PiStethoscopeBold, label: 'Diseases' },
        { step: 3, icon: FaAllergies, label: 'Allergy' },
        { step: 4, icon: GiScalpel, label: 'Surgery' },
    ];
    const navigateToFormStep = (stepNumber) => {
        setCurrentStep(stepNumber);
    };
    const [infoUser, setInfoUser] = useState({
        loading: false,
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        gender: '',
        err: null,
    });
    const [historyUser, setHistoryUser] = useState({
        loading: false,
        diseases: [],
        allergies: [],
        surgeries: [],
        err: null,
    });

    const handleCheckboxChange = (category, item, isChecked) => {
        setHistoryUser(prevData => {
            const updatedCategory = isChecked
                ? [...prevData[category], item]
                : prevData[category].filter(selected => selected !== item);
            return { ...prevData, [category]: updatedCategory };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setInfoUser({ ...infoUser, loading: true, err: [] });
        setHistoryUser({ ...historyUser, loading: true, err: [] });
        axios.post(('http://localhost:4121/register'), {
            name: infoUser.name,
            email: infoUser.email,
            password: infoUser.password,
            confirmPassword: infoUser.confirmPassword,
            phone: infoUser.phone,
            gender: infoUser.gender
        }).then((response) => {
            setInfoUser({ ...infoUser, loading: false, err: [] });
            navigate('/home');
        }).catch((error) => {
            console.log(error);
            console.log(error.response.data.error);
            setInfoUser({ ...infoUser, loading: false, err: error.response.data.error });
        });
        axios.post(('http://localhost:4121/history/add'), {
            diseases: historyUser.diseases,
            allergies: historyUser.allergies,
            surgeries: historyUser.surgeries
        }).then((response) => {
            setHistoryUser({ ...historyUser, loading: false, err: [] });
        }).catch((error) => {
            console.log(error.response.data.error);
            setHistoryUser({ ...historyUser, loading: false, err: error.response.data.error });
        })
    };
    return (
        <div className='container-fluid signup'>
            <div className='row'>
                <div className='col-lg-5 col-md-6 col-sm-12 leftPart'>
                    <div className='container text-center pt-5 w-auto'>
                        <div className='row'>
                            <div className='col-lg-12 col-md-12 col-sm-12 beforeForm'>
                                <img src={Avatar} alt='Avatar' />
                                <h2>Hello!</h2>
                            </div>
                            <div id='multi-step-form-container' className='col-lg-12 col-md-12 col-sm-12'>
                                {infoUser.err && infoUser.err.length > 0 && (
                                    <div className='messageError mb-3'>
                                        <FontAwesomeIcon icon={faTriangleExclamation} className='iconMessageError' />
                                        <p className='errorMassageFrom'>{infoUser.err}</p>
                                    </div>
                                )}
                                {historyUser.err && historyUser.err.length > 0 && (
                                    <div className='messageError mb-3'>
                                        <FontAwesomeIcon icon={faTriangleExclamation} className='iconMessageError' />
                                        <p className='errorMassageFrom'>{historyUser.err}</p>
                                    </div>
                                )}
                                <ul className='form-stepper form-stepper-horizontal text-center mx-auto pl-0 col-lg-12 col-md-12 col-sm-12'>
                                    {steps.map(({ step, icon: Icon, label }) => (
                                        <li key={step} className={`form-stepper-list ${currentStep === step ?
                                            'form-stepper-active' : currentStep > step ?
                                                'form-stepper-completed' : 'form-stepper-unfinished'}`} step={step}>
                                            <a className='mx-2' onClick={() => navigateToFormStep(step)}>
                                                <span className='form-stepper-circle'><Icon className='icon' /></span>
                                                <div className='label'>{label}</div>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                                <form id='userAccountSetupForm' className='signupForm col-12' name='userAccountSetupForm'
                                    encType='multipart/form-data' method='POST'>
                                    {currentStep === 1 && <Step1 navigateToFormStep={navigateToFormStep} setInfoUser={setInfoUser}
                                        infoUser={infoUser} />}
                                    {currentStep === 2 && <Step2 navigateToFormStep={navigateToFormStep}
                                        handleCheckboxChange={handleCheckboxChange} />}
                                    {currentStep === 3 && <Step3 navigateToFormStep={navigateToFormStep}
                                        handleCheckboxChange={handleCheckboxChange} />}
                                    {currentStep === 4 && <Step4 navigateToFormStep={navigateToFormStep}
                                        handleCheckboxChange={handleCheckboxChange} handleSubmit={handleSubmit} />}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-lg-7 col-md-6 col-sm-12 rightPartSignUp'>
                    <div className='aboutSignUp'>
                        <img src={About} alt='About' />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SignUp;