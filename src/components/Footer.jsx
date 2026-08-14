import React from 'react';
import '../css/components/Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer-professional">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-logo">
            <img src="/logo/logo1.jpeg" alt="T-Shirts Village" className="logo-image" />
            <h3>T-Shirts Village</h3>
          </div>
          <p className="footer-description">
            Premium custom apparel printing and manufacturing. Quality, creativity, and professionalism in every piece.
          </p>
          <div className="social-links">
            <a href="#" title="Facebook" aria-label="Facebook" className="social-icon fb">f</a>
            <a href="#" title="Twitter" aria-label="Twitter" className="social-icon tw">𝕏</a>
            <a href="#" title="Instagram" aria-label="Instagram" className="social-icon ig">📷</a>
            <a href="#" title="LinkedIn" aria-label="LinkedIn" className="social-icon li">in</a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#services">Services</a></li>
            <li><a href="#team">Our Team</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#internship">Internship</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Services</h4>
          <ul>
            <li><a href="#services">Custom Printing</a></li>
            <li><a href="#services">Embroidery</a></li>
            <li><a href="#services">Design Services</a></li>
            <li><a href="#services">Bulk Orders</a></li>
            <li><a href="#services">Quality Assurance</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Info</h4>
          <ul>
            <li>
              <strong>Address:</strong><br />
              No. 74 Aka Road, Uyo<br />
              Akwa Ibom State
            </li>
            <li>
              <strong>Phone:</strong><br />
              <a href="tel:+2340704781688">+234 (0) 704 781 688</a>
            </li>
            <li>
              <strong>Email:</strong><br />
              <a href="mailto:info@tshirtvilage.com">info@tshirtvilage.com</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} T-Shirts Village. All rights reserved.</p>
        <div className="footer-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
