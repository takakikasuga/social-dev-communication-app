import React, { FC, Fragment, useEffect } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// components
import { Navbar } from './components/layout/index';
import { Landing } from './components/layout/index';
import { Alert } from './components/layout/index';
import { Login } from './components/auth/index';
import { Register } from './components/auth/index';

// スライス
import { loadUserAsync } from './features/auth/authSlice';

// ユーティリティ
import { setAuthToken } from './utils/index';

// ローディングした時にtokenを持っていた場合にheadersにセットする
if (localStorage.token) {
  // tokenをheadersにセットする
  setAuthToken(localStorage.token);
}

const App: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUserAsync({}));
  }, [dispatch]);
  return (
    <Router>
      <Fragment>
        <Navbar></Navbar>
        <Route exact path='/' component={Landing}></Route>
        <section className='container'>
          <Alert />
          <Switch>
            <Route exact path='/register' component={Register}></Route>
            <Route exact path='/login' component={Login}></Route>
          </Switch>
        </section>
      </Fragment>
    </Router>
  );
};

export default App;
