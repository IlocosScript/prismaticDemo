'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative bg-gradient-to-br from-stone-100 to-stone-50 min-h-screen">
      {/* Navigation */}
      <nav className="relative z-20 bg-white/90 backdrop-blur-sm border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img 
                src="/002c95a3-5b00-4fe9-8fb4-d9f743e9ea2e.png" 
                alt="The Prismatic Nomad Logo" 
                className="w-8 h-8 object-contain"
              />
              <span className="text-xl font-bold text-blue-900">The Prismatic Nomad</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-stone-700 hover:text-blue-900 transition-colors">About</a>
              <a href="#services" className="text-stone-700 hover:text-blue-900 transition-colors">Services</a>
              <a href="#process" className="text-stone-700 hover:text-blue-900 transition-colors">Process</a>
              <a href="#contact" className="bg-amber-500 text-white px-6 py-2 rounded-full hover:bg-amber-600 transition-colors font-medium">
                Get In Touch
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-stone-200">
            <div className="px-4 py-2 space-y-2">
              <a href="#about" className="block py-2 text-stone-700 hover:text-blue-900">About</a>
              <a href="#services" className="block py-2 text-stone-700 hover:text-blue-900">Services</a>
              <a href="#process" className="block py-2 text-stone-700 hover:text-blue-900">Process</a>
              <a href="#contact" className="block py-2 text-stone-700 hover:text-blue-900">Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative flex items-center min-h-screen">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`
          }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="gradient-text">Top-notch</span>
              <br />
              <span className="text-stone-800">business services</span>
            </h1>
            
            <h2 className="text-xl md:text-2xl text-amber-600 font-semibold mb-6">
              Your Partner in Growth Across Sectors & Brands
            </h2>
            
            <p className="text-lg text-stone-600 mb-8 max-w-2xl leading-relaxed">
              We specialize in delivering comprehensive business consultancy, innovative marketing strategies, 
              precise accounting solutions, and cutting-edge innovation services that drive measurable growth 
              and sustainable success for businesses across diverse industries.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#contact"
                className="bg-blue-900 text-white px-8 py-4 rounded-full hover:bg-blue-800 transition-colors font-medium text-center"
              >
                Get Started Today
              </a>
              <a 
                href="#about"
                className="border-2 border-amber-500 text-amber-600 px-8 py-4 rounded-full hover:bg-amber-50 transition-colors font-medium text-center"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}