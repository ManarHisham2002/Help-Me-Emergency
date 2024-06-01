import React from 'react';
import './css/noData.css';
const NoData = ({ message }) => {
    return(
        <div className='container'>
            <div className='noDataImg'>
                <img src={require('./img/noDataImage.jpg')} alt='No Data Available' />
                <div className='noDataText'>
                    <h2>{message}</h2>
                </div>
            </div>
        </div>
    );
};
export default NoData;