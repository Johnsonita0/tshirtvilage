import React from 'react';
import '../css/components/AboutSection.css';

function AboutSection() {
  return (
    <section className="about-section" id="about">
      <div className="app-shell">
        <div className="section-header">
          <h2>About T-Shirts Village</h2>
          <p>Leading the Way in Custom Apparel Manufacturing</p>
        </div>

        <div className="about-content">
          <div className="about-text">
            <h3>Our Story</h3>
            <p>
              T-Shirts Village was founded with a vision to provide high-quality, custom apparel solutions to businesses, organizations, and individuals. With 8 years of excellence in the industry, we've built a reputation for professionalism, creativity, and exceptional craftsmanship.
            </p>
            <p>
              Our team of skilled professionals is dedicated to transforming your ideas into reality. From concept to completion, we ensure every piece meets our rigorous quality standards.
            </p>

            <h3 style={{ marginTop: '30px' }}>Our Values</h3>
            <div className="values-grid">
              <div className="value-item">
                <h4>Quality</h4>
                <p>Uncompromising standards in materials and craftsmanship</p>
              </div>
              <div className="value-item">
                <h4>Creativity</h4>
                <p>Innovative designs that bring your vision to life</p>
              </div>
              <div className="value-item">
                <h4>Reliability</h4>
                <p>Consistent delivery and exceptional customer service</p>
              </div>
            </div>
          </div>

          <div className="about-stats">
            <div className="stat-card">
              <h4>8+</h4>
              <p>Years of Experience</p>
            </div>
            <div className="stat-card">
              <h4>1000+</h4>
              <p>Satisfied Clients</p>
            </div>
            <div className="stat-card">
              <h4>50K+</h4>
              <p>Garments Produced</p>
            </div>
            <div className="stat-card">
              <h4>24/7</h4>
              <p>Customer Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
