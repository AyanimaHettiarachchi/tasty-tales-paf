import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Alert, 
  CircularProgress,
  InputAdornment,
  IconButton,
  Modal
} from '@mui/material';
import { PersonAdd as PersonAddIcon, Visibility, VisibilityOff } from '@mui/icons-material';
import './AdminSignup.css';

function AdminSignup() {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [userEnteredCode, setUserEnteredCode] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    if (!formData.fullname || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    return true;
  };

  const sendVerificationCode = async (email) => {
    try {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      localStorage.setItem('adminVerificationCode', code);
      
      await axios.post('http://localhost:8080/sendVerificationCode', {
        email,
        code
      });
    } catch (error) {
      console.error('Error sending verification code:', error);
      throw error;
    }
  };

  const handleVerifyCode = () => {
    const savedCode = localStorage.getItem('adminVerificationCode');
    if (userEnteredCode === savedCode) {
      alert('Verification successful!');
      localStorage.removeItem('adminVerificationCode');
      navigate('/admin/login');
    } else {
      alert('Invalid verification code. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Include admin role in registration
      const adminData = {
        ...formData,
        role: 'ADMIN'
      };

      // Remove confirmPassword as it's not needed for backend
      delete adminData.confirmPassword;

      const response = await axios.post('http://localhost:8080/admin/user', adminData);
      
      // Send verification code and open modal
      await sendVerificationCode(formData.email);
      setIsVerificationModalOpen(true);
    } catch (error) {
      console.error('Signup error:', error);
      setError(error.response?.data?.message || 'Failed to create admin account. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="admin-signup-page">
      <Box className="admin-signup-container">
        <Paper elevation={3} className="admin-signup-paper">
          <Box className="admin-signup-header">
            <div className="admin-signup-icon">
              <PersonAddIcon fontSize="large" />
            </div>
            <Typography variant="h4" component="h1">
              Create Admin Account
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Register a new administrator account
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" className="admin-signup-alert">
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} className="admin-signup-form">
            <TextField
              label="Full Name"
              name="fullname"
              variant="outlined"
              fullWidth
              required
              value={formData.fullname}
              onChange={handleChange}
              className="admin-signup-input"
              disabled={loading}
            />
            
            <TextField
              label="Email"
              name="email"
              type="email"
              variant="outlined"
              fullWidth
              required
              value={formData.email}
              onChange={handleChange}
              className="admin-signup-input"
              disabled={loading}
            />
            
            <TextField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              required
              value={formData.password}
              onChange={handleChange}
              className="admin-signup-input"
              disabled={loading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={togglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="admin-signup-input"
              disabled={loading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={togglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              className="admin-signup-button"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Create Account'}
            </Button>
          </Box>
          
          <Box className="admin-signup-footer">
            <Typography variant="body2" color="textSecondary">
              Already have an account?
            </Typography>
            <Button
              variant="text"
              color="primary"
              onClick={() => navigate('/admin/login')}
              disabled={loading}
            >
              Login
            </Button>
          </Box>
        </Paper>
      </Box>

      <Modal
        open={isVerificationModalOpen}
        aria-labelledby="verification-modal-title"
        aria-describedby="verification-modal-description"
      >
        <Box className="verification-modal-content">
          <Typography id="verification-modal-title" variant="h6" component="h2">
            Verify Your Email
          </Typography>
          <Typography id="verification-modal-description" sx={{ mt: 2 }}>
            Please enter the verification code sent to your email.
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            type="text"
            value={userEnteredCode}
            onChange={(e) => setUserEnteredCode(e.target.value)}
            placeholder="Enter verification code"
            variant="outlined"
          />
          <Button 
            onClick={handleVerifyCode} 
            variant="contained" 
            color="primary" 
            fullWidth
            sx={{ mt: 2 }}
          >
            Verify
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default AdminSignup;
