import { MdEmail } from 'react-icons/md';
import { IoInformation } from "react-icons/io5";
import { RiLockPasswordLine } from 'react-icons/ri';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FaUser } from 'react-icons/fa';
import { FaPhone } from 'react-icons/fa6';
import { IoCamera } from 'react-icons/io5';
import { FaPersonHalfDress } from 'react-icons/fa6';
import { PiStethoscopeBold } from 'react-icons/pi';
import { FaAllergies } from 'react-icons/fa';
import { GiScalpel } from 'react-icons/gi';

const DataSignUp = [
    {
        stepId: 1,
        stepTitle: 'Information',
        stepIcon: <IoInformation className='icon' />,
        className: 'page',
        idName: 'content1',
        fields: [
            {
                icon: <FaUser className='icon' />,
                type: 'text',
                placeholder: 'Name',
            },
            {
                icon: <MdEmail className='icon' />,
                type: 'email',
                placeholder: 'Email',
            },
            {
                icon: <RiLockPasswordLine className='icon' />,
                type: 'password',
                placeholder: 'Password',
            },
            {
                icon: <RiLockPasswordFill className='icon' />,
                type: 'password',
                placeholder: 'Confirm Password',
            },
            {
                icon: <FaPhone className='icon' />,
                type: 'text',
                placeholder: 'Phone',
            },
            {
                icon: <IoCamera className='icon' />,
                type: 'file',
                placeholder: 'Profile Photo',
            },
            {
                icon: <FaPersonHalfDress className='icon' />,
                type: 'radio',
                placeholder: 'Gender',
                options: [
                    { id: 'male', label: 'Male' },
                    { id: 'female', label: 'Female' },
                ],
            },
        ],
        prev: {
            function: 'prev',
            buttonName: 'Previous',
        },
        next: {
            function: 'next',
            buttonName: 'Next',
        }
    },
    {
        stepId: 2,
        stepTitle: 'Diseases',
        stepIcon: <PiStethoscopeBold className='icon' />,
        className: 'page',
        idName: 'content2',
        fields: [
            {
                label: 'Chronic Diseases',
                type: 'checkbox',
                options: [
                    { label: 'Cardiovascular Diseases' },
                    { label: 'Respiratory System Diseases' },
                    { label: 'Cancer' },
                    { label: 'Diabetes' },
                    { label: 'Epilepsy and Seizures' },
                    { label: 'Kidney Disease' },
                    { label: 'Blood Thinning Disease' },
                ],
            },
        ],
        prev: {
            function: 'prev',
            buttonName: 'Previous',
        },
        next: {
            function: 'next',
            buttonName: 'Next',
        }
    },
    {
        stepId: 3,
        stepTitle: 'Allergy',
        stepIcon: <FaAllergies className='icon' />,
        className: 'page',
        idName: 'content3',
        fields: [
            {
                label: 'Allergy',
                type: 'checkbox',
                options: [
                    { label: 'Drug Allergy' },
                    { label: 'Food Allergy' },
                    { label: 'Eczema' },
                    { label: 'Urticaria' },
                    { label: 'Contact Dermatitis' },
                ],
            },
        ],
        prev: {
            function: 'prev',
            buttonName: 'Previous',
        },
        next: {
            function: 'next',
            buttonName: 'Next',
        }
    },
    {
        stepId: 4,
        stepTitle: 'Surgery',
        stepIcon: <GiScalpel className='icon' />,
        className: 'page',
        idName: 'content4',
        fields: [
            {
                label: 'Surgery',
                type: 'checkbox',
                options: [
                    { label: 'Cholecystectomy' },
                    { label: 'Nephrectomy' },
                    { label: 'Tumor Removal' },
                    { label: 'Tonsillectomy' },
                    { label: 'Laparoscopy' },
                    { label: 'Endoscopy' },
                    { label: 'Cystoscopy' },
                    { label: 'Hysteroscopy' },
                    { label: 'Laser surgery' },
                ],
            },
        ],
        prev: {
            function: 'prev',
            buttonName: 'Previous',
        },
        next: {
            function: 'next',
            buttonName: 'signUp',
        }
    },
];
export default DataSignUp;

