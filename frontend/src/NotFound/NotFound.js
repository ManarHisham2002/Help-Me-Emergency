import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/NotFound.css';

const NotFound = () => {
    return (
        <section className='page_404 pt-5 pb-5'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='col-sm-10 col-sm-offset-1 text-center  mx-auto'>
                            <div className='four_zero_four_bg mt-n5'>
                                <h1 className='text-center'>404</h1>
                            </div>
                            <div className='content_box_404 text-center'>
                                <h3 className='h2'>Looks Like You're Lost</h3>
                                <p className='text-black-50 fs-6'>The Page you are looking for is not available.</p>
                                <Link to='/home' className='btn d-inline-block mt-2 link404'>Go to Home</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default NotFound;