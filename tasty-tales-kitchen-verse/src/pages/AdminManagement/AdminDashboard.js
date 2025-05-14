import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid,
  Card,
  CardContent,
  CardActions,
  Button
} from '@mui/material';
import { 
  Category as CategoryIcon,
  People as PeopleIcon,
  DynamicFeed as PostsIcon,
  School as LearningIcon,
  Dashboard as DashboardIcon
} from '@mui/icons-material';
import NavBar from '../../Components/NavBar/NavBar';
import './AdminDashboard.css';

function AdminDashboard() {
  // Remove the admin check since it's handled by AdminRoute
  
  const adminModules = [
    {
      title: "Category Management",
      description: "Add, edit, delete and view categories",
      icon: <CategoryIcon fontSize="large" />,
      link: "/admin/categories"
    },
    // {
    //   title: "User Management",
    //   description: "Manage user accounts and roles",
    //   icon: <PeopleIcon fontSize="large" />,
    //   link: "/admin/users"
    // },
    // {
    //   title: "Post Management",
    //   description: "Moderate and manage user posts",
    //   icon: <PostsIcon fontSize="large" />,
    //   link: "/admin/posts"
    // },
    // {
    //   title: "Learning Plan Management",
    //   description: "Manage learning plans and templates",
    //   icon: <LearningIcon fontSize="large" />,
    //   link: "/admin/learning-plans"
    // }
  ];

  return (
    <div className="admin-dashboard-page">
      <NavBar />
      <Box className="admin-dashboard-container">
        <Paper elevation={3} className="admin-dashboard-paper">
          <Box className="admin-header">
            <DashboardIcon fontSize="large" />
            <Typography variant="h4" component="h1" className="page-title">
              Admin Dashboard
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {adminModules.map((module, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card className="admin-card">
                  <CardContent>
                    <Box className="card-icon">
                      {module.icon}
                    </Box>
                    <Typography variant="h6" component="h2">
                      {module.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {module.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button 
                      size="small" 
                      color="primary" 
                      component={Link} 
                      to={module.link}
                      fullWidth
                    >
                      Access
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>
    </div>
  );
}

export default AdminDashboard;
