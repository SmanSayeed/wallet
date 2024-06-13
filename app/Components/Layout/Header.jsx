'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logout, setCredentials } from '@/app/redux/features/auth/authSlice';
import { getCookie, removeCookie } from '@/app/utils/cookieUtils';

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const user = getCookie('user');
    const token = getCookie('access_token');

    if (user && token) {
      dispatch(setCredentials({ user: JSON.parse(user), token }));
    }
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    removeCookie('access_token');
    removeCookie('user');
    router.push('/auth/login');
  };
  const handleWallet = () => {
    router.push('/wallet');
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
              <>
               <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={handleWallet}>Wallet</button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
              </li>
              </>
           
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;