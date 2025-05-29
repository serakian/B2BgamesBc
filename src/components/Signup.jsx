import React, { useState } from 'react';
import './styling/signup.css';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 4) {
      newErrors.username = 'Username must be at least 4 characters';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSuccessMessage('Account created successfully! Welcome to Luxe Gaming.');
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
      } catch (error) {
        setErrors({ submit: error.message });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="luxe-signup-container">
      <div className="luxe-signup-card">
        <div className="luxe-signup-header">
          <h2>Join <span>Luxe Gaming</span></h2>
          <p>Create your premium gaming account</p>
        </div>
        
        {successMessage ? (
          <div className="luxe-success-message">
            {successMessage}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="luxe-signup-form">
            <div className="luxe-form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={errors.username ? 'luxe-input-error' : ''}
              />
              {errors.username && <span className="luxe-error-message">{errors.username}</span>}
            </div>
            
            <div className="luxe-form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'luxe-input-error' : ''}
              />
              {errors.email && <span className="luxe-error-message">{errors.email}</span>}
            </div>
            
            <div className="luxe-form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'luxe-input-error' : ''}
              />
              {errors.password && <span className="luxe-error-message">{errors.password}</span>}
            </div>
            
            <div className="luxe-form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'luxe-input-error' : ''}
              />
              {errors.confirmPassword && (
                <span className="luxe-error-message">{errors.confirmPassword}</span>
              )}
            </div>
            
            <button 
              type="submit" 
              className="luxe-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Account...' : 'Become a Member'}
            </button>
            
            {errors.submit && (
              <div className="luxe-form-error">{errors.submit}</div>
            )}
            
            <div className="luxe-login-link">
              Already have an account? <a href="/src/components/Signup.jsx">Sign in</a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignupForm;