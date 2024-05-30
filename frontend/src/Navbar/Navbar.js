import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import { Link, useLocation } from 'react-router-dom';
import { HiBars4 } from 'react-icons/hi2';
import { HiX } from 'react-icons/hi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import NotFound from '../NotFound/NotFound';
import DataNav from './DataNav';
import Logo from './img/logo.png';
import './css/navbarStyle.css';


const Navbar = ({ activePage }) => {
    const location = useLocation();
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    function handleResponsiveNavbar() {
        const tabsNewAnim = $('#navbarSupportedContent');
        const activeItemNewAnim = tabsNewAnim.find('.active');
        if (activeItemNewAnim.length > 0) {
            const activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
            const activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
            const itemPosNewAnimTop = activeItemNewAnim.position();
            const itemPosNewAnimLeft = activeItemNewAnim.position();
            $('.hori-selector').css({
                top: `${itemPosNewAnimTop.top}px`,
                left: `${itemPosNewAnimLeft.left}px`,
                height: `${activeWidthNewAnimHeight}px`,
                width: `${activeWidthNewAnimWidth}px`,
            });
        }
    }
    useEffect(() => {
        handleResponsiveNavbar();
        $(document).ready(function () {
            setTimeout(function () {
                handleResponsiveNavbar();
            });
        });
        $(window).on('resize', function () {
            setTimeout(function () {
                handleResponsiveNavbar();
            }, 500);
        });
        const path = location.pathname.split('/home').pop() || <NotFound />;
        const target = $(`#navbarSupportedContent ul li a[href='${path}']`);
        target.parent().addClass('active');
        handleResponsiveNavbar();
    }, [location]);
    const toggleNavbar = () => {
        const navbarNav = $('#navbarSupportedContent');
        navbarNav.slideToggle();
        setIsNavbarOpen(!isNavbarOpen);
        handleResponsiveNavbar();
    };
    $(document).ready(function () {
        let profileDropdownList = $('.profile-dropdown-list');
        let btn = $('.profile-dropdown-btn');
        btn.on('click', function (e) {
            e.stopPropagation();
            profileDropdownList.toggleClass('active');
        });
        $(document).on('click', function (e) {
            if (!btn.is(e.target)) {
                profileDropdownList.removeClass('active');
            }
        });
    });
    const [isFormOpen, setFormOpen] = useState(false);
    const openForm = () => {
        setFormOpen(true);
    };
    const closeForm = () => {
        setFormOpen(false);
    };
    const data = [];
    const PopupForm = ({ onClose }) => {
        const [userData, setUserData] = useState({
            img: require('./img/download.jpeg'),
            name: 'Manar Hisham',
            email: 'manarhisham@gmail.com',
            gender: 'Female',
            phone: '01119335840',
            location: '',
            qr: require('./img/logo.png'),
            chronicDiseases: ['Cardiovascular Diseases', 'Respiratory System Diseases', 'Cancer'],
            allergy: ['Drug Allergy', 'Food Allergy'],
            surgery: ['Cholecystectomy', 'Endoscopy', 'Laser Surgery']
        });
        return (
            <div className='popup'>
                <FontAwesomeIcon icon={faTimes} className='closePopup' onClick={onClose} />
                <div className='content'>
                    <div className='userImg'>
                        <label htmlFor='fileInput'>
                            <img src={userData.img} alt={userData.name} />
                        </label>
                        <input
                            type='file'
                            id='fileInput'
                            accept='image/*'
                            style={{ display: 'none' }}
                        />
                    </div>
                    <p className='userName'>{userData.name}</p>
                    <p className='userEmail'>{userData.email}</p>
                    <div className='row inputContainer'>
                        <div className='col-lg-4 inputbox'>
                            <input type='text' placeholder='Name' value={userData.name} />
                        </div>
                        <div className='col-lg-4 inputbox'>
                            <input type='text' placeholder='Email' value={userData.email} />
                        </div>
                        <div className='col-lg-4 inputbox'>
                            <input type='text' placeholder='Gender' value={userData.gender} />
                        </div>
                        <div className='col-lg-4 inputbox'>
                            <input type='text' placeholder='Phone' value={userData.phone} />
                        </div>
                        <div className='col-lg-4 inputbox'>
                            <input type='text' placeholder='Location' value={userData.location} />
                        </div>
                    </div>
                    <div className='row categories'>
                        <div className='col-lg-3 w-auto'>
                            <div className='col-lg-12 checkboxTitle'>
                                Chronic Diseases
                            </div>
                            <div className='col-lg-12 contientCheckbox'>
                                <label className='checkbox'>
                                    <input type='checkbox' checked/>
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
                                    <span className='checkbox-title'>Cardiovascular</span>
                                </label>
                                <label className='checkbox'>
                                    <input type='checkbox' checked/>
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
                                    <span className='checkbox-title'>Respiratory System</span>
                                </label>
                                <label className='checkbox'>
                                    <input type='checkbox' checked/>
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
                                <label className='checkbox'>
                                    <input type='checkbox'/>
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
                                    <span className='checkbox-title'>Diabetes</span>
                                </label>
                                <label className='checkbox'>
                                    <input type='checkbox'/>
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
                                    <span className='checkbox-title'>Epilepsy & Seizures</span>
                                </label>
                                <label className='checkbox'>
                                    <input type='checkbox'/>
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
                                    <span className='checkbox-title'>Kidney</span>
                                </label>
                                <label className='checkbox'>
                                    <input type='checkbox'/>
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
                                    <span className='checkbox-title'>Blood Thinning</span>
                                </label>
                            </div>
                        </div>
                        <div className='col-lg-3 w-auto'>
                            <div className='col-lg-12 checkboxTitle'>
                                Allergy
                            </div>
                            <div className='col-lg-12 contientCheckbox'>
                                <label className='checkbox'>
                                    <input type='checkbox' checked/>
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
                                    <input type='checkbox' checked/>
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
                                    <input type='checkbox'/>
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
                                <label className='checkbox'>
                                    <input type='checkbox'/>
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
                                    <span className='checkbox-title'>Urticaria</span>
                                </label>
                                <label className='checkbox'>
                                    <input type='checkbox'/>
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
                                    <span className='checkbox-title'>Contact Dermatitis</span>
                                </label>
                            </div>
                        </div>
                        <div className='col-lg-3 w-auto'>
                            <div className='col-lg-12 checkboxTitle'>
                                Open Surgery
                            </div>
                            <div className='col-lg-12 contientCheckbox'>
                                <label className='checkbox'>
                                    <input type='checkbox' checked/>
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
                                    <input type='checkbox'/>
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
                                <label className='checkbox'>
                                    <input type='checkbox'/>
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
                                    <span className='checkbox-title'>Tumor Removal</span>
                                </label>
                                <label className='checkbox'>
                                    <input type='checkbox'/>
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
                                    <span className='checkbox-title'>Tonsillectomy</span>
                                </label>
                            </div>
                        </div>
                        <div className='col-lg-3 w-auto'>
                            <div className='col-lg-12 checkboxTitle'>
                                Minimally Invasive Surgery
                            </div>
                            <div className='col-lg-12 contientCheckbox'>
                                <label className='checkbox'>
                                    <input type='checkbox'/>
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
                                    <span className='checkbox-title'>Laparoscopy</span>
                                </label>
                                <label className='checkbox'>
                                    <input type='checkbox' checked/>
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
                                    <span className='checkbox-title'>Endoscopy</span>
                                </label>
                                <label className='checkbox'>
                                    <input type='checkbox'/>
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
                                    <span className='checkbox-title'>Cystoscopy</span>
                                </label>
                                <label className='checkbox'>
                                    <input type='checkbox'/>
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
                                    <span className='checkbox-title'>Hysteroscopy</span>
                                </label>
                                <label className='checkbox'>
                                    <input type='checkbox' checked/>
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
                                    <span className='checkbox-title'>Laser surgery</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <button className='btnUpdate'>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Update</button>
                </div>
            </div>
        );
    };
    return (
        <>
            <nav className='navbar navbar-expand-custom navbar-mainbg'>
                <Link className='navbar-brand navbar-logo' to='/home'>
                    <img src={Logo} alt='Help me / Emergency' className='navLogo' />
                    Help me / Emergency
                </Link>
                <button
                    className='navbar-toggler'
                    type='button'
                    aria-controls='navbarSupportedContent'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                    data-bs-target='#navbarSupportedContent'
                    onClick={toggleNavbar}
                    style={{ outline: 'none' }}
                >
                    {isNavbarOpen ? <HiX /> : <HiBars4 />}
                </button>
                <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                    <ul className='navbar-nav ms-auto'>
                        <div className='hori-selector'>
                            <div className='left'></div>
                            <div className='right'></div>
                        </div>
                        {DataNav.map((item, index) => (
                            <li key={index} className={`nav-item ${activePage === item.link ? 'active' : ''}`}>
                                <Link className='nav-link' to={item.link}>
                                    {item.icon} {item.label}
                                </Link>
                            </li>
                        ))}
                        {activePage === '/emergency' ? (
                            <li className='nav-item ms-5'>
                                <div onClick={openForm} className='userProfile'>
                                    <img src={require('./img/download.jpeg')} alt='user' />
                                </div>
                                {isFormOpen && <PopupForm onClose={closeForm} />}
                            </li>
                        ) : (
                            <li className='nav-item'>
                                <div onClick={openForm} className='userProfile'>
                                    <img src={require('./img/download.jpeg')} alt='user' />
                                </div>
                                {isFormOpen && <PopupForm onClose={closeForm} />}
                            </li>
                        )}
                    </ul>
                </div>
            </nav>
        </>
    );
};
export default Navbar;
