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
    <div className="min-h-screen bg-gradient-subtle relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-primary rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-secondary rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-gradient-primary rounded-full blur-xl"></div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-primary text-white py-20 lg:py-28 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block p-4 bg-white/20 rounded-2xl mb-8 backdrop-blur-sm animate-fade-in">
              <Mail className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight animate-scale-in">
              Get in <span className="text-transparent bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text">Touch</span>
            </h1>
            <p className="text-2xl lg:text-3xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-12 animate-fade-in">
              Ready to transform your future? Let's start the conversation that changes everything.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center animate-fade-in">
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">15+</div>
                <div className="text-white/80">Years Experience</div>
              </div>
              <div className="text-center animate-fade-in">
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">10K+</div>
                <div className="text-white/80">Students Placed</div>
              </div>
              <div className="text-center animate-fade-in">
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">4</div>
                <div className="text-white/80">Global Offices</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="group text-center animate-fade-in hover-scale">
                  <div className="inline-block p-6 bg-gradient-primary rounded-3xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-glow">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Information */}
          <div className="space-y-10">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                Let's Start a <span className="text-transparent bg-gradient-primary bg-clip-text">Conversation</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Transform your educational dreams into reality. Our expert team provides personalized guidance for your journey abroad.
              </p>
            </div>

            {/* Nepal Office */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">Our Main Office</h3>
              
              <div className="glass rounded-3xl p-8 border border-white/20 shadow-elegant backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-gradient-primary rounded-2xl">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-foreground">{nepalOffice.country}</h4>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-accent/10 rounded-xl">
                      <MapPin className="h-5 w-5 text-accent" />
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{nepalOffice.address}</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-accent/10 rounded-xl">
                      <Phone className="h-5 w-5 text-accent" />
                    </div>
                    <p className="text-muted-foreground font-medium">{nepalOffice.phone}</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-accent/10 rounded-xl">
                      <Mail className="h-5 w-5 text-accent" />
                    </div>
                    <p className="text-muted-foreground font-medium">{nepalOffice.email}</p>
                  </div>
                </div>
              </div>

              {/* Office Hours */}
              <div className="glass rounded-3xl p-8 border border-white/20 shadow-elegant backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-gradient-secondary rounded-2xl">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Office Hours</h3>
                </div>
                <div className="space-y-2 text-muted-foreground">
                  <p className="font-medium">Monday - Friday: <span className="text-foreground">9:00 AM - 6:00 PM</span></p>
                  <p className="font-medium">Saturday: <span className="text-foreground">10:00 AM - 4:00 PM</span></p>
                  <p className="font-medium">Sunday: <span className="text-foreground">Closed</span></p>
                </div>
                <p className="text-sm text-muted-foreground/70 mt-4 italic">
                  * Hours may vary by location. Contact your nearest office for specific timings.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass rounded-3xl p-10 border border-white/20 shadow-elegant backdrop-blur-sm sticky top-8">
            <div className="text-center mb-8">
              <div className="inline-block p-3 bg-gradient-primary rounded-2xl mb-4">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-2">
                Send us a Message
              </h3>
              <p className="text-muted-foreground">
                Ready to get started? Drop us a line and we'll get back to you soon.
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>

      {/* Interactive Offices Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            Our <span className="text-transparent bg-gradient-primary bg-clip-text">Global</span> Offices
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
            Worldwide presence, local expertise. Click on any office to learn more.
          </p>
          
          {/* Office Selector Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {otherOffices.map((office, index) => (
              <button
                key={index}
                onClick={() => setActiveOffice(index)}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                  activeOffice === index
                    ? 'bg-gradient-primary text-white shadow-glow'
                    : 'glass border border-white/20 text-foreground hover:shadow-elegant'
                }`}
              >
                <span className="text-lg">{office.flag}</span>
                {office.country}
              </button>
            ))}
          </div>
        </div>

        {/* Active Office Details */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="glass rounded-3xl p-10 border border-white/20 shadow-elegant backdrop-blur-sm text-center">
            <div className="text-6xl mb-6">{otherOffices[activeOffice].flag}</div>
            <h3 className="text-2xl font-bold text-foreground mb-6">{otherOffices[activeOffice].country}</h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-4">
                <div className="p-3 bg-accent/10 rounded-xl">
                  <MapPin className="h-5 w-5 text-accent" />
                </div>
                <p className="text-muted-foreground">{otherOffices[activeOffice].address}</p>
              </div>
              
              <div className="flex items-center justify-center gap-4">
                <div className="p-3 bg-accent/10 rounded-xl">
                  <Phone className="h-5 w-5 text-accent" />
                </div>
                <p className="text-muted-foreground font-medium">{otherOffices[activeOffice].phone}</p>
              </div>
              
              <div className="flex items-center justify-center gap-4">
                <div className="p-3 bg-accent/10 rounded-xl">
                  <Mail className="h-5 w-5 text-accent" />
                </div>
                <p className="text-muted-foreground font-medium">{otherOffices[activeOffice].email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Office Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {otherOffices.map((office, index) => (
            <div
              key={index}
              onClick={() => setActiveOffice(index)}
              className={`group cursor-pointer glass rounded-3xl p-8 border transition-all duration-300 hover-scale ${
                activeOffice === index
                  ? 'border-primary/50 shadow-glow bg-gradient-to-br from-primary/5 to-accent/5'
                  : 'border-white/20 shadow-elegant hover:shadow-glow'
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="text-2xl">{office.flag}</div>
                <div className="p-2 bg-gradient-primary rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <h4 className="text-lg font-bold text-foreground">{office.country}</h4>
              </div>
              
              {activeOffice === index && (
                <div className="flex items-center justify-center mb-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-gradient-primary rounded-full text-white text-sm font-medium">
                    <CheckCircle className="h-4 w-4" />
                    Selected
                  </div>
                </div>
              )}
              
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground leading-relaxed">{office.address}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-accent flex-shrink-0" />
                  <p className="text-muted-foreground font-medium">{office.phone}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="relative bg-gradient-primary rounded-3xl p-12 text-center text-white overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 w-20 h-20 bg-white rounded-full blur-xl"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-white rounded-full blur-lg"></div>
          </div>
          
          <div className="relative">
            <div className="inline-block p-4 bg-white/20 rounded-2xl mb-6 backdrop-blur-sm">
              <ArrowRight className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Start Your Journey?
            </h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Don't wait any longer. Take the first step towards your international education today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="#contact-form"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('.glass.rounded-3xl.p-10')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white text-primary px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/90 transition-colors duration-200 flex items-center gap-2 shadow-lg"
              >
                Send Message
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href={`tel:${nepalOffice.phone}`}
                className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-primary transition-colors duration-200 flex items-center gap-2"
              >
                <Phone className="h-5 w-5" />
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Google Map Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="glass rounded-3xl overflow-hidden border border-white/20 shadow-elegant backdrop-blur-sm">
          <div className="p-10 pb-8">
            <div className="text-center">
              <div className="inline-block p-3 bg-gradient-primary rounded-2xl mb-6">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-4">
                Find Us on the Map
              </h3>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Discover our worldwide presence and visit the office nearest to you.
              </p>
            </div>
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
              className="rounded-b-3xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
