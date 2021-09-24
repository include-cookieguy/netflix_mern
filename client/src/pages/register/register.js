import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';
import './register.scss';
import ShowAccordion from './ShowAccordion';
import loading from '../../images/eclipse.gif';
import { useDispatch, useSelector } from 'react-redux';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import { registerEmail } from '../../redux/actions/authAction';

const Register = () => {
  const [email, setEmail] = useState('');

  const [submit, setSubmit] = useState(false);
  const [err, setErr] = useState({ email: '' });
  const history = useHistory();
  const dispatch = useDispatch();
  const { alert } = useSelector((state) => state);

  const handleSetTimeOut = (e) => {
    e.preventDefault();

    if (err.email) {
      dispatch({ type: GLOBALTYPES.ALERT, payload: err.email });
    } else {
      if (!email) {
        if (!email) {
          setErr({ ...err, email: 'Please enter a valid email address.' });
        }
      } else {
        dispatch(registerEmail({ email }));
      }
    }
  };

  useEffect(() => {
    if (alert.success) {
      setSubmit(true);
      setTimeout(() => {
        history.push('/submit/step1');
      }, 1000);
    }
  }, [alert.success, history]);

  const handleBlur = () => {
    if (email) {
      if (!validateEmail(email)) {
        setErr({ ...err, email: 'Please enter a valid email address.' });
      }
    }
  };

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  return (
    <div className='not-auth'>
      <div className='register'>
        <Navbar bgColor='transparent' color='#fff' />
        <div className='container'>
          <h1>Unlimited movies, TV shows and more.</h1>
          <h2>Watch anywhere. Cancel anytime.</h2>
          <p>
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>
          <div className='input'>
            <form className='input-field' onSubmit={handleSetTimeOut}>
              <input
                type='email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                onBlur={handleBlur}
                onInput={() => setErr({ email: '' })}
              />
              <span className={`placeholder ${email && 'trans-placeholder'}`}>
                Email address
              </span>
            </form>
            <button
              className='register-btn'
              onClick={handleSetTimeOut}
              style={{ opacity: submit && 0.6 }}
            >
              {submit ? (
                <img src={loading} alt='Loading' width='35' />
              ) : (
                <>
                  Get Started
                  <svg
                    viewBox='0 0 6 12'
                    xmlns='http://www.w3.org/2000/svg'
                    className='chervon'
                  >
                    <desc>chevron</desc>
                    <path
                      d='M.61 1.312l.78-.624L5.64 6l-4.25 5.312-.78-.624L4.36 6z'
                      fill='#fff'
                      fillRule='evenodd'
                    ></path>
                  </svg>
                </>
              )}
            </button>
            <small className='error'>{err.email}</small>
          </div>
          {alert.error && !err.email && (
            <div className='error-submit'>{alert.error}</div>
          )}
        </div>
      </div>

      <div className='end-system'>
        <div className='content'>
          <h3>Enjoy on your TV.</h3>
          <p>
            Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray
            players, and more.
          </p>
        </div>

        <div className='tv-netflix'>
          <img
            src='https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png'
            alt='TV'
            className='card-image'
          />
          <div className='card-animation'>
            <video
              src='https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-0819.m4v'
              autoPlay
              playsInline
              muted
              loop
            />
          </div>
        </div>
      </div>

      <div className='download'>
        <div className='download-movie'>
          <img
            src='https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg'
            alt='Stranger things Eleven'
            className='card-img'
          />
          <div className='card-animation'>
            <img
              src='https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/boxshot.png'
              alt='Stranger things poster'
              className='card-image'
            />

            <div className='card-text'>
              <p>Stranger Things</p>
              <span>Downloadling...</span>
            </div>
          </div>
        </div>

        <div className='content'>
          <h3>Download your shows to watch offline.</h3>
          <p>Save your favorites easily and always have something to watch.</p>
        </div>
      </div>

      <div className='responsive-netflix'>
        <div className='content'>
          <h3>Watch everywhere.</h3>
          <p>
            Stream unlimited movies and TV shows on your phone, tablet, laptop,
            and TV.
          </p>
        </div>
      </div>

      <div className='kids'>
        <div className='card-animation'>
          <img
            src='https://occ-0-58-395.1.nflxso.net/dnm/api/v6/19OhWN2dO19C9txTON9tvTFtefw/AAAABdFTpLmANuJpYneLq8L5m7CunMCi8e8Nl4y7xaPVWzG3IeoDoq17egTQAthApKg_4sdRWdwuR8KadWu1frjL3JQImpwq.png?r=fcd'
            alt='Kids'
            className='card-image'
          />
        </div>

        <div className='content'>
          <h3>Create profiles for kids.</h3>
          <p>
            Send kids on adventures with their favorite characters in a space
            made just for them—free with your membership.
          </p>
        </div>
      </div>

      <div className='questions'>
        <div>
          <ShowAccordion />
        </div>
      </div>

      <div className='story'></div>

      <Footer />
    </div>
  );
};

export default Register;
