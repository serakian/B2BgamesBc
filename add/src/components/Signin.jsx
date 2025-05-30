import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styling/Signin2.css';

const SigninForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
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
        // Handle successful login (redirect would typically happen here)
        console.log('Login successful');
      } catch (error) {
        setErrors({ submit: 'Invalid email or password' });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="luxe-signin-container">
      <div className="luxe-signin-card">
        <div className="luxe-signin-header">
          <h2>Welcome Back to <span>Luxe Gaming</span></h2>
          <p>Sign in to access your premium account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="luxe-signin-form">
          <div className="luxe-form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'luxe-input-error' : ''}
              placeholder="your@email.com"
            />
            {errors.email && <span className="luxe-error-message">{errors.email}</span>}
          </div>
          
          <div className="luxe-form-group">
            <label htmlFor="password">Password</label>
            <div className="luxe-password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'luxe-input-error' : ''}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="luxe-show-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password && <span className="luxe-error-message">{errors.password}</span>}
          </div>
          
          <div className="luxe-remember-forgot">
            <label className="luxe-remember-me">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" className="luxe-forgot-password">
              Forgot password?
            </Link>
          </div>
          
          <button 
            type="submit" 
            className="luxe-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>
          
          {errors.submit && (
            <div className="luxe-form-error">{errors.submit}</div>
          )}
          
          <div className="luxe-signup-link">
            Don't have an account? <Link to="/signup">Create one</Link>
          </div>
        </form>
        
        <div className="luxe-social-login">
          <p className="luxe-divider"><span>Or sign in with</span></p>
          <div className="luxe-social-buttons">
            <button className="luxe-social-btn luxe-google">
              <i className="fab fa-google"></i> Google
            </button>
            <button className="luxe-social-btn luxe-twitter">
              <i className="fab fa-twitter"></i> Twitter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;