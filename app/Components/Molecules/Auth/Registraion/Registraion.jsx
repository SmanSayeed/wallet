'use client';
import React, { useState } from 'react';
import AuthLayout from '../AuthLayout';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    country: '',
    post_code: '',
    nid: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., sending data to backend)
    console.log(formData);
  };

  return (
<>
<AuthLayout>
<h2>Registration Form</h2>
        <form onSubmit={handleSubmit} className='my-5'>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input type="text" className="form-control" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input type="text" className="form-control" id="address" name="address" value={formData.address} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="country" className="form-label">Country</label>
          <input type="text" className="form-control" id="country" name="country" value={formData.country} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="post_code" className="form-label">Post Code</label>
          <input type="text" className="form-control" id="post_code" name="post_code" value={formData.post_code} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="nid" className="form-label">NID</label>
          <input type="text" className="form-control" id="nid" name="nid" value={formData.nid} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
</AuthLayout>
     
      </>   
  );
};

export default RegistrationForm;
