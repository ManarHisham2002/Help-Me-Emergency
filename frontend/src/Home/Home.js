import React from 'react';
import './css/home.css';
import Navbar from '../Navbar/Navbar';
import Menu from '../Menu/Menu';
import Symptoms from './Symptoms';
import Covid from './Covid';
const Home = () => {
    return (
        <>
            <Navbar activePage='/home' />
            <div className='container-fluid'>
                <div className='row'>
                    <Symptoms />
                    <Covid />
                    <Menu />
                </div>
            </div>
        </>
    )
}
export default Home;
