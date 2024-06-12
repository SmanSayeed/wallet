'use client';
import React from 'react';
import { useGetUserDetailsQuery } from '../services/authApi';
import { useSelector } from 'react-redux';
import Layout from '../Components/Layout/Layout';
import AuthLayout from '../Components/Molecules/Auth/AuthLayout';
import DButton from '../Components/Atoms/DButton';
import Link from 'next/link';

const Dashboard = () => {
  // const { user } = useSelector((state) => state.auth);
  const { data:user, error, isLoading } = useGetUserDetailsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
    <AuthLayout>
      <div className='d-flex justify-content-center align-items-center flex-column shadow-lg p-3 m-3 border rounded'>
      <h4>Welcome , {user.data.name}</h4>
      <p>Email: {user.data.email}</p> 
      <p>Phone: {user.data.phone}</p>

      </div>
      <div className='d-flex justify-content-center align-items-center flex-column shadow-lg p-3 m-3 border rounded'>
            <Link href="/wallet">
              <DButton variant="success" size="md">
                Wallet
              </DButton>
              </Link>
        </div>
   
    </AuthLayout>
     
      {/* Render other user details */}
    </>
  );
};

export default Dashboard;
