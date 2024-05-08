import { IoNotifications } from "react-icons/io5";
import { IoIosChatbubbles } from "react-icons/io";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { FaPhoneVolume } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
const DataMenu = [
    {
        icon: <IoNotifications data-feather='notification'/>,
        label: 'Notification',
        path: ''
    },
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
        // icon: <IoCall data-feather='call' />, 
        icon: <FaPhoneVolume data-feather='call' />, 
        label: 'Call',
        path: ''
    },
    { 
        icon: <IoIosLogOut data-feather='logout' />, 
        label: 'LogOut',
        path: '/logout'
    },
];
export default DataMenu;