// import React, { useState } from 'react';
// import './css/login.css';
// import Avatar from './img/avatar-man-profile-user-3-svgrepo-com(1).svg';
// import About from './img/online-medical-consultation-male-svgrepo-com.svg';
// import { Link, useNavigate } from 'react-router-dom';
// import { MdEmail } from 'react-icons/md';
// import { FaLock } from 'react-icons/fa';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash, faTriangleExclamation, faCircleExclamation, faTimes } from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';

// const ForgotPasswordPopup = ({ forgotPassword, handleEmailSubmit, handleOtpSubmit, handlePasswordReset, handleChange, handleClose }) => {
//     return (
//         <div className="forgot-password-popup">
//             <div className="popup-content">
//                 <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={handleClose} />
//                 {forgotPassword.step === 1 && (
//                     <form className='logInForm' onSubmit={handleEmailSubmit}>
//                         <div className='input-div'>
//                             <MdEmail className='icon' />
//                             <input type='email' className='input' placeholder='Email' name="email" value={forgotPassword.email} onChange={handleChange} />
//                         </div>
//                         <button type='submit' className='btnFrom'>Send</button>
//                     </form>
//                 )}
//                 {forgotPassword.step === 2 && (
//                     <form className='logInForm' onSubmit={handleOtpSubmit}>
//                         <div className='input-div'>
//                             <MdEmail className='icon' />
//                             <input type='text' className='input' placeholder='Enter OTP' name="otp" value={forgotPassword.otp} onChange={handleChange} />
//                         </div>
//                         <button type='submit' className='btnFrom'>Next</button>
//                     </form>
//                 )}
//                 {forgotPassword.step === 3 && (
//                     <form className='logInForm' onSubmit={handlePasswordReset}>
//                         <div className='input-div'>
//                             <FaLock className='icon' />
//                             <input type='password' className='input' placeholder='New Password' name="newPassword" value={forgotPassword.newPassword} onChange={handleChange} />
//                         </div>
//                         <div className='input-div'>
//                             <FaLock className='icon' />
//                             <input type='password' className='input' placeholder='confirm Password' name="confirmPassword" value={forgotPassword.confirmPassword} onChange={handleChange} />
//                         </div>
//                         <button type='submit' className='btnFrom'>Finish</button>
//                     </form>
//                 )}
//             </div>
//         </div>
//     );
// };

// const LogIn = () => {
//     const [showForgotPasswordPopup, setShowForgotPasswordPopup] = useState(false);
//     const [logIn, setLogIn] = useState({
//         loading: false,
//         email: '',
//         password: '',
//         err: [],
//     });
//     const [forgotPassword, setForgotPassword] = useState({
//         email: '',
//         otp: '',
//         newPassword: '',
//         confirmPassword: '',
//         step: 1,
//         error: '',
//     });
//     const navigate = useNavigate();
//     const [showPassword, setShowPassword] = useState(false);
//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };
//     const LogInSubmit = (e) => {
//         e.preventDefault();
//         setLogIn({ ...logIn, loading: true, err: [] });
//         axios.post(('http://localhost:4121/login'), {
//             email: logIn.email,
//             password: logIn.password
//         }).then((response) => {
//             setLogIn({ ...logIn, loading: false, err: [] });
//             if (response.data.status === true) {
//                 navigate('/admin');
//             } else {
//                 navigate('/home');
//             }
//         }).catch((error) => {
//             console.log(error.response.data.error);
//             setLogIn({ ...logIn, loading: false, err: error.response.data.error });
//         })
//     }
//     const handleEmailSubmit = (e) => {
//         e.preventDefault();
//         axios.post('http://localhost:4121/sendCode', { email: forgotPassword.email })
//             .then(response => {
//                 setForgotPassword({ ...forgotPassword, step: 2, error: '' });
//             })
//             .catch(error => {
//                 setForgotPassword({ ...forgotPassword, error: error.response.data.message });
//             });
//     };
//     const handleOtpSubmit = (e) => {
//         e.preventDefault();
//         axios.post('http://localhost:4121/verify', { otp: forgotPassword.otp })
//             .then(response => {
//                 console.log(forgotPassword.otp);
//                 setForgotPassword({ ...forgotPassword, step: 3, error: '' });
//             })
//             .catch(error => {
//                 setForgotPassword({ ...forgotPassword, error: error.response.data.error });
//                 console.log(forgotPassword.error);
//             });
//     };
//     const handlePasswordReset = (e) => {
//         e.preventDefault();
//         axios.patch('http://localhost:4121/reset', {
//             password: forgotPassword.newPassword,
//             confirmPassword: forgotPassword.confirmPassword,
//         })
//             .then(response => {
//                 console.log("Password reset successful:", response.data);
//             })
//             .catch(error => {
//                 console.error("Password reset failed:", error);
//                 setForgotPassword({ ...forgotPassword, error: error.response.data.message });
//             });
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setForgotPassword({ ...forgotPassword, [name]: value });
//     };
//     const openPopup = () => {
//         setShowForgotPasswordPopup(true);
//     };
//     const closePopup = () => {
//         setShowForgotPasswordPopup(false);
//     };
//     return (
//         <div className="container-fluid login">
//             <div className="row">
//                 <div className="col-lg-5 col-md-6 col-sm-12 leftPart">
//                     <div className='container text-center pt-5 w-auto'>
//                         <div className='row'>
//                             <div className='col-lg-12 col-md-12 col-sm-12 beforeForm'>
//                                 <img src={Avatar} alt='Avatar' />
//                                 <h2>Hello!</h2>
//                             </div>
//                             {logIn.err && logIn.err.length > 0 && (
//                                 <div className='messageError'>
//                                     <FontAwesomeIcon icon={faTriangleExclamation} className='iconMessageError' />
//                                     <p className="errorMassageFrom">{logIn.err}</p>
//                                 </div>
//                             )}
//                             <form className='logInForm' onSubmit={LogInSubmit}>
//                                 <div className='input-div'>
//                                     <MdEmail className='icon' />
//                                     <input type='email' className='input' placeholder='Email' onChange={(e) => setLogIn({ ...logIn, email: e.target.value })} />
//                                 </div>
//                                 <div className='input-div'>
//                                     <FaLock className='icon' />
//                                     <input type={showPassword ? 'text' : 'password'} className='input' placeholder='Password' onChange={(e) => setLogIn({ ...logIn, password: e.target.value })} />
//                                     <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className='icon toggle-password-icon' onClick={togglePasswordVisibility} />
//                                 </div>

//                                 {
//                                     logIn.err && logIn.err === 'This Password is Wrong' && (
//                                         <div className='forgetPassword' onClick={openPopup}>
//                                             <FontAwesomeIcon icon={faCircleExclamation} className='iconForgetPassword' /> Forget Password
//                                         </div>
//                                     )
//                                 }
//                                 <div className='signUp'>
//                                     Don't have an account? <Link to="/signup">SignUp</Link>
//                                 </div>
//                                 <button type='submit' className='btnFrom'>LogIn</button>
//                             </form>
//                             {/* <div className="forgot-password-link" onClick={openPopup}>
//                                 <Link to="#">Forgot Password?</Link>
//                             </div> */}
//                         </div>
//                     </div>
//                 </div>
//                 <div className="col-lg-7 col-md-6 col-sm-12 rightPart">
//                     <div className='about'>
//                         <img src={About} alt='About' />
//                     </div>
//                 </div>
//             </div>
//             {showForgotPasswordPopup && (
//                 <ForgotPasswordPopup
//                     forgotPassword={forgotPassword}
//                     handleEmailSubmit={handleEmailSubmit}
//                     handleOtpSubmit={handleOtpSubmit}
//                     handlePasswordReset={handlePasswordReset}
//                     handleChange={handleChange}
//                     handleClose={closePopup}
//                 />
//             )}
//         </div>
//     );
// };

// export default LogIn;

import React, { useState } from 'react';
import './css/login.css';
import Avatar from './img/avatar-man-profile-user-3-svgrepo-com(1).svg';
import About from './img/online-medical-consultation-male-svgrepo-com.svg';
import { Link, useNavigate } from 'react-router-dom';
import { MdEmail } from 'react-icons/md';
import { FaLock } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faCircleExclamation, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const ForgetPasswordPopup = ({ onClose }) => {
    const [forgetPassword, setForgetPassword] = useState({
        loading: false,
        email: '',
        otp: '',
        newPassword: '',
        confirmPassword: '',
        step: 1,
        error: null, // Changed from 'err' to 'error' for better readability
    });

    const handleSendCode = async () => {
        try {
            const response = await axios.post('http://localhost:4121/sendCode', { email: forgetPassword.email }); // Fixed object key name
            if (response.status === 200) {
                setForgetPassword({ ...forgetPassword, step: 2 }); // Fixed state update
            }
        } catch (error) {
            setForgetPassword({ ...forgetPassword, error: error.response.data.message }); // Fixed error handling
        }
    };

    const handleVerifyOTP = async () => {
        try {
            const response = await axios.post('http://localhost:4121/verify', { otp: forgetPassword.otp }); // Fixed object key name
            if (response.status === 200) {
                setForgetPassword({ ...forgetPassword, step: 3 }); // Fixed state update
            }
        } catch (error) {
            setForgetPassword({ ...forgetPassword, error: error.response.data.message }); // Fixed error handling
        }
    };

    const handleResetPassword = async () => {
        try {
            const response = await axios.patch('http://localhost:4121/reset', {
                newPassword: forgetPassword.newPassword,
                confirmPassword: forgetPassword.confirmPassword
            });
            if (response.status === 200) {
                onClose(); // Close the popup
            }
        } catch (error) {
            setForgetPassword({ ...forgetPassword, error: error.response.data.message }); // Fixed error handling
        }
    };

    return (
        <div className="popup">
            {forgetPassword.step === 1 && (
                <>
                    <input type="email" placeholder="Enter your email" value={forgetPassword.email} onChange={(e) => setForgetPassword({ ...forgetPassword, email: e.target.value })} />
                    <button onClick={handleSendCode}>Send Code</button>
                </>
            )}
            {forgetPassword.step === 2 && (
                <>
                    <input type="text" placeholder="Enter OTP" value={forgetPassword.otp} onChange={(e) => setForgetPassword({ ...forgetPassword, otp: e.target.value })} />
                    <button onClick={handleVerifyOTP}>Verify OTP</button>
                </>
            )}
            {forgetPassword.step === 3 && (
                <>
                    <input type="password" placeholder="Enter new password" value={forgetPassword.newPassword} onChange={(e) => setForgetPassword({ ...forgetPassword, newPassword: e.target.value })} />
                    <input type="password" placeholder="Confirm new password" value={forgetPassword.confirmPassword} onChange={(e) => setForgetPassword({ ...forgetPassword, confirmPassword: e.target.value })} />
                    <button onClick={handleResetPassword}>Reset Password</button>
                </>
            )}
            {forgetPassword.error && <div className="error">{forgetPassword.error}</div>}
        </div>
    );
};

const LogIn = () => {
    const [showForgetPasswordPopup, setShowForgetPasswordPopup] = useState(false);
    const [logIn, setLogIn] = useState({
        loading: false,
        email: '',
        password: '',
        err: [],
    });
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const LogInSubmit = (e) => {
        e.preventDefault();
        setLogIn({ ...logIn, loading: true, err: [] });
        axios.post(('http://localhost:4121/login'), {
            email: logIn.email,
            password: logIn.password
        }).then((response) => {
            setLogIn({ ...logIn, loading: false, err: [] });
            if (response.data.status === true) {
                navigate('/admin');
            } else {
                navigate('/home');
            }
        }).catch((error) => {
            console.log(error.response.data.error);
            setLogIn({ ...logIn, loading: false, err: error.response.data.error });
        })
    }
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
                            {logIn.err && logIn.err.length > 0 && (
                                <div className='messageError'>
                                    <FontAwesomeIcon icon={faTriangleExclamation} className='iconMessageError' />
                                    <p className="errorMassageFrom">{logIn.err}</p>
                                </div>
                            )}
                            <form className='col-lg-12 col-md-12 col-sm-12 logInForm' onSubmit={LogInSubmit}>
                                <div className='input-div'>
                                    <MdEmail className='icon' />
                                    <input type='email' className='input' placeholder='Email' onChange={(e) => setLogIn({ ...logIn, email: e.target.value })} />
                                </div>
                                <div className='input-div'>
                                    <FaLock className='icon' />
                                    <input type={showPassword ? 'text' : 'password'} className='input' placeholder='Password' onChange={(e) => setLogIn({ ...logIn, password: e.target.value })} />
                                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className='icon toggle-password-icon' onClick={togglePasswordVisibility} />
                                </div>
                                {
                                    logIn.err && logIn.err === 'This Password is Wrong' && (
                                        <div className='forgetPassword' onClick={() => setShowForgetPasswordPopup(true)}>
                                            <FontAwesomeIcon icon={faCircleExclamation} className='iconForgetPassword' /> Forget Password
                                        </div>
                                    )
                                }
                                {showForgetPasswordPopup && <ForgetPasswordPopup onClose={() => setShowForgetPasswordPopup(false)} />}

                                <div className='signUp'>
                                    Don't have an account? <Link to="/signup">SignUp</Link>
                                </div>
                                <button type='submit' className='btnFrom'>LogIn</button>
                            </form>
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

// import React, { useState } from 'react';
// import './css/login.css';
// import Avatar from './img/avatar-man-profile-user-3-svgrepo-com(1).svg';
// import About from './img/online-medical-consultation-male-svgrepo-com.svg';
// import { Link, useNavigate } from 'react-router-dom';
// import { MdEmail } from 'react-icons/md';
// import { FaLock } from 'react-icons/fa';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash, faCircleExclamation, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';

// const LogIn = () => {
//     const [logIn, setLogIn] = useState({
//         loading: false,
//         email: '',
//         password: '',
//         err: [],
//     });
//     const navigate = useNavigate();
//     const [showPassword, setShowPassword] = useState(false);
//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };
//     const LogInSubmit = (e) => {
//         e.preventDefault();
//         setLogIn({ ...logIn, loading: true, err: [] });
//         axios.post(('http://localhost:4121/login'), {
//             email: logIn.email,
//             password: logIn.password
//         }).then((response) => {
//             setLogIn({ ...logIn, loading: false, err: [] });
//             if (response.data.status === true) {
//                 navigate('/admin');
//             } else {
//                 navigate('/home');
//             }
//         }).catch((error) => {
//             console.log(error.response.data.error);
//             setLogIn({ ...logIn, loading: false, err: error.response.data.error });
//         })
//     }
//     return (
//         <div className="container-fluid login">
//             <div className="row">
//                 <div className="col-lg-5 col-md-6 col-sm-12 leftPart">
//                     <div className='container text-center pt-5 w-auto'>
//                         <div className='row'>
//                             <div className='col-lg-12 col-md-12 col-sm-12 beforeForm'>
//                                 <img src={Avatar} alt='Avatar' />
//                                 <h2>Hello!</h2>
//                             </div>
//                             {logIn.err && logIn.err.length > 0 && (
//                                 <div className='messageError'>
//                                     <FontAwesomeIcon icon={faTriangleExclamation} className='iconMessageError' />
//                                     <p className="errorMassageFrom">{logIn.err}</p>
//                                 </div>
//                             )}
//                             <form className='col-lg-12 col-md-12 col-sm-12 logInForm' onSubmit={LogInSubmit}>
//                                 <div className='input-div'>
//                                     <MdEmail className='icon' />
//                                     <input type='email' className='input' placeholder='Email' onChange={(e) => setLogIn({ ...logIn, email: e.target.value })} />
//                                 </div>
//                                 <div className='input-div'>
//                                     <FaLock className='icon' />
//                                     <input type={showPassword ? 'text' : 'password'} className='input' placeholder='Password' onChange={(e) => setLogIn({ ...logIn, password: e.target.value })} />
//                                     <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className='icon toggle-password-icon' onClick={togglePasswordVisibility} />
//                                 </div>
//                                 {
//                                     logIn.err && logIn.err === 'This Password is Wrong' && (
//                                         <div className='forgetPassword'>
//                                             <FontAwesomeIcon icon={faCircleExclamation} className='iconForgetPassword' /> Forget Password
//                                         </div>
//                                     )
//                                 }
//                                 <div className='signUp'>
//                                     Don't have an account? <Link to="/signup">SignUp</Link>
//                                 </div>
//                                 <button type='submit' className='btnFrom'>LogIn</button>
//                             </form>
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
// export default LogIn;