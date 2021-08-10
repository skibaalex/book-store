import { FC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import useAuth from '../../hooks/useAuth';

export interface AdminRouteProps extends RouteProps {
}

const AdminRoute: FC<AdminRouteProps> = (props) => {
  const { user } = useAuth();
  if (user?.isAdmin) {
    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <Route {...props} />
    );
  }
  return (
    <Redirect to="/" />
  );
};

export default AdminRoute;
