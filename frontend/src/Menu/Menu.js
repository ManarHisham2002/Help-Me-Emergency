import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import DataMenu from './DataMenu';
import './css/menu.css';
const Menu = () => {
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