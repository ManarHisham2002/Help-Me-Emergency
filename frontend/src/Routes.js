import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Master from './Master/Master';
import InfoMaster from './Master//InfoMaster';
import LogIn from './LogIn/LogIn';
import Admin from './Admin/Admin';
import NotFoundPage from './NotFound/NotFound';
import InfoPatient from './Patient/InfoPatient';
import InfoDiseaseAdmin from './DiseaseAdmin/InfoDiseaseAdmin';
import InfoEmergencyAdmin from './EmergencyAdmin/InfoEmergencyAdmin';
// import InfoPharmacyAdmin from './PharmacyAdmin/InfoPharmacyAdmin';
// import InfoMedicineAdmin from './MedicineAdmin/InfoMedicineAdmin';
import SignUp from './SignUp/SignUp';
import Home from './Home/Home';
import Disease from './Diseases/Disease';
import InfoDisease from './Diseases/InfoDisease';
import TotalPharmacy from './Pharmacy/TotalPharmacy';
import Emergency from './Emergency/Emergency';
import InfoEmergency from './Emergency/InfoEmergency';
import Chat from './Chat/Chat';
import ScannerQR from './ScannerQR/ScannerQR';
// import LogOut from './LogOut';


const RoutesPages = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' exact element={<Master />} />
                <Route path='/master/:id' exact element={<InfoMaster />} />
                <Route path='/scanQr' exact element={<ScannerQR />} />
                <Route path='/login' element={<LogIn />} />
                <Route path='/admin' element={<Admin />} />
                <Route path='/patient/:_id' element={<InfoPatient />} />
                <Route path='/diseaseAdmin/:id' element={<InfoDiseaseAdmin />} />
                <Route path='/emergencyAdmin/:id' element={<InfoEmergencyAdmin />} />
                {/* <Route path='/pharmacyAdmin/:id' element={<InfoPharmacyAdmin />} /> */}
                {/* <Route path='/medicineAdmin/:id' element={<InfoMedicineAdmin />} /> */}
                <Route path='/signup' element={<SignUp />} />
                <Route path='/home' element={<Home />} />
                <Route path='/disease' element={<Disease />} />
                <Route path='/disease/:diseaseId' element={<InfoDisease />} />
                <Route path='/pharmacy' element={<TotalPharmacy />} />
                <Route path='/emergency' element={<Emergency />} />
                <Route path='/emergency/:id' element={<InfoEmergency />} />
                <Route path='/chat' element={<Chat />} />
                {/*<Route path='/logout' element={<LogOut />} /> */}
                <Route path='*' element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
};
export default RoutesPages;