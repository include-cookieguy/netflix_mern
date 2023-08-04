import React from 'react';
import './footer.scss';

const Footer = ({ bgColor }) => {
  return (
    <div className='footer' style={{ backgroundColor: bgColor }}>
      <div className='wrapper'>
        <a href='https://www.netflix.com/vn-en/'>Questions? Contact us.</a>
        <div className='links'>
          <ul>
            <li>
              <a href='https://www.netflix.com/vn-en/'>FAQ</a>
            </li>
            <li>
              <a href='https://www.netflix.com/vn-en/'>Investor Relations</a>
            </li>
            <li>
              <a href='https://www.netflix.com/vn-en/'>Privacy</a>
            </li>
            <li>
              <a href='https://www.netflix.com/vn-en/'>Speed Test</a>
            </li>
          </ul>
          <ul>
            <li>
              <a href='https://www.netflix.com/vn-en/'>Help Center</a>
            </li>
            <li>
              <a href='https://www.netflix.com/vn-en/'>Jobs</a>
            </li>
            <li>
              <a href='https://www.netflix.com/vn-en/'>Cookie Preferences</a>
            </li>
            <li>
              <a href='https://www.netflix.com/vn-en/'>Legal Notices</a>
            </li>
          </ul>
          <ul>
            <li>
              <a href='https://www.netflix.com/vn-en/'>Account</a>
            </li>
            <li>
              <a href='https://www.netflix.com/vn-en/'>Ways to Watch</a>
            </li>
            <li>
              <a href='https://www.netflix.com/vn-en/'>Corporate Information</a>
            </li>
            <li>
              <a href='https://www.netflix.com/vn-en/'>Only on Netflix</a>
            </li>
          </ul>
          <ul>
            <li>
              <a href='https://www.netflix.com/vn-en/'>Media Center</a>
            </li>
            <li>
              <a href='https://www.netflix.com/vn-en/'>Terms of Use</a>
            </li>
            <li>
              <a href='https://www.netflix.com/vn-en/'>Contact Us</a>
            </li>
          </ul>
        </div>
        <select className='language' style={{ backgroundColor: bgColor }}>
          <option value='English'>English</option>
        </select>
      </div>
    </div>
  );
};

export default Footer;
