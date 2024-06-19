// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Loading from '../Loading/Loading';
// import InternetError from '../InternetError/InternetError';
// import NoData from '../NoData/NoData';

// const PatientAdmin = () => {
//     const [patients, setPatients] = useState({
//         loading: true,
//         dataPatients: [],
//         err: null,
//     });

//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchPatients = async () => {
//             setPatients({ loading: true, dataPatients: [], err: null });
//             try {
//                 const response = await axios.get('http://localhost:4121/api/patient/all');
//                 setPatients({ loading: false, dataPatients: response.data, err: null });
//             } catch (error) {
//                 setPatients({ loading: false, dataPatients: [], err: error.response ? error.response.data.errors : 'Network Error' });
//             }
//         };

//         fetchPatients();
//     }, []);

//     const handleCardClick = (id) => {
//         navigate(`/patient/${id}`);
//     };

//     return (
//         <>
//             {patients.loading ? (
//                 <Loading />
//             ) : patients.err ? (
//                 <InternetError error={patients.err} />
//             ) : patients.dataPatients.length > 0 ? (
//                 <div className='container patient mt-5'>
//                     <div className='row'>
//                         {patients.dataPatients.map((item) => (
//                             <div
//                                 className='col-12 col-sm-6 col-md-4 col-lg-3'
//                                 key={item.id}
//                                 onClick={() => handleCardClick(item.id)}
//                             >
//                                 <div className='our-team'>
//                                     <div className='picture'>
//                                         <img
//                                             className='img-fluid'
//                                             src='https://images.app.goo.gl/yzzhFFH6QL35HEu59'
//                                             alt={item.name}
//                                         />
//                                     </div>
//                                     <div className='team-content'>
//                                         <h3 className='name'>{item.name}</h3>
//                                         <h4 className='title'>{item.email}</h4>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             ) : (
//                 <NoData message='No Patients Available' />
//             )}
//         </>
//     );
// };

// export default PatientAdmin;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Loading/Loading';
import InternetError from '../InternetError/InternetError';
import NoData from '../NoData/NoData';

const PatientAdmin = () => {
    const [patients, setPatients] = useState({
        loading: true,
        dataPatients: [],
        err: null,
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchPatients = async () => {
            setPatients({ loading: true, dataPatients: [], err: null });
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/patient/all`);
                setPatients({ loading: false, dataPatients: response.data, err: null });
            } catch (error) {
                setPatients({ loading: false, dataPatients: [], err: error.response ? error.response.data.errors : 'Network Error' });
            }
        };

        fetchPatients();
    }, []);

    const handleCardClick = (_id) => {
        navigate(`/patient/${_id}`);
    };

    const handleDeleteClick = async (_id, e) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this patient?')) {
            try {
                await axios.delete(`${process.env.REACT_APP_API_URL}/api/patient/${_id}`);
                setPatients(prevState => ({
                    ...prevState,
                    dataPatients: prevState.dataPatients.filter(patient => patient._id !== _id)
                }));
            } catch (error) {
                alert('Failed to delete patient');
            }
        }
    };

    return (
        <>
            {patients.loading ? (
                <Loading />
            ) : patients.err ? (
                <InternetError error={patients.err} />
            ) : patients.dataPatients.length > 0 ? (
                <div className='container patient mt-5'>
                    <div className='row'>
                        {patients.dataPatients.map((item) => (
                            <div
                                className='col-12 col-sm-6 col-md-4 col-lg-3'
                                key={item._id}
                                onClick={() => handleCardClick(item._id)}
                            >
                                <div className='our-team'>
                                    <div className='picture'>
                                        <img
                                            className='img-fluid'
                                            src='https://via.placeholder.com/150'
                                            alt={item.name}
                                        />
                                    </div>
                                    <div className='team-content'>
                                        <h3 className='name'>{item.name}</h3>
                                        <h4 className='title'>{item.email}</h4>
                                        <button onClick={(e) => handleDeleteClick(item._id, e)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <NoData message='No Patients Available' />
            )}
        </>
    );
};

export default PatientAdmin;
