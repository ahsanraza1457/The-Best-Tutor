"use client";

import styles from "./contact.module.css";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", phone: "", email: "", message: "" });
    }, 800);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <section className={styles.banner} style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: '#ffffff' }}>
        <div className="container text-center">
          <span style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: '#4ade80', padding: '0.4rem 1rem', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: 700, display: 'inline-block', marginBottom: '1rem' }}>
            💬 24/7 Parent & Student Support
          </span>
          <h1 className={styles.bannerTitle} style={{ color: '#ffffff' }}>Contact Our Tutor Helpline</h1>
          <p className={styles.bannerSubtitle} style={{ color: '#cbd5e1' }}>
            Reach out to hire a home tutor or schedule a free trial class anywhere in Pakistan.
          </p>
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          <div className={styles.contactGrid}>
            
            {/* Contact Info */}
            <div>
              <h2 style={{ marginBottom: '2rem' }}>Get in Touch</h2>
              
              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>📍</div>
                <div>
                  <h4>Service Coverage</h4>
                  <p>Serving Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar & Live Online Worldwide</p>
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>📞</div>
                <div>
                  <h4>Helpline Phone Number</h4>
                  <p>
                    <a href="tel:+923111540040" style={{ color: 'var(--primary-color)', fontWeight: 700, fontSize: '1.1rem' }}>
                      +92 311 1540040
                    </a>
                  </p>
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>💬</div>
                <div>
                  <h4>WhatsApp Chat Support</h4>
                  <p>
                    <a href="https://wa.me/923111540040?text=Hi,%20I%20need%20a%20home%20tutor." target="_blank" rel="noopener noreferrer" style={{ color: '#25d366', fontWeight: 700, fontSize: '1.1rem' }}>
                      +92 311 1540040 (Click to Chat)
                    </a>
                  </p>
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>✉️</div>
                <div>
                  <h4>Email Address</h4>
                  <p>info@thebesttutor.edu.pk</p>
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>🕒</div>
                <div>
                  <h4>Support Working Hours</h4>
                  <p>Monday to Saturday: 9:00 AM - 10:00 PM</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="card" style={{ padding: '2.5rem' }}>
              <h3 style={{ marginBottom: '1.5rem' }}>Send Us a Message</h3>
              
              {isSuccess ? (
                <div style={{ backgroundColor: 'rgba(5, 150, 105, 0.1)', color: 'var(--emerald-accent)', padding: '2rem', borderRadius: 'var(--radius-lg)', textAlign: 'center', border: '1px solid var(--emerald-accent)' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>✓</div>
                  <h3>Message Sent Successfully!</h3>
                  <p style={{ marginTop: '0.5rem' }}>Thank you for reaching out. Our team will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input 
                      type="text" 
                      name="name" 
                      required 
                      className="form-input" 
                      placeholder="e.g., Muhammad Usman"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Phone / WhatsApp Number *</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      required 
                      className="form-input" 
                      placeholder="e.g., 03111540040"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input 
                      type="email" 
                      name="email" 
                      required 
                      className="form-input" 
                      placeholder="e.g., parent@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Your Message or Inquiry *</label>
                    <textarea 
                      name="message" 
                      required 
                      className="form-textarea" 
                      rows={4} 
                      placeholder="Tell us what class level and subjects you are looking for..."
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.9rem' }} disabled={isSubmitting}>
                    {isSubmitting ? 'Sending Message...' : '✉️ Send Message'}
                  </button>
                </form>
              )}
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}
