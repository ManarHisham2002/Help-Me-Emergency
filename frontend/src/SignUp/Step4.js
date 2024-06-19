import React from 'react';
import Checkbox from './Checkbox';

const surgeries = [
    'Cholecystectomy', 'Nephrectomy', 'Tumor Removal',
    'Tonsillectomy', 'Laparoscopy', 'Endoscopy',
    'Cystoscopy', 'Hysteroscopy', 'Laser surgery'
];

const Step4 = ({ navigateToFormStep, handleCheckboxChange, handleSubmit }) => (
    <section id='step-4'>
        {surgeries.map((surgery, index) => (
            <Checkbox
                key={index}
                id={`surgeryCheckbox${index}`}
                label={surgery}
                onCheckboxChange={(id, isChecked) => handleCheckboxChange('surgeries', surgery, isChecked)}
            />
        ))}
        <div>
            <button className='btnFrom' type='button' onClick={() => navigateToFormStep(3)}>Previous</button>
            <button className='btnFrom' type='submit' onClick={handleSubmit}>Submit</button>
        </div>
    </section>
);

export default Step4;
