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
