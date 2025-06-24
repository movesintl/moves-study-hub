
import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import ContactForm from '@/components/contact/ContactForm';

const Contact = () => {
  const offices = [
    {
      country: "Nepal",
      address: "Education Hub Building, Kathmandu 44600, Nepal",
      phone: "+977 1 234 5678",
      email: "nepal@studyabroad.com"
    },
    {
      country: "Bangladesh",
      address: "Study Center, Dhaka 1000, Bangladesh", 
      phone: "+880 2 1234 5678",
      email: "bangladesh@studyabroad.com"
    },
    {
      country: "Australia - Sydney",
      address: "Level 15, 123 Pitt Street, Sydney NSW 2000",
      phone: "+61 2 1234 5678",
      email: "sydney@studyabroad.com"
    },
    {
      country: "Australia - Wollongong",
      address: "Suite 8, 45 Crown Street, Wollongong NSW 2500",
      phone: "+61 2 8765 4321", 
      email: "wollongong@studyabroad.com"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary to-accent text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
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

            {/* Office Locations */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-primary mb-4">Our Offices</h3>
              
              {offices.map((office, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary">
                  <h4 className="text-lg font-semibold text-primary mb-4">{office.country}</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                      <p className="text-gray-600">{office.address}</p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-accent flex-shrink-0" />
                      <p className="text-gray-600">{office.phone}</p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-accent flex-shrink-0" />
                      <p className="text-gray-600">{office.email}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* General Office Hours */}
              <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-accent">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Clock className="h-6 w-6 text-accent mt-1" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary">Office Hours</h3>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 4:00 PM<br />
                      Sunday: Closed
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      * Hours may vary by location. Please contact your nearest office for specific timings.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-primary">
            <h3 className="text-2xl font-bold text-primary mb-6">
              Send us a Message
            </h3>
            <ContactForm />
          </div>
        </div>
      </div>

      {/* Google Map Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-t-4 border-primary">
          <div className="p-8 pb-0">
            <h3 className="text-2xl font-bold text-primary mb-4">
              Find Us on the Map
            </h3>
            <p className="text-gray-600 mb-6">
              Visit our offices worldwide. We're here to help you with your study abroad journey.
            </p>
          </div>
          
          <div className="relative h-96 w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29506204.446354628!2d57.328125!3d23.725011!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDEwJzAuMCJOIDgwwrAwMCcwLjAiRQ!5e0!3m2!1sen!2s!4v1625097600000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Our Office Locations"
              className="rounded-b-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
