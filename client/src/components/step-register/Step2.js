import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';

const Step2 = () => {
  const planChoices = [
    {
      type: 'Mobile',
      price: '70,000 ₫',
      quanlity: 'Good',
      resolution: '480p',
      devices: [
        <div>
          <i className='fas fa-mobile-alt'></i>
          <div>Phone</div>
        </div>,
        <div>
          <i className='fas fa-tablet-alt'></i>
          <div>Tablet</div>
        </div>,
      ],
    },
    {
      type: 'Basic',
      price: '180,000 ₫',
      quanlity: 'Good',
      resolution: '480p',
      devices: [
        <div>
          <i className='fas fa-mobile-alt'></i>
          <div>Phone</div>
        </div>,
        <div>
          <i className='fas fa-tablet-alt'></i>
          <div>Tablet</div>
        </div>,
        <div>
          <i className='fas fa-laptop'></i>
          <div>Computer</div>
        </div>,
        <div>
          <i className='fas fa-tv'></i>
          <div>TV</div>
        </div>,
      ],
    },
    {
      type: 'Standard',
      price: '220,000 ₫',
      quanlity: 'Better',
      resolution: '1080p',
      devices: [
        <div>
          <i className='fas fa-mobile-alt'></i>
          <div>Phone</div>
        </div>,
        <div>
          <i className='fas fa-tablet-alt'></i>
          <div>Tablet</div>
        </div>,
        <div>
          <i className='fas fa-laptop'></i>
          <div>Computer</div>
        </div>,
        <div>
          <i className='fas fa-tv'></i>
          <div>TV</div>
        </div>,
      ],
    },
    {
      type: 'Premium',
      price: '260,000 ₫',
      quanlity: 'Best',
      resolution: '4K+HDR',
      devices: [
        <div>
          <i className='fas fa-mobile-alt'></i>
          <div>Phone</div>
        </div>,
        <div>
          <i className='fas fa-tablet-alt'></i>
          <div>Tablet</div>
        </div>,
        <div>
          <i className='fas fa-laptop'></i>
          <div>Computer</div>
        </div>,
        <div>
          <i className='fas fa-tv'></i>
          <div>TV</div>
        </div>,
      ],
    },
  ];
  const history = useHistory();
  const dispatch = useDispatch();

  const handleStep2 = () => {
    const res = planChoices.filter((c, index) => index === choice)[0];

    const err = {};

    if (!res) {
      err.plan = "You haven't choose a plan yet.";

      dispatch({ type: GLOBALTYPES.ALERT, payload: err.plan });
    } else {
      dispatch({
        type: GLOBALTYPES.STEPTWO,
        payload: { type: res.type, price: res.price },
      });
      history.push('/submit/step3');
    }
  };

  const [choice, setChoice] = useState(-1);
  return (
    <div className='step2'>
      <div className='top'>
        <span>
          STEP <b>2</b> OF <b>3</b>
        </span>
        <h6>Choose the plan that’s right for you</h6>
        <ul>
          <li>
            <i className='fas fa-check'></i>
            <span> Watch all you want. Ad-free.</span>
          </li>
          <li>
            <i className='fas fa-check'></i>
            <span> Recommendations just for you.</span>
          </li>
          <li>
            <i className='fas fa-check'></i>
            <span> Change or cancel your plan anytime.</span>
          </li>
        </ul>
      </div>

      <div className='plans'>
        <div className='plans-header'>
          <label htmlFor='plan-choice-1'>
            <input
              type='radio'
              id='plan-choice-1'
              name='plan-choice'
              onChange={() => setChoice(0)}
            />
            <span>Mobile</span>
          </label>
          <label htmlFor='plan-choice-2'>
            <input
              type='radio'
              id='plan-choice-2'
              name='plan-choice'
              onChange={() => setChoice(1)}
            />
            <span>Basic</span>
          </label>
          <label htmlFor='plan-choice-3'>
            <input
              type='radio'
              id='plan-choice-3'
              name='plan-choice'
              onChange={() => setChoice(2)}
            />
            <span>Standard</span>
          </label>
          <label htmlFor='plan-choice-4'>
            <input
              type='radio'
              id='plan-choice-4'
              name='plan-choice'
              onChange={() => setChoice(3)}
            />
            <span>Premium</span>
          </label>
        </div>
        <div className='plans-content'>
          <div className='plans-title'>
            <span>Monthly price</span>
            <span>Video quality</span>
            <span>Resolution</span>
            <span>Devices you can use to watch</span>
          </div>
          {planChoices.map((choiceItem, index) => (
            <div
              className={`choice ${choice === index && 'active'}`}
              key={index}
            >
              <div>{choiceItem.price}</div>
              <div>{choiceItem.quanlity}</div>
              <div>{choiceItem.resolution}</div>
              <span>
                {choiceItem.devices.map((ch, index) => (
                  <div key={index}>{ch}</div>
                ))}
              </span>
            </div>
          ))}
        </div>
        <div className='warn'>
          <p>
            Only people who live with you may use your account. Watch on 4
            different devices at the same time with <b>Premium</b>, 2 with
            <b> Standard</b>, and 1 with <b>Basic</b> and <b>Mobile</b>.
          </p>
        </div>

        <button onClick={handleStep2}>Next</button>
      </div>
    </div>
  );
};

export default Step2;
