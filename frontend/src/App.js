import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import NotFound from "./pages/notfound/NotFound";
import Submit from "./pages/submit/Submit";
import Alert from "./components/alert/Alert";
import "./app.scss";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import Watch from "./pages/watch/Watch";
import MyList from "./pages/mylist/MyList";
import WatchAgain from "./pages/watch-again/WatchAgain";
import { getFav, getWatchAgain } from "./redux/actions/userAction";

const App = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const token = localStorage.getItem('access_token')

  useEffect(() => {
    if (auth.token && !localStorage.getItem("user")) {
      dispatch(getFav());
      dispatch(getWatchAgain());
    // reload
    } else if (!auth.token && window.location.pathname !== '/login') {
      auth.token = localStorage.getItem("access_token");
      auth.user = JSON.parse(localStorage.getItem("user"));
      if (auth.token) {
        dispatch(getFav());
        dispatch(getWatchAgain());
      }
    }
  }, [auth, dispatch]);

  return (
    <Router>
      <Alert />
      <Switch>
        <Route exact path="/" component={token ? Home : Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/submit" component={Submit} />
        {token && (
          <Route exact path="/movies">
            <Home type="movies" />
          </Route>
        )}
        {token && (
          <Route exact path="/series">
            <Home type="series" />
          </Route>
        )}
        {token && (
          <Route exact path="/watch">
            <Watch />
          </Route>
        )}
        {token && (
          <Route exact path="/again">
            <WatchAgain />
          </Route>
        )}
        {token && (
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
