import React, { useState } from 'react';
import './css/login.css';
import Avatar from './img/avatar-man-profile-user-3-svgrepo-com(1).svg';
import About from './img/online-medical-consultation-male-svgrepo-com.svg';
import { Link, useNavigate } from 'react-router-dom';
import { MdEmail } from 'react-icons/md';
import { FaLock, FaTimes } from 'react-icons/fa';
import { FaTriangleExclamation, FaUserCheck } from "react-icons/fa6";
import { RiLockPasswordLine, RiLockPasswordFill } from 'react-icons/ri';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faCircleExclamation, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const LogIn = () => {
    const [view, setView] = useState('login');
    const [logIn, setLogIn] = useState({
        loading: false,
        email: '',
        password: '',
        err: [],
    });
    const [forgetPassword, setForgetPassword] = useState({
        loading: false,
        email: '',
        otp: '',
        newPassword: '',
        confirmPassword: '',
        step: 1,
        err: null,
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
                localStorage.setItem('token', response.data.token); // Save token to local storage
                navigate('/admin');
            } else {
                navigate('/home');
            }
        }).catch((error) => {
            console.log(error.response.data.error);
            setLogIn({ ...logIn, loading: false, err: error.response.data.error });
        })
    }

    const handleSendCode = async () => {
        try {
            const response = await axios.post('http://localhost:4121/sendCode', { email: forgetPassword.email });
            if (response.status === 200) {
                setForgetPassword({ ...forgetPassword, step: 2 });
            }
        } catch (error) {
            setForgetPassword({ ...forgetPassword, err: error.response.data.error });
        }
    };

    const handleVerifyOTP = async () => {
        try {
            const response = await axios.post('http://localhost:4121/verify', { otp: forgetPassword.otp });
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token); // Save token to local storage
                setForgetPassword({ ...forgetPassword, step: 3 });
            }
        } catch (error) {
            setForgetPassword({ ...forgetPassword, err: error.response.data.error });
        }
    };

    const handleResetPassword = async () => {
        try {
            const token = localStorage.getItem('token'); // Retrieve token from local storage
            const response = await axios.patch('http://localhost:4121/reset', {
                password: forgetPassword.newPassword,
                confirmPassword: forgetPassword.confirmPassword
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                setForgetPassword({
                    loading: false,
                    email: '',
                    otp: '',
                    newPassword: '',
                    confirmPassword: '',
                    step: 1,
                    error: null,
                });
                setLogIn({ ...logIn, err: [] });
                setView('login');
            }
        } catch (error) {
            setForgetPassword({ ...forgetPassword, err: error.response.data.error });
        }
    };

    const handleChangeView = (newView) => {
        if (newView === 'login') {
            setLogIn({ ...logIn, err: [] });
        }
        setView(newView);
    };

    return (
        <div className="container-fluid login">
            <div className="row">
                <div className="col-lg-5 col-md-6 col-sm-12 leftPart">
                    <div className='container text-center pt-5 w-auto'>
                        <div className='row'>
                            <div className='col-lg-12 col-md-12 col-sm-12 beforeForm'>
                                <img src={Avatar} alt='Avatar' />
                                <h2>Hello!</h2>
                            </div>
                            {view === 'login' && (
                                <>
                                    {logIn.err && logIn.err.length > 0 && logIn.err !== 'This Password is Wrong' && (
                                        <div className='messageError'>
                                            <FontAwesomeIcon icon={faTriangleExclamation} className='iconMessageError' />
                                            <p className="errorMassageFrom">{logIn.err}</p>
                                        </div>
                                    )}
                                    <form className='col-lg-12 col-md-12 col-sm-12 logInForm' onSubmit={LogInSubmit}>
                                        <div className='input-div'>
                                            <MdEmail className='icon' />
                                            <input type='email' className='input' placeholder='Email' onChange={(e) => setLogIn({ ...logIn, email: e.target.value })} required />
                                        </div>
                                        <div className='input-div'>
                                            {logIn.err !== 'This Password is Wrong' ? (
                                                <FaLock className='icon' />
                                            ):(
                                                    <FaTriangleExclamation className='icon' style={{ color: 'rgb(222, 45, 45)' }} />
                                            )}
                                            <input type={showPassword.loginPassword ? 'text' : 'password'} className={`input ${logIn.err === 'This Password is Wrong' ? 'input-error' : ''}`} placeholder='Password' onChange={(e) => setLogIn({ ...logIn, password: e.target.value })} required />
                                            <FontAwesomeIcon icon={showPassword.loginPassword ? faEye : faEyeSlash} className='icon toggle-password-icon' onClick={() => togglePasswordVisibility('loginPassword')} />
                                        </div>
                                        {
                                            logIn.err && logIn.err === 'This Password is Wrong' && (
                                                <div className='forgetPassword' onClick={() => handleChangeView('forgetPassword')}>
                                                    <FontAwesomeIcon icon={faCircleExclamation} className='iconForgetPassword' /> Forget Password ?
                                                </div>
                                            )
                                        }
                                        <div className='signUp'>
                                            Don't have an account? <Link to="/signup">SignUp</Link>
                                        </div>
                                        <button type='submit' className='btnFrom'>LogIn</button>
                                    </form>
                                </>
                            )}
                            {view === 'forgetPassword' && (
                                <>
                                    <div className='col-lg-12 col-md-12 col-sm-12 logInForm'>
                                        <FaTimes className='icon forget-close-icon' onClick={() => handleChangeView('login')} />
                                        {forgetPassword.step === 1 && (
                                            <>
                                                <div className='input-div'>
                                                    <MdEmail className='icon' />
                                                    <input type="email" className='input' placeholder="Email" value={forgetPassword.email} onChange={(e) => setForgetPassword({ ...forgetPassword, email: e.target.value })} required />
                                                </div>
                                                <button type='submit' className='btnFrom' onClick={handleSendCode}>Send Code</button>
                                            </>
                                        )}
                                        {forgetPassword.step === 2 && (
                                            <>
                                                <div className='input-div'>
                                                    <FaUserCheck className='icon' />
                                                    <input type="text" className='input' placeholder="Enter OTP" value={forgetPassword.otp} onChange={(e) => setForgetPassword({ ...forgetPassword, otp: e.target.value })} required />
                                                </div>
                                                <button type='submit' className='btnFrom' onClick={handleVerifyOTP}>Verify OTP</button>
                                            </>
                                        )}
                                        {forgetPassword.step === 3 && (
                                            <>
                                                <div className='input-div'>
                                                    <RiLockPasswordLine className='icon' />
                                                    <input type={showPassword.newPassword ? 'text' : 'password'} placeholder='New Password' value={forgetPassword.newPassword} onChange={(e) => setForgetPassword({ ...forgetPassword, newPassword: e.target.value })} required />
                                                    <FontAwesomeIcon icon={showPassword.newPassword ? faEye : faEyeSlash} className='icon toggle-password-icon' onClick={() => togglePasswordVisibility('newPassword')} />
                                                </div>
                                                <div className='input-div'>
                                                    <RiLockPasswordFill className='icon' />
                                                    <input type={showPassword.confirmPassword ? 'text' : 'password'} placeholder='Confirm Password' value={forgetPassword.confirmPassword} onChange={(e) => setForgetPassword({ ...forgetPassword, confirmPassword: e.target.value })} required />
                                                    <FontAwesomeIcon icon={showPassword.confirmPassword ? faEye : faEyeSlash} className='icon toggle-password-icon' onClick={() => togglePasswordVisibility('confirmPassword')} />
                                                </div>
                                                <button type='submit' className='btnFrom' onClick={handleResetPassword}>Reset Password</button>
                                            </>
                                        )}
                                        {forgetPassword.error && <div className="error">{forgetPassword.error}</div>}
                                    </div>
                                </>
                            )}
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
export default LogIn;