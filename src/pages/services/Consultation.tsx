
import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, CheckCircle, Clock, Users, Star, ArrowRight, Calendar, Shield, Award, Phone, Mail, MapPin, Plus, Minus, GraduationCap, Target, Globe, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import CounsellingBookingForm from '@/components/forms/CounsellingBookingForm';

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
    <div className="min-h-screen bg-gradient-subtle relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Hero Section with Split Design */}
      <div className="relative min-h-screen flex items-center bg-gradient-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Side - Text Content */}
            <div className="text-white space-y-8 animate-fade-in">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">100% FREE Consultation</span>
                </div>
                
                <h1 className="text-7xl lg:text-8xl font-black leading-none">
                  <span className="block text-white">
                    Expert
                  </span>
                  <span className="block text-white bg-gradient-accent bg-clip-text -mt-4">
                    Guidance
                  </span>
                </h1>
              </div>
              
              <p className="text-2xl text-white/90 leading-relaxed max-w-lg">
                Connect with certified education consultants and get personalized guidance for your study abroad journey.
              </p>
              
              {/* Interactive Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="group cursor-pointer">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover-scale">
                    <div className="text-3xl font-bold text-white mb-2">500+</div>
                    <div className="text-white/70 text-sm">Success Stories</div>
                  </div>
                </div>
                <div className="group cursor-pointer">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover-scale">
                    <div className="text-3xl font-bold text-white mb-2">98%</div>
                    <div className="text-white/70 text-sm">Success Rate</div>
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

            {/* Right Side - Consultation Form */}
            <div className="relative animate-scale-in">
              <div className="absolute inset-0 bg-accent/20 rounded-3xl blur-xl"></div>
              <div className="relative glass rounded-3xl p-10 border border-white/20 shadow-elegant backdrop-blur-xl">
                <div className="text-center mb-8">
                  <div className="inline-block p-4 bg-gradient-brand rounded-2xl mb-4">
                    <Calendar className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Book Your Free Session</h3>
                  <p className="text-white/90">Start your journey to international education success</p>
                </div>
                <CounsellingBookingForm />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section - Floating Cards */}
      <div className="relative py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-6xl font-black text-foreground mb-6">
              <span className="">
                What You'll Get
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive consultation package designed to guide your success.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="group relative cursor-pointer">
                <div className="relative backdrop-blur-xl rounded-3xl p-8 border border-border hover:border-primary/30 transition-all duration-300 hover-scale bg-background shadow-elegant">
                  
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <benefit.icon className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-foreground mb-2">{benefit.title}</h4>
                  </div>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed text-center">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-accent to-orange-400 text-white px-6 py-3 rounded-full font-bold mb-6">
              <Award className="h-5 w-5" />
              Why Students Choose Us
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-foreground">
              Trusted by Thousands of Students
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join the success stories of students who achieved their international education dreams
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {whyChooseUs.map((item, index) => (
              <Card key={index} className="text-center group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-border bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg bg-gradient-to-r from-primary to-accent">
                    <item.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Booking Section */}
      <section className="py-24 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-6 py-3 rounded-full font-bold mb-6">
              <Calendar className="h-5 w-5" />
              Book Your Free Session
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Take the first step towards your international education dreams. Our expert consultants are ready to guide you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-green-100">
                <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-xl">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  Flexible Scheduling
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl">
                    <div className="p-3 bg-green-100 rounded-xl">
                      <Calendar className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-green-900">7 Days a Week</h4>
                      <p className="text-green-700">Available Monday through Sunday</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-blue-900">Extended Hours</h4>
                      <p className="text-blue-700">Morning, afternoon, and evening slots</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-xl">
                    <div className="p-3 bg-purple-100 rounded-xl">
                      <Globe className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-purple-900">Multiple Formats</h4>
                      <p className="text-purple-700">In-person, phone, or video consultations</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <Star className="h-6 w-6 text-yellow-600" />
                    <h4 className="font-bold text-yellow-900">What's Included</h4>
                  </div>
                  <ul className="space-y-2 text-yellow-800">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Complete academic assessment
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Personalized university recommendations
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Scholarship opportunities identification
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Application timeline & strategy
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
              <CounsellingBookingForm />
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-6 py-3 rounded-full font-bold mb-6">
              <BookOpen className="h-5 w-5" />
              Common Questions
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Get answers to the most common questions about our consultation service
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white border-0 rounded-xl px-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <AccordionTrigger className="text-left text-base font-bold text-purple-900 py-4 hover:no-underline hover:text-purple-700">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-purple-700 pb-4 leading-relaxed text-sm">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-800 px-6 py-3 rounded-full font-bold mb-6">
              <Star className="h-5 w-5" />
              Success Stories
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Student Success Stories
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how our consultation helped students achieve their dreams
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-0 bg-gradient-to-br from-indigo-50 to-blue-50 overflow-hidden">
                <CardContent className="p-6 relative">
                  <div className="absolute top-4 right-4 opacity-20">
                    <Star className="h-10 w-10 text-indigo-300" />
                  </div>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-lg">{testimonial.name[0]}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-indigo-900 text-sm">{testimonial.name}</h4>
                      <p className="text-xs text-indigo-700 font-medium">{testimonial.program}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3 text-indigo-600" />
                        <p className="text-xs text-indigo-600 font-bold">{testimonial.country}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-indigo-800 leading-relaxed italic font-medium text-sm">
                    "{testimonial.quote}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 relative overflow-hidden" style={{ background: `linear-gradient(135deg, #023047 0%, #fa8500 100%)` }}>
        <div className="absolute inset-0 bg-[url('/bg.svg')] opacity-10" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/20 text-white px-6 py-3 rounded-full font-bold backdrop-blur-sm">
              <GraduationCap className="h-5 w-5" />
              Your Future Starts Now
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              Ready to Book Your
              <span className="block" style={{ color: '#fa8500' }}>
                Free Consultation?
              </span>
            </h2>
            
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Don't wait any longer. Start your international education journey today with expert guidance from our certified consultants.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button size="lg" className="text-black hover:opacity-90 text-lg px-10 py-6 font-bold shadow-xl" style={{ backgroundColor: '#fa8500' }}>
                <Calendar className="mr-3 h-6 w-6" />
                Book Free Consultation Now
              </Button>
              <div className="flex flex-col sm:flex-row items-center gap-4 text-white/90">
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                  <Phone className="h-5 w-5" />
                  <span>+61 234 567 890</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                  <Mail className="h-5 w-5" />
                  <span>info@studyabroad.com</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/20">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center gap-2 bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                  <span className="text-white font-medium text-sm">100% Free</span>
                </div>
                <div className="flex flex-col items-center gap-2 bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                  <Shield className="h-6 w-6 text-blue-400" />
                  <span className="text-white font-medium text-sm">No Obligation</span>
                </div>
                <div className="flex flex-col items-center gap-2 bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                  <Award className="h-6 w-6 text-yellow-400" />
                  <span className="text-white font-medium text-sm">Expert Guidance</span>
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
