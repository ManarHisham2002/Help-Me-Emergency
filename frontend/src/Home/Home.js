import React, { useState } from "react";
import './css/home.css';
import Navbar from '../Navbar/Navbar';
import convid from '../Home/img/Winning the battle against Coronavirus-amico.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Menu from "../Menu/Menu";

const Home = () => {
    const [formData, setFormData] = useState({
        symptoms: ""
    });
    const [showDisease, setShowDisease] = useState(false);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        setShowDisease(true);
    };
    const [showFullText, setShowFullText] = useState(false);
    const toggleReadMore = () => {
        setShowFullText(!showFullText);
    };
    const Symptoms = [
        'Runny or stuffy nose',
        'Sore throat',
        'Sneezing',
        'Coughing',
        'Watery eyes',
        'Mild headache',
        'Mild body aches',
        'Low-grade fever',
        'Fever or chills',
        'Shortness of breath or difficulty breathing',
        'Fatigue',
        'Muscle or body aches',
        'Headache',
        'New loss of taste or smell',
        'Congestion or runny nose',
        'Nausea or vomiting',
        'Diarrhea'
    ];

    return (
        <>
            <Navbar activePage='/home' />
            <div className='container-fluid'>
                <div className='row'>
                    <div className="col-lg-11 free-quote mt-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 offset-lg-2 mt-5 wow fadeIn" data-wow-duration="1s" data-wow-delay="0.8s">
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <fieldset>
                                                    <input list="symptomsdata" id="symptoms" name="symptoms" size="50" autoComplete="off" value={formData.symptoms} onChange={handleChange} placeholder="Symptom"/>
                                                    <datalist id="symptomsdata">
                                                        {Symptoms.map((symptom, index) => (
                                                            <option key={index} value={symptom} />
                                                        ))}
                                                    </datalist>
                                                </fieldset>
                                            </div>
                                            <div className="col-lg-6">
                                                <fieldset>
                                                    <input list="symptomsdata" id="symptoms" name="symptoms" size="50" autoComplete="off" value={formData.symptoms} onChange={handleChange} placeholder="Symptom"/>
                                                    <datalist id="symptomsdata">
                                                        {Symptoms.map((symptom, index) => (
                                                            <option key={index} value={symptom} />
                                                        ))}
                                                    </datalist>
                                                </fieldset>
                                            </div>
                                            <div className="col-lg-6">
                                                <fieldset>
                                                    <input list="symptomsdata" id="symptoms" name="symptoms" size="50" autoComplete="off" value={formData.symptoms} onChange={handleChange} placeholder="Symptom"/>
                                                    <datalist id="symptomsdata">
                                                        {Symptoms.map((symptom, index) => (
                                                            <option key={index} value={symptom} />
                                                        ))}
                                                    </datalist>
                                                </fieldset>
                                            </div>
                                            <div className="col-lg-6">
                                                <fieldset>
                                                    <input list="symptomsdata" id="symptoms" name="symptoms" size="50" autoComplete="off" value={formData.symptoms} onChange={handleChange} placeholder="Symptom"/>
                                                    <datalist id="symptomsdata">
                                                        {Symptoms.map((symptom, index) => (
                                                            <option key={index} value={symptom} />
                                                        ))}
                                                    </datalist>
                                                </fieldset>
                                            </div>
                                            <div className="col-lg-6">
                                                <fieldset>
                                                    <input list="symptomsdata" id="symptoms" name="symptoms" size="50" autoComplete="off" value={formData.symptoms} onChange={handleChange} placeholder="Symptom"/>
                                                    <datalist id="symptomsdata">
                                                        {Symptoms.map((symptom, index) => (
                                                            <option key={index} value={symptom} />
                                                        ))}
                                                    </datalist>
                                                </fieldset>
                                            </div>
                                            <div className="col-lg-6">
                                                <fieldset>
                                                    <button type="submit" className="main-buttonT">Get My Disease</button>
                                                </fieldset>
                                            </div>
                                        </div>
                                    </form>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    {showDisease && ( // Render myDisease div if showDisease is true
                        <div className="myDisease col-lg-11 mt-5">
                            <p>Please visit your doctor to make sure</p>
                            <p>You may be infected with</p>
                            <p>Disease 1 <span>80%</span>  or</p>
                            <p>Disease 2 <span>70%</span> or</p>
                            <p>Disease 3 <span>65%</span></p>
                        </div>
                    )}
                    <div className="col-lg-11 about_section layout_padding">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="about_img"><img src={convid} alt="coronavirus" /></div>
                                </div>
                                <div className="col-md-6">
                                    <h1 className="about_taital"><span>Coronavirus </span>what it is?</h1>
                                    {showFullText ? (
                                        <p className="about_text">
                                            It is a disease that attracts the attention of the world Most people infected with the virus exhibit
                                            respiratory symptoms ranging from mild to moderate and recover without the need for special therapeutic
                                            intervention. However, some people who become infected develop severe symptoms and require medical
                                            attention. People most at risk of severe disease are those with underlying diseases, such as
                                            cardiovascular disease, diabetes, chronic respiratory disease, cancer, and other diseases.
                                            However, anyone is at risk of severe illness and death from <span>Covid-19</span>, regardless of age.
                                            The best method of prevention remains Familiarity with the characteristics of the disease and
                                            the way the virus spreads helps prevent the transmission of <span>Covid-19</span> infection and slow the rate of
                                            transmission.Precautionary measures to protect yourself and others from infection include: staying
                                            at least one meter away from others, wearing a well-fitted mask, and regularly washing hands or
                                            rubbing them with an alcohol-based sanitizer. Also, take the vaccine when it is your turn and
                                            follow the instructions of local authorities. The virus spreads from small liquid particles.
                                            Which are released from the mouth or nose of an infected person when he coughs, sneezes,
                                            speaks, sings, or breathes. The size of these particles ranges from large respiratory droplets
                                            to very small droplets. Therefore, it is important to practice respiratory etiquette by coughing
                                            into the crook of the elbow, for example, and to remain in Home and self-isolate when you are
                                            unwell until you have fully recovered.
                                        </p>
                                    ) : (
                                        <p className="about_text">
                                            It is a disease that attracts the attention of the world Most people infected with the virus exhibit
                                            respiratory symptoms ranging from mild to moderate and recover without the need for special therapeutic
                                            intervention. However, some people who become infected develop severe symptoms and require medical
                                            attention. People most at risk of severe disease are those with underlying diseases, such as
                                            cardiovascular disease, diabetes, chronic respiratory disease, cancer, and other diseases.
                                            However, anyone is at risk of severe illness and death from <span>Covid-19</span>, reg...
                                        </p>
                                    )}
                                    <div className="read_bt" onClick={toggleReadMore}>
                                        {showFullText ? 'Read Less' : 'Read More'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Menu />
                </div>
            </div>
        </>
    )
}

export default Home;
