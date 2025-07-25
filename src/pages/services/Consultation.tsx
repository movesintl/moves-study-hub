
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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-[url('/bg.svg')] opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 bg-yellow-400 text-black px-6 py-3 rounded-full font-bold">
                <Star className="h-5 w-5" />
                100% FREE Consultation
              </div>
              
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                  Expert Study Abroad
                  <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                    Consultation
                  </span>
                </h1>
                <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
                  Transform your educational dreams into reality with personalized guidance from certified education consultants. Get your complete roadmap to international success.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 py-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">500+</div>
                  <div className="text-white/80 text-sm">Success Stories</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">98%</div>
                  <div className="text-white/80 text-sm">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">15+</div>
                  <div className="text-white/80 text-sm">Countries</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-yellow-400 text-black hover:bg-yellow-500 text-lg px-8 py-6 font-bold">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Free Consultation
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6">
                  <Phone className="mr-2 h-5 w-5" />
                  +61 234 567 890
                </Button>
              </div>
            </div>

            <div className="lg:text-center">
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl">
                    <GraduationCap className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">What You'll Get</h3>
                </div>
                <div className="space-y-5">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-4 text-left p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex-shrink-0">
                        <benefit.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-2">{benefit.title}</h4>
                        <p className="text-white/80 text-sm leading-relaxed">{benefit.description}</p>
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
      <section className="py-24 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-6 py-3 rounded-full font-bold mb-6">
              <Target className="h-5 w-5" />
              Our Proven Process
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our proven 4-step process ensures you get the most comprehensive guidance for your study abroad journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <div key={item.step} className="relative">
                <Card className="h-full bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                  <CardContent className="p-8 text-center">
                    <div className="relative mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                        <span className="text-2xl font-bold text-white">{item.step}</span>
                      </div>
                      {index < process.length - 1 && (
                        <div className="hidden lg:block absolute top-10 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-300 to-purple-300" />
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                    <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                      <Clock className="h-4 w-4" />
                      {item.duration}
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-6 py-3 rounded-full font-bold mb-6">
              <Award className="h-5 w-5" />
              Why Students Choose Us
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Why Choose Us
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              With years of experience and hundreds of success stories, we are your trusted partner in achieving your study abroad dreams
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <Card key={index} className="text-center group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-0 bg-gradient-to-br from-orange-50 to-red-50">
                <CardContent className="p-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <item.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-orange-900 mb-4">{item.title}</h3>
                  <p className="text-orange-700 leading-relaxed">{item.description}</p>
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
      <section className="py-24 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-6 py-3 rounded-full font-bold mb-6">
              <BookOpen className="h-5 w-5" />
              Got Questions?
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Get answers to the most common questions about our consultation service
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white border-0 rounded-2xl px-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <AccordionTrigger className="text-left text-lg font-bold text-purple-900 py-6 hover:no-underline hover:text-purple-700">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-purple-700 pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-800 px-6 py-3 rounded-full font-bold mb-6">
              <Star className="h-5 w-5" />
              Student Success Stories
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Success Stories
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Hear from students who achieved their study abroad dreams with our guidance
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-0 bg-gradient-to-br from-indigo-50 to-blue-50 overflow-hidden">
                <CardContent className="p-8 relative">
                  <div className="absolute top-4 right-4 opacity-20">
                    <Star className="h-12 w-12 text-indigo-300" />
                  </div>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-xl">{testimonial.name[0]}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-indigo-900">{testimonial.name}</h4>
                      <p className="text-sm text-indigo-700 font-medium">{testimonial.program}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3 text-indigo-600" />
                        <p className="text-sm text-indigo-600 font-bold">{testimonial.country}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-indigo-800 leading-relaxed italic font-medium">
                    "{testimonial.quote}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/bg.svg')] opacity-10" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/20 text-white px-6 py-3 rounded-full font-bold backdrop-blur-sm">
              <GraduationCap className="h-5 w-5" />
              Transform Your Future Today
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
              Ready to Start Your
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Study Abroad Journey?
              </span>
            </h2>
            
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Don't wait any longer. Book your free consultation today and take the first step 
              towards achieving your international education dreams.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button size="lg" className="bg-yellow-400 text-black hover:bg-yellow-500 text-lg px-10 py-6 font-bold shadow-xl">
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

            <div className="pt-8 border-t border-white/20">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center gap-2 bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                  <span className="text-white font-medium">100% Free Consultation</span>
                </div>
                <div className="flex flex-col items-center gap-2 bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                  <Shield className="h-6 w-6 text-blue-400" />
                  <span className="text-white font-medium">No Obligation</span>
                </div>
                <div className="flex flex-col items-center gap-2 bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                  <Award className="h-6 w-6 text-yellow-400" />
                  <span className="text-white font-medium">Expert Guidance</span>
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
