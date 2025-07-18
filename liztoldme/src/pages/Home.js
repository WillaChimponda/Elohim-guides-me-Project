import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';
import unity from '../images/unity.jpeg';

const Home = () => {
  return (
    <section id="home" className="landing">
      <div className="landing-text">
        <h1>A Safe Space for Healing, Sharing, and Growth</h1>
        <p>"A safe, judgment-free space for women to share their struggles 
          and find support. Here, you can openly discuss mental health, relationships, 
          and personal growth with compassion. 
          Whether you need advice or just to be heard—you belong here. Your voice matters."</p>
        <Link to="/login" className="questions">Talk to me</Link>
        <Link to="/blogs" className="questions" style={{ marginLeft: 16 }}>Read Blogs</Link>
      </div>
      <div className="landing-image">
        <img src={unity} alt="Healing Space" />
      </div>
    </section>
  );
};

export default Home;