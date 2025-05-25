// client/src/pages/admin/Categories.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import '../../styles/admin/Categories.css';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: 'default-icon'
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  
  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await api.getCategories();
        setCategories(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load categories');
        console.error(err);
        setLoading(false);
      }
    };
    
    fetchCategories();
  }, []);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editMode) {
        await api.updateCategory(editId, formData);
        // Update the categories list
        setCategories(prev => 
          prev.map(cat => cat._id === editId ? { ...cat, ...formData } : cat)
        );
        resetForm();
      } else {
        const newCategory = await api.createCategory(formData);
        setCategories(prev => [...prev, newCategory]);
        resetForm();
      }
    } catch (err) {
      console.error('Error saving category:', err);
      alert(err.message || 'Failed to save category');
    }
  };
  
  const handleEdit = (category) => {
    setFormData({
      name: category.name,
      description: category.description,
      icon: category.icon || 'default-icon'
    });
    setEditMode(true);
    setEditId(category._id);
  };
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await api.deleteCategory(id);
        setCategories(prev => prev.filter(cat => cat._id !== id));
      } catch (err) {
        console.error('Error deleting category:', err);
        alert(err.message || 'Failed to delete category');
      }
    }
  };
  
  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      icon: 'default-icon'
    });
    setEditMode(false);
    setEditId(null);
  };
  
  const handleToggleActive = async (category) => {
    try {
      const updatedCategory = await api.updateCategory(category._id, {
        isActive: !category.isActive
      });
      
      setCategories(prev => 
        prev.map(cat => cat._id === category._id ? updatedCategory : cat)
      );
    } catch (err) {
      console.error('Error updating category status:', err);
      alert(err.message || 'Failed to update category status');
    }
  };
  
  const iconOptions = [
    { value: 'default-icon', label: 'Default Icon' },
    { value: 'therapy', label: 'Therapy' },
    { value: 'beauty', label: 'Beauty' },
    { value: 'exercise', label: 'Exercise' },
    { value: 'nutrition', label: 'Nutrition' },
    { value: 'counseling', label: 'Counseling' }
  ];
  
  return (
    <div className="admin-categories-container">
      <div className="admin-header">
        <h1 className="admin-title">Manage Categories</h1>
        <Link to="/admin" className="back-to-admin">Back to Admin Dashboard</Link>
      </div>
      
      <div className="admin-content">
        <div className="category-form-panel">
          <h2 className="form-title">{editMode ? 'Edit Category' : 'Add New Category'}</h2>
          
          <form onSubmit={handleSubmit} className="category-form">
            <div className="form-group">
              <label htmlFor="name">Category Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange}
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea 
                id="description" 
                name="description" 
                value={formData.description} 
                onChange={handleInputChange}
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="icon">Icon</label>
              <select 
                id="icon" 
                name="icon" 
                value={formData.icon} 
                onChange={handleInputChange}
              >
                {iconOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-buttons">
              <button type="submit" className="save-button">
                {editMode ? 'Update Category' : 'Add Category'}
              </button>
              
              {editMode && (
                <button 
                  type="button" 
                  className="cancel-button" 
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
        
        <div className="category-list-panel">
          <h2 className="list-title">Existing Categories</h2>
          
          {loading ? (
            <p className="loading-text">Loading categories...</p>
          ) : error ? (
            <p className="error-text">{error}</p>
          ) : categories.length === 0 ? (
            <p className="no-categories-text">No categories found. Add your first category.</p>
          ) : (
            <div className="category-list">
              {categories.map(category => (
                <div 
                  key={category._id} 
                  className={`category-item ${!category.isActive ? 'inactive' : ''}`}
                >
                  <div className="category-item-content">
                    <div className="category-icon-preview">
                      <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={getCategoryIcon(category.icon)} />
                      </svg>
                    </div>
                    
                    <div className="category-details">
                      <h3 className="category-name">{category.name}</h3>
                      <p className="category-description">{category.description}</p>
                      <div className="category-status">
                        Status: <span className={category.isActive ? 'status-active' : 'status-inactive'}>
                          {category.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="category-actions">
                    <button 
                      onClick={() => handleToggleActive(category)} 
                      className={`status-toggle-button ${category.isActive ? 'deactivate' : 'activate'}`}
                    >
                      {category.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    <button 
                      onClick={() => handleEdit(category)} 
                      className="edit-button"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(category._id)} 
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper function to get SVG path based on icon name
const getCategoryIcon = (iconName) => {
  const icons = {
    'therapy': 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
    'beauty': 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
    'exercise': 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    'nutrition': 'M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z',
    'counseling': 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
    'default-icon': 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  };
  
  return icons[iconName] || icons['default-icon'];
};

export default AdminCategories;