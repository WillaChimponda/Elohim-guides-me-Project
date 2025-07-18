import React from 'react';
import { MessageCircle, Facebook, Twitter, Instagram, Linkedin, Mail, Heart } from 'react-feather';
import '../styles/Home.css'; 

const Contact = () => {
  return (
    <footer className="contact-footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <MessageCircle size={28} className="footer-brand-icon" />
              <span className="footer-brand-title">Elohim-guides-me</span>
            </div>
            <p className="footer-desc">
              A safe space where everyone can openly discuss psychological challenges,
              seek advice, and connect with others who understand.
            </p>
            <div className="footer-socials">
              <a href="#"><Facebook size={18} /></a>
              <a href="#"><Twitter size={18} /></a>
              <a href="#"><Instagram size={18} /></a>
              <a href="#"><Linkedin size={18} /></a>
            </div>
          </div>

          <div>
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-list">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">Who Are We?</a></li>
              <li><a href="#testimonials">Stories</a></li>
              <li><a href="/resources">Resources</a></li>
              <li><a href="#">Community Guidelines</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h3 className="footer-heading">Resources</h3>
            <ul className="footer-list">
              <li><a href="#">Self-Care Guides</a></li>
              <li><a href="#">Educational Articles</a></li>
              <li><a href="#">Crisis Resources</a></li>
              <li><a href="#">Community Forums</a></li>
              <li><a href="#">Support Groups</a></li>
              <li><a href="#">Mental Health Blog</a></li>
            </ul>
          </div>

          <div>
            <h3 className="footer-heading">Contact Us</h3>
            <ul className="footer-list">
              <li className="footer-contact-item">
                <Mail className="footer-contact-icon" />
                <span>elohimguidesme@gmail.com</span>
              </li>
              <li>
                <a href="#" className="footer-support-btn">Contact Support</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
         
          <p className="footer-made-with">
            Made with <Heart className="footer-heart" /> for mental health support
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Contact;