import React, { useState } from 'react';
import './css/signUp.css';
import Avatar from './img/avatar-man-profile-user-3-svgrepo-com(1).svg';
import About from './img/online-medical-consultation-male-svgrepo-com.svg';
import { MdEmail } from 'react-icons/md';
import { IoInformation } from "react-icons/io5";
import { RiLockPasswordLine } from 'react-icons/ri';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FaUser } from 'react-icons/fa';
import { FaPhone } from 'react-icons/fa6';
import { IoCamera } from 'react-icons/io5';
import { FaPersonHalfDress } from 'react-icons/fa6';
import { PiStethoscopeBold } from 'react-icons/pi';
import { FaAllergies } from 'react-icons/fa';
import { GiScalpel } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const SignUp = () => {
    const navigate = useNavigate();
    const [signUp, setSignUp] = useState({
        loading: false,
        email: '',
        password: '',
        err: [],
    });
    const SignUpSubmit = (e) => {
        e.preventDefault();
        setSignUp({ ...signUp, loading: true, err: [] });
        axios.post(('http://localhost:4121/register'), {
            email: SignUp.email,
            password: SignUp.password
        }).then((response) => {
            setSignUp({ ...signUp, loading: false, err: [] });
            navigate('/home');
        }).catch((error) => {
            setSignUp({ ...signUp, loading: false, err: error.response.data.errors });
        })
    }
    const [currentStep, setCurrentStep] = useState(1);
    const navigateToFormStep = (stepNumber) => {
        setCurrentStep(stepNumber);
    };
    return (
        <div className="container-fluid signup">
            <div className="row">
                <div className="col-lg-5 col-md-6 col-sm-12 leftPart">
                    <div className='container text-center pt-5 w-auto'>
                        <div className='row'>
                            <div className='col-lg-12 col-md-12 col-sm-12 beforeForm'>
                                <img src={Avatar} alt='Avatar' />
                                <h2>Hello!</h2>
                            </div>
                            <div id="multi-step-form-container" className='col-lg-12 col-md-12 col-sm-12'>
                                <ul className="form-stepper form-stepper-horizontal text-center mx-auto pl-0 col-lg-12 col-md-12 col-sm-12">
                                    <li className={`form-stepper-list ${currentStep === 1 ? 'form-stepper-active' : currentStep > 1 ? 'form-stepper-completed' : 'form-stepper-unfinished'}`} step='1'>
                                        <a className="mx-2" onClick={() => navigateToFormStep(1)} >
                                            <span className="form-stepper-circle">
                                                <span><IoInformation className='icon' /></span>
                                            </span>
                                            <div className="label">Information</div>
                                        </a>
                                    </li>
                                    <li className={`form-stepper-list ${currentStep === 2 ? 'form-stepper-active' : currentStep > 2 ? 'form-stepper-completed' : 'form-stepper-unfinished'}`} step='1'>
                                        <a className="mx-2" onClick={() => navigateToFormStep(2)}>
                                            <span class="form-stepper-circle">
                                                <span><PiStethoscopeBold className='icon' /></span>
                                            </span>
                                            <div class="label">Diseases</div>
                                        </a>
                                    </li>
                                    <li className={`form-stepper-list ${currentStep === 3 ? 'form-stepper-active' : currentStep > 3 ? 'form-stepper-completed' : 'form-stepper-unfinished'}`} step='1'>
                                        <a className="mx-2" onClick={() => navigateToFormStep(3)}>
                                            <span class="form-stepper-circle">
                                                <span><FaAllergies className='icon' /></span>
                                            </span>
                                            <div class="label">Allergy</div>
                                        </a>
                                    </li>
                                    <li className={`form-stepper-list ${currentStep === 4 ? 'form-stepper-active' : currentStep > 4 ? 'form-stepper-completed' : 'form-stepper-unfinished'}`} step='1'>
                                        <a className="mx-2" onClick={() => navigateToFormStep(4)}>
                                            <span class="form-stepper-circle">
                                                <span><GiScalpel className='icon' /></span>
                                            </span>
                                            <div class="label">Surgery</div>
                                        </a>
                                    </li>
                                </ul>
                                <form
                                    id="userAccountSetupForm"
                                    className='signupForm col-lg-12 col-md-12 col-sm-12'
                                    name="userAccountSetupForm"
                                    encType="multipart/form-data"
                                    method="POST"
                                    onSubmit={SignUpSubmit}
                                >
                                    <section id="step-1" className={`form-step ${currentStep === 1 ? '' : 'd-none'}`}>
                                        <div>
                                            <div class='input-div'>
                                                <FaUser className='icon' />
                                                <input type='text' placeholder='Name' />
                                            </div>
                                            <div class='input-div'>
                                                <MdEmail className='icon' />
                                                <input type='email' placeholder='Email' />
                                            </div>
                                            <div class='input-div'>
                                                <RiLockPasswordLine className='icon' />
                                                <input type='password' placeholder='Password' />
                                            </div>
                                            <div class='input-div'>
                                                <RiLockPasswordFill className='icon' />
                                                <input type='password' placeholder='Confirm Password' />
                                            </div>
                                            <div class='input-div'>
                                                <FaPhone className='icon' />
                                                <input type='text' placeholder='Phone' />
                                            </div>
                                            <div className='input-div'>
                                                <IoCamera className='icon' />
                                                <label htmlFor='fileInput' className='fileLabel'> Profile Photo </label>
                                                <input
                                                    type='file'
                                                    id='fileInput'
                                                    accept='image/*'
                                                    style={{ display: 'none' }}
                                                />
                                            </div>
                                            <div className='input-div'>
                                                <FaPersonHalfDress className='icon' />
                                                <div className='row'>
                                                    <label className='col-6 labelRadio'>
                                                        <input type='radio' name='gender' value='male' />
                                                        <span>Male</span>
                                                    </label>
                                                    <label className='col-6 labelRadio'>
                                                        <input type='radio' name='gender' value='female' />
                                                        <span>Female</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <button className="btnFrom" type="button" onClick={() => navigateToFormStep(2)}>Next</button>
                                        </div>
                                    </section>
                                    <section id="step-2" className={`form-step ${currentStep === 2 ? '' : 'd-none'}`}>
                                        <div>
                                            <div>
                                                <label className='checkbox'>
                                                    <input type='checkbox' />
                                                    <svg viewBox='0 0 21 18'>
                                                        <symbol id='tick-path' viewBox='0 0 21 18' xmlns='http://www.w3.org/2000/svg'>
                                                            <path d='M5.22003 7.26C5.72003 7.76 7.57 9.7 8.67 11.45C12.2 6.05 15.65 3.5 19.19 1.69' fill='none' stroke-width='2.25' stroke-linecap='round' stroke-linejoin='round' />
                                                        </symbol>
                                                        <defs>
                                                            <mask id='tick'>
                                                                <use className='tick mask' href='#tick-path' />
                                                            </mask>
                                                        </defs>
                                                        <use className='tick' href='#tick-path' stroke='currentColor' />
                                                        <path fill='white' mask='url(#tick)' d='M18 9C18 10.4464 17.9036 11.8929 17.7589 13.1464C17.5179 15.6054 15.6054 17.5179 13.1625 17.7589C11.8929 17.9036 10.4464 18 9 18C7.55357 18 6.10714 17.9036 4.85357 17.7589C2.39464 17.5179 0.498214 15.6054 0.241071 13.1464C0.0964286 11.8929 0 10.4464 0 9C0 7.55357 0.0964286 6.10714 0.241071 4.8375C0.498214 2.39464 2.39464 0.482143 4.85357 0.241071C6.10714 0.0964286 7.55357 0 9 0C10.4464 0 11.8929 0.0964286 13.1625 0.241071C15.6054 0.482143 17.5179 2.39464 17.7589 4.8375C17.9036 6.10714 18 7.55357 18 9Z' />
                                                    </svg>
                                                    <span className='checkbox-title'>Cardiovascular Diseases</span>
                                                </label>
                                                <label className='checkbox'>
                                                    <input type='checkbox' />
                                                    <svg viewBox='0 0 21 18'>
                                                        <symbol id='tick-path' viewBox='0 0 21 18' xmlns='http://www.w3.org/2000/svg'>
                                                            <path d='M5.22003 7.26C5.72003 7.76 7.57 9.7 8.67 11.45C12.2 6.05 15.65 3.5 19.19 1.69' fill='none' stroke-width='2.25' stroke-linecap='round' stroke-linejoin='round' />
                                                        </symbol>
                                                        <defs>
                                                            <mask id='tick'>
                                                                <use className='tick mask' href='#tick-path' />
                                                            </mask>
                                                        </defs>
                                                        <use className='tick' href='#tick-path' stroke='currentColor' />
                                                        <path fill='white' mask='url(#tick)' d='M18 9C18 10.4464 17.9036 11.8929 17.7589 13.1464C17.5179 15.6054 15.6054 17.5179 13.1625 17.7589C11.8929 17.9036 10.4464 18 9 18C7.55357 18 6.10714 17.9036 4.85357 17.7589C2.39464 17.5179 0.498214 15.6054 0.241071 13.1464C0.0964286 11.8929 0 10.4464 0 9C0 7.55357 0.0964286 6.10714 0.241071 4.8375C0.498214 2.39464 2.39464 0.482143 4.85357 0.241071C6.10714 0.0964286 7.55357 0 9 0C10.4464 0 11.8929 0.0964286 13.1625 0.241071C15.6054 0.482143 17.5179 2.39464 17.7589 4.8375C17.9036 6.10714 18 7.55357 18 9Z' />
                                                    </svg>
                                                    <span className='checkbox-title'>Respiratory System Diseases</span>
                                                </label>
                                                <label className='checkbox'>
                                                    <input type='checkbox' />
                                                    <svg viewBox='0 0 21 18'>
                                                        <symbol id='tick-path' viewBox='0 0 21 18' xmlns='http://www.w3.org/2000/svg'>
                                                            <path d='M5.22003 7.26C5.72003 7.76 7.57 9.7 8.67 11.45C12.2 6.05 15.65 3.5 19.19 1.69' fill='none' stroke-width='2.25' stroke-linecap='round' stroke-linejoin='round' />
                                                        </symbol>
                                                        <defs>
                                                            <mask id='tick'>
                                                                <use className='tick mask' href='#tick-path' />
                                                            </mask>
                                                        </defs>
                                                        <use className='tick' href='#tick-path' stroke='currentColor' />
                                                        <path fill='white' mask='url(#tick)' d='M18 9C18 10.4464 17.9036 11.8929 17.7589 13.1464C17.5179 15.6054 15.6054 17.5179 13.1625 17.7589C11.8929 17.9036 10.4464 18 9 18C7.55357 18 6.10714 17.9036 4.85357 17.7589C2.39464 17.5179 0.498214 15.6054 0.241071 13.1464C0.0964286 11.8929 0 10.4464 0 9C0 7.55357 0.0964286 6.10714 0.241071 4.8375C0.498214 2.39464 2.39464 0.482143 4.85357 0.241071C6.10714 0.0964286 7.55357 0 9 0C10.4464 0 11.8929 0.0964286 13.1625 0.241071C15.6054 0.482143 17.5179 2.39464 17.7589 4.8375C17.9036 6.10714 18 7.55357 18 9Z' />
                                                    </svg>
                                                    <span className='checkbox-title'>Cancer</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div>
                                            <button className="btnFrom" type="button" onClick={() => navigateToFormStep(1)}>Previous</button>
                                            <button className="btnFrom" type="button" onClick={() => navigateToFormStep(3)}>Next</button>
                                        </div>
                                    </section>
                                    <section id="step-3" className={`form-step ${currentStep === 3 ? '' : 'd-none'}`}>
                                        <div>
                                            <div>
                                                <label className='checkbox'>
                                                    <input type='checkbox' />
                                                    <svg viewBox='0 0 21 18'>
                                                        <symbol id='tick-path' viewBox='0 0 21 18' xmlns='http://www.w3.org/2000/svg'>
                                                            <path d='M5.22003 7.26C5.72003 7.76 7.57 9.7 8.67 11.45C12.2 6.05 15.65 3.5 19.19 1.69' fill='none' stroke-width='2.25' stroke-linecap='round' stroke-linejoin='round' />
                                                        </symbol>
                                                        <defs>
                                                            <mask id='tick'>
                                                                <use className='tick mask' href='#tick-path' />
                                                            </mask>
                                                        </defs>
                                                        <use className='tick' href='#tick-path' stroke='currentColor' />
                                                        <path fill='white' mask='url(#tick)' d='M18 9C18 10.4464 17.9036 11.8929 17.7589 13.1464C17.5179 15.6054 15.6054 17.5179 13.1625 17.7589C11.8929 17.9036 10.4464 18 9 18C7.55357 18 6.10714 17.9036 4.85357 17.7589C2.39464 17.5179 0.498214 15.6054 0.241071 13.1464C0.0964286 11.8929 0 10.4464 0 9C0 7.55357 0.0964286 6.10714 0.241071 4.8375C0.498214 2.39464 2.39464 0.482143 4.85357 0.241071C6.10714 0.0964286 7.55357 0 9 0C10.4464 0 11.8929 0.0964286 13.1625 0.241071C15.6054 0.482143 17.5179 2.39464 17.7589 4.8375C17.9036 6.10714 18 7.55357 18 9Z' />
                                                    </svg>
                                                    <span className='checkbox-title'>Drug Allergy</span>
                                                </label>
                                                <label className='checkbox'>
                                                    <input type='checkbox' />
                                                    <svg viewBox='0 0 21 18'>
                                                        <symbol id='tick-path' viewBox='0 0 21 18' xmlns='http://www.w3.org/2000/svg'>
                                                            <path d='M5.22003 7.26C5.72003 7.76 7.57 9.7 8.67 11.45C12.2 6.05 15.65 3.5 19.19 1.69' fill='none' stroke-width='2.25' stroke-linecap='round' stroke-linejoin='round' />
                                                        </symbol>
                                                        <defs>
                                                            <mask id='tick'>
                                                                <use className='tick mask' href='#tick-path' />
                                                            </mask>
                                                        </defs>
                                                        <use className='tick' href='#tick-path' stroke='currentColor' />
                                                        <path fill='white' mask='url(#tick)' d='M18 9C18 10.4464 17.9036 11.8929 17.7589 13.1464C17.5179 15.6054 15.6054 17.5179 13.1625 17.7589C11.8929 17.9036 10.4464 18 9 18C7.55357 18 6.10714 17.9036 4.85357 17.7589C2.39464 17.5179 0.498214 15.6054 0.241071 13.1464C0.0964286 11.8929 0 10.4464 0 9C0 7.55357 0.0964286 6.10714 0.241071 4.8375C0.498214 2.39464 2.39464 0.482143 4.85357 0.241071C6.10714 0.0964286 7.55357 0 9 0C10.4464 0 11.8929 0.0964286 13.1625 0.241071C15.6054 0.482143 17.5179 2.39464 17.7589 4.8375C17.9036 6.10714 18 7.55357 18 9Z' />
                                                    </svg>
                                                    <span className='checkbox-title'>Food Allergy</span>
                                                </label>
                                                <label className='checkbox'>
                                                    <input type='checkbox' />
                                                    <svg viewBox='0 0 21 18'>
                                                        <symbol id='tick-path' viewBox='0 0 21 18' xmlns='http://www.w3.org/2000/svg'>
                                                            <path d='M5.22003 7.26C5.72003 7.76 7.57 9.7 8.67 11.45C12.2 6.05 15.65 3.5 19.19 1.69' fill='none' stroke-width='2.25' stroke-linecap='round' stroke-linejoin='round' />
                                                        </symbol>
                                                        <defs>
                                                            <mask id='tick'>
                                                                <use className='tick mask' href='#tick-path' />
                                                            </mask>
                                                        </defs>
                                                        <use className='tick' href='#tick-path' stroke='currentColor' />
                                                        <path fill='white' mask='url(#tick)' d='M18 9C18 10.4464 17.9036 11.8929 17.7589 13.1464C17.5179 15.6054 15.6054 17.5179 13.1625 17.7589C11.8929 17.9036 10.4464 18 9 18C7.55357 18 6.10714 17.9036 4.85357 17.7589C2.39464 17.5179 0.498214 15.6054 0.241071 13.1464C0.0964286 11.8929 0 10.4464 0 9C0 7.55357 0.0964286 6.10714 0.241071 4.8375C0.498214 2.39464 2.39464 0.482143 4.85357 0.241071C6.10714 0.0964286 7.55357 0 9 0C10.4464 0 11.8929 0.0964286 13.1625 0.241071C15.6054 0.482143 17.5179 2.39464 17.7589 4.8375C17.9036 6.10714 18 7.55357 18 9Z' />
                                                    </svg>
                                                    <span className='checkbox-title'>Eczema</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div>
                                            <button className="btnFrom" type="button" onClick={() => navigateToFormStep(2)}>Previous</button>
                                            <button className="btnFrom" type="button" onClick={() => navigateToFormStep(4)}>Next</button>
                                        </div>
                                    </section>
                                    <section id="step-4" className={`form-step ${currentStep === 4 ? '' : 'd-none'}`}>
                                        <div>
                                            <div>
                                                <label className='checkbox'>
                                                    <input type='checkbox' />
                                                    <svg viewBox='0 0 21 18'>
                                                        <symbol id='tick-path' viewBox='0 0 21 18' xmlns='http://www.w3.org/2000/svg'>
                                                            <path d='M5.22003 7.26C5.72003 7.76 7.57 9.7 8.67 11.45C12.2 6.05 15.65 3.5 19.19 1.69' fill='none' stroke-width='2.25' stroke-linecap='round' stroke-linejoin='round' />
                                                        </symbol>
                                                        <defs>
                                                            <mask id='tick'>
                                                                <use className='tick mask' href='#tick-path' />
                                                            </mask>
                                                        </defs>
                                                        <use className='tick' href='#tick-path' stroke='currentColor' />
                                                        <path fill='white' mask='url(#tick)' d='M18 9C18 10.4464 17.9036 11.8929 17.7589 13.1464C17.5179 15.6054 15.6054 17.5179 13.1625 17.7589C11.8929 17.9036 10.4464 18 9 18C7.55357 18 6.10714 17.9036 4.85357 17.7589C2.39464 17.5179 0.498214 15.6054 0.241071 13.1464C0.0964286 11.8929 0 10.4464 0 9C0 7.55357 0.0964286 6.10714 0.241071 4.8375C0.498214 2.39464 2.39464 0.482143 4.85357 0.241071C6.10714 0.0964286 7.55357 0 9 0C10.4464 0 11.8929 0.0964286 13.1625 0.241071C15.6054 0.482143 17.5179 2.39464 17.7589 4.8375C17.9036 6.10714 18 7.55357 18 9Z' />
                                                    </svg>
                                                    <span className='checkbox-title'>Cholecystectomy</span>
                                                </label>
                                                <label class="checkbox">
                                                    <input type="checkbox" />
                                                    <svg viewBox='0 0 21 18'>
                                                        <symbol id='tick-path' viewBox='0 0 21 18' xmlns='http://www.w3.org/2000/svg'>
                                                            <path d='M5.22003 7.26C5.72003 7.76 7.57 9.7 8.67 11.45C12.2 6.05 15.65 3.5 19.19 1.69' fill='none' stroke-width='2.25' stroke-linecap='round' stroke-linejoin='round' />
                                                        </symbol>
                                                        <defs>
                                                            <mask id='tick'>
                                                                <use className='tick mask' href='#tick-path' />
                                                            </mask>
                                                        </defs>
                                                        <use className='tick' href='#tick-path' stroke='currentColor' />
                                                        <path fill='white' mask='url(#tick)' d='M18 9C18 10.4464 17.9036 11.8929 17.7589 13.1464C17.5179 15.6054 15.6054 17.5179 13.1625 17.7589C11.8929 17.9036 10.4464 18 9 18C7.55357 18 6.10714 17.9036 4.85357 17.7589C2.39464 17.5179 0.498214 15.6054 0.241071 13.1464C0.0964286 11.8929 0 10.4464 0 9C0 7.55357 0.0964286 6.10714 0.241071 4.8375C0.498214 2.39464 2.39464 0.482143 4.85357 0.241071C6.10714 0.0964286 7.55357 0 9 0C10.4464 0 11.8929 0.0964286 13.1625 0.241071C15.6054 0.482143 17.5179 2.39464 17.7589 4.8375C17.9036 6.10714 18 7.55357 18 9Z' />
                                                    </svg>
                                                    <span className='checkbox-title'>Cholecystectomy</span>
                                                </label>
                                                <label className='checkbox'>
                                                    <input type='checkbox' />
                                                    <svg viewBox='0 0 21 18'>
                                                        <symbol id='tick-path' viewBox='0 0 21 18' xmlns='http://www.w3.org/2000/svg'>
                                                            <path d='M5.22003 7.26C5.72003 7.76 7.57 9.7 8.67 11.45C12.2 6.05 15.65 3.5 19.19 1.69' fill='none' stroke-width='2.25' stroke-linecap='round' stroke-linejoin='round' />
                                                        </symbol>
                                                        <defs>
                                                            <mask id='tick'>
                                                                <use className='tick mask' href='#tick-path' />
                                                            </mask>
                                                        </defs>
                                                        <use className='tick' href='#tick-path' stroke='currentColor' />
                                                        <path fill='white' mask='url(#tick)' d='M18 9C18 10.4464 17.9036 11.8929 17.7589 13.1464C17.5179 15.6054 15.6054 17.5179 13.1625 17.7589C11.8929 17.9036 10.4464 18 9 18C7.55357 18 6.10714 17.9036 4.85357 17.7589C2.39464 17.5179 0.498214 15.6054 0.241071 13.1464C0.0964286 11.8929 0 10.4464 0 9C0 7.55357 0.0964286 6.10714 0.241071 4.8375C0.498214 2.39464 2.39464 0.482143 4.85357 0.241071C6.10714 0.0964286 7.55357 0 9 0C10.4464 0 11.8929 0.0964286 13.1625 0.241071C15.6054 0.482143 17.5179 2.39464 17.7589 4.8375C17.9036 6.10714 18 7.55357 18 9Z' />
                                                    </svg>
                                                    <span className='checkbox-title'>Nephrectomy</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div>
                                            <button className="btnFrom" type="button" onClick={() => navigateToFormStep(3)}>Previous</button>
                                            <button className="btnFrom" type="submit">Submit</button>
                                        </div>
                                    </section>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-7 col-md-6 col-sm-12 rightPart">
                    <div className='about'>
                        <img src={About} alt='About' />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SignUp;
// import React, { useState } from 'react';
// import './css/signUp.css';
// import Avatar from './img/avatar-man-profile-user-3-svgrepo-com(1).svg';
// import About from './img/online-medical-consultation-male-svgrepo-com.svg';
// import DataSignUp from './DataSignUp';
// const SignUp = () => {
//     const [currentStep, setCurrentStep] = useState(1);
//     const navigateToFormStep = (stepNumber) => {
//         setCurrentStep(stepNumber);
//     };
// const renderField = (field) => {
//     switch (field.type) {
//         case "text":
//         case "email":
//         case "password":
//             return (
//                 <div key={field.placeholder} className='input-div'>
//                     {field.icon}
//                      <input type={field.type} placeholder={field.placeholder} />
//                  </div>
//                 );
//                                                        case "file":
// return (
//                     < className='input-div'>
//                         {field.icon}
//                         <label htmlFor='fileInput' className='fileLabel'>
//                 { field.placeholder }
//                                                                          </label >
// <input
//     type='file'
//     id='fileInput'
//                             accept='image/*'
//                             style={{ display: 'none' }}
//                         />
//                                                                      </ div>
// );
// case "radio":
// return (
// <div className='input-div'>
//                         {field.icon}
//                         <div className='row'>
//                             {field.options.map((option) => (
//                                 <label key={option.id} className='col-6 labelRadio'>
//                                     <input type={field.type} name={field.placeholder} value={option.id} />
//                                     <span>{option.label}</span>
//                                 </label>
//                             ))}
//                         </div>
//                     </div>
//                 );
//             case "checkbox":
//                 return (
//                     <div className='contientCheckbox'>
//                         {field.options.map((option) => (
//                             <label key={option.label} className='checkbox'>
//                                 <input type={field.type} />
//                                 <svg viewBox='0 0 21 18'>
//                                     <symbol id='tick-path' viewBox='0 0 21 18' xmlns='http://www.w3.org/2000/svg'>
//                                         <path d='M5.22003 7.26C5.72003 7.76 7.57 9.7 8.67 11.45C12.2 6.05 15.65 3.5 19.19 1.69' fill='none' stroke-width='2.25' stroke-linecap='round' stroke-linejoin='round' />
//                                     </symbol>
//                                     <defs>
//                                         <mask id='tick'>
//                                             <use className='tick mask' href='#tick-path' />
//                                         </mask>
//                                     </defs>
//                                     <use className='tick' href='#tick-path' stroke='currentColor' />
//                                     <path fill='white' mask='url(#tick)' d='M18 9C18 10.4464 17.9036 11.8929 17.7589 13.1464C17.5179 15.6054 15.6054 17.5179 13.1625 17.7589C11.8929 17.9036 10.4464 18 9 18C7.55357 18 6.10714 17.9036 4.85357 17.7589C2.39464 17.5179 0.498214 15.6054 0.241071 13.1464C0.0964286 11.8929 0 10.4464 0 9C0 7.55357 0.0964286 6.10714 0.241071 4.8375C0.498214 2.39464 2.39464 0.482143 4.85357 0.241071C6.10714 0.0964286 7.55357 0 9 0C10.4464 0 11.8929 0.0964286 13.1625 0.241071C15.6054 0.482143 17.5179 2.39464 17.7589 4.8375C17.9036 6.10714 18 7.55357 18 9Z' />
//                                 </svg>
//                                 <span className='checkbox-title'>{option.label}</span>
//                             </label>
//                         ))}
//                     </div>
//                 );
//             default:
//                 return null;
//         }
//     };
//     return (
//         <div className="container-fluid signup">
//             <div className="row">
//                 <div className="col-lg-5 col-md-6 col-sm-12 leftPart">
//                     <div className='container text-center pt-5 w-auto'>
//                         <div className='row'>
//                             <div className='col-lg-12 col-md-12 col-sm-12 beforeForm'>
//                                 <img src={Avatar} alt='Avatar' />
//                                 <h2>Hello!</h2>
//                             </div>
//                             <div id="multi-step-form-container" className='col-lg-12 col-md-12 col-sm-12'>
//                                 <ul className="form-stepper form-stepper-horizontal text-center mx-auto pl-0 col-lg-12 col-md-12 col-sm-12">
//                                     {DataSignUp.map((stepData) => (
//                                         <li
//                                             key={stepData.stepId}
//                                             className={`${currentStep === stepData.stepId
//                                                 ? "form-stepper-active"
//                                                 : currentStep > stepData.stepId
//                                                     ? "form-stepper-completed"
//                                                     : "form-stepper-unfinished"
//                                                 } text-center form-stepper-list`}
//                                             step={stepData.stepId}
//                                         >
//                                             <a className="mx-2">
//                                                 <span className="form-stepper-circle">
//                                                     <span>{stepData.stepIcon}</span>
//                                                 </span>
//                                                 <div className="label">{stepData.stepTitle}</div>
//                                             </a>
//                                         </li>
//                                     ))}
//                                 </ul>
//                                 <form
//                                     id="userAccountSetupForm"
//                                     className='signupForm col-lg-12 col-md-12 col-sm-12'
//                                     name="userAccountSetupForm"
//                                     encType="multipart/form-data"
//                                     method="POST"
//                                 >
//                                     {DataSignUp.map((stepData) => (
//                                         <section
//                                             key={stepData.stepId}
//                                             id={`step-${stepData.stepId}`}
//                                             className={`form-step ${currentStep === stepData.stepId ? "" : "d-none"}`}
//                                         >
//                                             <div>
//                                                 {stepData.fields.map((field) => (
//                                                     renderField(field)
//                                                 ))}
//                                             </div>
//                                             <div>
//                                                 {currentStep > 1 && (
//                                                     <button
//                                                         className="btnFrom"
//                                                         type="button"
//                                                         onClick={() => navigateToFormStep(stepData.stepId - 1)}
//                                                     >
//                                                         {stepData.prev.buttonName}
//                                                     </button>
//                                                 )}
//                                                 {currentStep < DataSignUp.length && (
//                                                     <button
//                                                         className="btnFrom"
//                                                         type="button"
//                                                         onClick={() => navigateToFormStep(stepData.stepId + 1)}
//                                                     >
//                                                         {stepData.next.buttonName}
//                                                     </button>
//                                                 )}
//                                                 {currentStep === DataSignUp.length && (
//                                                     <button className="btnFrom" type="submit">
//                                                         {stepData.next.buttonName}
//                                                     </button>
//                                                 )}
//                                             </div>
//                                         </section>
//                                     ))}
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="col-lg-7 col-md-6 col-sm-12 rightPart">
//                     <div className='about'>
//                         <img src={About} alt='About' />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
// export default SignUp;
