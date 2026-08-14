import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/components/HeroSlider.css';

function HeroSlider({ onContactClick }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      id: 1,
      title: 'Custom T-Shirt Printing',
      description: 'Premium custom tees for businesses, events, campaigns, and personal brands with vibrant, durable prints.',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1400&q=80',
      cta: 'Get Your Custom Tees',
      actionType: 'contact'
    },
    {
      id: 2,
      title: 'Professional Polo Shirts',
      description: 'Refined branded polos for staff uniforms, events, and premium corporate wear that leaves a lasting impression.',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=80',
      cta: 'Design Polos Now',
      actionType: 'contact'
    },
    {
      id: 3,
      title: 'Custom Face Caps & Hats',
      description: 'Creative headwear solutions with sharp branding and durable finishes for promotions, teams, and events.',
      image: 'https://images.unsplash.com/photo-1521369909026-2afed882baee?auto=format&fit=crop&w=1400&q=80',
      cta: 'Create Your Cap',
      actionType: 'contact'
    },
    {
      id: 4,
      title: 'Complete Branding Solutions',
      description: 'From concept and mockup to production and delivery, we provide complete textile branding support.',
      image: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1400&q=80',
      cta: 'Start Your Project',
      actionType: 'contact'
    },
    {
      id: 5,
      title: 'FREE Internship Opportunity',
      description: 'In commemoration with our 8th Anniversary! Join our 6-month free internship program with practical workshop skills, production techniques, equipment handling, quality & finishing, and work ethics & teamwork. Limited slots available. Registration deadline: 27th August. Classes start: 31st August.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80',
      cta: 'Register Now',
      actionType: 'internship'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleCtaClick = (actionType) => {
    if (actionType === 'contact') {
      onContactClick();
    } else if (actionType === 'internship') {
      navigate('/register');
    }
  };

  return (
    <section className="hero-slider">
      <div className="slider-container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slider-slide ${index === currentSlide ? 'active' : ''}`}
            style={{
              backgroundImage: `url('${slide.image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="slider-overlay" />
            <div className="slider-content">
              <h1 className="slider-title">{slide.title}</h1>
              <p className="slider-description">{slide.description}</p>
              <button className="slider-cta" onClick={() => handleCtaClick(slide.actionType)}>
                {slide.cta}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button className="slider-arrow prev-arrow" onClick={prevSlide} aria-label="Previous slide">
        &#10094;
      </button>
      <button className="slider-arrow next-arrow" onClick={nextSlide} aria-label="Next slide">
        &#10095;
      </button>

      {/* Dots */}
      <div className="slider-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default HeroSlider;
