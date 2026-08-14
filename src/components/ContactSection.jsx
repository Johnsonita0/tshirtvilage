import React, { useState } from 'react';
import '../css/components/ContactSection.css';
import { saveContactMessage } from '../lib/supabaseClient';

function ContactSection() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setMessage('');

    // Validation
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus('error');
      setMessage('Please fill in all required fields.');
      return;
    }

    try {
      const { error } = await saveContactMessage({
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        subject: form.subject || 'General Inquiry',
        message: form.message,
        status: 'new',
      });

      if (error) {
        throw error;
      }

      setStatus('success');
      setMessage('Thank you! We received your message and will get back to you soon.');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      
      // Auto-clear success message after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    } catch (err) {
      setStatus('error');
      setMessage('Failed to send message. Please try again.');
      console.error('Contact form error:', err);
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="app-shell">
        <div className="section-header">
          <h2>Get In Touch</h2>
          <p>Have a question or ready to place an order? We'd love to hear from you.</p>
        </div>

        <div className="contact-container">
          <div className="contact-info">
            <div className="info-card">
              <h3>📍 Address</h3>
              <p>No. 74 Aka Road, Uyo<br />Akwa Ibom State, Nigeria</p>
            </div>

            <div className="info-card">
              <h3>📞 Phone</h3>
              <p>
                <a href="tel:+2340704781688">+234 (0) 704 781 688</a><br />
                <a href="tel:+2340802732602">+234 (0) 802 732 460</a>
              </p>
            </div>

            <div className="info-card">
              <h3>✉️ Email</h3>
              <p>
                <a href="mailto:info@tshirtvilage.com">info@tshirtvilage.com</a><br />
                <a href="mailto:orders@tshirtvilage.com">orders@tshirtvilage.com</a>
              </p>
            </div>

            <div className="info-card">
              <h3>🕐 Hours</h3>
              <p>
                Mon - Fri: 9:00 AM - 6:00 PM<br />
                Saturday: 10:00 AM - 4:00 PM<br />
                Sunday: Closed
              </p>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <h3>Send us a Message</h3>

            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="0803 000 0000"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="What is this about?"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us about your project or inquiry..."
                rows="5"
                required
              />
            </div>

            {message && (
              <div className={`form-message ${status}`}>
                {message}
              </div>
            )}

            <button type="submit" className="submit-btn" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
