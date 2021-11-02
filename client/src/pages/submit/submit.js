import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import "./submit.scss";
import Step1 from "../../components/step-register/Step1";
import Step2 from "../../components/step-register/Step2";
import Step3 from "../../components/step-register/Step3";
import Completed from "../../components/step-register/Completed";
import { useSelector } from "react-redux";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

const Submit = () => {
  const info = {
    account: {
      username: "",
      email: "",
      password: "",
      birthday: "",
    },
    plan: {
      price: "",
      type: "",
    },
    card: {
      firstName: "",
      lastName: "",
      cardNumber: "",
      expiredDate: "",
      securityCode: "",
    },
  };

  const [infoRegister, setInfoRegister] = useState(info);

  const { auth } = useSelector((state) => state);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (!auth.user) {
      setInfoRegister((infoRegister) => ({
        ...infoRegister,
        email: auth.infoRegis.account.email || "",
      }));
    }
  }, [auth.user]);

  useEffect(() => {
    if (auth.token) {
      history.replace("/");
    }
  }, [auth, history]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="submit">
      <Navbar bgColor="#fff" borderBottom="1px solid #e6e6e6" />
      <div className="container">
        <Router>
          <Switch>
            <Route exact path="/submit">
              <Step1 transEmail={infoRegister.email} />
            </Route>
            <Route exact path="/submit/step2">
              <Step2 />
            </Route>
            <Route exact path="/submit/step3">
              <Step3 />
            </Route>
            <Route exact path="/submit/completed">
              <Completed />
            </Route>
          </Switch>
        </Router>
      </div>
      <Footer />
    </div>
  );
};

export default Submit;
