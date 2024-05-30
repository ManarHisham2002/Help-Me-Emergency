import { TfiSearch } from "react-icons/tfi";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa6";
import { BiLogInCircle } from "react-icons/bi";
import { Link } from 'react-router-dom';
import './css/tapNavbar.css'

const TapNavbar = () => {
    const DataTapNav = [
        {
            id: 1,
            icon: <MdOutlineQrCodeScanner />,
            linkTitle: 'Scan',
            path: '#'
        },
        {
            id: 2,
            icon: <FaPhoneVolume />,
            linkTitle: 'Call',
            path: 'tel:123'
        },
        {
            id: 3,
            icon: <TfiSearch />,
            linkTitle: 'Search',
            path: '#'
        },
        {
            id: 4,
            icon: <BiLogInCircle />,
            linkTitle: 'Login',
            path: '/login'
        },
    ]
    return (
        <>
            <div className="navContainer d-f justify-content-center">
                <div class="menuTapNav algin-item-center ">
                    {DataTapNav.map((Val, index)=>(
                        <Link to={Val.path} className="link" key={index}>
                            <span class="link-icon">
                                {Val.icon}
                            </span>
                            <span class="link-title">{Val.linkTitle}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}
export default TapNavbar;

// import React, { useState } from 'react';
// import { TfiSearch } from 'react-icons/tfi';
// import { MdOutlineQrCodeScanner, FaPhoneVolume, BiLogInCircle } from 'react-icons/all';
// import { Link } from 'react-router-dom';
// import './css/tapNavbar.css';

// const TapNavbar = () => {
//     const [searchVisible, setSearchVisible] = useState(false);
//     const [searchTerm, setSearchTerm] = useState('');

//     const handleSearchClick = () => {
//         setSearchVisible(!searchVisible);
//     };

//     const handleSearchChange = (e) => {
//         setSearchTerm(e.target.value);
//     };

//     const handleSubmitSearch = (e) => {
//         e.preventDefault();
//         // Here you can implement the logic to send the search term to someone who will search for it
//         console.log('Search term:', searchTerm);
//     };

//     const DataTapNav = [
//         {
//             id: 1,
//             icon: <MdOutlineQrCodeScanner />,
//             linkTitle: 'Scan',
//             path: '#'
//         },
//         {
//             id: 2,
//             icon: <FaPhoneVolume />,
//             linkTitle: 'Call',
//             path: 'tel:123'
//         },
//         {
//             id: 3,
//             icon: <TfiSearch onClick={handleSearchClick} />,
//             linkTitle: 'Search',
//             path: '#'
//         },
//         {
//             id: 4,
//             icon: <BiLogInCircle />,
//             linkTitle: 'Login',
//             path: '/login'
//         },
//     ];

//     return (
//         <>
//             <div className="navContainer d-f justify-content-center">
//                 <div className="menuTapNav algin-item-center ">
//                     {DataTapNav.map((Val, index) => (
//                         <Link to={Val.path} className="link" key={index}>
//                             <span className="link-icon">
//                                 {Val.icon}
//                             </span>
//                             <span className="link-title">{Val.linkTitle}</span>
//                         </Link>
//                     ))}
//                     {searchVisible && (
//                         <div className="search-container">
//                             <form onSubmit={handleSubmitSearch}>
//                                 <input
//                                     type="text"
//                                     placeholder="Enter search term"
//                                     value={searchTerm}
//                                     onChange={handleSearchChange}
//                                 />
//                                 <button type="submit">Search</button>
//                             </form>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </>
//     );
// };

// export default TapNavbar;
