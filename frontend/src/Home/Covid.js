import React, { useState } from 'react';
import convid from './img/Winning the battle against Coronavirus-amico.png';
const Covid = () => {
    const [showFullText, setShowFullText] = useState(false);
    const toggleReadMore = () => {
        setShowFullText(!showFullText);
    };
    return (
        <div className='col-xl-11 col-lg-11 col-md-11 col-sm-11 col-11 about_section layout_padding'>
            <div className='container'>
                <div className='row'>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-11 col-11'>
                        <div className='about_img'><img src={convid} alt='coronavirus' /></div>
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-11 col-11'>
                        <h1 className='about_taital'><span>Coronavirus </span>what it is?</h1>
                        {showFullText ? (
                            <p className='about_text'>
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
                            <p className='about_text'>
                                It is a disease that attracts the attention of the world Most people infected with the virus exhibit
                                respiratory symptoms ranging from mild to moderate and recover without the need for special therapeutic
                                intervention. However, some people who become infected develop severe symptoms and require medical
                                attention. People most at risk of severe disease are those with underlying diseases, such as
                                cardiovascular disease, diabetes, chronic respiratory disease, cancer, and other diseases.
                                However, anyone is at risk of severe illness and death from <span>Covid-19</span>, reg...
                            </p>
                        )}
                        <div className='read_bt' onClick={toggleReadMore}>
                            {showFullText ? 'Read Less' : 'Read More'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Covid;
