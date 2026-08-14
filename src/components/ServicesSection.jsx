import React from 'react';
import '../css/components/ServicesSection.css';

function ServicesSection() {
  const services = [
    {
      id: 1,
      title: 'Custom Printing',
      description: 'High-quality direct-to-garment and screen printing with vibrant, long-lasting colors. Perfect for small runs and custom designs.',
      icon: '🎨'
    },
    {
      id: 2,
      title: 'Professional Embroidery',
      description: 'Expert embroidery for logos and designs on caps, polos, and garments. Add a premium touch to your brand.',
      icon: '✨'
    },
    {
      id: 3,
      title: 'Design Services',
      description: 'Professional design team to bring your vision to life. From concept to final artwork, we handle it all.',
      icon: '🖌️'
    },
    {
      id: 4,
      title: 'Bulk Orders',
      description: 'Competitive pricing for large volume orders. Perfect for corporate giveaways and events.',
      icon: '📦'
    },
    {
      id: 5,
      title: 'Fast Turnaround',
      description: 'Quick production without compromising quality. Meet your deadlines with confidence.',
      icon: '⚡'
    },
    {
      id: 6,
      title: 'Quality Assurance',
      description: 'Rigorous quality checks at every stage. Your satisfaction is our guarantee.',
      icon: '✓'
    }
  ];

  return (
    <section className="services-section" id="services">
      <div className="app-shell">
        <div className="section-header">
          <h2>What We Offer</h2>
          <p>Comprehensive apparel solutions with professional expertise and attention to detail</p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
