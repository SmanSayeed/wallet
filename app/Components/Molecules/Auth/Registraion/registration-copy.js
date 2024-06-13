'use client'
import React, { useState } from 'react';
import { useRegisterMutation } from '@/app/services/authApi';
import AuthLayout from '../AuthLayout';
import Alert from '@/app/Components/Atoms/Alert/Alert';
import { useRouter } from 'next/navigation';

const RegistrationForm = () => {
  const [showAlert,setShowAlert] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation:'',
    phone: '',
    address: '',
    country: '',
    post_code: '',
    nid: '',
    role:'user',
    ip_address:'232.23.23.23',
    profile_image: null,
    status:true,
  });

  const [errors,setErrors] = useState([]);

  const [isSubmitting,setIsSubmitting] = useState(false);

  const [register, { isLoading, isSuccess, isError, error }] = useRegisterMutation();
  const router = useRouter();

  const handleChange = (e) => {
    setShowAlert(false);
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await register(formData).unwrap();
      setShowAlert(true);
      if (response.success) {
        // Clear form data if registration is successful
        setFormData({
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
          phone: '',
          address: '',
          country: '',
          post_code: '',
          nid: '',
        });
        // Redirect to login page or wherever necessary
        router.push('/login');
      }
    } catch (err) {
      const errData = err.data.data || [];
      console.log(errData)
      setIsSubmitting(false);
      if (err.data && errData && errData.length>0) {
      
        // Set errors from server response
        setErrors(errData);
      }
      console.error('Failed to register: ', err);
    }
  };




  const handleClose = () => {
    setShowAlert(false);
  };

  return (
    <AuthLayout>
    <div className="container my-5 shadow-lg border rounded p-3">
      <h2>Register</h2>
      {showAlert && (
        <Alert
          message="Registration successful! Please check email for verification message"
          variant="primary"
          dismissible={true}
          onClose={handleClose}
        />
      )}
      <form onSubmit={handleSubmit}>
        {/* <input type="hidden" name="role" value="user"/>
        <input type="hidden" name="ip_address" value="232.232.233.232"/>
        <input type="hidden" name="status" value='false' />
        <input type="hidden" name="profile_image" value="" /> */}
        
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} />
          {errors.name && <div className="text-danger">{errors.name[0]}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <div className="text-danger">{errors.email[0]}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} />
          {errors.password && <div className="text-danger">{errors.password[0]}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="password_confirmation" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="password_confirmation" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} />
          {errors.password_confirmation && <div className="text-danger">{errors.password_confirmation[0]}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input type="text" className="form-control" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
          {errors.phone && <div className="text-danger">{errors.phone[0]}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input type="text" className="form-control" id="address" name="address" value={formData.address} onChange={handleChange} />
          {errors.address && <div className="text-danger">{errors.address[0]}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="country" className="form-label">Country</label>
          <input type="text" className="form-control" id="country" name="country" value={formData.country} onChange={handleChange} />
          {errors.country && <div className="text-danger">{errors.country[0]}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="post_code" className="form-label">Post Code</label>
          <input type="text" className="form-control" id="post_code" name="post_code" value={formData.post_code} onChange={handleChange} />
          {errors.post_code && <div className="text-danger">{errors.post_code[0]}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="nid" className="form-label">NID</label>
          <input type="text" className="form-control" id="nid" name="nid" value={formData.nid} onChange={handleChange} />
          {errors.nid && <div className="text-danger">{errors.nid[0]}</div>}
        </div>
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Registering...' : 'Register'}
        </button>
        
      {showAlert && (
        <Alert
          message="Success! Check email for verification message"
          variant="primary"
          dismissible={true}
          onClose={handleClose}
        />
      )}
      </form>
    </div>
    </AuthLayout>
    
  );
};

export default RegistrationForm;
