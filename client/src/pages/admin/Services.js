// client/src/pages/admin/Services.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import '../../styles/admin/Services.css';

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    provider: '',
    location: {
      city: ''
    },
    contact: {
      phone: '',
      email: ''
    },
    languages: ['']
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  
  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch categories and services in parallel
        const [categoriesData, servicesData] = await Promise.all([
          api.getCategories(),
          api.getServices()
        ]);
        
        setCategories(categoriesData);
        setServices(servicesData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load data');
        console.error(err);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      // Handle nested properties (e.g., location.city)
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else if (name === 'languages') {
      // Handle languages array
      setFormData(prev => ({
        ...prev,
        languages: value.split(',').map(lang => lang.trim())
      }));
    } else {
      // Handle regular properties
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Format data
      const serviceData = {
        ...formData,
        languages: formData.languages.filter(lang => lang) // Remove empty strings
      };
      
      if (editMode) {
        await api.updateService(editId, serviceData);
        // Update services list
        setServices(prev => 
          prev.map(service => service._id === editId ? { ...service, ...serviceData } : service)
        );
        resetForm();
      } else {
        const newService = await api.createService(serviceData);
        setServices(prev => [...prev, newService]);
        resetForm();
      }
    } catch (err) {
      console.error('Error saving service:', err);
      alert(err.message || 'Failed to save service');
    }
  };
  
  const handleEdit = (service) => {
    // Prepare languages as comma-separated string for form
    const languagesString = service.languages ? service.languages.join(', ') : '';
    
    setFormData({
      name: service.name,
      description: service.description,
      category: service.category._id || service.category,
      provider: service.provider,
      location: {
        city: service.location.city
      },
      contact: {
        phone: service.contact?.phone || '',
        email: service.contact?.email || ''
      },
      languages: service.languages || ['']
    });
    setEditMode(true);
    setEditId(service._id);
  };
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await api.deleteService(id);
        setServices(prev => prev.filter(service => service._id !== id));
      } catch (err) {
        console.error('Error deleting service:', err);
        alert(err.message || 'Failed to delete service');
      }
    }
  };
  
  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: '',
      provider: '',
      location: {
        city: ''
      },
      contact: {
        phone: '',
        email: ''
      },
      languages: ['']
    });
    setEditMode(false);
    setEditId(null);
  };
  
const handleToggleActive = async (service) => {
  try {
    const updatedService = await api.updateService(service._id, {
      isActive: !service.isActive
    });
    
    // Ensure the updated service maintains the same data structure
    setServices(prev => 
      prev.map(svc => {
        if (svc._id === service._id) {
          return {
            ...updatedService,
            category: typeof updatedService.category === 'string' || !updatedService.category.name
              ? svc.category  // Keep the original category object
              : updatedService.category  // Use the new category object
          };
        }
        return svc;
      })
    );
  } catch (err) {
    console.error('Error updating service status:', err);
    alert(err.message || 'Failed to update service status');
  }
};
  
  return (
    <div className="admin-services-container">
      <div className="admin-header">
        <h1 className="admin-title">Manage Services</h1>
        <Link to="/admin" className="back-to-admin">Back to Admin Dashboard</Link>
      </div>
      
      <div className="admin-content">
        <div className="service-form-panel">
          <h2 className="form-title">{editMode ? 'Edit Service' : 'Add New Service'}</h2>
          
          <form onSubmit={handleSubmit} className="service-form">
            <div className="form-group">
              <label htmlFor="name">Service Name</label>
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
              <label htmlFor="category">Category</label>
              <select 
                id="category" 
                name="category" 
                value={formData.category} 
                onChange={handleInputChange}
                required
              >
                <option value="">Select a Category</option>
                {categories.map(category => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="provider">Provider Name</label>
              <input 
                type="text" 
                id="provider" 
                name="provider" 
                value={formData.provider} 
                onChange={handleInputChange}
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="location.city">City</label>
              <input 
                type="text" 
                id="location.city" 
                name="location.city" 
                value={formData.location.city} 
                onChange={handleInputChange}
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="contact.email">Email</label>
              <input 
                type="email" 
                id="contact.email" 
                name="contact.email" 
                value={formData.contact.email} 
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="contact.phone">Phone</label>
              <input 
                type="text" 
                id="contact.phone" 
                name="contact.phone" 
                value={formData.contact.phone} 
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="languages">Languages (comma-separated)</label>
              <input 
                type="text" 
                id="languages" 
                name="languages" 
                value={formData.languages.join(', ')} 
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-buttons">
              <button type="submit" className="save-button">
                {editMode ? 'Update Service' : 'Add Service'}
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
        
        <div className="service-list-panel">
          <h2 className="list-title">Existing Services</h2>
          
          {loading ? (
            <p className="loading-text">Loading services...</p>
          ) : error ? (
            <p className="error-text">{error}</p>
          ) : services.length === 0 ? (
            <p className="no-services-text">No services found. Add your first service.</p>
          ) : (
            <div className="service-list">
              {services.map(service => (
                <div 
                  key={service._id} 
                  className={`service-item ${!service.isActive ? 'inactive' : ''}`}
                >
                  <div className="service-item-content">
                    <div className="service-details">
                      <h3 className="service-name">{service.name}</h3>
                      <p className="service-provider">{service.provider}</p>
                      <p className="service-location">{service.location.city}</p>
                      <div className="service-category-tag">
                        {service.category?.name || 'Uncategorized'}
                      </div>
                      <div className="service-status">
                        Status: <span className={service.isActive ? 'status-active' : 'status-inactive'}>
                          {service.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="service-actions">
                    <button 
                      onClick={() => handleToggleActive(service)} 
                      className={`status-toggle-button ${service.isActive ? 'deactivate' : 'activate'}`}
                    >
                      {service.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    <button 
                      onClick={() => handleEdit(service)} 
                      className="edit-button"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(service._id)} 
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

export default AdminServices;