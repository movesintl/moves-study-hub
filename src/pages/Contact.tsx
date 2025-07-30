import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import ContactForm from '@/components/contact/ContactForm';

const Contact = () => {
  const nepalOffice = {
    country: "Nepal",
    address: "Education Hub Building, Kathmandu 44600, Nepal",
    phone: "+977 1 234 5678",
    email: "nepal@studyabroad.com"
  };

  const otherOffices = [
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
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <div className="relative bg-gradient-primary text-white py-16 lg:py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block p-3 bg-white/20 rounded-full mb-6 backdrop-blur-sm">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              Get in <span className="text-transparent bg-gradient-to-r from-white to-white/80 bg-clip-text">Touch</span>
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Ready to transform your future? Let's start the conversation that changes everything.
            </p>
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

      {/* Other Offices Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            Our <span className="text-transparent bg-gradient-primary bg-clip-text">Global</span> Offices
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Worldwide presence, local expertise. Visit us at any location for personalized guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {otherOffices.map((office, index) => (
            <div key={index} className="group glass rounded-3xl p-8 border border-white/20 shadow-elegant backdrop-blur-sm hover:shadow-glow transition-all duration-300 hover-scale">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-primary rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <h4 className="text-lg font-bold text-foreground">{office.country}</h4>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-accent/10 rounded-lg mt-0.5">
                    <MapPin className="h-4 w-4 text-accent" />
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{office.address}</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-accent/10 rounded-lg">
                    <Phone className="h-4 w-4 text-accent" />
                  </div>
                  <p className="text-muted-foreground text-sm font-medium">{office.phone}</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-accent/10 rounded-lg">
                    <Mail className="h-4 w-4 text-accent" />
                  </div>
                  <p className="text-muted-foreground text-sm font-medium">{office.email}</p>
                </div>
              </div>
            </div>
          ))}
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
