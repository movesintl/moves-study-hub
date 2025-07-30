import React from 'react';
import { MapPin, Phone, Mail, Clock, ArrowRight, Globe } from 'lucide-react';
import ContactForm from '@/components/contact/ContactForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Contact = () => {
  const nepalOffice = {
    country: "Nepal Headquarters",
    address: "Kathmandu Metropolitan City, Ward No. 32, Sinamangal, Kathmandu",
    phone: "+977-01-4001047",
    email: "info@globalmovesconsultancy.com"
  };

  const otherOffices = [
    { country: "Australia", phone: "+61 451 439 885", email: "australia@globalmovesconsultancy.com" },
    { country: "Canada", phone: "+1 647 967 8456", email: "canada@globalmovesconsultancy.com" },
    { country: "New Zealand", phone: "+64 22 102 3456", email: "newzealand@globalmovesconsultancy.com" },
    { country: "United Kingdom", phone: "+44 20 3005 0000", email: "uk@globalmovesconsultancy.com" },
    { country: "United Arab Emirates", phone: "+971 50 123 4567", email: "uae@globalmovesconsultancy.com" },
    { country: "United States", phone: "+1 555 123 4567", email: "usa@globalmovesconsultancy.com" }
  ];

  const features = [
    { icon: Globe, title: "Global Reach", description: "Offices worldwide to support your journey" },
    { icon: Clock, title: "24/7 Support", description: "Round-the-clock assistance available" },
    { icon: ArrowRight, title: "Expert Guidance", description: "Professional consultation services" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-4 block">
              Get In Touch
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Let's Start Your <span className="text-primary">Global Journey</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ready to explore new horizons? Our expert team is here to guide you every step of the way 
              to your international education and career success.
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-semibold text-primary mb-4">Send Us a Message</h2>
              <p className="text-lg text-muted-foreground">
                Fill out the form below and we'll get back to you within 24 hours
              </p>
            </div>

            <Card className="bg-card border shadow-sm">
              <CardContent className="p-8">
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Office Section */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-primary mb-4">
              Our Global Offices
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              With offices across the globe, we're always within reach to support your international journey
            </p>
          </div>

          {/* Nepal HQ - Featured */}
          <div className="mb-16">
            <Card className="max-w-4xl mx-auto bg-card border shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground flex items-center gap-3">
                  <Globe className="w-8 h-8 text-primary" />
                  {nepalOffice.country}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <MapPin className="w-6 h-6 text-primary mt-1" />
                      <div>
                        <p className="font-medium text-foreground mb-1">Address</p>
                        <p className="text-muted-foreground">{nepalOffice.address}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <Phone className="w-6 h-6 text-primary" />
                      <div>
                        <p className="font-medium text-foreground mb-1">Phone</p>
                        <a href={`tel:${nepalOffice.phone}`} className="text-primary hover:text-primary/80 transition-colors">
                          {nepalOffice.phone}
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <Mail className="w-6 h-6 text-primary" />
                      <div>
                        <p className="font-medium text-foreground mb-1">Email</p>
                        <a href={`mailto:${nepalOffice.email}`} className="text-primary hover:text-primary/80 transition-colors">
                          {nepalOffice.email}
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:text-right">
                    <Button className="bg-primary hover:bg-primary/90 text-white">
                      Visit Our Office
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Other Offices Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherOffices.map((office, index) => (
              <Card key={index} className="bg-card border shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {office.country}
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-primary" />
                      <a href={`tel:${office.phone}`} className="text-muted-foreground hover:text-primary transition-colors">
                        {office.phone}
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-primary" />
                      <a href={`mailto:${office.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                        {office.email}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-semibold text-primary mb-4">
              Find Us on the Map
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Visit our main headquarters in Kathmandu or connect with our international offices
            </p>
          </div>

          <Card className="max-w-6xl mx-auto bg-card border shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-video w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.206449847683!2d85.35973741506315!3d27.70901008279594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb199a06c2eaf9%3A0xc8d5142f23c5b3a6!2sSinamangal%2C%20Kathmandu%2044600%2C%20Nepal!5e0!3m2!1sen!2s!4v1647875562351!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-semibold text-foreground mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              Take the first step towards your international education and career goals. 
              Our expert team is ready to guide you every step of the way.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3">
                Book Free Consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-3">
                Download Brochure
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
