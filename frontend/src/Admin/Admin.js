import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faPeopleGroup, faCapsules, faSignOutAlt, faVialVirus, faStaffSnake, faTruckMedical } from '@fortawesome/free-solid-svg-icons';
import './css/admin.css';
import PatientAdmin from '../Patient/Patient';
import DiseaseAdmin from '../DiseaseAdmin/DiseaseAdmin';
import EmergencyAdmin from '../EmergencyAdmin/EmergencyAdmin';
import PharmacyAdmin from '../PharmacyAdmin/PharmacyAdmin';
import MedicineAdmin from '../MedicineAdmin/MedicineAdmin';

const Admin = () => {
    const [isClosed, setIsClosed] = useState(true);
    const [activeSection, setActiveSection] = useState('Disease');

    const toggleSidebar = () => {
        setIsClosed(!isClosed);
    };
    const renderActiveSection = () => {
        switch (activeSection) {
            case 'Patient':
                return <PatientAdmin />;
            case 'Disease':
                return <DiseaseAdmin />;
            case 'Emergency':
                return <EmergencyAdmin />;
            case 'Pharmacy':
                return <PharmacyAdmin />;
            case 'Medicine':
                return <MedicineAdmin />;
            default:
                return null;
        }
    };
    return (

        <div className='admin'>
            <nav className={`sidebar ${isClosed ? 'close' : ''}`}>
                <header>
                    <div className='image-text'>
                        <span className='image'>
                            <img src='logo.png' alt='Logo' />
                        </span>
                        <div className='text logo-text'>
                            <span className='name'>Help/Me Emergency</span>
                            <span className='profession'></span>
                        </div>
                    </div>
                    <FontAwesomeIcon icon={faChevronRight} className='toggle' onClick={toggleSidebar} />
                </header>
                <div className='menu-bar'>
                    <div className='menu'>
                        <ul className='menu-links'>
                            
                            <li className={`nav-link ${activeSection === 'Disease' ? 'active' : ''}`} onClick={() => setActiveSection('Disease')}>
                                <FontAwesomeIcon icon={faVialVirus} className='icon' />
                                <span className='text nav-text'>Disease</span>
                            </li>
                            <li className={`nav-link ${activeSection === 'Emergency' ? 'active' : ''}`} onClick={() => setActiveSection('Emergency')}>
                                <FontAwesomeIcon icon={faTruckMedical} className='icon' />
                                <span className='text nav-text'>Emergency</span>
                            </li>
                            <li className={`nav-link ${activeSection === 'Pharmacy' ? 'active' : ''}`} onClick={() => setActiveSection('Pharmacy')}>
                                <FontAwesomeIcon icon={faStaffSnake} className='icon' />
                                <span className='text nav-text'>Pharmacy</span>
                            </li>
                            <li className={`nav-link ${activeSection === 'Medicine' ? 'active' : ''}`} onClick={() => setActiveSection('Medicine')}>
                                <FontAwesomeIcon icon={faCapsules} className='icon' />
                                <span className='text nav-text'>Medicine</span>
                            </li>
                            <li className={`nav-link ${activeSection === 'Patient' ? 'active' : ''}`} onClick={() => setActiveSection('Patient')}>
                                <FontAwesomeIcon icon={faPeopleGroup} className='icon' />
                                <span className='text nav-text'>Patient</span>
                            </li>
                            {/* <li className={`nav-link ${activeSection === 'Chat' ? 'active' : ''}`} onClick={() => setActiveSection('Chat')}>
                                <FontAwesomeIcon icon={fas.faComments} className='icon' />
                                <span className='text nav-text'>Chat</span>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faSignOutAlt} className='icon' />
                                <span className='text nav-text'>Logout</span>
                             </li> */}
                        </ul>
                    </div>
                </div>
            </nav>
            <section className='slide'>
                {renderActiveSection()}
            </section>
        </div>
    );
};

export default Admin;
