// client/src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css'; 

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Moon People</h1>
          <p className="hero-subtitle">
            A digital sanctuary for those navigating the complexities of cancer diagnoses and treatment.
          </p>
          
          <div className="cta-buttons">
            <Link 
              to="/need-support" 
              className="cta-button primary"
            >
              I Need Support
            </Link>
            
            <Link 
              to="/want-to-support" 
              className="cta-button secondary"
            >
              I Want to Support
            </Link>
          </div>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="mission-section">
        <div className="section-container">
          <h2 className="section-title">Our Mission</h2>
          <p className="mission-text">
            Our platform bridges the gap between those seeking support and those offering it, 
            creating a warm, accessible community where no one faces cancer alone. By connecting 
            patients with volunteers, resources, and peer support, we aim to transform the cancer 
            journey from one of isolation to one of connection and hope.
          </p>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="features-section">
        <div className="section-container">
          <h2 className="section-title">How We Help</h2>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="feature-title">Support Community</h3>
              <p className="feature-description">
                Connect with others who understand your journey and find emotional support in our community.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="feature-title">Resource Library</h3>
              <p className="feature-description">
                Access reliable information, guides, and resources to help navigate your cancer journey.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="feature-title">Support Services</h3>
              <p className="feature-description">
                Find local services like therapy, beauty treatments, and physical activities adapted to your needs.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-container">
          <h2 className="section-title">Stories of Hope</h2>
          
          <div className="testimonial-card">
            <p className="testimonial-text">
              "Moon People connected me with services and volunteers who truly understood what I was going through. 
              For the first time since my diagnosis, I didn't feel alone."
            </p>
            <p className="testimonial-author">— Sarah, Cancer Survivor</p>
          </div>
        </div>
      </section>
      
      {/* Join Us Section */}
      <section className="join-section">
        <div className="section-container">
          <h2 className="section-title">Join Our Community</h2>
          <p className="join-text">
            Whether you're seeking support or want to offer it, Moon People is your community.
          </p>
          
          <div className="cta-buttons">
            <Link 
              to="/register" 
              className="cta-button primary"
            >
              Create an Account
            </Link>
            
            <Link 
              to="/about" 
              className="cta-button outline"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;