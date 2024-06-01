import React, { useState } from 'react';
import { MdEmail } from 'react-icons/md';
import { IoCamera } from 'react-icons/io5';
import { RiLockPasswordLine, RiLockPasswordFill } from 'react-icons/ri';
import { FaUser, FaPhone, FaPersonHalfDress } from 'react-icons/fa6';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Step1 = ({ navigateToFormStep, setInfoUser, infoUser }) => {
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false
    });

    const togglePasswordVisibility = (field) => {
        setShowPassword(prevState => ({
            ...prevState,
            [field]: !prevState[field]
        }));
    };

    return (
        <section id="step-1">
            <div className='input-div'>
                <FaUser className='icon' />
                <input type='text' className='input' placeholder='Name' name="name" onChange={(e) => setInfoUser({ ...infoUser, name: e.target.value })} />
            </div>
            <div className='input-div'>
                <MdEmail className='icon' />
                <input type='email' className='input' placeholder='Email' name="email" onChange={(e) => setInfoUser({ ...infoUser, email: e.target.value })} />
            </div>
            <div className='input-div'>
                <RiLockPasswordLine className='icon' />
                <input type={showPassword.password ? 'text' : 'password'} placeholder='Password' name="password" onChange={(e) => setInfoUser({ ...infoUser, password: e.target.value })} />
                <FontAwesomeIcon icon={showPassword.password ? faEye : faEyeSlash} className='icon toggle-password-icon' onClick={() => togglePasswordVisibility('password')} />
            </div>
            <div className='input-div'>
                <RiLockPasswordFill className='icon' />
                <input type={showPassword.confirmPassword ? 'text' : 'password'} placeholder='Confirm Password' name="confirmPassword" onChange={(e) => setInfoUser({ ...infoUser, confirmPassword: e.target.value })} />
                <FontAwesomeIcon icon={showPassword.confirmPassword ? faEye : faEyeSlash} className='icon toggle-password-icon' onClick={() => togglePasswordVisibility('confirmPassword')} />
            </div>
            <div className='input-div'>
                <FaPhone className='icon' />
                <input type='text' className='input' name='phone' placeholder='Phone' onChange={(e) => setInfoUser({ ...infoUser, phone: e.target.value })} />
            </div>
            {/* <div className="input-div">
                                            <IoCamera className="icon" />
                                            <label htmlFor="fileInput" className="fileLabel">Profile Photo</label>
                                            <input type="file" id="fileInput" accept="image/*" style={{ display: 'none' }} />
                                        </div> */}
            <div className="input-div">
                <FaPersonHalfDress className="icon" />
                <div className="row">
                    <label className="col-6 labelRadio">
                        <input type="radio" name="gender" value="male" onChange={(e) => setInfoUser({ ...infoUser, gender: e.target.value })} />
                        <span>Male</span>
                    </label>
                    <label className="col-6 labelRadio">
                        <input type="radio" name="gender" value="female" onChange={(e) => setInfoUser({ ...infoUser, gender: e.target.value })} />
                        <span>Female</span>
                    </label>
                </div>
            </div>
            <div className="button-action mt-3">
                <button type="button" className="next btnFrom" onClick={() => navigateToFormStep(2)}>Next</button>
            </div>
        </section>
    );
};

export default Step1;
