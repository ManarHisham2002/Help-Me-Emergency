import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVialVirus } from '@fortawesome/free-solid-svg-icons';
import { faCapsules } from '@fortawesome/free-solid-svg-icons';
import { faTruckMedical } from '@fortawesome/free-solid-svg-icons';
import { faHouseChimney } from '@fortawesome/free-solid-svg-icons';
const DataNav = [
    {
        id: 0,
        label: 'Home',
        icon: <FontAwesomeIcon icon={faHouseChimney} />,
        link: '/home'
    },
    {
        id: 1,
        label: 'Diseases',
        icon: <FontAwesomeIcon icon={faVialVirus} />,
        link: '/disease'
    },
    {
        id: 2,
        label: 'Pharmacy',
        icon: <FontAwesomeIcon icon={faCapsules} />,
        link: '/pharmacy'
    },
    {
        id: 3,
        label: 'Emergency',
        icon: <FontAwesomeIcon icon={faTruckMedical} />,
        link: '/emergency'
    },
];

export default DataNav;