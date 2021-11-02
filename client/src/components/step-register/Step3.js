import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { validRegister } from "../../utils/validRegister";

const Step3 = () => {
  const cardInfomation = {
    firstName: "",
    lastName: "",
    cardNumber: "",
    expiredDate: "",
    securityCode: "",
    agree: false,
  };
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const [cardInfo, setCardInfo] = useState(cardInfomation);

  const handleStep3 = (e) => {
    e.preventDefault();

    const check = validRegister.validStep3(cardInfo);
    if (check.errLength > 0) {
      dispatch({ type: GLOBALTYPES.ALERT, payload: check.errMsg });
    } else {
      dispatch({
        type: GLOBALTYPES.STEPTHREE,
        payload: cardInfo,
      });
      history.push("/submit/completed");
    }
  };
  return (
    <div className="step3">
      <div className="top">
        <span>
          STEP <b>3</b> OF <b>3</b>
        </span>
        <h5>Set up your payment</h5>
        <p>Your membership starts as soon as you set up payment.</p>
        <h6>No commitments.</h6>
        <h6>Cancel online anytime.</h6>
      </div>

      <div className="cards">
        <img
          src="https://assets.nflxext.com/ffe/siteui/acquisition/payment/svg/visa-v3.svg"
          alt="Visa card"
        />
        <img
          src="https://assets.nflxext.com/ffe/siteui/acquisition/payment/svg/mastercard-v2.svg"
          alt="Mastercard"
        />
        <img
          src="https://assets.nflxext.com/ffe/siteui/acquisition/payment/svg/amex-v2.svg"
          alt="AE card"
        />
      </div>

      <form onSubmit={handleStep3}>
        <div className="input">
          <div className="input-field">
            <input
              type="text"
              onChange={(e) =>
                setCardInfo({ ...cardInfo, firstName: e.target.value })
              }
              value={cardInfo.firstName}
            />
            <span
              className={`placeholder ${
                cardInfo.firstName && "trans-placeholder"
              }`}
            >
              First Name
            </span>
          </div>
        </div>
        <div className="input">
          <div className="input-field">
            <input
              type="text"
              onChange={(e) =>
                setCardInfo({ ...cardInfo, lastName: e.target.value })
              }
              value={cardInfo.lastName}
            />
            <span
              className={`placeholder ${
                cardInfo.lastName && "trans-placeholder"
              }`}
            >
              Last Name
            </span>
          </div>
        </div>
        <div className="input">
          <div className="input-field">
            <input
              type="text"
              onChange={(e) =>
                setCardInfo({ ...cardInfo, cardNumber: e.target.value })
              }
              value={cardInfo.cardNumber}
            />
            <span
              className={`placeholder ${
                cardInfo.cardNumber && "trans-placeholder"
              }`}
            >
              Card Number
            </span>
          </div>
        </div>
        <div className="input">
          <div className="input-field">
            <input
              type="text"
              onChange={(e) =>
                setCardInfo({ ...cardInfo, expiredDate: e.target.value })
              }
              value={cardInfo.expiredDate}
            />
            <span
              className={`placeholder ${
                cardInfo.expiredDate && "trans-placeholder"
              }`}
            >
              Expriation date (MM/YY)
            </span>
          </div>
        </div>
        <div className="input">
          <div className="input-field">
            <input
              type="text"
              onChange={(e) =>
                setCardInfo({ ...cardInfo, securityCode: e.target.value })
              }
              value={cardInfo.securityCode}
            />
            <span
              className={`placeholder ${
                cardInfo.securityCode && "trans-placeholder"
              }`}
            >
              Security Code
            </span>

            <span className="question">
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="none" fillRule="evenodd">
                  <g>
                    <circle
                      stroke="#A9A6A6"
                      strokeWidth="2"
                      cx="18"
                      cy="18"
                      r="17"
                    ></circle>
                    <path
                      d="M17.051 21.094v-.54c0-.648.123-1.203.369-1.665.246-.462.741-.915 1.485-1.359a7.37 7.37 0 0 0 .981-.657c.222-.186.372-.366.45-.54.078-.174.117-.369.117-.585 0-.384-.177-.714-.531-.99-.354-.276-.831-.414-1.431-.414-.624 0-1.131.135-1.521.405-.39.27-.627.627-.711 1.071h-2.304a4.053 4.053 0 0 1 .738-1.845c.396-.546.924-.981 1.584-1.305.66-.324 1.44-.486 2.34-.486.852 0 1.596.153 2.232.459.636.306 1.134.726 1.494 1.26.36.534.54 1.143.54 1.827 0 .66-.177 1.227-.531 1.701-.354.474-.891.933-1.611 1.377-.42.252-.729.48-.927.684-.198.204-.33.399-.396.585a1.79 1.79 0 0 0-.099.603v.414h-2.268zm1.26 4.158c-.408 0-.762-.15-1.062-.45-.3-.3-.45-.654-.45-1.062 0-.408.15-.762.45-1.062.3-.3.654-.45 1.062-.45.408 0 .762.15 1.062.45.3.3.45.654.45 1.062 0 .408-.15.762-.45 1.062-.3.3-.654.45-1.062.45z"
                      fill="#A9A6A6"
                    ></path>
                  </g>
                </g>
              </svg>
            </span>
            <div className="why">
              <p>
                Your card's security code (CVV) is the 3 or 4 digit number
                located on the back of most cards.
              </p>
              <img
                src="https://assets.nflxext.com/ffe/siteui/acquisition/payment/tooltip/visa_cvv.png"
                alt="CVV"
                className="cvv"
              />
            </div>
          </div>
        </div>
      </form>

      <div className="info-plan">
        <div className="plan">
          <h6>Price: {auth.infoRegis.plan.price}</h6>
          <p>Type: {auth.infoRegis.plan.type}</p>
        </div>

        <Link to="/submit/step2">
          <span>Change</span>
        </Link>
      </div>

      <div className="check">
        <p>
          By checking the checkbox below, you agree to our{" "}
          <a href="https://www.netflix.com/">Terms of Use</a>,{" "}
          <a href="https://www.netflix.com/">Privacy Statement</a>, and that you
          are over 18. Netflix will automatically continue your membership and
          charge the monthly membership fee (currently 260,000 ₫) to your
          payment method until you cancel. You may cancel at any time to avoid
          future charges.
        </p>
        <div className="agree">
          <input
            type="checkbox"
            id="agree"
            onChange={() =>
              setCardInfo({ ...cardInfo, agree: !cardInfo.agree })
            }
          />
          <label htmlFor="agree">I agree.</label>
        </div>
      </div>

      <button onClick={handleStep3}>Start Membership</button>
    </div>
  );
};

export default Step3;
