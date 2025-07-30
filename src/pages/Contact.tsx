import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Globe, Users, Award, ArrowRight, CheckCircle } from 'lucide-react';
import ContactForm from '@/components/contact/ContactForm';

const Contact = () => {
  const [activeOffice, setActiveOffice] = useState(0);

  const nepalOffice = {
    country: "Nepal",
    address: "Education Hub Building, Kathmandu 44600, Nepal",
    phone: "+977 1 234 5678",
    email: "nepal@studyabroad.com",
    flag: "🇳🇵"
  };

  const otherOffices = [
    {
      country: "Bangladesh",
      address: "Study Center, Dhaka 1000, Bangladesh", 
      phone: "+880 2 1234 5678",
      email: "bangladesh@studyabroad.com",
      flag: "🇧🇩"
    },
    {
      country: "Australia - Sydney",
      address: "Level 15, 123 Pitt Street, Sydney NSW 2000",
      phone: "+61 2 1234 5678",
      email: "sydney@studyabroad.com",
      flag: "🇦🇺"
    },
    {
      country: "Australia - Wollongong",
      address: "Suite 8, 45 Crown Street, Wollongong NSW 2500",
      phone: "+61 2 8765 4321", 
      email: "wollongong@studyabroad.com",
      flag: "🇦🇺"
    }
  ];

  const features = [
    { icon: Globe, title: "Global Presence", description: "Offices worldwide to serve you better" },
    { icon: Users, title: "Expert Team", description: "Dedicated counselors for personalized guidance" },
    { icon: Award, title: "Proven Results", description: "Thousands of successful student placements" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 space-y-4">
        <div className="w-3 h-3 bg-white/50 rounded-full hover:bg-white transition-colors cursor-pointer"></div>
        <div className="w-3 h-3 bg-white/30 rounded-full hover:bg-white transition-colors cursor-pointer"></div>
        <div className="w-3 h-3 bg-white/30 rounded-full hover:bg-white transition-colors cursor-pointer"></div>
        <div className="w-3 h-3 bg-white/30 rounded-full hover:bg-white transition-colors cursor-pointer"></div>
      </div>

      {/* Hero Section with Split Design */}
      <div className="relative min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Side - Text Content */}
            <div className="text-white space-y-8 animate-fade-in">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Available 24/7</span>
                </div>
                
                <h1 className="text-7xl lg:text-8xl font-black leading-none">
                  <span className="block text-transparent bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text">
                    LET'S
                  </span>
                  <span className="block text-white -mt-4">
                    TALK
                  </span>
                  <span className="block text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text -mt-4">
                    FUTURE
                  </span>
                </h1>
              </div>
              
              <p className="text-2xl text-white/80 leading-relaxed max-w-lg">
                Your educational journey starts with a single conversation. Let's make it count.
              </p>
              
              {/* Interactive Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="group cursor-pointer">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover-scale">
                    <div className="text-3xl font-bold text-white mb-2">50K+</div>
                    <div className="text-white/70 text-sm">Dreams Realized</div>
                  </div>
                </div>
                <div className="group cursor-pointer">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover-scale">
                    <div className="text-3xl font-bold text-white mb-2">15+</div>
                    <div className="text-white/70 text-sm">Years Excellence</div>
                  </div>
                </div>
                <div className="group cursor-pointer">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover-scale">
                    <div className="text-3xl font-bold text-white mb-2">24/7</div>
                    <div className="text-white/70 text-sm">Support</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="relative animate-scale-in">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20 shadow-2xl">
                <div className="text-center mb-8">
                  <div className="inline-block p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-4">
                    <Mail className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Start Your Journey</h3>
                  <p className="text-white/70">Fill out the form and we'll get back to you within 24 hours</p>
                </div>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Office Cards Section */}
      <div className="relative py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-6xl font-black text-white mb-6">
              <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                GLOBAL
              </span>
              <br />
              PRESENCE
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Connect with our experts worldwide. Choose your preferred location.
            </p>
          </div>

          {/* Main Office - Nepal */}
          <div className="mb-20">
            <div className="relative max-w-4xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-3xl blur-xl"></div>
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="text-6xl">{nepalOffice.flag}</div>
                      <div>
                        <h3 className="text-3xl font-bold text-white">Headquarters</h3>
                        <p className="text-white/70">{nepalOffice.country}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                          <MapPin className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium">Address</p>
                          <p className="text-white/70">{nepalOffice.address}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl">
                          <Phone className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium">Phone</p>
                          <p className="text-white/70">{nepalOffice.phone}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-r from-pink-500 to-orange-500 rounded-xl">
                          <Mail className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium">Email</p>
                          <p className="text-white/70">{nepalOffice.email}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                    <div className="flex items-center gap-3 mb-6">
                      <Clock className="h-6 w-6 text-blue-400" />
                      <h4 className="text-xl font-bold text-white">Office Hours</h4>
                    </div>
                    <div className="space-y-3 text-white/80">
                      <div className="flex justify-between">
                        <span>Monday - Friday</span>
                        <span className="text-white">9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday</span>
                        <span className="text-white">10:00 AM - 4:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday</span>
                        <span className="text-red-400">Closed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Other Offices Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {otherOffices.map((office, index) => (
              <div
                key={index}
                className="group relative cursor-pointer"
                onMouseEnter={() => setActiveOffice(index)}
              >
                <div className={`absolute inset-0 rounded-3xl blur-xl transition-all duration-300 ${
                  activeOffice === index 
                    ? 'bg-gradient-to-r from-blue-500/30 to-purple-500/30' 
                    : 'bg-white/5'
                }`}></div>
                
                <div className={`relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border transition-all duration-300 hover-scale ${
                  activeOffice === index 
                    ? 'border-blue-400/50 bg-white/20' 
                    : 'border-white/20 hover:border-white/40'
                }`}>
                  
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-3">{office.flag}</div>
                    <h4 className="text-xl font-bold text-white mb-2">{office.country}</h4>
                    {activeOffice === index && (
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white text-sm font-medium">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        Active
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                      <p className="text-white/80 text-sm leading-relaxed">{office.address}</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-green-400 flex-shrink-0" />
                      <p className="text-white/80 text-sm">{office.phone}</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-purple-400 flex-shrink-0" />
                      <p className="text-white/80 text-sm">{office.email}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <button className="w-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 text-white py-3 rounded-xl font-medium transition-all duration-300 border border-white/20 hover:border-white/40">
                      Contact Office
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Map Section */}
      <div className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-6">
              FIND US ON THE <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">MAP</span>
            </h2>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl"></div>
            <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20">
              <div className="h-96 w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29506204.446354628!2d57.328125!3d23.725011!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDEwJzAuMCJOIDgwwrAwMCcwLjAiRQ!5e0!3m2!1sen!2s!4v1625097600000!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Our Office Locations"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-3xl blur-2xl"></div>
            <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-16 border border-white/20">
              <h3 className="text-5xl font-black text-white mb-8">
                READY TO <span className="text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text">TRANSFORM</span> YOUR FUTURE?
              </h3>
              <p className="text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
                Don't let another day pass without taking action. Your dream education is just one conversation away.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="group bg-gradient-to-r from-blue-500 to-purple-500 text-white px-12 py-6 rounded-2xl font-bold text-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-2xl hover-scale">
                  <span className="flex items-center justify-center gap-3">
                    Start Your Journey
                    <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                
                <button className="border-2 border-white text-white px-12 py-6 rounded-2xl font-bold text-xl hover:bg-white hover:text-slate-900 transition-all duration-300 hover-scale">
                  <span className="flex items-center justify-center gap-3">
                    <Phone className="h-6 w-6" />
                    Call Now
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
