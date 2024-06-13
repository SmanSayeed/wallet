'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { useValidateOtpMutation } from '@/app/services/authApi';
import AuthLayout from '@/app/Components/Molecules/Auth/AuthLayout';
import Alert from '@/app/Components/Atoms/Alert/Alert';

const OtpForm = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();
  const { email } = useSelector((state) => state.auth); // Get email from Redux
  const [validateOtp, { isLoading }] = useValidateOtpMutation();

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validateOtp({ otp, email }).unwrap(); // Use the email from Redux state
      router.push('/dashboard');
    } catch (err) {
      setError('Invalid OTP or OTP has expired.');
    }
  };

  return (
    <AuthLayout>
      <div className="container my-5 shadow-lg border rounded p-3">
        <h2>OTP Validation</h2>
        {error && <Alert message={error} variant="danger" dismissible={true} />}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="otp" className="form-label">OTP</label>
            Email: {email && email}
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
    </AuthLayout>
  );
};

export default OtpForm;