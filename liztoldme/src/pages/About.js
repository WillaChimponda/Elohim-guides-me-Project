import React from 'react';
import AnimatedCard from '../components/AnimatedCard';
import '../App.css';

const About = () => {
  return (
    <section className="about-section">
      <h1 className="about-title" style={{ marginBottom: '1.0rem' }}>Who are we?</h1>
      <div className="about-underline" style={{
        width: '80px',
        height: '5px',
        background: '#333',
        margin: '0 auto 2rem auto',
        borderRadius: '2px'
      }}></div>
      <p className="about-desc" style={{
        textAlign: 'center',
        fontSize: '1.25rem',
        color:  '#f0e0e0',
        marginBottom: '2.5rem',
        maxWidth: '900px',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontWeight: 'bold'
      }}>
        Elohim-guides-me was created with a simple mission: to provide a safe, supportive space<br></br> where people can openly discuss psychological challenges and find the support they<br></br> need.
      </p>

      <div className="about-cards-container">
        <AnimatedCard direction="left">
          <h3>Our Mission</h3>
          <p>To provide a safe, judgment-free space where everyone 
            can seek guidance,
            share their struggles, and find support for their mental well-being.</p>
        </AnimatedCard>

        <AnimatedCard direction="right">
          <h3>Our Approach</h3>
          <p>We believe in empathetic listening, professional guidance, 
            and creating a supportive community 
            where healing and growth can flourish.</p>
        </AnimatedCard>

        <AnimatedCard direction="bottom">
          <h3>Our Promise</h3>
          <p>Every question receives thoughtful, 
            personalized attention, 
            ensuring you feel heard, understood, 
            and supported on your journey.</p>
        </AnimatedCard>
      </div>
    </section>
  );
};

export default About;