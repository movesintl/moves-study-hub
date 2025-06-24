
import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import ContactForm from '@/components/contact/ContactForm';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Ready to start your educational journey? We're here to help you every step of the way.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Let's Start a Conversation
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Have questions about studying abroad? Need guidance on courses or visa processes? 
                Our expert team is ready to provide personalized assistance for your educational journey.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-6 bg-white rounded-lg shadow-md">
                <div className="flex-shrink-0">
                  <MapPin className="h-6 w-6 text-blue-600 mt-1" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Visit Us</h3>
                  <p className="text-gray-600">
                    123 Education Street<br />
                    Melbourne, VIC 3000<br />
                    Australia
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-white rounded-lg shadow-md">
                <div className="flex-shrink-0">
                  <Phone className="h-6 w-6 text-blue-600 mt-1" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Call Us</h3>
                  <p className="text-gray-600">
                    +61 3 1234 5678<br />
                    Mon - Fri: 9:00 AM - 6:00 PM
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-white rounded-lg shadow-md">
                <div className="flex-shrink-0">
                  <Mail className="h-6 w-6 text-blue-600 mt-1" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Email Us</h3>
                  <p className="text-gray-600">
                    info@studyabroad.com<br />
                    support@studyabroad.com
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-white rounded-lg shadow-md">
                <div className="flex-shrink-0">
                  <Clock className="h-6 w-6 text-blue-600 mt-1" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Office Hours</h3>
                  <p className="text-gray-600">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 4:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Send us a Message
            </h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
