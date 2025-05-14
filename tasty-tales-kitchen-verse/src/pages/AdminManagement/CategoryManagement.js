import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Paper,
  Snackbar,
  Alert
} from '@mui/material';
import NavBar from '../../Components/NavBar/NavBar';
import CategoryTable from './components/CategoryTable';
import AddCategory from './components/AddCategory';
import EditCategory from './components/EditCategory';
import DeleteCategory from './components/DeleteCategory';
import './CategoryManagement.css';

function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [editCategory, setEditCategory] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Check if user is admin
  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'ADMIN') {
      // Redirect non-admin users
      window.location.href = '/';
    }
  }, []);

  // Fetch all categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8080/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      showSnackbar('Failed to fetch categories', 'error');
    }
  };

  const handleAddCategory = async (name) => {
    try {
      const response = await axios.post('http://localhost:8080/categories', { name });
      if (response) {
        fetchCategories();
        showSnackbar('Category added successfully!', 'success');
        return true;
      }

    } catch (error) {
      console.error('Error adding category:', error);
      showSnackbar('Failed to add category', 'error');
      return false;
    }
  };

  const handleUpdateCategory = async (id, name) => {
    try {
      const response = await axios.put(`http://localhost:8080/categories/${id}`, { name });
      if (response) {
        fetchCategories();
        setEditCategory(null);
        showSnackbar('Category updated successfully!', 'success');
        return true;
      }

    } catch (error) {
      console.error('Error updating category:', error);
      showSnackbar('Failed to update category', 'error');
      return false;
    }
  };

  const handleDeleteCategory = async () => {
    try {
      await axios.delete(`http://localhost:8080/categories/${deleteId}`);
      setCategories(categories.filter(cat => cat.id !== deleteId));
      setOpenDeleteDialog(false);
      setDeleteId(null);
      showSnackbar('Category deleted successfully!', 'success');
    } catch (error) {
      console.error('Error deleting category:', error);
      showSnackbar('Failed to delete category', 'error');
    }
  };

  const startEditing = (category) => {
    setEditCategory(category);
  };

  const cancelEditing = () => {
    setEditCategory(null);
  };

  const promptDelete = (id) => {
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div className="category-management-page">
      <NavBar />
      <Box className="category-management-container">
        <Paper elevation={3} className="category-management-paper">
          <Typography variant="h4" component="h1" className="page-title">
            Category Management
          </Typography>

          {editCategory ? (
            <EditCategory
              category={editCategory}
              onUpdate={handleUpdateCategory}
              onCancel={cancelEditing}
            />
          ) : (
            <AddCategory onAdd={handleAddCategory} />
          )}

          <CategoryTable
            categories={categories}
            onEdit={startEditing}
            onDelete={promptDelete}
            isEditing={!!editCategory}
          />
        </Paper>
      </Box>

      <DeleteCategory
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleDeleteCategory}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CategoryManagement;
