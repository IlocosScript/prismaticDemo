'use client';

import { useState } from 'react';
import { Mail, MapPin, Clock, Send, Phone } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear status when user starts typing again
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
      setSubmitMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      // Replace with your actual domain when deployed
      const phpUrl = 'https://ilocosscript.com/contact-form-secure.php'; // CHANGE THIS TO YOUR DOMAIN

      const response = await fetch(phpUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setSubmitMessage(data.message);
        // Reset form
        setFormData({ name: '', phone: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
        console.log(data.message);
        setSubmitMessage(data.message || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setSubmitMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const partnerLogos = [
    { name: "Femnux", logo: "F", color: "bg-purple-100 text-purple-800", image: "/femeux.png" },
    { name: "AccountTech", logo: "AT", color: "bg-green-100 text-green-800", image: "/accountTech.png" },
    { name: "ROAS", logo: "R", color: "bg-blue-100 text-blue-800", image: "/roas.png" },
    { name: "Servcorp", logo: "SC", color: "bg-amber-100 text-amber-800", image: "/servcorp.png" }
  ];

  return (
    <footer id="contact" className="bg-gradient-to-br from-blue-900 to-stone-800 text-white">
      {/* Contact Form Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Get In <span className="text-amber-400">Touch</span>
              </h2>
              
              <p className="text-stone-300 text-lg mb-8 leading-relaxed">
                Ready to transform your business? Let's discuss how we can help you achieve your goals 
                and drive sustainable growth for your organization.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-stone-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-stone-600 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent text-white placeholder-stone-400"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-stone-300 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-stone-600 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent text-white placeholder-stone-400"
                      placeholder="+971 xx xxx xxxx"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-stone-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-stone-600 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent text-white placeholder-stone-400"
                    placeholder="your.email@company.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-stone-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white/10 border border-stone-600 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent text-white placeholder-stone-400 resize-none"
                    placeholder="Tell us about your project and how we can help..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-8 py-4 rounded-lg transition-colors font-medium flex items-center justify-center group ${
                    isSubmitting 
                      ? 'bg-stone-400 cursor-not-allowed' 
                      : 'bg-amber-500 hover:bg-amber-600 text-white'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {submitMessage}
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      {submitMessage}
                    </div>
                  </div>
                )}
              </form>
            </div>
            
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-amber-400 mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-amber-500 p-3 rounded-lg">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Email</h4>
                      <p className="text-stone-300">info@prismaticnomad.com</p>
                      <p className="text-stone-300">hello@prismaticnomad.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-amber-500 p-3 rounded-lg">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Location</h4>
                      <p className="text-stone-300">Abu Dhabi, UAE</p>
                      <p className="text-stone-300">Serving clients globally</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-amber-500 p-3 rounded-lg">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Office Hours</h4>
                      <p className="text-stone-300">Sunday - Thursday: 9:00 AM - 6:00 PM</p>
                      <p className="text-stone-300">Available for urgent consultations</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-amber-500 p-3 rounded-lg">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Phone</h4>
                      <p className="text-stone-300">+971 xx xxx xxxx</p>
                      <p className="text-stone-300">International: Available on request</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer Bottom */}
      <div className="border-t border-stone-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Logo and Company Info */}
            <div className="flex items-center space-x-4">
              <Image 
                src="/002c95a3-5b00-4fe9-8fb4-d9f743e9ea2e.png" 
                alt="The Prismatic Nomad Logo" 
                width={48}
                height={48}
                className="object-contain"
              />
              <div>
                <h3 className="text-xl font-bold text-white">The Prismatic Nomad</h3>
                <p className="text-stone-400 text-sm">Your Partner in Growth</p>
              </div>
            </div>
            
            {/* Partner Logos */}
            <div className="flex items-center justify-end space-x-4">
              <p className="text-stone-400 text-sm mr-4">Trusted by:</p>
              {partnerLogos.map((partner, index) => (
                <div key={index} className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold ${partner.color}`}>
                  <Image 
                    src={partner.image}
                    alt={`${partner.name} Logo`}
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-stone-700 text-center">
            <p className="text-stone-400">
              © 2025 The Prismatic Nomad. All rights reserved. | Delivering excellence across sectors and brands since 2018.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}