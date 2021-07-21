import React, { FC, Fragment, useEffect } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// components
import { Navbar } from './components/layout/index';
import { Landing } from './components/layout/index';
import { Routes } from './components/routing/index';

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
        <Switch>
          <Route exact path='/' component={Landing}></Route>
          <Route component={Routes} />
        </Switch>
      </Fragment>
    </Router>
  );
};

export default App;
