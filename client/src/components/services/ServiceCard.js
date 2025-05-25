// client/src/components/services/ServiceCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/ServiceCard.css';

const ServiceCard = ({ service }) => {
  return (
    <div className="service-card">
      <h3 className="service-name">
        <Link to={`/services/${service._id}`}>{service.name}</Link>
      </h3>
      
      <div className="service-provider">
        <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span>{service.provider}</span>
      </div>
      
      <div className="service-location">
        <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span>{service.location.city}</span>
      </div>
      
      {service.category && (
        <div className="service-category">
          <span className="category-badge">
            {service.category.name || 'Uncategorized'}
          </span>
        </div>
      )}
      
      <p className="service-description">{service.description}</p>
      
      {service.languages && service.languages.length > 0 && (
        <div className="service-languages">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
          </svg>
          <span>{service.languages.join(', ')}</span>
        </div>
      )}
      
      <Link to={`/services/${service._id}`} className="view-details-button">
        View Details
      </Link>
    </div>
  );
};

export default ServiceCard;