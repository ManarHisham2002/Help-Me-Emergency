// import './css/noData.css';

// const NoData = () => {
//     return(
//         <div className='container'>
//             <div className='noDataImg'>
//                 <img src={require('./img/search-no-result-data-document-file-not-found-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg')} alt='No Data Available' />
//                 <div className='noDataText'>
//                     <h2>No Emergency Data Available</h2>
//                 </div>
//             </div>
//         </div>
//     );
// };
// export default NoData;

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