import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import emailjs from '@emailjs/browser';

// EmailJS credentials
const EMAILJS_SERVICE_ID = 'service_sri20ej';
const EMAILJS_TEMPLATE_ID = 'template_h7v6eqc';
const EMAILJS_PUBLIC_KEY = 'axeBPSrzQt-AcSxtE';

const Contact = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
    setSubmitStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Send email using EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message
        },
        EMAILJS_PUBLIC_KEY
      );
      
      console.log('Form submitted:', formData);
      setSubmitStatus({ type: 'success', message: 'Thank you for your message! I will get back to you soon.' });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus({ type: 'error', message: 'Failed to send message. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section
      ref={ref}
      id="contact"
      className="py-20 bg-gradient-to-br from-black via-gray-900 to-black"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="px-4 max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl lg:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Contact Me
        </motion.h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="text-center lg:text-left">
            <h3 className="text-2xl font-semibold mb-6 text-white">Get In Touch</h3>
            <p className="text-gray-300 mb-4">I'm always open to discussing new opportunities, collaborations, or just having a chat about technology.</p>
            <div className="space-y-4">
              <p className="text-lg"><span className="text-cyan-400 font-semibold">Email:</span> eugenemusa02@gmail.com</p>
              <p className="text-lg"><span className="text-cyan-400 font-semibold">LinkedIn:</span> <a href="https://www.linkedin.com/in/eugenemusa/" target='_blank' className="hover:text-cyan-300 transition-colors">https://www.linkedin.com/in/eugenemusa/</a></p>
            </div>
          </div>
          <div>
            <form onSubmit={handleSubmit} className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl shadow-cyan-500/20 border border-cyan-500/30">
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 bg-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white transition-colors ${errors.name ? 'border-red-500' : 'border-gray-600'}`}
                />
                {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 bg-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white transition-colors ${errors.email ? 'border-red-500' : 'border-gray-600'}`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  rows="5"
                  className={`w-full px-4 py-3 bg-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white resize-none transition-colors ${errors.message ? 'border-red-500' : 'border-gray-600'}`}
                ></textarea>
                {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg ${
                  isSubmitting
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>
              {submitStatus && (
                <div className={`mt-4 p-3 rounded-lg text-center ${submitStatus.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {submitStatus.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;