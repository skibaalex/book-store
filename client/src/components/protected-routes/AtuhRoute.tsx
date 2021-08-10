import { FC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import useAuth from '../../hooks/useAuth';

export interface ProtectedRouteProps extends RouteProps {
}

const ProtectedRoute: FC<ProtectedRouteProps> = (props) => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <Route {...props} />
    );
  }
  return (
    <Redirect to="/" />
  );
};

export default ProtectedRoute;
