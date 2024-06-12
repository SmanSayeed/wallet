// components/LogoutButton.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { reset } from '@/app/redux/features/auth/authSlice';
import { useLogoutMutation } from '@/app/services/authApi';
import { useRouter } from 'next/navigation';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      dispatch(reset());
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <button onClick={handleLogout} className="btn btn-primary">
      Logout
    </button>
  );
};

export default LogoutButton;
