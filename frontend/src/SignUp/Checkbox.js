// import React from 'react';

// const Checkbox = ({ id, label }) => (
//     <label htmlFor={id} className="checkbox">
//         <input className="checkbox__input" type="checkbox" id={id} />
//         <svg className="checkbox__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22">
//             <rect width="21" height="21" x="1" y="1" fill="#FFF" stroke="#04557d" rx="4" />
//             <path className="tick" stroke="#FC8500" fill="none" strokeLinecap="round" strokeWidth="4" d="M4 10l5 5 9-9" />
//         </svg>
//         <span className="checkbox__label">{label}</span>
//     </label>
// );

// export default Checkbox;

import React, { useState } from 'react';

const Checkbox = ({ id, label, onCheckboxChange }) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        const newValue = !isChecked;
        setIsChecked(newValue);
        onCheckboxChange(id, newValue);
    };

    return (
        <label htmlFor={id} className="checkbox">
            <input
                className="checkbox__input"
                type="checkbox"
                id={id}
                checked={isChecked}
                onChange={handleCheckboxChange}
            />
            <svg className="checkbox__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22">
                <rect width="21" height="21" x="1" y="1" fill="#FFF" stroke="#04557d" rx="4" />
                {isChecked && (
                    <path className="tick" stroke="#FC8500" fill="none" strokeLinecap="round" strokeWidth="4" d="M4 10l5 5 9-9" />
                )}
            </svg>
            <span className="checkbox__label">{label}</span>
        </label>
    );
};

export default Checkbox;
