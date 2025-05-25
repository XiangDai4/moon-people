// client/src/pages/ServiceDirectory.js
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ServiceFilter from '../components/services/ServiceFilter';
import ServiceCard from '../components/services/ServiceCard';
import CategoryCard from '../components/services/CategoryCard';
import api from '../services/api';
import '../styles/ServiceDirectory.css';

const ServiceDirectory = () => {
  const [searchParams] = useSearchParams();
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const initialFilters = {
    category: searchParams.get('category') || '',
    city: searchParams.get('city') || '',
    language: searchParams.get('language') || ''
  };
  
  const [activeFilters, setActiveFilters] = useState(initialFilters);
  
  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await api.getCategories({ active: true });
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    
    fetchCategories();
  }, []);
  
  // Fetch services based on filters
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        
        // Build query params
        const params = { active: true};
        if (activeFilters.category) params.category = activeFilters.category;
        if (activeFilters.city) params.city = activeFilters.city;
        if (activeFilters.language) params.language = activeFilters.language;
        
        const data = await api.getServices(params);
        setServices(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load services');
        console.error(err);
        setLoading(false);
      }
    };
    
    fetchServices();
  }, [activeFilters]);
  
  const handleFilterChange = (newFilters) => {
    setActiveFilters(newFilters);
  };
  
  return (
    <div className="service-directory-container">
      <section className="directory-header">
        <h1 className="page-title">Support Services Directory</h1>
        <p className="page-description">
          Find local services and support to help you through your cancer journey.
        </p>
      </section>
      
      <ServiceFilter onFilterChange={handleFilterChange} />
      
      {!activeFilters.category && categories.length > 0 && (
        <section className="categories-section">
          <h2 className="section-title">Browse by Category</h2>
          <div className="categories-grid">
            {categories.map(category => (
              <CategoryCard key={category._id} category={category} />
            ))}
          </div>
        </section>
      )}
      
      <section className="services-section">
        {activeFilters.category && (
          <h2 className="section-title">
            {categories.find(c => c._id === activeFilters.category)?.name || 'Services'}
          </h2>
        )}
        
        {loading ? (
          <div className="loading-container">
            <p className="loading-text">Loading services...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p className="error-text">{error}</p>
          </div>
        ) : services.length === 0 ? (
          <div className="no-results-container">
            <p className="no-results-text">No services found matching your criteria.</p>
          </div>
        ) : (
          <div className="services-grid">
            {services.map(service => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ServiceDirectory;