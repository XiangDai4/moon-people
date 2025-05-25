// client/src/pages/About.js
import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">About Moon People</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
        <p className="mb-4">
          Moon People is a digital sanctuary for those navigating the complexities of cancer diagnoses and treatment. 
          Our platform bridges the gap between those seeking support and those offering it, creating a warm, 
          accessible community where no one faces cancer alone.
        </p>
        <p className="mb-4">
          By connecting patients with volunteers, resources, and peer support, we aim to transform 
          the cancer journey from one of isolation to one of connection and hope. Our ultimate vision 
          is to create pathways for support recipients to eventually become support providers, 
          completing a cycle of healing and empowerment.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Our Approach</h2>
        <p className="mb-4">
          We believe in the power of community, shared experience, and practical support. 
          Our platform offers:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Connections to local volunteers who can offer practical support</li>
          <li>Curated resources providing reliable information about cancer treatment and support</li>
          <li>A community forum where people can share experiences and find comfort</li>
          <li>Easy-to-book services like therapy, beauty services, and physical activities adapted for cancer patients</li>
        </ul>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Our Story</h2>
        <p className="mb-4">
          Moon People was founded by a group of cancer survivors and caregivers who experienced 
          firsthand the challenges of navigating a cancer diagnosis. Through their own journeys, 
          they identified gaps in support systems and created Moon People to address these needs.
        </p>
        <p className="mb-4">
          The name "Moon People" represents our community - just as the moon reflects light in darkness, 
          our members reflect hope and guidance to each other during difficult times.
        </p>
      </section>
      
      <section>
        <h2 className="text-2xl font-bold mb-4">Join Us</h2>
        <p className="mb-4">
          Whether you're seeking support or want to offer it, Moon People welcomes you. 
          Together, we can transform the cancer experience and create a community where 
          everyone finds the support they need.
        </p>
        <div className="flex gap-4">
          <a 
            href="/register" 
            className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-lg inline-block transition-colors"
          >
            Join Our Community
          </a>
          <a 
            href="/contact" 
            className="bg-white border border-purple-700 text-purple-700 hover:bg-purple-50 px-6 py-3 rounded-lg inline-block transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;