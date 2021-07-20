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
import { AddEducation } from './components/profile-form/index';
import { Profiles } from './components/profiles/index';
import { Profile } from './components/profile/index';

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
            <Route exact path='/profiles' component={Profiles}></Route>
            <Route
              exact
              path='/profile/:profile_id'
              component={Profile}></Route>
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
            <PrivateRoute
              path='/add-education'
              component={AddEducation}></PrivateRoute>
          </Switch>
        </section>
      </Fragment>
    </Router>
  );
};

export default App;
