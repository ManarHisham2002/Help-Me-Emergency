import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosChatbubbles } from "react-icons/io";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import './css/menu.css';
import { removeAuthUser } from '../Storage.js';
import { getAuthUser } from '../Storage.js';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';

const Menu = () => {
    const navigate = useNavigate();
    const [showQRModal, setShowQRModal] = useState(false);
    const [qrCode, setQrCode] = useState(null);

    const handleLogout = () => {
        removeAuthUser();
        navigate('/');
    };

    const handleScanQR = async () => {
        const patient = getAuthUser();
        if (patient) {
            try {
                const response = await axios.get(`/shareHistory/${patient.id}`, { responseType: 'arraybuffer' });
                const qrCodeUrl = `data:image/png;base64,${Buffer.from(response.data, 'binary').toString('base64')}`;
                setQrCode(qrCodeUrl);
                setShowQRModal(true);
            } catch (error) {
                console.error('Error fetching QR code:', error);
            }
        } else {
            console.error('No patient data found');
        }
    };

    const DataMenu = [
        {
            icon: <IoIosChatbubbles data-feather='chat' />,
            label: 'Chat',
            path: '/chat'
        },
        {
            icon: <MdOutlineQrCodeScanner data-feather='scan' />,
            label: 'Scan QR',
            path: '',
            onClick: handleScanQR // Add onClick handler to scan QR
        },
        {
            icon: <FaPhoneVolume data-feather='call' />,
            label: 'Call',
            path: 'tel:123'
        },
        {
            icon: <IoIosLogOut data-feather='logout' />,
            label: 'LogOut',
            path: '/',
            onClick: handleLogout // Add onClick handler to logout item
        },
    ];

    return (
        <>
            <div className='col-lg-1 col-md-1 col-sm-1 d-flex flex-column position-fixed align-items-end mt-5 menuPage'>
                <div className='sideMenu m-lg-2 p-lg-2 m-sm-0 p-sm-0 text-center d-flex align-items-left justify-content-center'>
                    <ul className='list-unstyled'>
                        {DataMenu.map((item, index) => (
                            <li key={index} className='contMenuIcon mx-2'>
                                <Link to={item.path} className='d-flex align-items-center' onClick={item.onClick}>
                                    {item.icon}
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            
            <Modal show={showQRModal} onHide={() => setShowQRModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Patient QR Code</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {qrCode ? <img src={qrCode} alt="Patient QR Code" /> : <p>Loading...</p>}
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Menu;

