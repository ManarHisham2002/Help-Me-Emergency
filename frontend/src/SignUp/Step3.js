import React from 'react';
import Checkbox from './Checkbox';

const allergies = [
    'Drug Allergy', 'Food Allergy', 'Eczema',
    'Urticaria', 'Contact Dermatitis'
];

const Step3 = ({ navigateToFormStep, handleCheckboxChange }) => (
    <section id='step-3'>
        {allergies.map((allergy, index) => (
            <Checkbox
                key={index}
                id={`allergyCheckbox${index}`}
                label={allergy}
                onCheckboxChange={(id, isChecked) => handleCheckboxChange('allergies', allergy, isChecked)}
            />
        ))}
        <div>
            <button className='btnFrom' type='button' onClick={() => navigateToFormStep(2)}>Previous</button>
            <button className='btnFrom' type='button' onClick={() => navigateToFormStep(4)}>Next</button>
        </div>
    </section>
);

export default Step3;
