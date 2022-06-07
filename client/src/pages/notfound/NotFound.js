import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import './notfound.scss';

const NotFound = () => {
  return (
    <div className='notfound'>
      <Navbar />
      <div className='container'>
        <div className='content'>
          <h2>Lost your way?</h2>
          <span>
            Sorry, we can't find that page. You'll find lots to explore on the
            home page.
          </span>
          <Link to='/'>
            <button>Netflix Home</button>
          </Link>
          <span className='error-code'>
            Error Code <strong>NSES-404</strong>
          </span>
        </div>
      </div>
      <span className='lost'>
        FROM <strong>LOST IN SPACE</strong>
      </span>
    </div>
  );
};

export default NotFound;
