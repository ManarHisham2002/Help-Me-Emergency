import React, { useState } from 'react';
import './css/login.css';
import Avatar from './img/avatar-man-profile-user-3-svgrepo-com(1).svg';
import About from './img/online-medical-consultation-male-svgrepo-com.svg';
import { Link, useNavigate } from 'react-router-dom';
import { MdEmail } from 'react-icons/md';
import { FaLock } from 'react-icons/fa';
import { FaTriangleExclamation } from 'react-icons/fa6';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faCircleExclamation, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import FrogetPassword from './FrogetPassword';
import {setAuthUser} from '../Storage.js'
const LogIn = () => {
    const [view, setView] = useState('login');
    const [logIn, setLogIn] = useState({
        loading: false,
        email: '',
        password: '',
        err: [],
    });
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState({
        loginPassword: false,
        newPassword: false,
        confirmPassword: false
    });
    const togglePasswordVisibility = (field) => {
        setShowPassword(prevState => ({
            ...prevState,
            [field]: !prevState[field]
        }));
    };
    const LogInSubmit = (e) => {
        e.preventDefault();
        setLogIn({ ...logIn, loading: true, err: [] });
        axios.post(('http://localhost:4121/login'), {
            email: logIn.email,
            password: logIn.password
        }).then((response) => {
            setLogIn({ ...logIn, loading: false, err: [] });
            if (response.data.isAdmin === true) {
                setAuthUser(response.data);
                navigate('/admin');
            } else {
                navigate('/home');
            }
        }).catch((error) => {
            console.log(error.response.data.error);
            setLogIn({ ...logIn, loading: false, err: error.response.data.error });
        })
    }
    const handleChangeView = (newView) => {
        if (newView === 'login') {
            setLogIn({ ...logIn, err: [] });
        }
        setView(newView);
    };
    return (
        <div className='container-fluid login'>
            <div className='row'>
                <div className='col-xl-5 col-lg-5 col-md-6 col-sm-12 col-12 leftPart'>
                    <div className='container text-center pt-5 w-auto'>
                        <div className='row'>
                            <div className='col-lg-12 col-md-12 col-sm-12 beforeForm'>
                                <img src={Avatar} alt='Avatar' />
                                <h2>Hello!</h2>
                            </div>
                            {view === 'login' && (
                                <>
                                    {logIn.err && logIn.err.length > 0 &&
                                        logIn.err !== 'This Password is Wrong' && (
                                            <div className='messageError'>
                                                <FontAwesomeIcon icon={faTriangleExclamation}
                                                    className='iconMessageError' />
                                                <p className='errorMassageFrom'>{logIn.err}</p>
                                            </div>
                                        )
                                    }
                                    <form className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 logInForm' onSubmit={LogInSubmit}>
                                        <div className='input-div'>
                                            <MdEmail className='icon' />
                                            <input type='email' className='input' placeholder='Email'
                                                onChange={(e) => setLogIn({ ...logIn, email: e.target.value })} required />
                                        </div>
                                        <div className='input-div'>
                                            {logIn.err !== 'This Password is Wrong' ? (
                                                <FaLock className='icon' />
                                            ) : (
                                                <FaTriangleExclamation className='icon' style={{ color: 'rgb(222, 45, 45)' }} />
                                            )}
                                            <input type={showPassword.loginPassword ? 'text' : 'password'}
                                                className={`input ${logIn.err === 'This Password is Wrong' ? 'input-error' : ''}`}
                                                placeholder='Password'
                                                onChange={(e) => setLogIn({ ...logIn, password: e.target.value })} required />
                                            <FontAwesomeIcon icon={showPassword.loginPassword ? faEye : faEyeSlash}
                                                className='icon toggle-password-icon'
                                                onClick={() => togglePasswordVisibility('loginPassword')} />
                                        </div>
                                        {
                                            logIn.err && logIn.err === 'This Password is Wrong' && (
                                                <div className='forgetPassword' onClick={() => handleChangeView('forgetPassword')}>
                                                    <FontAwesomeIcon icon={faCircleExclamation} className='iconForgetPassword' />
                                                    Forget Password ?
                                                </div>
                                            )
                                        }
                                        <div className='signUp'>
                                            Don't have an account? <Link to='/signup'>SignUp</Link>
                                        </div>
                                        <button type='submit' className='btnFrom'>LogIn</button>
                                    </form>
                                </>
                            )}
                            {view === 'forgetPassword' && <FrogetPassword
                                setLogIn={setLogIn} logIn={logIn} setView={setView}
                                handleChangeView={handleChangeView} showPassword={showPassword}
                                togglePasswordVisibility={togglePasswordVisibility} />}
                        </div>
                    </div>
                </div>
                <div className='col-xl-7 col-lg-7 col-md-6 col-sm-12 col-12 rightPart'>
                    <div className='about'>
                        <img src={About} alt='About' />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default LogIn;