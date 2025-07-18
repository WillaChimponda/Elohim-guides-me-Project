import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register'; // Import Register
import ScrollSlideComponent from './ScrollSlideComponent';
import QnA from './pages/QnA';
import Blogs from './pages/Blogs';
import Resources from './pages/Resources';
import './styles/App.css';

const HomePage = () => {
  return (
    <>
      <Home />
      <About />
      <Services />
      <Contact />
    </>
  );
};

const App = () => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className={fadeIn ? 'fade-in' : ''}>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/qna" element={<QnA />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/resources" element={<Resources />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
    
  );
};

export default App;