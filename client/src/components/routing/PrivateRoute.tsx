import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

// スライサー
import { authStatus } from '../../features/auth/authSlice';

interface PrivateRouteProps {
  component: FC;
  path: string;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ component, path }) => {
  const auth = useSelector(authStatus);

  if (!auth.isAuthenticated && !auth.loading) {
    return <Redirect to='login' />;
  }
  return <Route exact path={path} component={component} />;
};

export default PrivateRoute;
