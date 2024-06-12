'use client';
import { useDispatch, useSelector } from 'react-redux';
import { removeCookie } from '@/app/utils/cookieUtils';
import { useRouter } from 'next/navigation';
import { logout } from '@/app/redux/features/auth/authSlice';

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    removeCookie('user');
    router.push('/auth/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <span className="navbar-brand" onClick={() => router.push('/')}>WDMS</span>
        <div className="navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {!user ? (
              <>
                <li className="nav-item">
                  <span className="nav-link" onClick={() => router.push('/auth/login')}>Login</span>
                </li>
                <li className="nav-item">
                  <span className="nav-link" onClick={() => router.push('/auth/reg')}>Registration</span>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
