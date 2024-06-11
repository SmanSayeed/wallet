'use client'
import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const Dashboard = () => {
  const { user, token, otpValidated } = useSelector((state) => state.auth);
  const router = useRouter();

  React.useEffect(() => {
    if (!token || !otpValidated) {
      router.push('/');
    }
  }, [token, otpValidated, router]);

  return (
    <div className="container my-5">
      <h1>Welcome to the Dashboard</h1>
      <p>User: {user?.name}</p>
    </div>
  );
};

export default Dashboard;
