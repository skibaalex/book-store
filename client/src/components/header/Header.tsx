import { Link } from 'react-router-dom';
// eslint-disable-next-line import/no-unresolved
import { IoIosCart } from 'react-icons/io';
import useAuth from '../../hooks/useAuth';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();

  // eslint-disable-next-line implicit-arrow-linebreak
  return (
    <header className="header">
      <div className="logo">
        <Link className="nav-link" to="/">Books</Link>
      </div>
      {isAuthenticated && (
      <span>
        Hey,
        {' '}
        {user!.email}
      </span>
      )}
      <div className="menu">
        <nav>

          <ul>
            <li className="active"><Link className="nav-link" to="/">Home</Link></li>
            <li className="active"><Link className="nav-link" to="/books">Books</Link></li>
            {isAuthenticated
              ? (
                <>
                  <li><Link className="nav-link" to="/account">Account</Link></li>
                  {user?.isAdmin && <li><Link className="nav-link" to="/admin">Admin</Link></li>}
                  <li><Link onClick={() => logout()} className="nav-link" to="/">Logout</Link></li>
                  <li className="cart"><IoIosCart /></li>
                </>
              )
              : (
                <>
                  <li><Link className="nav-link" to="/login">Login</Link></li>
                  <li><Link className="nav-link" to="/register">Register</Link></li>
                </>
              )}
          </ul>
        </nav>
      </div>
    </header>
  );
};
export default Header;
