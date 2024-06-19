import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import DataSymptoms from './DataSymptoms';
const Symptoms = () => {
    const [formData, setFormData] = useState({
        symptom1: '',
        symptom2: '',
        symptom3: '',
        symptom4: '',
        symptom5: '',
    });
    const [showDisease, setShowDisease] = useState(false);
    const [diseaseResults, setDiseaseResults] = useState([]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const getAvailableSymptoms = (selectedSymptoms) => {
        return DataSymptoms.filter(symptom => !selectedSymptoms.includes(symptom));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        predictDisease();
    };
    const handleClose = () => {
        setShowDisease(false);
    };
    const predictDisease = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`Error predicting disease: ${errorData}`);
            }
            const data = await response.json();
            setDiseaseResults(data.top_diseases);
            setShowDisease(true);
        } catch (error) {
            console.error(error);
            alert(`Error predicting disease: ${error.message}`);
        }
    };
    const selectedSymptoms = Object.values(formData).filter(symptom => symptom);
    const availableSymptoms = getAvailableSymptoms(selectedSymptoms);
    return (
        <div className='col-xl-11 col-lg-11 col-md-11 col-sm-11 col-8 free-quote mt-5'>
            <div className='container'>
                <div className='row'>
                    <div className='col-xl-8 col-lg-8 col-md-11 col-sm-11 col-11  offset-lg-2 mt-5 wow fadeIn' data-wow-duration='1s'
                        data-wow-delay='0.8s'>
                        <form onSubmit={handleSubmit}>
                            {!showDisease && (
                                <div className='row symptomsContainer'>
                                    {[1, 2, 3, 4, 5].map((num) => (
                                        <div key={num} className='col-xl-6 col-lg-6 col-md-6 col-sm-11 col-11'>
                                            <fieldset>
                                                <input
                                                    list={`symptomsdata${num}`}
                                                    id={`symptoms${num}`}
                                                    name={`symptom${num}`}
                                                    size='50'
                                                    autoComplete='off'
                                                    value={formData[`symptom${num}`]}
                                                    onChange={handleChange}
                                                    placeholder='Symptom'
                                                />
                                                <datalist id={`symptomsdata${num}`} className='listOfSymptoms'>
                                                    {availableSymptoms.map((symptom, index) => (
                                                        <option key={index} value={symptom} />
                                                    ))}
                                                </datalist>
                                            </fieldset>
                                        </div>
                                    ))}
                                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-11 col-11'>
                                        <fieldset>
                                            <button type='submit' className='getDisease'>Get My Disease</button>
                                        </fieldset>
                                    </div>
                                </div>
                            )}
                            {showDisease && (
                                <div className='myDisease col-xl-11 col-lg-11 col-md-11 col-sm-11 col-11'>
                                    <FontAwesomeIcon icon={faXmark} onClick={handleClose} className='iconClose' />
                                    <div className='diseaseContainer'>
                                        <p>
                                            <span className='dangers'>Please visit your doctor to make sure</span>
                                        </p>
                                        <p>You may be infected with</p>
                                        {diseaseResults.map((disease, index) => (
                                            <p key={index}>
                                                {disease.name} <span className='rate'>
                                                    {disease.probability * 100}%</span>
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Symptoms;
