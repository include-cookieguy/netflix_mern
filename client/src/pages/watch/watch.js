import { ArrowBackOutlined } from '@material-ui/icons';
import React from 'react';
import './watch.scss';

const Watch = () => {
  return (
    <div className='watch'>
      <div className='back'>
        <ArrowBackOutlined />
        Home
      </div>
      <video
        className='video'
        autoPlay
        onProgress
        controls
        src='https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4'
      />
    </div>
  );
};

export default Watch;
