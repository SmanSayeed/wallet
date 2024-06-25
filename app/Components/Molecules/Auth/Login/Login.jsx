'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '@/app/services/authApi';
import { useRouter } from 'next/navigation';
import AuthLayout from '../AuthLayout';
import Alert from '@/app/Components/Atoms/Alert/Alert';
import { setCredentials } from '@/app/redux/features/auth/authSlice';
import { useSearchParams } from 'next/navigation'

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [message,setMessage]=useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();

  const searchParams = useSearchParams()
 
  const queryParamMessage = searchParams.get('message')

  useEffect(() => {
    if (queryParamMessage) {
      setMessage(queryParamMessage);
    }
  }, [queryParamMessage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData).unwrap();
      const { user, token } = response; // Extract user data and token from the response
      dispatch(setCredentials({ user, token }));
      router.push('/auth/otp');
    } catch (err) {
      if (err.status === 401) {
        console.log(err.data.message);
        setError(err.data.message);
      } else if (err.data && err.data.message) {
        setError(err.data.message); // Set the error message
      } else {
        console.error('Failed to login: ', err);
      }
    }
  };

  return (
    <AuthLayout>
      <div className="container my-5 shadow-lg border rounded p-3">
        <h2>Login</h2>
        {error && <Alert message={error} variant="danger" dismissible={true} />}
        {message && <Alert message={message} variant="success" dismissible={true} />}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default LoginForm;