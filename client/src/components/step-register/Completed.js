import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/actions/authAction';

const Completed = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const registerSuccess = () => {
    dispatch(register(auth.infoRegis));
  };
  return (
    <div className='complete'>
      <img
        src='https://assets.nflxext.com/ffe/siteui/acquisition/simplicity/Checkmark.png'
        alt='checkmark'
      />
      <h6>Sign up completed!</h6>
      <span>Your account has been created.</span>

      <button onClick={registerSuccess}>Let's watch movie now!</button>
    </div>
  );
};

export default Completed;
