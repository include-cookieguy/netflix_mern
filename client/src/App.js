import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/home/home';
import Register from './pages/register/register';
import PrivateRouter from './customRouter/PrivateRouter';
import PageRender from './customRouter/PageRender';
import Login from './pages/login/login';
import NotFound from './pages/notfound/NotFound';
import Submit from './pages/submit/submit';
import Alert from './components/alert/Alert';
import './app.scss';
import { useSelector } from 'react-redux';

const App = () => {
  const { auth } = useSelector((state) => state);

  return (
    <Router>
      <Alert />
      <Switch>
        <Route
          exact
          path='/'
          component={localStorage.getItem('access_token') ? Home : Register}
        />
        <Route exact path='/login' component={Login} />
        {/* {localStorage.getItem('access_token') && (
          <>
            <Route exact path='/movies'>
              <Home type='movies' />
            </Route>
            <Route exact path='/series'>
              <Home type='series' />
            </Route>
          </>
        )} */}
        <Route path='/submit' component={Submit} />
        <Route exact path='/notfound' component={NotFound} />

        <PrivateRouter exact path='/:page' component={PageRender} />
        <PrivateRouter exact path='/:page/:id' component={PageRender} />
      </Switch>
    </Router>
  );
};

export default App;
