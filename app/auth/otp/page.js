'use client';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { validateOtp } from '../features/auth/authSlice';
import AuthLayout from '../AuthLayout';

const OtpForm = () => {
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();
  const { status, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(validateOtp({ otp }));
    if (result.type === 'auth/validateOtp/fulfilled') {
      router.push('/dashboard');
    }
  };

  return (
    <AuthLayout>
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
          {status === 'failed' && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
            {status === 'loading' ? 'Validating...' : 'Submit'}
          </button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default OtpForm;
