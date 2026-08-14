import React, { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import HeroSlider from '../components/HeroSlider.jsx';
import AboutSection from '../components/AboutSection.jsx';
import ServicesSection from '../components/ServicesSection.jsx';
import TeamSection from '../components/TeamSection.jsx';
import ClientTestimonial from '../components/ClientTestimonial.jsx';
import FAQSection from '../components/FAQSection.jsx';
import ContactSection from '../components/ContactSection.jsx';
import Footer from '../components/Footer.jsx';
import InternshipModal from '../components/InternshipModal.jsx';

function HomePage() {
  const [contactFormVisible, setContactFormVisible] = useState(false);
  const [showInternshipModal, setShowInternshipModal] = useState(true);

  const handleHeroContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="page-content">
      <Navbar />
      <InternshipModal isOpen={showInternshipModal} onClose={() => setShowInternshipModal(false)} />
      <div id="hero">
        <HeroSlider onContactClick={handleHeroContact} />
      </div>
      <div id="about">
        <AboutSection />
      </div>
      <div id="services">
        <ServicesSection />
      </div>
      <div id="team">
        <TeamSection />
      </div>
      <div id="testimonials">
        <ClientTestimonial />
      </div>
      <div id="faq">
        <FAQSection />
      </div>
      <div id="contact">
        <ContactSection />
      </div>
      <Footer />
    </main>
  );
}

export default HomePage;
