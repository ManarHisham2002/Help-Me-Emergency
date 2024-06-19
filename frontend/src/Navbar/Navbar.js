// import React, { useState, useEffect } from 'react';
// import $ from 'jquery';
// import { Link, useLocation } from 'react-router-dom';
// import { HiBars4 } from 'react-icons/hi2';
// import { HiX } from 'react-icons/hi';
// import NotFound from '../NotFound/NotFound';
// import DataNav from './DataNav';
// import Logo from './img/logo.png';
// import './css/navbarStyle.css';
// import UserProfile from '../UserProfile/UserProfile'

// const Navbar = ({ activePage }) => {
//     const location = useLocation();
//     const [isNavbarOpen, setIsNavbarOpen] = useState(false);
//     function handleResponsiveNavbar() {
//         const tabsNewAnim = $('#navbarSupportedContent');
//         const activeItemNewAnim = tabsNewAnim.find('.active');
//         if (activeItemNewAnim.length > 0) {
//             const activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
//             const activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
//             const itemPosNewAnimTop = activeItemNewAnim.position();
//             const itemPosNewAnimLeft = activeItemNewAnim.position();
//             $('.hori-selector').css({
//                 top: `${itemPosNewAnimTop.top}px`,
//                 left: `${itemPosNewAnimLeft.left}px`,
//                 height: `${activeWidthNewAnimHeight}px`,
//                 width: `${activeWidthNewAnimWidth}px`,
//             });
//         }
//     }
//     useEffect(() => {
//         handleResponsiveNavbar();
//         $(document).ready(function () {
//             setTimeout(function () {
//                 handleResponsiveNavbar();
//             });
//         });
//         $(window).on('resize', function () {
//             setTimeout(function () {
//                 handleResponsiveNavbar();
//             }, 500);
//         });
//         const path = location.pathname.split('/home').pop() || <NotFound />;
//         const target = $(`#navbarSupportedContent ul li a[href='${path}']`);
//         target.parent().addClass('active');
//         handleResponsiveNavbar();
//     }, [location]);
//     const toggleNavbar = () => {
//         const navbarNav = $('#navbarSupportedContent');
//         navbarNav.slideToggle();
//         setIsNavbarOpen(!isNavbarOpen);
//         handleResponsiveNavbar();
//     };
//     $(document).ready(function () {
//         let profileDropdownList = $('.profile-dropdown-list');
//         let btn = $('.profile-dropdown-btn');
//         btn.on('click', function (e) {
//             e.stopPropagation();
//             profileDropdownList.toggleClass('active');
//         });
//         $(document).on('click', function (e) {
//             if (!btn.is(e.target)) {
//                 profileDropdownList.removeClass('active');
//             }
//         });
//     });
//     const [isFormOpen, setFormOpen] = useState(false);
//     const openForm = () => {
//         setFormOpen(true);
//     };
//     const closeForm = () => {
//         setFormOpen(false);
//     };

//     return (
//         <>
//             <nav className='navbar navbar-expand-custom navbar-mainbg navHelpMe h-200'>
//                 <Link className='navbar-brand navbar-logo' to='/home'>
//                     <img src={Logo} alt='Help me / Emergency' className='navLogo' />
//                     Help me / Emergency
//                 </Link>
//                 <button
//                     className='navbar-toggler'
//                     type='button'
//                     aria-controls='navbarSupportedContent'
//                     aria-expanded='false'
//                     aria-label='Toggle navigation'
//                     data-bs-target='#navbarSupportedContent'
//                     onClick={toggleNavbar}
//                     style={{ outline: 'none' }}
//                 >
//                     {isNavbarOpen ? <HiX /> : <HiBars4 />}
//                 </button>
//                 <div className='collapse navbar-collapse' id='navbarSupportedContent'>
//                     <ul className='navbar-nav ms-auto'>
//                         <div className='hori-selector'>
//                             <div className='left'></div>
//                             <div className='right'></div>
//                         </div>
//                         {DataNav.map((item, index) => (
//                             <li key={index} className={`nav-item ${activePage === item.link ? 'active' : ''}`}>
//                                 <Link className='nav-link' to={item.link}>
//                                     {item.icon} {item.label}
//                                 </Link>
//                             </li>
//                         ))}
//                         {activePage === '/emergency' ? (
//                             <li className='nav-item ms-5'>
//                                 <div onClick={openForm} className='userProfile'>
//                                     <img src={require('./img/userProfile.jpg')} alt='user' />
//                                 </div>
//                                 {isFormOpen && <UserProfile onClose={closeForm} />}
//                             </li>
//                         ) : (
//                             <li className='nav-item'>
//                                 <div onClick={openForm} className='userProfile'>
//                                         <img src={require('./img/userProfile.jpg')} alt='user' />
//                                 </div>
//                                     {isFormOpen && <UserProfile onClose={closeForm} />}
//                             </li>
//                         )}
//                     </ul>
//                 </div>
//             </nav>
//         </>
//     );
// };
// export default Navbar;
import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import { Link, useLocation } from 'react-router-dom';
import { HiBars4 } from 'react-icons/hi2';
import { HiX } from 'react-icons/hi';
import NotFound from '../NotFound/NotFound';
import DataNav from './DataNav';
import Logo from './img/logo.png';
import './css/navbarStyle.css';
import UserProfile from '../UserProfile/UserProfile'

const Navbar = ({ activePage }) => {
    const location = useLocation();
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const [isFormOpen, setFormOpen] = useState(false);

    function handleResponsiveNavbar() {
        const tabsNewAnim = $('#navbarSupportedContent');
        const activeItemNewAnim = tabsNewAnim.find('.active');
        if (activeItemNewAnim.length > 0) {
            const activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
            const activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
            const itemPosNewAnimTop = activeItemNewAnim.position();
            const itemPosNewAnimLeft = activeItemNewAnim.position();
            $('.hori-selector').css({
                top: `${itemPosNewAnimTop.top}px`,
                left: `${itemPosNewAnimLeft.left}px`,
                height: `${activeWidthNewAnimHeight}px`,
                width: `${activeWidthNewAnimWidth}px`,
            });
        }
    }

    useEffect(() => {
        handleResponsiveNavbar();
        $(document).ready(function () {
            setTimeout(function () {
                handleResponsiveNavbar();
            });
        });
        $(window).on('resize', function () {
            setTimeout(function () {
                handleResponsiveNavbar();
            }, 500);
        });
        const path = location.pathname.split('/home').pop() || <NotFound />;
        const target = $(`#navbarSupportedContent ul li a[href='${path}']`);
        target.parent().addClass('active');
        handleResponsiveNavbar();
    }, [location]);

    const toggleNavbar = () => {
        const navbarNav = $('#navbarSupportedContent');
        navbarNav.slideToggle();
        setIsNavbarOpen(!isNavbarOpen);
        handleResponsiveNavbar();
    };

    $(document).ready(function () {
        let profileDropdownList = $('.profile-dropdown-list');
        let btn = $('.profile-dropdown-btn');
        btn.on('click', function (e) {
            e.stopPropagation();
            profileDropdownList.toggleClass('active');
        });
        $(document).on('click', function (e) {
            if (!btn.is(e.target)) {
                profileDropdownList.removeClass('active');
            }
        });
    });

    const openForm = () => {
        setFormOpen(true);
    };

    const closeForm = () => {
        setFormOpen(false);
    };

    return (
        <>
            <nav className='navbar navbar-expand-custom navbar-mainbg navHelpMe h-200'>
                <Link className='navbar-brand navbar-logo' to='/home'>
                    <img src={Logo} alt='Help me / Emergency' className='navLogo' />
                    Help me / Emergency
                </Link>
                <button
                    className='navbar-toggler'
                    type='button'
                    aria-controls='navbarSupportedContent'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                    data-bs-target='#navbarSupportedContent'
                    onClick={toggleNavbar}
                    style={{ outline: 'none' }}
                >
                    {isNavbarOpen ? <HiX /> : <HiBars4 />}
                </button>
                <div className='collapse navbar-collapse' id='navbarSupportedContent'>
                    <ul className='navbar-nav ms-auto'>
                        <div className='hori-selector'>
                            <div className='left'></div>
                            <div className='right'></div>
                        </div>
                        {DataNav.map((item, index) => (
                            <li key={index} className={`nav-item ${activePage === item.link ? 'active' : ''}`}>
                                <Link className='nav-link' to={item.link}>
                                    {item.icon} {item.label}
                                </Link>
                            </li>
                        ))}
                        <li className='nav-item'>
                            <div onClick={openForm} className='userProfile'>
                                <img src={require('./img/userProfile.jpg')} alt='user' />
                            </div>
                            {isFormOpen && <UserProfile onClose={closeForm} />}
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Navbar;

