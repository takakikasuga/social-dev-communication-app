import React, { FC, Fragment } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// components
import { Navbar } from './components/layout/index';
import { Landing } from './components/layout/index';
import { Login } from './components/auth/index';
import { Register } from './components/auth/index';

const App: FC = () => {
  return (
    <Router>
      <Fragment>
        <Navbar></Navbar>
        <Route exact path='/' component={Landing}></Route>
        <section className='container'>
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
