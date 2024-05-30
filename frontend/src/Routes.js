import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Master from './Master/Master';
import InfoMaster from './Master//InfoMaster';
import LogIn from './LogIn/LogIn';
import SignUp from './SignUp/SignUp';
// import Home from './Home/Home';
// import Disease from './Diseases/Disease';
// import InfoDisease from './Diseases/InfoDisease';
// import Pharmacy from './Pharmacy/Pharmacy';
// import Emergency from './Emergency/Emergency';
// import InfoEmergency from './Emergency/InfoEmergency';
// import Chat from './Chat/Chat';
// import LogOut from './LogOut';
import NotFoundPage from './NotFound/NotFound';
const RoutesPages = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<Master />} />
                <Route path="/master/:id" exact element={<InfoMaster />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/signup" element={<SignUp />} />
                {/* <Route path="/home" element={<Home />} />
                <Route path="/disease" element={<Disease />} />
                <Route path="/disease/:diseaseId" element={<InfoDisease />} />
                <Route path="/pharmacy" element={<Pharmacy />} />
                <Route path="/emergency" element={<Emergency />} />
                <Route path="/emergency/:id" element={<InfoEmergency />} /> */}
                {/*
                <Route path="/chat" element={<Chat />} />
                <Route path="/logout" element={<LogOut />} /> */}
                <Route path='*' element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
};
export default RoutesPages;