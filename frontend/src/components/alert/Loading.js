import React from 'react';
import './loading.scss';
import LoadIcon from '../../images/giphy.gif';

const Loading = () => {
  return (
    <div className='loading'>
      <img src={LoadIcon} alt='loading' />
      <span>Loading...</span>
    </div>
  );
};

export default Loading;
