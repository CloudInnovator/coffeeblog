import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import './Auth.css';

interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'publisher' | 'subscriber' | 'donor';
  created_at: string;
}

interface AuthProps {
  isDarkMode: boolean;
  onAuthSuccess: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ isDarkMode, onAuthSuccess }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  // Check if user is already logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        // Get user profile from profiles table
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (profile) {
          const user: User = {
            id: profile.id,
            username: profile.username,
            email: profile.email,
            role: profile.role,
            created_at: profile.created_at
          };
          onAuthSuccess(user);
        }
      }
    };
    checkUser();
  }, [onAuthSuccess]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email format is invalid';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLoginMode) {
      if (!formData.username.trim()) {
        newErrors.username = 'Username is required';
      }

      if (!formData.confirmPassword.trim()) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      });

      if (error) {
        setErrors({ general: error.message });
        return false;
      }

      if (data.user) {
        // Get user profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (profile) {
          const user: User = {
            id: profile.id,
            username: profile.username,
            email: profile.email,
            role: profile.role,
            created_at: profile.created_at
          };
          onAuthSuccess(user);
          setMessage('Login successful!');
          return true;
        }
      }
    } catch (error) {
      setErrors({ general: 'An error occurred during login' });
    }
    return false;
  };

  const handleRegister = async (): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            username: formData.username,
            role: 'subscriber'
          }
        }
      });

      if (error) {
        console.error('Registration error:', error);
        setErrors({ general: error.message });
        return false;
      }

      if (data.user) {
        // Wait a moment for the trigger to create the profile
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Try to get the profile created by the trigger
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (profileError) {
          console.error('Profile fetch error:', profileError);
          // If trigger didn't work, try manual creation
          const { error: manualError } = await supabase
            .from('profiles')
            .insert([
              {
                id: data.user.id,
                username: formData.username,
                email: formData.email,
                role: 'subscriber'
              }
            ]);

          if (manualError) {
            console.error('Manual profile creation error:', manualError);
            setErrors({ general: `Error creating user profile: ${manualError.message}` });
            return false;
          }
        }

        // If user is immediately confirmed, log them in
        if (data.session) {
          const user: User = {
            id: data.user.id,
            username: formData.username,
            email: formData.email,
            role: 'subscriber',
            created_at: data.user.created_at
          };
          onAuthSuccess(user);
          setMessage('Registration successful!');
        } else {
          setMessage('Registration successful! Please check your email for verification.');
        }
        return true;
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ general: 'An error occurred during registration' });
    }
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    setMessage('');

    try {
      let success = false;
      if (isLoginMode) {
        success = await handleLogin();
      } else {
        success = await handleRegister();
      }

      if (success) {
        // Reset form
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
      }
    } catch (error) {
      setErrors({ general: 'An error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
    setMessage('');
  };

  return (
    <div className={`auth ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="auth-container">
        <div className="auth-form">
          <div className="auth-header">
            <h1>{isLoginMode ? 'Welcome Back' : 'Create Account'}</h1>
            <p>
              {isLoginMode 
                ? 'Sign in to access your dashboard and saved content'
                : 'Join our community to save articles, create content, and more'
              }
            </p>
          </div>

          {message && (
            <div className="message success-message">
              {message}
            </div>
          )}

          {errors.general && (
            <div className="message error-message">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="form">
            {!isLoginMode && (
              <div className="form-group">
                <label htmlFor="username">Username *</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Enter your display name"
                  className={errors.username ? 'error' : ''}
                />
                {errors.username && <span className="error-text">{errors.username}</span>}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password *</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className={errors.password ? 'error' : ''}
              />
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            {!isLoginMode && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password *</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  className={errors.confirmPassword ? 'error' : ''}
                />
                {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
              </div>
            )}

            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting 
                ? (isLoginMode ? 'Signing In...' : 'Creating Account...') 
                : (isLoginMode ? 'Sign In' : 'Create Account')
              }
            </button>
          </form>

          <div className="auth-footer">
            <p>
              {isLoginMode ? "Don't have an account? " : "Already have an account? "}
              <button 
                type="button" 
                className="link-btn"
                onClick={toggleMode}
              >
                {isLoginMode ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>

          {isLoginMode && (
            <div className="demo-info">
              <p>
                <strong>Demo Mode:</strong> You can sign up with any email and password, 
                or use the test account: <code>test@demo.com</code> / <code>password123</code>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
