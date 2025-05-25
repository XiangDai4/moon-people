// client/src/pages/NeedSupport.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NeedSupport.css';
import listIconSrc from '../assets/images/svg/list_alt_48dp.svg';

const NeedSupport = () => {
  return (
    <div className="need-support-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="page-title">How Can We Support You?</h1>
          <p className="page-subtitle">
            We're here to help you navigate your cancer journey with compassion and care.
          </p>
        </div>
      </section>
      
      <section className="support-options-section">
        <div className="section-container">
          <h2 className="section-title">Support Options</h2>
          
          <div className="support-options-grid">
            <div className="support-option-card">
              <div className="option-icon">
              {/* <img src={listIconSrc} alt="List icon" className="h-16 w-16" /> */}
                </div>
              <h3 className="option-title">Support Services</h3>
              <p className="option-description">
                Find local services including counseling, beauty services, exercise programs, and more.
              </p>
              <Link to="/services" className="option-button">
                Browse Services
              </Link>
            </div>
            
            <div className="support-option-card">
              <div className="option-icon">
                {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg> */}
              </div>
              <h3 className="option-title">Resource Library</h3>
              <p className="option-description">
                Access helpful articles, guides, and information to help navigate your cancer journey.
              </p>
              <Link to="/resources" className="option-button">
                Explore Resources
              </Link>
            </div>
            
            <div className="support-option-card">
              <div className="option-icon">
                {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg> */}
              </div>
              <h3 className="option-title">Community Forum</h3>
              <p className="option-description">
                Connect with others who understand your journey and share experiences in our supportive community.
              </p>
              <Link to="/forum" className="option-button">
                Join Discussions
              </Link>
            </div>
            
            <div className="support-option-card">
              <div className="option-icon">
                {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg> */}
              </div>
              <h3 className="option-title">Book Appointments</h3>
              <p className="option-description">
                Schedule appointments with service providers for personal support tailored to your needs.
              </p>
              <Link to="/appointments" className="option-button">
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <section className="featured-services-section">
        <div className="section-container">
          <h2 className="section-title">Featured Support Services</h2>
          <p className="section-description">
            Explore our most popular support services to find the help you need.
          </p>
          
          <Link to="/services" className="browse-all-button">
            Browse All Services
          </Link>
        </div>
      </section>
      
      <section className="help-cta-section">
        <div className="section-container">
          <h2 className="section-title">Need Help Finding Support?</h2>
          <p className="section-description">
            Our team is here to help you find the right resources and services for your unique situation.
          </p>
          
          <Link to="/contact" className="contact-button">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
};

export default NeedSupport;