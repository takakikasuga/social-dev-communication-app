import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';

import { Alert } from '../layout/index';
import { Login } from '../auth/index';
import { Register } from '../auth/index';
import { Dashboard } from '../dashboard/index';
import { CreateProfile } from '../profile-form/index';
import { EditProfile } from '../dashboard/index';
import { AddExperience } from '../profile-form/index';
import { AddEducation } from '../profile-form/index';
import { Profiles } from '../profiles/index';
import { Profile } from '../profile/index';
import { Posts } from '../posts/index';
import { Post } from '../post/index';
import { NotFound } from '../layout/index';
// 権限ルート
import { PrivateRoute } from './index';

const Routes: FC = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register}></Route>
        <Route exact path='/login' component={Login}></Route>
        <Route exact path='/profiles' component={Profiles}></Route>
        <Route exact path='/profile/:profile_id' component={Profile}></Route>
        <PrivateRoute path='/dashboard' component={Dashboard}></PrivateRoute>
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
        <PrivateRoute path='/posts/:post_id' component={Post}></PrivateRoute>
        <PrivateRoute path='/posts' component={Posts}></PrivateRoute>
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
