import React, { useState } from 'react';
import { MdEmail } from 'react-icons/md';
import { FaTimes } from 'react-icons/fa';
import { FaUserCheck } from 'react-icons/fa6';
import { RiLockPasswordLine, RiLockPasswordFill } from 'react-icons/ri';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const FrogetPassword = ({ setLogIn, logIn, setView, handleChangeView, showPassword, togglePasswordVisibility }) => {
    const [forgetPassword, setForgetPassword] = useState({
        loading: false,
        email: '',
        otp: '',
        newPassword: '',
        confirmPassword: '',
        step: 1,
        err: null,
    });
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
                localStorage.setItem('token', response.data.token);
                setForgetPassword({ ...forgetPassword, step: 3 });
            }
        } catch (error) {
            setForgetPassword({ ...forgetPassword, err: error.response.data.error });
        }
    };

    const handleResetPassword = async () => {
        try {
            const token = localStorage.getItem('token');
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
            console.log(error);
            setForgetPassword({ ...forgetPassword, err: error.response.data.message });
        }
    };
    return (
        <>
            <div className='col-lg-12 col-md-12 col-sm-12 logInForm'>
                <FaTimes className='icon forget-close-icon' onClick={() => handleChangeView('login')} />
                {forgetPassword.err && forgetPassword.err.length > 0(
                    <div className='messageError mb-2 w-200'>
                        <FontAwesomeIcon icon={faTriangleExclamation} className='iconMessageError' />
                        <p className='errorMassageFrom'>{forgetPassword.err}</p>
                    </div>
                )}
                {forgetPassword.step === 1 && (
                    <>
                        <div className='input-div'>
                            <MdEmail className='icon' />
                            <input type='email' className='input' placeholder='Email'
                                value={forgetPassword.email}
                                onChange={(e) => setForgetPassword({ ...forgetPassword, email: e.target.value })}
                                required />
                        </div>
                        <button type='submit' className='btnFrom' onClick={handleSendCode}>Send Code</button>
                    </>
                )}
                {forgetPassword.step === 2 && (
                    <>
                        <div className='input-div'>
                            <FaUserCheck className='icon' />
                            <input type='text' className='input' placeholder='Enter OTP'
                                value={forgetPassword.otp}
                                onChange={(e) => setForgetPassword({ ...forgetPassword, otp: e.target.value })}
                                required />
                        </div>
                        <button type='submit' className='btnFrom' onClick={handleVerifyOTP}>Verify OTP</button>
                    </>
                )}
                {forgetPassword.step === 3 && (
                    <>
                        <div className='input-div'>
                            <RiLockPasswordLine className='icon' />
                            <input type={showPassword.newPassword ? 'text' : 'password'}
                                placeholder='New Password' value={forgetPassword.newPassword}
                                onChange={(e) => setForgetPassword({ ...forgetPassword, newPassword: e.target.value })}
                                required />
                            <FontAwesomeIcon icon={showPassword.newPassword ? faEye : faEyeSlash}
                                className='icon toggle-password-icon'
                                onClick={() => togglePasswordVisibility('newPassword')} />
                        </div>
                        <div className='input-div'>
                            <RiLockPasswordFill className='icon' />
                            <input type={showPassword.confirmPassword ? 'text' : 'password'}
                                placeholder='Confirm Password' value={forgetPassword.confirmPassword}
                                onChange={(e) => setForgetPassword({
                                    ...forgetPassword,
                                    confirmPassword: e.target.value
                                })}
                                required />
                            <FontAwesomeIcon icon={showPassword.confirmPassword ? faEye : faEyeSlash}
                                className='icon toggle-password-icon'
                                onClick={() => togglePasswordVisibility('confirmPassword')} />
                        </div>
                        <button type='submit' className='btnFrom'
                            onClick={handleResetPassword}>Reset Password</button>
                    </>
                )}
            </div>
        </>
    );
}
export default FrogetPassword;