
import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, CheckCircle, Clock, Users, Star, ArrowRight, Calendar, Shield, Award, Phone, Mail, MapPin, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Consultation = () => {
  const benefits = [
    {
      icon: CheckCircle,
      title: 'Personalized Study Plan',
      description: 'Tailored roadmap based on your academic background and career goals'
    },
    {
      icon: Star,
      title: 'University Matching',
      description: 'Find the perfect universities and programs that fit your profile'
    },
    {
      icon: Award,
      title: 'Scholarship Guidance',
      description: 'Identify and apply for scholarships to reduce your study costs'
    },
    {
      icon: Shield,
      title: 'Application Support',
      description: 'Complete assistance with your application process and documentation'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Initial Assessment',
      description: 'We conduct a comprehensive evaluation of your academic background, career aspirations, and personal preferences to understand your unique requirements.',
      duration: '30 minutes'
    },
    {
      step: '02',
      title: 'Research & Analysis',
      description: 'Our experts research and analyze the best study options, universities, and programs that align with your goals and budget.',
      duration: '2-3 days'
    },
    {
      step: '03',
      title: 'Personalized Recommendations',
      description: 'Receive a detailed report with personalized recommendations, including university options, course details, and application timelines.',
      duration: '1 hour session'
    },
    {
      step: '04',
      title: 'Ongoing Support',
      description: 'Continuous guidance and support throughout your application journey until you secure your admission.',
      duration: 'Until admission'
    }
  ];

  const whyChooseUs = [
    {
      icon: Users,
      title: '500+ Success Stories',
      description: 'We have helped over 500 students achieve their dream of studying abroad with personalized guidance.'
    },
    {
      icon: Award,
      title: 'Certified Consultants',
      description: 'Our team consists of certified education consultants with years of international education experience.'
    },
    {
      icon: Star,
      title: '98% Success Rate',
      description: 'Our proven methodology has achieved a 98% success rate in securing admissions for our students.'
    }
  ];

  const faqs = [
    {
      question: 'What does the free consultation include?',
      answer: 'Our free consultation includes a comprehensive assessment of your academic background, career goals discussion, university and course recommendations, scholarship opportunities identification, and a personalized study plan with timelines.'
    },
    {
      question: 'How long does the consultation process take?',
      answer: 'The initial consultation takes about 60-90 minutes. After that, we provide ongoing support throughout your application process, which can take 3-6 months depending on your timeline.'
    },
    {
      question: 'Do I need to prepare anything for the consultation?',
      answer: 'Please bring your academic transcripts, English test scores (if available), passport copy, and any specific questions about your study abroad plans. We will also discuss your budget and preferred destinations.'
    },
    {
      question: 'Is there any obligation after the free consultation?',
      answer: 'Absolutely not. Our free consultation is genuinely free with no strings attached. You can decide whether to proceed with our services after understanding how we can help you.'
    },
    {
      question: 'Can I get consultation for multiple countries?',
      answer: 'Yes, we provide consultation for multiple destinations including USA, UK, Canada, Australia, New Zealand, and European countries. We will help you compare options and choose the best fit.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      country: 'Australia',
      program: 'Master of Business Administration',
      image: '/placeholder.svg',
      quote: 'The consultation was incredibly thorough. They helped me understand all my options and guided me through the entire application process. I am now studying at my dream university in Melbourne!'
    },
    {
      name: 'Raj Patel',
      country: 'Canada',
      program: 'Computer Science',
      image: '/placeholder.svg',
      quote: 'I was confused about which country to choose for my studies. The consultation helped me make an informed decision, and I successfully got admission to University of Toronto with a scholarship.'
    },
    {
      name: 'Maria Garcia',
      country: 'UK',
      program: 'International Relations',
      image: '/placeholder.svg',
      quote: 'The personalized guidance I received was exceptional. They not only helped with university selection but also with visa processes and pre-departure preparations.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-glow to-accent overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <MessageCircle className="h-8 w-8 text-white" />
                </div>
                <span className="text-white/90 font-medium bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                  Completely FREE
                </span>
              </div>
              
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                  Expert Study Abroad
                  <span className="block text-accent-foreground">Consultation</span>
                </h1>
                <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
                  Get personalized guidance from certified education consultants. We'll create a tailored roadmap 
                  to help you achieve your international education dreams.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Free Consultation
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now
                </Button>
              </div>

              <div className="flex items-center gap-8 text-white/80">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>60 min session</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>1-on-1 guidance</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  <span>Expert advice</span>
                </div>
              </div>
            </div>

            <div className="lg:text-center">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6">What You'll Get</h3>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-4 text-left">
                      <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                        <benefit.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">{benefit.title}</h4>
                        <p className="text-white/80 text-sm">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our proven 4-step process ensures you get the most comprehensive guidance for your study abroad journey
            </p>
          </div>

          <div className="space-y-12">
            {process.map((item, index) => (
              <div key={item.step} className={`flex flex-col lg:flex-row gap-8 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="lg:w-1/2">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-xl" />
                    <Card className="relative bg-card border-border/50 shadow-xl">
                      <CardContent className="p-8">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center">
                            <span className="text-2xl font-bold text-white">{item.step}</span>
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-foreground">{item.title}</h3>
                            <p className="text-muted-foreground">{item.duration}</p>
                          </div>
                        </div>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                <div className="lg:w-1/2 flex justify-center">
                  <div className="w-64 h-64 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-primary to-accent rounded-full opacity-80" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Why Choose Us
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              With years of experience and hundreds of success stories, we are your trusted partner in achieving your study abroad dreams
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <Card key={index} className="text-center group hover:shadow-xl transition-all duration-300 border-border/50">
                <CardContent className="p-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Flexible Scheduling Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Flexible Scheduling
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                We understand that everyone has different schedules. That's why we offer flexible consultation 
                times to fit your busy lifestyle, including evenings and weekends.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">7 Days a Week</h4>
                    <p className="text-muted-foreground">Available Monday through Sunday</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Extended Hours</h4>
                    <p className="text-muted-foreground">Morning, afternoon, and evening slots</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Multiple Formats</h4>
                    <p className="text-muted-foreground">In-person, phone, or video consultations</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-foreground mb-4">Book Your Slot</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-2">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].slice(0, 3).map((day) => (
                      <div key={day} className="p-3 bg-primary/10 rounded-lg text-center">
                        <p className="font-medium text-foreground">{day}</p>
                        <p className="text-sm text-muted-foreground">Available</p>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full">
                    <Calendar className="mr-2 h-4 w-4" />
                    Select Time Slot
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Get answers to the most common questions about our consultation service
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-background border border-border/50 rounded-2xl px-6">
                <AccordionTrigger className="text-left text-lg font-semibold text-foreground py-6 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Success Stories
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Hear from students who achieved their study abroad dreams with our guidance
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-border/50">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xl">{testimonial.name[0]}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.program}</p>
                      <p className="text-sm text-primary font-medium">{testimonial.country}</p>
                    </div>
                  </div>
                  
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary via-primary-glow to-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
              Ready to Start Your
              <span className="block">Study Abroad Journey?</span>
            </h2>
            
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Don't wait any longer. Book your free consultation today and take the first step 
              towards achieving your international education dreams.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-10 py-6">
                <Calendar className="mr-3 h-6 w-6" />
                Book Free Consultation Now
              </Button>
              <div className="flex items-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  <span>info@studyabroad.com</span>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/20">
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-white/70">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>100% Free Consultation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  <span>No Obligation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  <span>Expert Guidance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Consultation;
