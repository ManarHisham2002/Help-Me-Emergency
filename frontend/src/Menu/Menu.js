import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { IoIosChatbubbles } from "react-icons/io";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import './css/menu.css';
const Menu = () => {
    const DataMenu = [
        {
            icon: <IoIosChatbubbles data-feather='chat' />,
            label: 'Chat',
            path: '/chat'
        },
        {
            icon: <MdOutlineQrCodeScanner data-feather='scan' />,
            label: 'Scan QR',
            path: ''
        },
        { 
            icon: <FaPhoneVolume data-feather='call' />,
            label: 'Call',
            path: 'tel:123'
        },
        {
            icon: <IoIosLogOut data-feather='logout' />,
            label: 'LogOut',
            path: ''
        },
    ];
    return (
        <>
            <div className='col-lg-1 col-md-1 col-sm-1 d-flex flex-column position-fixed align-items-end mt-5 menuPage'>
                <div className='sideMenu m-lg-2 p-lg-2 m-sm-0 p-sm-0 text-center d-flex align-items-left justify-content-center'>
                    <ul className='list-unstyled'>
                        {DataMenu.map((item, index) => (
                            <li key={index} className='contMenuIcon mx-2'>
                                <Link to={item.path} className='d-flex align-items-center'>
                                    {item.icon}
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}
export default Menu;