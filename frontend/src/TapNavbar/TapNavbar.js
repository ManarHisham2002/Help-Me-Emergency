import { MdOutlineQrCodeScanner } from 'react-icons/md';
import { FaPhoneVolume } from 'react-icons/fa6';
import { BiLogInCircle } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import './css/tapNavbar.css'

const TapNavbar = () => {
    const DataTapNav = [
        {
            id: 1,
            icon: <MdOutlineQrCodeScanner />,
            linkTitle: 'Scan',
            path: '/scanQr'
        },
        {
            id: 2,
            icon: <FaPhoneVolume />,
            linkTitle: 'Call',
            path: 'tel:123'
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
            <div className='navContainer d-f justify-content-center'>
                <div className='menuTapNav algin-item-center '>
                    {DataTapNav.map((Val, index)=>(
                        <Link to={Val.path} className='link' key={index}>
                            <span className='link-icon'>
                                {Val.icon}
                            </span>
                            <span className='link-title-tapNav'>{Val.linkTitle}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}
export default TapNavbar;
