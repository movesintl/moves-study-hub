import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, Users, BookOpen, Target, Award, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import LeadEnquiryForm from '@/components/common/LeadEnquiryForm';

const EnglishTestPrep = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-glow to-accent overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <Button variant="ghost" asChild className="mb-6 text-white hover:bg-white/20">
            <Link to="/services">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Services
            </Link>
          </Button>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
              </div>
              
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                  English Test Preparation
                </h1>
                <p className="text-xl text-white/90 leading-relaxed">
                  Comprehensive preparation for IELTS, TOEFL, PTE and other English proficiency tests with expert guidance
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6">
                  <Link to="/contact" className="flex items-center">
                    Start Preparation
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6">
                  <Link to="/contact" className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Free Assessment
                  </Link>
                </Button>
              </div>

              <div className="flex items-center gap-8 text-white/80">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Expert tutors</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  <span>Proven methods</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  <span>High success rate</span>
                </div>
              </div>
            </div>

            <div className="lg:text-center">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                <div className="w-full h-64 lg:h-80 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl flex items-center justify-center">
                  <BookOpen className="h-24 w-24 text-white/60" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Test Preparation Services */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Test Preparation Programs</h2>
          <p className="text-xl text-muted-foreground">Choose the program that fits your target test and goals</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Target className="h-10 w-10 text-primary mb-4" />
              <CardTitle className="text-foreground">IELTS Preparation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Comprehensive IELTS preparation covering all four skills: Reading, Writing, Listening, and Speaking.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm text-muted-foreground">Mock tests and practice sessions</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm text-muted-foreground">Speaking practice with native speakers</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm text-muted-foreground">Writing task feedback and improvement</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm text-muted-foreground">Test strategies and time management</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <BookOpen className="h-10 w-10 text-primary mb-4" />
              <CardTitle className="text-foreground">TOEFL Preparation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Intensive TOEFL preparation focusing on academic English skills and computer-based testing.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm text-muted-foreground">Computer-based practice tests</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm text-muted-foreground">Academic vocabulary building</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm text-muted-foreground">Integrated skills practice</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm text-muted-foreground">Note-taking and listening strategies</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <Award className="h-10 w-10 text-primary mb-4" />
              <CardTitle className="text-foreground">PTE Preparation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Specialized PTE Academic preparation with focus on integrated skills and machine scoring.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm text-muted-foreground">Machine scoring optimization</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm text-muted-foreground">Template-based approaches</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm text-muted-foreground">Pronunciation training</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm text-muted-foreground">Real exam simulations</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-card py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose Our Test Prep?</h2>
            <p className="text-xl text-muted-foreground">Comprehensive features designed for your success</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-start gap-4">
              <Users className="h-6 w-6 text-primary mt-1" />
              <div>
                <h4 className="font-semibold mb-2 text-foreground">Expert Instructors</h4>
                <p className="text-muted-foreground text-sm">
                  Learn from certified instructors with years of teaching experience
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock className="h-6 w-6 text-primary mt-1" />
              <div>
                <h4 className="font-semibold mb-2 text-foreground">Flexible Scheduling</h4>
                <p className="text-muted-foreground text-sm">
                  Choose from morning, evening, or weekend classes
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Target className="h-6 w-6 text-primary mt-1" />
              <div>
                <h4 className="font-semibold mb-2 text-foreground">Personalized Approach</h4>
                <p className="text-muted-foreground text-sm">
                  Customized study plans based on your current level and target score
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Award className="h-6 w-6 text-primary mt-1" />
              <div>
                <h4 className="font-semibold mb-2 text-foreground">Proven Results</h4>
                <p className="text-muted-foreground text-sm">
                  Track record of helping students achieve their target scores
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Study Plans */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Study Plans</h2>
          <p className="text-xl text-muted-foreground">Choose the study plan that fits your timeline and goals</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">Intensive Plan</CardTitle>
              <p className="text-muted-foreground">4-6 weeks</p>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary mb-4">$499</div>
              <ul className="space-y-2 text-left">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm text-muted-foreground">Daily practice sessions</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm text-muted-foreground">One-on-one tutoring</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm text-muted-foreground">Weekly mock tests</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm text-muted-foreground">24/7 support</span>
                </li>
              </ul>
              <Button className="w-full mt-6">
                Choose Plan
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center border-primary border-2 shadow-lg">
            <CardHeader>
              <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm mb-2 mx-auto w-fit">
                Most Popular
              </div>
              <CardTitle className="text-2xl text-foreground">Standard Plan</CardTitle>
              <p className="text-muted-foreground">8-12 weeks</p>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary mb-4">$299</div>
              <ul className="space-y-2 text-left">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm text-muted-foreground">Regular practice sessions</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm text-muted-foreground">Group classes</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm text-muted-foreground">Bi-weekly mock tests</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm text-muted-foreground">Email support</span>
                </li>
              </ul>
              <Button className="w-full mt-6">
                Choose Plan
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">Extended Plan</CardTitle>
              <p className="text-muted-foreground">16-20 weeks</p>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary mb-4">$199</div>
              <ul className="space-y-2 text-left">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm text-muted-foreground">Self-paced learning</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm text-muted-foreground">Online resources</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm text-muted-foreground">Monthly mock tests</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span className="text-sm text-muted-foreground">Forum support</span>
                </li>
              </ul>
              <Button className="w-full mt-6">
                Choose Plan
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Lead Enquiry Form */}
      <LeadEnquiryForm />
    </div>
  );
};

export default EnglishTestPrep;