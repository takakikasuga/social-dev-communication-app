import React, { FC, Fragment, useEffect } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// components
import { Navbar } from './components/layout/index';
import { Landing } from './components/layout/index';
import { Alert } from './components/layout/index';
import { Login } from './components/auth/index';
import { Register } from './components/auth/index';
import { Dashboard } from './components/dashboard/index';
import { CreateProfile } from './components/profile-form/index';
import { EditProfile } from './components/dashboard/index';
import { AddExperience } from './components/profile-form/index';

// 権限ルート
import { PrivateRoute } from './components/routing/index';

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
            <PrivateRoute
              path='/dashboard'
              component={Dashboard}></PrivateRoute>
            <PrivateRoute
              path='/create-profile'
              component={CreateProfile}></PrivateRoute>
            <PrivateRoute
              path='/edit-profile'
              component={EditProfile}></PrivateRoute>
            <PrivateRoute
              path='/add-experience'
              component={AddExperience}></PrivateRoute>
          </Switch>
        </section>
      </Fragment>
    </Router>
  );
};

export default App;
