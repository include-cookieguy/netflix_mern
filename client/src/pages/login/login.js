import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';
import { login, refreshToken } from '../../redux/actions/authAction';
import './login.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberUser, setRememberUser] = useState(false);
  const [errBlur, setErrBlur] = useState({});

  const { auth, alert } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (auth.token) {
      history.replace('/');
    }
  }, [history, auth]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email && !password) {
      setErrBlur({
        ...errBlur,
        email: 'Please enter a valid email',
        password: 'Your password must contain between 4 and 60 characters.',
      });
    } else if (!email) {
      setErrBlur({
        ...errBlur,
        email: 'Please enter a valid email',
      });
    } else if (!password) {
      setErrBlur({
        ...errBlur,
        password: 'Your password must contain between 4 and 60 characters.',
      });
    } else {
      dispatch(login({ email, password }));
    }
  };

  const handleBlur = (type) => {
    if (type === 'email' && email) {
      if (email.length === 0 || !validateEmail(email)) {
        setErrBlur({
          ...errBlur,
          email: 'Please enter a valid email',
        });
      }
    }
    if (type === 'password' && password) {
      if (password.length < 4 || password.length > 60) {
        setErrBlur({
          ...errBlur,
          password: 'Your password must contain between 4 and 60 characters.',
        });
      }
    }
  };

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  return (
    <div className='login'>
      <Navbar bgColor='transparent' color='#fff' />
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          {alert.error && <div className='error-submit'>{alert.error}</div>}
          <div className='input'>
            <div className='input-field'>
              <input
                type='email'
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => handleBlur('email')}
                value={email}
                onInput={() => setErrBlur({ email: '' })}
              />
              <span className={`placeholder ${email && 'trans-placeholder'}`}>
                Email
              </span>
            </div>
          </div>
          <small className='error'>{errBlur.email}</small>
          <div className='input'>
            <div className='input-field'>
              <input
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                onBlur={() => handleBlur('password')}
                onInput={() => setErrBlur({ password: '' })}
              />
              <span
                className={`placeholder ${password && 'trans-placeholder'}`}
              >
                Password
              </span>
              {password && (
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className='show-pass'
                >
                  {showPassword ? 'HIDE' : 'SHOW'}
                </span>
              )}
            </div>
          </div>
          <small className='error'>{errBlur.password}</small>
          <button>Sign In</button>
          <div className='remember'>
            <input
              type='checkbox'
              id='remember'
              className='checkbox-input'
              onChange={() => setRememberUser(!rememberUser)}
            />
            <label htmlFor='remember'>
              <i className='fa fa-check check'></i>Remember me
            </label>

            <a href='https://www.netflix.com/vn-en/login'>Need help?</a>
          </div>
          <div className='new-to'>
            <p>
              New to Netflix?{' '}
              <Link to='/'>
                <span className='sign-up-now'>Sign up now.</span>
              </Link>
            </p>
            <small>
              This page is protected by Google reCAPTCHA to ensure you're not a
              bot. <a href='https://www.netflix.com/vn-en/login'>Learn more</a>.
            </small>
          </div>
        </form>
      </div>

      <Footer bgColor='rgba(0, 0, 0, 0.3)' />
    </div>
  );
};

export default Login;
