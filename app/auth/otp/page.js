'use client';
import React, { useState } from 'react';
import { useValidateOtpMutation } from '@/app/services/authApi';
import AuthLayout from '@/app/Components/Molecules/Auth/AuthLayout';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
useSelector
const OtpForm = () => {
  const [otp, setOtp] = useState('');
  const router = useRouter();
  const { user } = useSelector((state) => state.auth); // Get user data from Redux
  const [validateOtpMutation, { isLoading }] = useValidateOtpMutation(); // Use validateOtpMutation hook

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validateOtpMutation({ otp, email: user.email }); // Call validateOtpMutation with OTP and user email
      router.push('/dashboard');
    } catch (err) {
      console.error('Failed to validate OTP: ', err);
    }
  };

  return (
    <>
      <div className="container my-5 shadow-lg border rounded p-3">
        <h2>OTP Validation</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="otp" className="form-label">OTP</label>
            <input
              type="text"
              className="form-control"
              id="otp"
              name="otp"
              value={otp}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? 'Validating...' : 'Submit'}
          </button>
        </form>
      </div>
    </>
  );
};

export default OtpForm;
