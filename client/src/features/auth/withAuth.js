import { useAuth } from './auth';
import { Redirect } from 'react-router-dom';

const withAuth = Component => {
  return ({
    path,
    children
  }) => {
    const {
      isAuthenticated,
      user
    } = useAuth();

    if (isAuthenticated && !(user.sub && !(user.firstName && user.lastName)) && path !== '/additional-info') {
      return <Redirect to='/additional-info' />;
    }

    return (
      <Component>
        {children}
      </Component>
    )
  }
};

export default withAuth;