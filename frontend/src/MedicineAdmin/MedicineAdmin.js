import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../Loading/Loading';
import InternetError from '../InternetError/InternetError';
import NoData from '../NoData/NoData';


const MedicineAdmin = () => {
    const [medicines, setMedicines] = useState({
        loading: true,
        dataMedicines: [],
        err: null,
    });

    useEffect(() => {
        setMedicines(prevState => ({ ...prevState, loading: true }));
        axios.get('http://localhost:4121/api/medicine/all')
            .then((response) => {
                console.log(response);
                setMedicines(prevState => ({ ...prevState, dataMedicines: response.data, err: null, loading: false }));
            })
            .catch((error) => {
                setMedicines(prevState => ({ ...prevState, loading: false, err: error.message }));
            });
    }, []);

    return (
        <>
            {medicines.loading ? (
                <Loading />
            ) : medicines.err ? (
                <InternetError />
            ) : medicines.dataMedicines && medicines.dataMedicines.length > 0 ? (
                <div className='container Disease'>
                    <div className='row'>
                        {medicines.dataMedicines.map((item) => (
                            item.medicine.map((item) => (
                                <div className='col-12 col-sm-6 col-md-4 col-lg-3   mt-5' key={item.id}>
                                    <div className='our-team'>
                                        <div className='picture'>
                                            <img className='img-fluid' src={item.img} alt={item.name} />
                                        </div>
                                        <div className='team-content'>
                                            <h3 className='name'>{item.name}</h3>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ))}
                    </div>
                </div>
            ) : (
                <NoData message='No Medicines Available' />
            )}
        </>
    );
};

export default MedicineAdmin;
