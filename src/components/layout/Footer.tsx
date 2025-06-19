
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="text-2xl font-bold mb-4">
              Moves <span className="text-accent">International</span>
            </div>
            <p className="text-gray-300 mb-4">
              Your trusted partner for international education and migration services. 
              Making your study abroad dreams a reality.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 hover:text-accent cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 hover:text-accent cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 hover:text-accent cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 hover:text-accent cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/courses" className="text-gray-300 hover:text-accent transition-colors">Find a Course</Link></li>
              <li><Link to="/consultation" className="text-gray-300 hover:text-accent transition-colors">Book Consultation</Link></li>
              <li><Link to="/visa-migration" className="text-gray-300 hover:text-accent transition-colors">Visa Services</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-accent transition-colors">About Us</Link></li>
              <li><Link to="/resources" className="text-gray-300 hover:text-accent transition-colors">Resources</Link></li>
            </ul>
          </div>

          {/* Study Destinations */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Study Destinations</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-accent cursor-pointer transition-colors">Australia</li>
              <li className="hover:text-accent cursor-pointer transition-colors">Canada</li>
              <li className="hover:text-accent cursor-pointer transition-colors">United Kingdom</li>
              <li className="hover:text-accent cursor-pointer transition-colors">New Zealand</li>
              <li className="hover:text-accent cursor-pointer transition-colors">United States</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-3 text-accent" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-3 text-accent" />
                <span className="text-gray-300">info@movesinternational.com</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-3 text-accent mt-1" />
                <span className="text-gray-300">
                  Level 15, 123 Collins Street<br />
                  Melbourne, VIC 3000<br />
                  Australia
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">
            © 2024 Moves International. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-300 hover:text-accent text-sm transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-300 hover:text-accent text-sm transition-colors">Terms of Service</Link>
            <Link to="/sitemap" className="text-gray-300 hover:text-accent text-sm transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
