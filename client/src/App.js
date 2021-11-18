import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import NotFound from "./pages/notfound/NotFound";
import Submit from "./pages/submit/Submit";
import Alert from "./components/alert/Alert";
import "./app.scss";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken } from "./redux/actions/authAction";
import React, { useEffect } from "react";
import Watch from "./pages/watch/Watch";
import MyList from "./pages/mylist/MyList";
import WatchAgain from "./pages/watch-again/WatchAgain";
import { getFav, getWatchAgain } from "./redux/actions/userAction";

const App = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  useEffect(() => {
    if (auth.token) {
      dispatch(getFav(auth));
      dispatch(getWatchAgain(auth));
    }
  }, [auth, dispatch]);

  return (
    <Router>
      <Alert />
      <Switch>
        <Route exact path="/" component={auth.token ? Home : Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/submit" component={Submit} />
        {auth.token && (
          <Route exact path="/movies">
            <Home type="movie" />
          </Route>
        )}
        {auth.token && (
          <Route exact path="/series">
            <Home type="series" />
          </Route>
        )}
        {auth.token && (
          <Route exact path="/watch">
            <Watch />
          </Route>
        )}
        {auth.token && (
          <Route exact path="/again">
            <WatchAgain />
          </Route>
        )}
        {auth.token && (
          <Route exact path="/mylist">
            <MyList />
          </Route>
        )}
        <Route exact path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
