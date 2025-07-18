// src/pages/About.js
import React from 'react';
import Card from '../components/Card';

const About = () => {
  return (
    <section id="about" className="about-section">
      <h2>Who Are We?</h2>
      <div className="card-container">
        <Card title="Empowered Women" description="We empower women to share their stories." />
        <Card title="Supportive Community" description="A safe place for sharing and healing." />
        <Card title="Positive Feedback" description="Encouragement and advice for everyone." />
      </div>
    </section>
  );
};

export default About;