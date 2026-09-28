import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-col footer-brand">
          <div className="footer-logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="16" fill="white" fillOpacity="0.15"/>
              <path d="M11 14c1.5-2 4.5-3 5-1 .5 2-1.5 4-4 4s-2.5-1-1-3zM21 14c-1.5-2-4.5-3-5-1-.5 2 1.5 4 4 4s2.5-1 1-3z" fill="white"/>
              <ellipse cx="16" cy="20" rx="4" ry="2" fill="white"/>
              <circle cx="12.5" cy="12" r="1.5" fill="white"/>
              <circle cx="19.5" cy="12" r="1.5" fill="white"/>
            </svg>
            <span>Pawfect Adopt</span>
          </div>
          <p className="footer-desc">Connecting loving families with their perfect furry companions. Every pet deserves a second chance at happiness.</p>
        </div>
        <div className="footer-col">
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/pets">Browse Pets</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="footer-col">
          <h4>Resources</h4>
          <Link to="/how-it-works">How It Works</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/success-stories">Success Stories</Link>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <p>123 Pet Street<br />Pawtown, PT 10001</p>
          <p>hello@pawfectadopt.com<br />(555) 123-4567</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Pawfect Adopt. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
