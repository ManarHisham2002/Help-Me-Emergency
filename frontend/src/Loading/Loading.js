import React from 'react';
import './css/loading.css'

const Loading = () => {
    return (
        <div className='loading'>
            <figure className='figureLoading'>
                <div className='dot white'></div>
                <div className='dot'></div>
                <div className='dot'></div>
                <div className='dot'></div>
                <div className='dot'></div>
            </figure>
        </div >
    );
}
export default Loading;