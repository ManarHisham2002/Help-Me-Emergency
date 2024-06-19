import React from 'react';
import Checkbox from './Checkbox';

const diseases = [
    'Cardiovascular Diseases', 'Respiratory System Diseases', 'Cancer',
    'Diabetes', 'Epilepsy and Seizures', 'Kidney Disease', 'Blood Thinning Disease'
];

const Step2 = ({ navigateToFormStep, handleCheckboxChange }) => (
    <section id='step-2'>
        {diseases.map((disease, index) => (
            <Checkbox
                key={index}
                id={`diseaseCheckbox${index}`}
                label={disease}
                onCheckboxChange={(id, isChecked) => handleCheckboxChange('diseases', disease, isChecked)}
            />
        ))}
        <div>
            <button className='btnFrom' type='button' onClick={() => navigateToFormStep(1)}>Previous</button>
            <button className='btnFrom' type='button' onClick={() => navigateToFormStep(3)}>Next</button>
        </div>
    </section>
);

export default Step2;
