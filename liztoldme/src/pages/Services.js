import React from 'react';
import review from '../images/review.jpeg';
import '../styles/App.css'; 
import '../styles/Home.css'; 


   const Services = () => {
  return (
    <section id="services" className="services-section">
      <h2 className="about-title"style={{ marginBottom: '1.0rem' }}>What to expect</h2>
      <div className="about-underline" style={{
        width: '80px',
        height: '5px',
        background: '#333',
        margin: '0 auto 2rem auto',
        borderRadius: '2px'
      }}></div>
      <img src={review} alt="review" />
      <p>Our platform provides a space for everyone to ask for advice and receive positive feedback.</p>
   
    </section>
  );
};

export default Services;