import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Alert, 
  CircularProgress
} from '@mui/material';
import { Lock as LockIcon } from '@mui/icons-material';
import './AdminLogin.css';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if already logged in as admin
    const userRole = localStorage.getItem('userRole');
    if (userRole === 'ADMIN') {
      navigate('/admin');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/admin/login', {
        email,
        password
      });

      // Store tokens and user info
      localStorage.setItem('userID', response.data.userID);
      localStorage.setItem('userRole', "ADMIN");
      localStorage.setItem('userFullName', response.data.fullname);
      localStorage.setItem('token', response.data.token);
      
      // Redirect to admin dashboard
      navigate('/admin');
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <Box className="admin-login-container">
        <Paper elevation={3} className="admin-login-paper">
          <Box className="admin-login-header">
            <div className="admin-login-icon">
              <LockIcon fontSize="large" />
            </div>
            <Typography variant="h4" component="h1">
              Admin Login
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Please enter your credentials to access the admin area
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" className="admin-login-alert">
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} className="admin-login-form">
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="admin-login-input"
              disabled={loading}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="admin-login-input"
              disabled={loading}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              className="admin-login-button"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Login'}
            </Button>
          </Box>
          
          <Box className="admin-login-footer">
            <Typography variant="body2" color="textSecondary">
              Don't have an admin account?
            </Typography>
            <Button
              variant="text"
              color="primary"
              onClick={() => navigate('/admin/signup')}
              disabled={loading}
            >
              Sign Up
            </Button>
            <Button
              variant="text"
              color="secondary"
              onClick={() => navigate('/')}
              disabled={loading}
            >
              Back to main site
            </Button>
          </Box>
        </Paper>
      </Box>
    </div>
  );
}

export default AdminLogin;
